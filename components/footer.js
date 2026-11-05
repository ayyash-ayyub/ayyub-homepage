import { Box, Link } from '@chakra-ui/react'

const Footer = () => {
  const startYear = 2022
  const currentYear = new Date().getFullYear()
  const yearLabel = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {yearLabel}{' '}
      <Link href="https://terminalkoding.com" target="_blank">
        Terminal Koding Teknologi
      </Link>{' '}
      | All Rights Reserved.
    </Box>

    
    
  )
}

export default Footer
