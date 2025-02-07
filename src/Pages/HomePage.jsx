import React from 'react'
import Layout from '../components/Layout'
import ComingSoon from '../components/ComingSoon'
import Voting from '../components/Voting'
import Cards from '../components/Cards'
import Header from '../components/Header'
import Popup from '../components/Popup'

function HomePage() {
  return (
    <Layout>
      <Popup />
      <Header />
      <Voting />
      <Cards />
      <ComingSoon />
    </Layout>
  )
}

export default HomePage
