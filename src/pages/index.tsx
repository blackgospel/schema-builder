import { JsonBuilder } from 'components/json-builder'
import type { NextPage } from 'next'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
      <div style={{ marginBottom: '32px' }}>
        <JsonBuilder />
      </div>
    </>
  )
}

export default Home
