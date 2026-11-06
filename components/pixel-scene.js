import { useEffect, useRef, useState } from 'react'
import { Global } from '@emotion/react'
import { Box } from '@chakra-ui/react'

export const PixelSceneStyle = () => (
  <Global
    styles={`
      .pixel-scene-wrap {
        position: relative;
      }
      .pixel-scene {
        position: relative;
        display: flex;
        align-items: flex-end;
        gap: 8px;
        width: fit-content;
        max-width: 100%;
        margin: 0 auto;
      }
      .pixel-scene__ground {
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        height: 1px;
        background: currentColor;
        opacity: 0.15;
      }
      .pixel-scene__lane {
        position: relative;
        width: 96px;
        height: 40px;
      }
      .pixel-scene__pet-wrap {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 36px;
        animation: pixel-pet-walk 16s ease-in-out infinite, pixel-pet-bob 0.5s steps(2, end) infinite;
      }
      .pixel-scene__pet-btn {
        display: block;
        width: 100%;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
      }
      .pixel-scene__pet {
        display: block;
        width: 100%;
        height: auto;
        image-rendering: pixelated;
      }
      .pixel-scene__desk-wrap {
        position: relative;
        flex-shrink: 0;
      }
      .pixel-scene__desk-btn {
        display: block;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
      }
      .pixel-scene__desk {
        display: block;
        width: clamp(48px, 10vw, 80px);
        height: auto;
        image-rendering: pixelated;
      }
      .pixel-scene__arm {
        position: absolute;
        left: 43.75%;
        top: 50%;
        width: 18.75%;
        height: 13.6364%;
        image-rendering: pixelated;
        pointer-events: none;
        animation: pixel-arm-type 0.35s steps(2, end) infinite;
      }
      @keyframes pixel-arm-type {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-35%); }
      }
      .pixel-scene__words {
        position: absolute;
        left: 68%;
        top: 14%;
        pointer-events: none;
      }
      .pixel-scene__word {
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
        animation: pixel-word-float 12s linear infinite;
      }
      .pixel-scene__word--warn {
        color: #ef4444;
      }
      .pixel-scene__word:nth-of-type(1) { animation-delay: 0s; }
      .pixel-scene__word:nth-of-type(2) { animation-delay: -2s; }
      .pixel-scene__word:nth-of-type(3) { animation-delay: -4s; }
      .pixel-scene__word:nth-of-type(4) { animation-delay: -6s; }
      .pixel-scene__word:nth-of-type(5) { animation-delay: -8s; }
      .pixel-scene__word:nth-of-type(6) { animation-delay: -10s; }
      @keyframes pixel-word-float {
        0%      { opacity: 0; transform: translate(-50%, 0); }
        2.67%   { opacity: 1; }
        13.33%  { opacity: 1; transform: translate(-50%, -16px); }
        16.67%  { opacity: 0; transform: translate(-50%, -20px); }
        100%    { opacity: 0; transform: translate(-50%, -20px); }
      }
      @keyframes pixel-pet-walk {
        0%   { left: 0; }
        38%  { left: calc(100% - 36px); }
        50%  { left: calc(100% - 36px); }
        88%  { left: 0; }
        100% { left: 0; }
      }
      @keyframes pixel-pet-bob {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-3px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .pixel-scene__pet-wrap { animation: none; }
        .pixel-scene__arm { animation: none; }
        .pixel-scene__word { animation: none; opacity: 0; }
      }

      .pixel-bubble {
        position: absolute;
        bottom: calc(100% + 14px);
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: 220px;
        background: #fff;
        color: #141414;
        border: 2px solid #141414;
        border-radius: 14px;
        padding: 10px 14px;
        cursor: pointer;
        z-index: 2;
      }
      .pixel-bubble::after,
      .pixel-bubble::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
      }
      .pixel-bubble::after {
        top: 100%;
        border-top: 10px solid #141414;
      }
      .pixel-bubble::before {
        top: calc(100% - 2px);
        border-left-width: 6px;
        border-right-width: 6px;
        border-top: 8px solid #fff;
        z-index: 1;
      }
      .pixel-bubble__label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.06em;
        color: #6b6b6b;
        margin-bottom: 4px;
      }
      .pixel-bubble__text {
        font-size: 14px;
        line-height: 1.5;
        font-weight: 600;
      }
      .pixel-bubble__text span {
        background: linear-gradient(to bottom, transparent 58%, rgba(249, 168, 109, 0.6) 58%);
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
      }
    `}
  />
)

const PixelScene = () => {
  const [openDialog, setOpenDialog] = useState(null) // null | 'desk' | 'pet'
  const deskWrapRef = useRef(null)
  const petWrapRef = useRef(null)

  useEffect(() => {
    if (!openDialog) return undefined

    const handlePointerDown = e => {
      const inDesk = deskWrapRef.current && deskWrapRef.current.contains(e.target)
      const inPet = petWrapRef.current && petWrapRef.current.contains(e.target)
      if (!inDesk && !inPet) setOpenDialog(null)
    }
    const handleKeyDown = e => {
      if (e.key === 'Escape') setOpenDialog(null)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openDialog])

  return (
    <Box className="pixel-scene-wrap" my={10} opacity={0.9}>
      <Box className="pixel-scene">
        <Box className="pixel-scene__lane">
          <Box className="pixel-scene__pet-wrap" ref={petWrapRef}>
            {openDialog === 'pet' && (
              <Box className="pixel-bubble" onClick={() => setOpenDialog(null)}>
                <Box className="pixel-bubble__text">
                  <span>Guk! Guk!</span>
                </Box>
              </Box>
            )}
            <Box
              as="button"
              type="button"
              className="pixel-scene__pet-btn"
              aria-label="Klik untuk lihat reaksi"
              aria-expanded={openDialog === 'pet'}
              onClick={() => setOpenDialog(v => (v === 'pet' ? null : 'pet'))}
            >
              <img className="pixel-scene__pet" src="/pixel-pet.svg" alt="" aria-hidden="true" />
            </Box>
          </Box>
        </Box>
        <Box className="pixel-scene__desk-wrap" ref={deskWrapRef}>
          {openDialog === 'desk' && (
            <Box className="pixel-bubble" onClick={() => setOpenDialog(null)}>
              <Box className="pixel-bubble__label">ADOMPO</Box>
              <Box className="pixel-bubble__text">
                <span>kepo ni yeee, ngapain disini?</span>
              </Box>
            </Box>
          )}
          <Box
            as="button"
            type="button"
            className="pixel-scene__desk-btn"
            aria-label="Klik untuk lihat reaksi"
            aria-expanded={openDialog === 'desk'}
            onClick={() => setOpenDialog(v => (v === 'desk' ? null : 'desk'))}
          >
            <img className="pixel-scene__desk" src="/pixel-desk.svg" alt="" aria-hidden="true" />
          </Box>
          <img className="pixel-scene__arm" src="/pixel-arm.svg" alt="" aria-hidden="true" />
          <Box className="pixel-scene__words" aria-hidden="true">
            <span className="pixel-scene__word">code</span>
            <span className="pixel-scene__word">commit</span>
            <span className="pixel-scene__word">push</span>
            <span className="pixel-scene__word">pull</span>
            <span className="pixel-scene__word pixel-scene__word--warn">pemai ngana!</span>
            <span className="pixel-scene__word">deploy</span>
          </Box>
        </Box>
      </Box>
      <span className="pixel-scene__ground" />
    </Box>
  )
}

export default PixelScene
