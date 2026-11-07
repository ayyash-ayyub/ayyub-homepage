import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Global } from '@emotion/react'
import { Box } from '@chakra-ui/react'

export const CodingMascotStyle = () => (
  <Global
    styles={`
      .coding-mascot {
        position: absolute;
        bottom: 100%;
        right: 6px;
        width: 56px;
        transform: translateX(0) rotate(0deg);
        transform-origin: center bottom;
      }
      @keyframes coding-mascot-teeter {
        0%, 100% { transform: translateX(12px) rotate(19deg); }
        50%      { transform: translateX(12px) rotate(13deg); }
      }
      .coding-mascot__btn {
        display: block;
        width: 100%;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
      }
      .coding-mascot__desk {
        display: block;
        width: 100%;
        height: auto;
        image-rendering: pixelated;
      }
      .coding-mascot__arm {
        position: absolute;
        left: 43.75%;
        top: 50%;
        width: 18.75%;
        height: 13.6364%;
        image-rendering: pixelated;
        pointer-events: none;
        animation: coding-mascot-type 0.35s steps(2, end) infinite;
      }
      @keyframes coding-mascot-type {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-35%); }
      }
      .coding-mascot__words {
        position: absolute;
        left: 45%;
        top: 14%;
        pointer-events: none;
      }
      .coding-mascot__word {
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: clamp(7px, 1.9vw, 9px);
        font-weight: 700;
        color: #ffffff;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.7);
        opacity: 0;
        animation: coding-mascot-word-float 12s linear infinite;
      }
      .coding-mascot__word--warn {
        color: #ef4444;
      }
      .coding-mascot__word:nth-of-type(1) { animation-delay: 0s; }
      .coding-mascot__word:nth-of-type(2) { animation-delay: -2s; }
      .coding-mascot__word:nth-of-type(3) { animation-delay: -4s; }
      .coding-mascot__word:nth-of-type(4) { animation-delay: -6s; }
      .coding-mascot__word:nth-of-type(5) { animation-delay: -8s; }
      .coding-mascot__word:nth-of-type(6) { animation-delay: -10s; }
      @keyframes coding-mascot-word-float {
        0%      { opacity: 0; transform: translate(-50%, 0); }
        2.67%   { opacity: 1; }
        13.33%  { opacity: 1; transform: translate(-50%, -16px); }
        16.67%  { opacity: 0; transform: translate(-50%, -20px); }
        100%    { opacity: 0; transform: translate(-50%, -20px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .coding-mascot { animation: none !important; }
        .coding-mascot__arm { animation: none; }
        .coding-mascot__word { animation: none; opacity: 0; }
      }

      .coding-mascot-bubble-wrap {
        position: fixed;
        z-index: 2;
      }
      .coding-mascot__bubble {
        position: relative;
        width: max-content;
        max-width: var(--bubble-w, 200px);
        background: #fff;
        color: #141414;
        border: 2px solid #141414;
        border-radius: 14px;
        padding: 10px 14px;
        cursor: pointer;
      }
      .coding-mascot__bubble::after,
      .coding-mascot__bubble::before {
        content: '';
        position: absolute;
        left: var(--tail-left, 50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
      }
      .coding-mascot__bubble::after {
        top: 100%;
        border-top: 10px solid #141414;
      }
      .coding-mascot__bubble::before {
        top: calc(100% - 2px);
        border-left-width: 6px;
        border-right-width: 6px;
        border-top: 8px solid #fff;
        z-index: 1;
      }
      .coding-mascot__bubble-label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.06em;
        color: #6b6b6b;
        margin-bottom: 4px;
      }
      .coding-mascot__bubble-text {
        font-size: 14px;
        line-height: 1.5;
        font-weight: 600;
      }
      .coding-mascot__bubble-text span {
        background: linear-gradient(to bottom, transparent 58%, rgba(249, 168, 109, 0.6) 58%);
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
      }
    `}
  />
)

const EDGE_MARGIN = 6 // matches `right: 6px` in .coding-mascot
const MASCOT_WIDTH = 56 // matches `width: 56px` in .coding-mascot
// Final landed pose: pushed a bit past its resting margin and leaning hard
// toward the corner, like it skidded too far and is teetering right on the
// edge - still caught by the card, not actually falling off.
const FINAL_X_OFFSET = 12
const FINAL_ROTATION_DEG = 16
const SLIDE_MS = 700
const SLIDE_TRANSITION = `transform ${SLIDE_MS}ms cubic-bezier(0.17, 0.84, 0.44, 1)`
const TEETER_MS = 2400
const TEETER_ANIMATION = `coding-mascot-teeter ${TEETER_MS}ms ease-in-out infinite`
// How long the card's own straighten-to-tilted animation takes
// (components/java-challenge.js). The mascot waits this long before
// sliding in, so it only "slides downhill" once the card is actually
// tilted - like it got pulled into the corner by gravity.
export const CARD_TILT_MS = 500

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// How far left (as a negative translateX, in px) the mascot has to move from
// its right-anchored resting spot to park at the card's left corner, mirroring
// the same edge margin on both sides.
const leftCornerOffset = cardWidth => -(cardWidth - MASCOT_WIDTH - 2 * EDGE_MARGIN)

const BUBBLE_GAP = 8 // minimum breathing room from the viewport edge
const BUBBLE_MAX_WIDTH = 200

