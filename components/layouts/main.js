import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import AnimatedLogo, { AnimatedLogoStyle } from '../animated-logo'
import { SectionStyle } from '../section'
import { ThemeToggleStyle } from '../theme-toggle-button'

const SITE_URL = 'https://adompo.web.id'

const Main = ({ children, router }) => {
  const canonicalPath = router.asPath === '/' ? '/' : router.asPath.split('?')[0].split('#')[0]
  const canonicalUrl = `${SITE_URL}${canonicalPath}`

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Abdul Rizal Adompo adalah praktisi teknologi informasi, Data Scientist, AI dan Machine Learning Engineer, serta praktisi Backend and IT Architecture."
          key="description"
        />
        <meta
          name="keywords"
          content="Abdul Rizal Adompo, Abdul Rizal, Data Scientist, Machine Learning Engineer, AI Engineer, Artificial Intelligence, Backend Developer, IT Architecture, Python Developer, Universitas Terbuka"
        />
        <meta name="author" content="Abdul Rizal Adompo" />
        <meta name="robots" content="index, follow" />

        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />

        <meta name="google-site-verification" content="TTT_nnwKmUPtKpikhkkNUr_JJoqyo9u53Iz2S_X1iOw" />

        <title key="title">Abdul Rizal Adompo | Data Scientist, AI & Machine Learning Engineer</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <AnimatedLogoStyle />
        <SectionStyle />
        <ThemeToggleStyle />
        <AnimatedLogo />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
