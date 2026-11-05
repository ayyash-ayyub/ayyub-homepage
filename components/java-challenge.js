import { useState } from 'react'
import { Box, Code, Input, Button, Text, HStack, useColorModeValue } from '@chakra-ui/react'

const JavaChallenge = ({ challenge, onSolved, buttonLabel = 'Run' }) => {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState(null) // null | 'wrong' | 'correct'

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
      borderRadius="lg"
      p={4}
      bg={boxBg}
      borderWidth={1}
      borderColor={borderColor}
      css={{ backdropFilter: 'blur(10px)' }}
    >
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
          value={value}
          onChange={e => {
            setValue(e.target.value)
            setStatus(null)
          }}
          onKeyDown={e => e.key === 'Enter' && check()}
          isInvalid={status === 'wrong'}
        />
        <Button size="sm" colorScheme="teal" onClick={check}>
          {buttonLabel}
        </Button>
      </HStack>
      {status === 'wrong' && (
        <Text fontSize="xs" color="red.400" mt={2}>
          Belum tepat, coba lagi.
        </Text>
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
