import { useCallback, useEffect, useRef, useState } from 'react'
import { Global } from '@emotion/react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { logoPieces, logoViewBox } from './animated-logo-data'

const PIECE_TRANSITION_MS = 1400
const PIECE_DELAY_STEP_MS = 90
const PIECE_DELAY_BASE_MS = 200
const SHINE_GAP_MS = 150
const SHINE_FALLBACK_BUFFER_MS = 500

// Repeat the shine sweep every 1.5s for as long as the logo stays assembled.
const SHINE_REPEAT = true
const SHINE_REPEAT_MS = 1500

export const AnimatedLogoStyle = () => (
  <Global
    styles={`
      .logo { width: min(70vw, 360px); height: auto; color: var(--logo-base, #fff); overflow: visible; margin: 0 auto; isolation: isolate; }
      .pc {
        transform-box: fill-box;
        transform-origin: center;
        transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scale(.6);
        opacity: 0;
        transition: transform 1.4s cubic-bezier(.2,.9,.25,1.05), opacity .6s ease;
        transition-delay: calc(var(--i) * 90ms + 200ms);
      }
      .assembled .pc { transform: none; opacity: 1; }
      .logo-tagline {
        opacity: 0;
        transition: opacity 1s ease;
        transition-delay: 2.6s;
        color: var(--logo-base, #fff);
      }
      .assembled .logo-tagline { opacity: 0.7; }
      @supports (background-clip: text) or (-webkit-background-clip: text) {
        .logo-tagline {
          display: inline-block;
          background-image: linear-gradient(90deg, var(--logo-base, #fff) 46%, var(--logo-shine-color, #fff) 50%, var(--logo-base, #fff) 54%);
          background-size: 300% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .logo-tagline.shine-ltr {
          animation: tagline-shine-ltr 0.55s cubic-bezier(.4,0,.2,1) forwards;
        }
        .logo-tagline.shine-rtl {
          animation: tagline-shine-rtl 0.55s cubic-bezier(.4,0,.2,1) forwards;
        }
      }
      @keyframes tagline-shine-ltr {
        from { background-position: 200% 0; }
        to   { background-position: -100% 0; }
      }
      @keyframes tagline-shine-rtl {
        from { background-position: -100% 0; }
        to   { background-position: 200% 0; }
      }
      .logo-shine__band {
        transform-box: view-box;
        transform: skewX(-20deg) translateX(-160px);
        opacity: 0;
        mix-blend-mode: difference;
      }
      .logo.is-shining .logo-shine__band {
        animation: logo-shine-sweep 0.7s cubic-bezier(.4,0,.2,1) forwards;
      }
      @keyframes logo-shine-sweep {
        0%   { opacity: 0; transform: skewX(-20deg) translateX(-160px); }
        10%  { opacity: 1; }
        90%  { opacity: 1; }
        100% { opacity: 0; transform: skewX(-20deg) translateX(720px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .pc, .logo-tagline { transition: none; }
        .logo-shine { display: none; }
        .logo-tagline.shine-ltr, .logo-tagline.shine-rtl { animation: none; }
      }
    `}
  />
)

