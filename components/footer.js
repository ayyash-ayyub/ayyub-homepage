import { Box } from '@chakra-ui/react'

const Footer = () => {
  const startYear = 2022
  const currentYear = new Date().getFullYear()
  const yearLabel = currentYear > startYear ? `${startYear}–${currentYear}` : `${startYear}`

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      <Box as="span" fontFamily="mono">
        {'while (alive) { create(); }'}
      </Box>
      {' | '}
      &copy; Est {yearLabel}
    </Box>
  )
}

export default Footer
