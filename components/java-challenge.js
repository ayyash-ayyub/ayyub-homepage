import { useState, useEffect, useRef } from 'react'
import { Box, Code, Input, Button, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import CodingMascot, { CodingMascotStyle, CARD_TILT_MS } from './coding-mascot'

const CARD_TILT_DEG = 4

const JavaChallenge = ({ challenge, onSolved, onOtherChallenge, buttonLabel = 'Run' }) => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState(null) // null | 'wrong' | 'correct'
  const cardRef = useRef(null)

  useEffect(() => {
    setValue('')
    setStatus(null)
  }, [challenge])

  // Card starts straight. It only tilts/untilts when the "Jangan diklik"
  // button (components/animated-logo.js) fires these window events; the
  // mascot (coding-mascot.js) listens for the same events to time its own
  // slide-in after the card finishes tilting.
  useEffect(() => {
    const el = cardRef.current
    if (!el) return undefined

    const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleTilt = () => {
      el.style.transition = reduceMotion() ? 'none' : `transform ${CARD_TILT_MS}ms ease-out`
      el.style.transform = `rotate(${CARD_TILT_DEG}deg)`
    }
    const handleUntilt = () => {
      el.style.transition = reduceMotion() ? 'none' : `transform ${CARD_TILT_MS}ms ease-out`
      el.style.transform = 'rotate(0deg)'
    }

    window.addEventListener('adompo:tilt', handleTilt)
    window.addEventListener('adompo:untilt', handleUntilt)
    return () => {
      window.removeEventListener('adompo:tilt', handleTilt)
      window.removeEventListener('adompo:untilt', handleUntilt)
    }
  }, [])

  const codeColor = useColorModeValue('gray.800', 'green.300')
  const boxBg = useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')
  const codeBg = useColorModeValue('blackAlpha.50', 'blackAlpha.400')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const check = () => {
    const normalize = s => s.trim().toLowerCase()
    if (normalize(value) === normalize(challenge.answer)) {
      setStatus('correct')
      setTimeout(() => onSolved(), 500)
    } else {
      setStatus('wrong')
    }
  }

  return (
    <Box
      ref={cardRef}
      position="relative"
      borderRadius="lg"
      p={4}
      bg={boxBg}
      borderWidth={1}
      borderColor={borderColor}
      css={{ backdropFilter: 'blur(10px)' }}
    >
      <CodingMascotStyle />
      <CodingMascot />
      <HStack mb={2} opacity={0.8} spacing={2} align="center">
        <Box
          as="span"
          flexShrink={0}
          w="12px"
          h="12px"
          borderRadius="full"
          bg="#FF5F57"
          border="1px solid"
          borderColor="#E0443E"
        />
        <Text fontSize="sm">{challenge.prompt}</Text>
      </HStack>
      <Code
        display="block"
        whiteSpace="pre"
        p={3}
        borderRadius="md"
        fontSize="sm"
        color={codeColor}
        bg={codeBg}
        mb={3}
        overflowX="auto"
      >
        {challenge.code}
      </Code>
      <HStack>
        <Input
          size="sm"
          placeholder="Jawaban..."
          maxLength={64}
          value={value}
          onChange={e => {
            setValue(e.target.value)
            setStatus(null)
          }}
          onKeyDown={e => e.key === 'Enter' && check()}
          isInvalid={status === 'wrong'}
        />
        <Button size="sm" onClick={check}>
          {buttonLabel}
        </Button>
      </HStack>
      {status === 'wrong' && (
        onOtherChallenge ? (
          <HStack mt={2} spacing={2}>
            <Button
              size="xs"
              variant="outline"
              onClick={() => {
                setStatus(null)
                setValue('')
              }}
            >
              Try Again
            </Button>
            <Button size="xs" variant="outline" onClick={onOtherChallenge}>
              Other Challenge
            </Button>
          </HStack>
        ) : (
          <Text fontSize="xs" color="red.400" mt={2}>
            Belum tepat, coba lagi.
          </Text>
        )
      )}
      {status === 'correct' && (
        <Text fontSize="xs" color="green.400" mt={2}>
          ✅ Benar! Membuka...
        </Text>
      )}
    </Box>
  )
}

export default JavaChallenge
