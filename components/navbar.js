import { useState } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'
import JavaChallenge from './java-challenge'
import { challenges } from './java-challenges'

const NAV_LINKS = [
  { id: 'works', label: 'Works', href: 'https://terminalkoding.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/adompo/' },
  {
    id: 'resume',
    label: '2022 Resume',
    href: 'https://drive.google.com/file/d/1XHwKWX83pFmFKFuDpTwRMH-FYJNFxr-Z/view?usp=sharing'
  },
  { id: 'repo', label: 'My Repo', href: 'https://github.com/ayyash-ayyub', icon: IoLogoGithub }
]

const GatedLinkItem = ({ link, solved, onLocked, ...props }) => {
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  const Icon = link.icon
  return (
    <Link
      href={solved ? link.href : '#'}
      target={solved ? '_blank' : undefined}
      rel={solved ? 'noopener noreferrer' : undefined}
      p={2}
      color={inactiveColor}
      display={Icon ? 'inline-flex' : undefined}
      alignItems={Icon ? 'center' : undefined}
      style={Icon ? { gap: 4 } : undefined}
      onClick={e => {
        if (!solved) {
          e.preventDefault()
          onLocked(link)
        }
      }}
      {...props}
    >
      {Icon && <Icon />}
      {link.label}
    </Link>
  )
}

const Navbar = props => {
  const { path } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [solved, setSolved] = useState({})
  const [activeLink, setActiveLink] = useState(null)

  const handleLocked = link => {
    setActiveLink(link)
    onOpen()
  }

  const handleSolved = () => {
    setSolved(prev => ({ ...prev, [activeLink.id]: true }))
    if (typeof window !== 'undefined') {
      window.open(activeLink.href, '_blank')
    }
    onClose()
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          {NAV_LINKS.map(link => (
            <GatedLinkItem
              key={link.id}
              link={link}
              solved={!!solved[link.id]}
              onLocked={handleLocked}
            />
          ))}
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>About</MenuItem>
                </NextLink>
                {NAV_LINKS.map(link => (
                  <MenuItem
                    key={link.id}
                    as={Link}
                    href={solved[link.id] ? link.href : '#'}
                    target={solved[link.id] ? '_blank' : undefined}
                    rel={solved[link.id] ? 'noopener noreferrer' : undefined}
                    onClick={e => {
                      if (!solved[link.id]) {
                        e.preventDefault()
                        handleLocked(link)
                      }
                    }}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>{activeLink?.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {activeLink && (
              <JavaChallenge
                key={activeLink.id}
                challenge={challenges[activeLink.id]}
                onSolved={handleSolved}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Navbar