const CodingMascot = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [bubblePos, setBubblePos] = useState(null)
  const wrapRef = useRef(null)
  const bubbleRef = useRef(null)

  // Wherever the mascot currently is (idle at the left corner, mid-slide,
  // or landed/teetering at the right corner), position the bubble right
  // above it - clamped so it never runs off either edge of the viewport.
  const openBubble = () => {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const viewportWidth = document.documentElement.clientWidth
    const bubbleWidth = Math.min(BUBBLE_MAX_WIDTH, viewportWidth - BUBBLE_GAP * 2)
    const mascotCenterX = rect.left + rect.width / 2

    let left = mascotCenterX - bubbleWidth / 2
    left = Math.max(BUBBLE_GAP, Math.min(left, viewportWidth - bubbleWidth - BUBBLE_GAP))

    let tailLeft = mascotCenterX - left
    tailLeft = Math.max(16, Math.min(tailLeft, bubbleWidth - 16))

    setBubblePos({
      left,
      bottom: window.innerHeight - rect.top + 14,
      width: bubbleWidth,
      tailLeft
    })
    setDialogOpen(true)
  }

  // Parked at the card's left corner until "Do Not Click" is pressed.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || !el.parentElement) return undefined
    const cardWidth = el.parentElement.getBoundingClientRect().width
    el.style.transition = 'none'
    el.style.transform = `translateX(${leftCornerOffset(cardWidth)}px) rotate(0deg)`
    return undefined
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !el.parentElement) return undefined

    let delayTimer
    let startFrame
    let settleFrame
    let completeTimer

    const handleTilt = () => {
      const cardWidth = el.parentElement.getBoundingClientRect().width
      const startOffset = leftCornerOffset(cardWidth)

      el.style.animation = 'none'

      if (prefersReducedMotion()) {
        el.style.transition = 'none'
        el.style.transform = `translateX(${FINAL_X_OFFSET}px) rotate(${FINAL_ROTATION_DEG}deg)`
        window.dispatchEvent(new Event('adompo:tilt-complete'))
        return
      }

      el.style.transition = 'none'
      el.style.transform = `translateX(${startOffset}px) rotate(0deg)`

      delayTimer = setTimeout(() => {
        startFrame = requestAnimationFrame(() => {
          settleFrame = requestAnimationFrame(() => {
            el.style.transition = SLIDE_TRANSITION
            el.style.transform = `translateX(${FINAL_X_OFFSET}px) rotate(${FINAL_ROTATION_DEG}deg)`
          })
        })
        completeTimer = setTimeout(() => {
          el.style.transition = 'none'
          el.style.animation = TEETER_ANIMATION
          window.dispatchEvent(new Event('adompo:tilt-complete'))
        }, SLIDE_MS + 50)
      }, CARD_TILT_MS)
    }

    const handleUntilt = () => {
      el.style.animation = 'none'
      el.style.transition = prefersReducedMotion() ? 'none' : `transform ${CARD_TILT_MS}ms ease-out`
      el.style.transform = 'translateX(0) rotate(0deg)'
    }

    window.addEventListener('adompo:tilt', handleTilt)
    window.addEventListener('adompo:untilt', handleUntilt)
    return () => {
      window.removeEventListener('adompo:tilt', handleTilt)
      window.removeEventListener('adompo:untilt', handleUntilt)
      clearTimeout(delayTimer)
      clearTimeout(completeTimer)
      if (startFrame) cancelAnimationFrame(startFrame)
      if (settleFrame) cancelAnimationFrame(settleFrame)
    }
  }, [])

  useEffect(() => {
    if (!dialogOpen) return undefined

    const handlePointerDown = e => {
      const inMascot = wrapRef.current && wrapRef.current.contains(e.target)
      const inBubble = bubbleRef.current && bubbleRef.current.contains(e.target)
      if (!inMascot && !inBubble) {
        setDialogOpen(false)
      }
    }
    const handleKeyDown = e => {
      if (e.key === 'Escape') setDialogOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [dialogOpen])

  // Rendered into document.body via a portal: the mascot's ancestor card
  // gets a CSS transform when tilted, and a transformed ancestor becomes the
  // containing block for `position: fixed` descendants, which would otherwise
  // make the bubble anchor to the tilted card instead of the real viewport.
  const bubble =
    dialogOpen && bubblePos && typeof document !== 'undefined' ? (
      <Box
        className="coding-mascot-bubble-wrap"
        ref={bubbleRef}
        style={{
          left: bubblePos.left,
          bottom: bubblePos.bottom,
          '--bubble-w': `${bubblePos.width}px`,
          '--tail-left': `${bubblePos.tailLeft}px`
        }}
      >
        <Box className="coding-mascot__bubble" onClick={() => setDialogOpen(false)}>
          <Box className="coding-mascot__bubble-label">ADOMPO</Box>
          <Box className="coding-mascot__bubble-text">
            <span>kepo ni yeee, ngapain disini?</span>
          </Box>
        </Box>
      </Box>
    ) : null

  return (
    <>
      {bubble && createPortal(bubble, document.body)}
      <Box className="coding-mascot" ref={wrapRef}>
        <Box
          as="button"
          type="button"
          className="coding-mascot__btn"
          aria-label="Click to see a reaction"
          aria-expanded={dialogOpen}
          onClick={() => (dialogOpen ? setDialogOpen(false) : openBubble())}
        >
          <img className="coding-mascot__desk" src="/pixel-desk.svg" alt="" aria-hidden="true" />
        </Box>
        <img className="coding-mascot__arm" src="/pixel-arm.svg" alt="" aria-hidden="true" />
        <Box className="coding-mascot__words" aria-hidden="true">
          <span className="coding-mascot__word">code</span>
          <span className="coding-mascot__word">commit</span>
          <span className="coding-mascot__word">push</span>
          <span className="coding-mascot__word">pull</span>
          <span className="coding-mascot__word coding-mascot__word--warn">pemai ngana!</span>
          <span className="coding-mascot__word">deploy</span>
        </Box>
      </Box>
    </>
  )
}

export default CodingMascot
