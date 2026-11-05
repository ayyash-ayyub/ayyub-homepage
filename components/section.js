import { Box } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const SectionStyle = () => (
  <Global
    styles={`
      @keyframes section-reveal {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .section-reveal {
        animation: section-reveal 0.8s ease both;
      }
      @media (prefers-reduced-motion: reduce) {
        .section-reveal { animation: none; }
      }
    `}
  />
)

const Section = ({ children, delay = 0 }) => (
  <Box className="section-reveal" style={{ animationDelay: `${delay}s` }} mb={6}>
    {children}
  </Box>
)

export default Section
