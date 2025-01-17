import NextLink from 'next/link'

import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'
import Image from 'next/image'


const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m an IT consultant / app developer based in Jakarta!
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Abdullah Ayyub Adompo
          </Heading>
          <p>Digital Craftsman ( Coder / Developer ).</p>
          <p>This project only for experiment on Next.js and Vercel</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/ayyub.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Mukadimah
        </Heading>
        <Paragraph>
        Akuoi (ki ama'ku) mosia na'a intau Bolaang Mongondow in lipu intau Jakarta. aidon 12 taong konaa nogaid. aka oyuon intau mongondow kona'a, yo ini' pa Akuoi bo poyodunguan kon Yondog{' '}
          
        </Paragraph>


            



      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          born, and education
        </Heading>
        <BioSection>
          <BioYear>1987</BioYear>
          Born in Kotamobagu, Bolaang Mongondow.
        </BioSection>
        <BioSection>
          <BioYear>2012</BioYear>
          Graduated from Institut Teknologi Bandung.
        </BioSection>
        <BioSection>
          <BioYear>2017-now</BioYear>
          Starting TerminalKoding 
        </BioSection>
       
       
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Me?
        </Heading>
        <Paragraph>
              A Man from Motoboi Besar, Bolaang Mongondow, Kotamobagu, Sulawesi Utara. Indonesia
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the Internet
        </Heading>
        <List>
         
         
      
          <ListItem>
            <Link href="https://instagram.com/ar_motoboi" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
               // leftIcon={<IoLogoInstagram />}
              >
               crafted by:  @ar_motoboi
              </Button>
            </Link>
            
          </ListItem>
        </List>

     
        <Box align="center" my={4}>
          <NextLink href="https://terminalkoding.com" target="_blank" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Terminalkoding
            </Button>
          </NextLink>
        </Box>

        <Box align="center" my={4}>
          <NextLink href="https://www.youtube.com/channel/UCnc_esCg9PryGYM_Bgi0Wlg/playlists" target="_blank" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Youtube
            </Button>
          </NextLink>
        </Box>
       
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
