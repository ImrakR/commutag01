import React from 'react'

import { IndexUI } from 'lib/components/IndexUI'
import Layout from 'lib/components/Layout'

const PoolsIndexPage = (props) => {
  return (
    <Layout>
      <IndexUI {...props} />
    </Layout>
  )
}

export default PoolsIndexPage
