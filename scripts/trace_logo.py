"""Trace scripts/reference/6x6.jpg into an SVG piece set for the hero logo animation.

Reads the reference raster logo, finds each disjoint white shape with OpenCV,
simplifies it into a polygon path, and writes two outputs:

  public/images/logo.svg          static white-fill SVG (favicon/OG/other use)
  components/animated-logo-data.js  per-piece path data + seeded animation params

This script is a one-off dev tool, not part of the build or runtime.
"""

import json
import random
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SOURCE_IMAGE = ROOT / "scripts" / "reference" / "6x6.jpg"
STATIC_SVG_OUT = ROOT / "public" / "images" / "logo.svg"
DATA_JS_OUT = ROOT / "components" / "animated-logo-data.js"

VIEW_BOX = "140 100 430 510"
CENTER_X = 354
OUTER_MIN_AREA = 30
HOLE_MIN_AREA = 10
APPROX_EPSILON = 0.8
SEED = 7


def contour_to_path(contour):
    points = contour.reshape(-1, 2)
    if len(points) == 0:
        return ""
    cmds = [f"M{points[0][0]},{points[0][1]}"]
    for x, y in points[1:]:
        cmds.append(f"L{x},{y}")
    cmds.append("Z")
    return " ".join(cmds)


def main():
    img = cv2.imread(str(SOURCE_IMAGE))
    if img is None:
        raise SystemExit(f"could not read {SOURCE_IMAGE}")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 3)
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY)

    contours, hierarchy = cv2.findContours(
        binary, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE
    )
    hierarchy = hierarchy[0] if hierarchy is not None else []

    pieces = []
    for i, contour in enumerate(contours):
        parent = hierarchy[i][3]
        area = cv2.contourArea(contour)
        if parent != -1 or area < OUTER_MIN_AREA:
            continue

        simplified = cv2.approxPolyDP(contour, APPROX_EPSILON, True)
        subpaths = [contour_to_path(simplified)]

        child = hierarchy[i][2]
        while child != -1:
            hole_area = cv2.contourArea(contours[child])
            if hole_area > HOLE_MIN_AREA:
                simplified_hole = cv2.approxPolyDP(
                    contours[child], APPROX_EPSILON, True
                )
                subpaths.append(contour_to_path(simplified_hole))
            child = hierarchy[child][0]

        x, y, w, h = cv2.boundingRect(contour)
        pieces.append(
            {
                "d": " ".join(subpaths),
                "bbox_x": x,
                "bbox_y": y,
                "cx": x + w / 2,
            }
        )

    pieces.sort(key=lambda p: p["bbox_x"] + p["bbox_y"] * 0.3)

    rng = random.Random(SEED)
    animated_pieces = []
    for index, piece in enumerate(pieces):
        dx = (piece["cx"] - CENTER_X) * rng.uniform(1.6, 2.6) + rng.uniform(-120, 120)
        dy = rng.uniform(-160, 160)
        r = rng.uniform(25, 90) * rng.choice([1, -1])
        animated_pieces.append(
            {
                "d": piece["d"],
                "dx": round(dx, 1),
                "dy": round(dy, 1),
                "r": round(r, 1),
                "i": index,
            }
        )

    STATIC_SVG_OUT.parent.mkdir(parents=True, exist_ok=True)
    combined_d = " ".join(p["d"] for p in animated_pieces)
    static_svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEW_BOX}" '
        f'role="img" aria-label="Ayyub Adompo logo">'
        f'<path fill="#fff" d="{combined_d}"/>'
        f"</svg>\n"
    )
    STATIC_SVG_OUT.write_text(static_svg)

    data_js = (
        "export const logoViewBox = " + json.dumps(VIEW_BOX) + "\n\n"
        "export const logoPieces = " + json.dumps(animated_pieces, indent=2) + "\n"
    )
    DATA_JS_OUT.write_text(data_js)

    print(f"pieces: {len(animated_pieces)}")
    print(f"wrote {STATIC_SVG_OUT} ({STATIC_SVG_OUT.stat().st_size} bytes)")
    print(f"wrote {DATA_JS_OUT} ({DATA_JS_OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
