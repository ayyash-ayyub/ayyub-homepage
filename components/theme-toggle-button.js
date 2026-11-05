import { Global } from '@emotion/react'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const ThemeToggleStyle = () => (
  <Global
    styles={`
      @keyframes theme-toggle-enter {
        from { opacity: 0; transform: translateY(-20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .theme-toggle-enter {
        animation: theme-toggle-enter 0.2s ease both;
      }
      @media (prefers-reduced-motion: reduce) {
        .theme-toggle-enter { animation: none; }
      }
    `}
  />
)

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const mode = useColorModeValue('light', 'dark')

  return (
    <span key={mode} className="theme-toggle-enter" style={{ display: 'inline-block' }}>
      <IconButton
        aria-label="Toggle theme"
        colorScheme={useColorModeValue('purple', 'orange')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}
      ></IconButton>
    </span>
  )
}

export default ThemeToggleButton
