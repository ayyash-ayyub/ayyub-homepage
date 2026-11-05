import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'

const LazyVoxelDog = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const SITE_URL = 'https://adompo.web.id'

const Main = ({ children, router }) => {
  const canonicalPath = router.asPath === '/' ? '/' : router.asPath.split('?')[0].split('#')[0]
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const cardImage = `${SITE_URL}/card.png`

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

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Abdul Rizal Adompo" key="twitter:title" />
        <meta
          name="twitter:description"
          content="Professional Profile, AI, Data Science and Technology"
          key="twitter:description"
        />
        <meta name="twitter:image" content={cardImage} key="twitter:image" />

        <meta name="google-site-verification" content="HgHkAMDBOJxld7Zb3hBYFF1esGk5hZWUtOQNIy6SuoY" />

        <meta property="og:site_name" content="Abdul Rizal Adompo" />
        <meta property="og:title" content="Abdul Rizal Adompo - Personal Portfolio" key="og:title" />
        <meta
          property="og:description"
          content="Professional Profile, AI, Data Science and Technology"
          key="og:description"
        />
        <meta property="og:type" content="profile" key="og:type" />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
        <meta property="og:image" content={cardImage} key="og:image" />
        <title key="title">Abdul Rizal Adompo | Data Scientist, AI & Machine Learning Engineer</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelDog />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