const LogoScene = () => {
  const [assembled, setAssembled] = useState(false)
  const [shining, setShining] = useState(false)
  const [shineDirection, setShineDirection] = useState('ltr')
  const lastPieceRef = useRef(null)
  const shineBandRef = useRef(null)
  const taglineRef = useRef(null)
  const shineFiredRef = useRef(false)

  useEffect(() => {
    let raf2
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAssembled(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
  }, [])

  useEffect(() => {
    if (!assembled) return undefined

    const fireShine = () => {
      if (shineFiredRef.current) return
      shineFiredRef.current = true
      setTimeout(() => setShining(true), SHINE_GAP_MS)
    }

    const lastPiece = lastPieceRef.current
    const handleTransitionEnd = event => {
      if (event.propertyName === 'transform') {
        fireShine()
      }
    }
    if (lastPiece) {
      lastPiece.addEventListener('transitionend', handleTransitionEnd)
    }

    const lastDelay = (logoPieces.length - 1) * PIECE_DELAY_STEP_MS + PIECE_DELAY_BASE_MS
    const fallbackMs = lastDelay + PIECE_TRANSITION_MS + SHINE_FALLBACK_BUFFER_MS
    const fallbackTimer = setTimeout(fireShine, fallbackMs)

    return () => {
      if (lastPiece) {
        lastPiece.removeEventListener('transitionend', handleTransitionEnd)
      }
      clearTimeout(fallbackTimer)
    }
  }, [assembled])

  useEffect(() => {
    if (!SHINE_REPEAT || !shining) return undefined
    const timer = setTimeout(() => {
      setShining(false)
      requestAnimationFrame(() => {
        // Force a reflow so the browser treats the next class toggle as a
        // fresh animation start instead of a no-op on an already-removed class.
        const band = shineBandRef.current
        if (band) {
          void band.getBoundingClientRect()
        }
        const tagline = taglineRef.current
        if (tagline) {
          void tagline.getBoundingClientRect()
        }
        setShineDirection(dir => (dir === 'ltr' ? 'rtl' : 'ltr'))
        setShining(true)
      })
    }, SHINE_REPEAT_MS)
    return () => clearTimeout(timer)
  }, [shining])

  const svgClassName = ['logo', assembled && 'assembled', shining && 'is-shining']
    .filter(Boolean)
    .join(' ')
  const taglineClassName = [
    'logo-tagline',
    shining && (shineDirection === 'ltr' ? 'shine-ltr' : 'shine-rtl')
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Box className={assembled ? 'assembled' : ''} overflow="hidden">
      <svg
        className={svgClassName}
        viewBox={logoViewBox}
        role="img"
        aria-label="Ayyub Adompo"
      >
        <defs>
          <linearGradient id="logoShineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".18" stopColor="#fff" stopOpacity="1" />
            <stop offset=".82" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="logoShineMask" maskUnits="userSpaceOnUse">
            {logoPieces.map(piece => (
              <path key={piece.i} fill="#fff" d={piece.d} />
            ))}
          </mask>
        </defs>

        {logoPieces.map((piece, index) => (
          <path
            key={piece.i}
            ref={index === logoPieces.length - 1 ? lastPieceRef : undefined}
            className="pc"
            fill="currentColor"
            d={piece.d}
            style={{
              '--dx': `${piece.dx}px`,
              '--dy': `${piece.dy}px`,
              '--r': `${piece.r}deg`,
              '--i': piece.i
            }}
          />
        ))}

        <g className="logo-shine" mask="url(#logoShineMask)">
          <rect
            ref={shineBandRef}
            className="logo-shine__band"
            x="0"
            y="100"
            width="170"
            height="510"
            fill="url(#logoShineGrad)"
          />
        </g>
      </svg>
      <Box ref={taglineRef} className={taglineClassName} mt={2} fontSize="sm">
        Welcome to Adompo&apos;s Yard
      </Box>
    </Box>
  )
}

const AnimatedLogo = () => {
  const [replayKey, setReplayKey] = useState(0)
  const logoBase = useColorModeValue('#2e2e2e', '#d6d6d6')
  const shineColor = useColorModeValue('#9a9a9a', '#fff')

  const replay = useCallback(() => {
    setReplayKey(key => key + 1)
  }, [])

  return (
    <Box
      textAlign="center"
      py={[4, 8, 10]}
      style={{
        '--logo-base': logoBase,
        '--logo-shine-color': shineColor
      }}
    >
      <LogoScene key={replayKey} />
      <Box
        as="button"
        type="button"
        onClick={replay}
        mt={2}
        fontSize="xs"
        opacity={0.5}
      >
        Replay
      </Box>
    </Box>
  )
}

export default AnimatedLogo
