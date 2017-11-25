import React from 'react'

import withAuth from '../../../libs/withAuth'

import styled from 'styled-components'
import Nav from './navbar'

import ReactTable from 'react-table'
import 'react-table/react-table.css'

const Button = styled.button`
  /* width: 30px; */
  background: transparent;
  cursor: pointer;

  & + div {
    left: auto;
    right: 0;
  }
`

const Background = styled.div`
  background: #e9ebee;
  height: 100vh;
  padding-top: 70px;
`

const columns = [
  {
    Header: 'Name',
    accessor: 'name' // String-based value accessors!
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className="number">{props.value}</span> // Custom cell components!
  },
  {
    id: 'friendName', // Required because our accessor is not a string
    Header: 'Friend Name',
    accessor: d => d.friend.name // Custom value accessors!
  },
  {
    Header: '', //props => <span>Friend Age</span>, // Custom header components!
    // accessor: 'friend.age',
    id: 'btn',
    cell: ({ row }) => <button>{row}clickme</button>
  }
]
class Manage extends React.Component {
  state = {
    name: '',
    data: [
      {
        name: 'Tanner Linsley',
        age: 26,
        friend: {
          name: 'Jason Maurer',
          age: 23
        }
      }
    ]
  }

  componentWillMount = () => {}

  render = () => (
    <div>
      <Nav {...this.props} />
      <Background>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Staff data</h1>
              <ReactTable
                data={this.state.data}
                columns={columns}
                defaultPageSize={10}
              />
            </div>
          </div>
        </div>
      </Background>
    </div>
  )
}

export default withAuth()(Manage)
