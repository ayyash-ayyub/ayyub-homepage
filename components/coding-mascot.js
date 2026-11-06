import { useEffect, useRef, useState } from 'react'
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
        transform: translateX(0) rotate(-4deg);
        transform-origin: center bottom;
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
        left: 68%;
        top: 14%;
        pointer-events: none;
      }
      .coding-mascot__word {
        position: absolute;
        left: 0;
        top: 0;
        white-space: nowrap;
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 9px;
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
        .coding-mascot__arm { animation: none; }
        .coding-mascot__word { animation: none; opacity: 0; }
      }

      .coding-mascot__bubble {
        position: absolute;
        bottom: calc(100% + 14px);
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: 200px;
        background: #fff;
        color: #141414;
        border: 2px solid #141414;
        border-radius: 14px;
        padding: 10px 14px;
        cursor: pointer;
        z-index: 2;
      }
      .coding-mascot__bubble::after,
      .coding-mascot__bubble::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
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

const SLIDE_FRACTION = 0.25
const SLIDE_ROTATION = 'rotate(-4deg)'
const SLIDE_TRANSITION = 'transform 0.7s cubic-bezier(0.17, 0.84, 0.44, 1)'

const CodingMascot = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const wrapRef = useRef(null)
  const [slideKey, setSlideKey] = useState(0)

  useEffect(() => {
    const handleReplay = () => setSlideKey(k => k + 1)
    window.addEventListener('adompo:replay', handleReplay)
    return () => window.removeEventListener('adompo:replay', handleReplay)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el || !el.parentElement) return undefined

    const reduceMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const cardWidth = el.parentElement.getBoundingClientRect().width
    const startOffset = -(cardWidth * SLIDE_FRACTION)

    el.style.transition = 'none'
    el.style.transform = `translateX(${startOffset}px) ${SLIDE_ROTATION}`

    let settleFrame
    const startFrame = requestAnimationFrame(() => {
      settleFrame = requestAnimationFrame(() => {
        el.style.transition = SLIDE_TRANSITION
        el.style.transform = `translateX(0) ${SLIDE_ROTATION}`
      })
    })

    return () => {
      cancelAnimationFrame(startFrame)
      if (settleFrame) cancelAnimationFrame(settleFrame)
    }
  }, [slideKey])

  useEffect(() => {
    if (!dialogOpen) return undefined

    const handlePointerDown = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
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

  return (
    <Box className="coding-mascot" ref={wrapRef}>
      {dialogOpen && (
        <Box className="coding-mascot__bubble" onClick={() => setDialogOpen(false)}>
          <Box className="coding-mascot__bubble-label">ADOMPO</Box>
          <Box className="coding-mascot__bubble-text">
            <span>kepo ni yeee, ngapain disini?</span>
          </Box>
        </Box>
      )}
      <Box
        as="button"
        type="button"
        className="coding-mascot__btn"
        aria-label="Klik untuk lihat reaksi"
        aria-expanded={dialogOpen}
        onClick={() => setDialogOpen(v => !v)}
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
  )
}

export default CodingMascot
