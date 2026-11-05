import { Box } from '@chakra-ui/react'

const Footer = () => {
  const startYear = 2022
  const currentYear = new Date().getFullYear()
  const yearLabel = currentYear > startYear ? `${startYear} - ${currentYear}` : `${startYear}`

  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {yearLabel} ayyubadompo@gmail.com | 3D voxel by: akira.saputr@gmail.com | All Rights Reserved.
    </Box>

    
    
  )
}

export default Footer
