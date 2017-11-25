import React from 'react'
import styled from 'styled-components'

import withAuth from '../../../libs/withAuth'
// eslint-disable-next-line
import instance from '../../../libs/axios'

import Nav from './navbar'

const Background = styled.div`
  padding-top: 55px;
  background: #e9ebee;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
class Income extends React.Component {
  render = () => (
    <div>
      <Nav {...this.props} />
      <Background>
        <h1>coming soon feature...</h1>
      </Background>
    </div>
  )
}

export default withAuth()(Income)
