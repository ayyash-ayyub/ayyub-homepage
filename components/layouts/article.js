import Head from 'next/head'

const Layout = ({ children, title }) => {
  const t = `${title} - Abdul Rizal Adompo`
  return (
    <article style={{ position: 'relative' }}>
      {title && (
        <Head>
          <title key="title">{t}</title>
        </Head>
      )}
      {children}
    </article>
  )
}

export default Layout
