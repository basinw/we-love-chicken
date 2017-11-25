import React from 'react'

import withAuth from '../../../libs/withAuth'

import styled from 'styled-components'
import Nav from './navbar'
import instance from '../../../libs/axios'

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
  /* height: 100vh; */
  padding-top: 70px;
  min-height: 100vh;
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

const Table = styled.div`
    margin-top: 20px;
    height: 100px;
    background: white;
`
class Manage extends React.Component {
  state = {
    name: '',
    branchs: [],
    tables: [],
    selectedBranch: '',
    selectedTable: '',
    orders: [],
    tableId: 0
  }

  componentWillMount = async () => {
    let branchs = await instance.get('/branch').then(res => res.data.data)
    console.log(this.state.branchs)
    
    let tables = await instance.get(`/table/branch/${1}`).then(res => res.data.data)
    if(tables.length !== 0) {
        // console.log(tables)
        let rs = await instance.get(`/table/${tables[0].tableId}/order`).then(res => res.data.data)
        console.log(rs)
        this.setState({orders: rs})
        this.setState({tableId: 1})

    }
    this.setState({branchs,tables})
    console.log(tables)
    this.setState({
        selectedTable: tables[0].tableNumber,
        selectedBranch:branchs[0].branchName
    })
    // console.log(tables[0].tableNumber)
    // let data = await instance.get(`/table/1/order`).then(res => res.data.data)
    // this.setState({ branchs: data })
  }

  onChangeBranch = async (e) => {
    let branchId = e.target.value
    console.log(branchId)
    console.log(this.state.branchs)
    let data = this.state.branchs.find(t => t.branchId == branchId)
    // console.log(data)
    this.setState({selectedBranch: data.branchName})
    let tables = await instance.get(`/table/branch/${branchId}`).then(res => res.data.data)
    if(tables.length === 0) {
        this.setState({orders: []})
    }else {
        // console.log(tables)
        let rs = await instance.get(`/table/${tables[0].tableId}/order`).then(res => res.data.data)
        console.log(rs)
        this.setState({orders: rs})
        if(rs.length !== 0) {
            this.setState({selectedTable: rs[0].tableNumber})
            this.setState({tableId: rs[0].tableId})
        }

    }
    if(tables.length === 0){
        tables = [{tableNumber: '-'}]
        this.setState({selectedTable: '-'})
    }
    this.setState({tables})
    
  } 

  onChangeTable = async (e) => {
      let data = e.target.value
      console.log(data)
    //   console.log(data)
    if(data === undefined || data === null || data === '-'){
        this.setState({selectedTable: '-'})
    }else {
        this.setState({tableId: data})
        let rs = await instance.get(`/table/${data}/order`).then(res => res.data.data)
        this.setState({tableId: data})
        if(rs.length !== 0){
            this.setState({selectedTable: rs[0].tableNumber})
            
        }
        // console.log(rs)
        this.setState({orders: rs})
        // this
        
    }
  }

  prepared = async (id) => {
      
      let data = await instance.get(`/order/${id}`).then(res => res.data.data)
      data = data[0]
      console.log(data)

      let prepare = {
          billId: data.billId,
          tableId: data.tableId,
          menupriceId: data.menuPriceId ,
          orderStatus:  'prepared',
          price: data.price,
          quantity: data.quantity
        }
    let re = await instance.put(`/order/${id}`, prepare).then(res => res.data.data)
    //   data.orderId,
    console.log(re)
    this.loadData()
  }

  served = async (id) => {
    let data = await instance.get(`/order/${id}`).then(res => res.data.data)
    console.log(data)
    data = data[0]
    let prepare = {
        billId: data.billId,
        tableId: data.tableId,
        menupriceId: data.menuPriceId ,
        orderStatus:  'served',
        price: data.price,
        quantity: data.quantity
      }
      console.log(prepare)
    let re=await instance.put(`/order/${id}`, prepare).then(res => res.data.data)
    console.log(re)
    this.loadData()

    
  }

  deleteOrder = async (id) => {
    console.log(id)
    let re= await instance.delete(`/order/${id}`).then(res => res.data.data)
    // data = data[0]
    console.log(re)
    this.loadData()
  }

  loadData = async () => {
    
    let rs = await instance.get(`/table/${this.state.tableId}/order`).then(res => res.data.data)
    
    this.setState({orders: rs})
  }

  render = () => (
    <div>
      <Nav {...this.props} />
      <Background>
        <div className="container">
          <div className="row justify-content-center">
              <div className="col-md-1 col-6">
              
              branch:
              </div>
            <div className="col-md-2 col-6">
              <select className="form-control form-control-sm" onChange={e => this.onChangeBranch(e)}>
                {
                    this.state.branchs.map((e, i) => (
                    <option key={i} value={e.branchId}>
                        {e.branchName}
                    </option>
                    ))
                }
              </select>
            </div>
            <div className="col-md-1 col-6">
            table no:</div>
            <div className="col-md-1 col-6">
              <select className="form-control form-control-sm" onChange={e=>this.onChangeTable(e)}>
                {this.state.tables.map((e, i) => (
                  <option key={i} value={e.tableId} id={e.tableNumber}>
                    {e.tableNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <span className='h4'>{this.state.selectedBranch}</span> table no. {this.state.selectedTable}
          <div className='row' style={{marginTop: '20px'}}>
              <div className="col-12 bg-white rounded">
              {
                  this.state.orders.length === 0 ? (
                      <div className='text-center' >
                          no data!
                    </div>
                  ) : (
              <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Menu</th>
      <th scope="col">Quantity</th>
      <th scope="col">Status</th>
      <th scope="col">Bill</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        this.state.orders.map((v, i) => (
            <tr key={i}>
                <th className='row'>{v.orderId}</th>
                <td>{v.menuName} ({v.sizeName})</td>
                <td>{v.quantity}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className={`btn ${v.orderStatus === 'prepared' ? 'btn-success':'btn-secondary'}`} onClick={() => this.prepared(v.orderId)}>prepared</button>
                        <button className={`btn ${v.orderStatus === 'served' ? 'btn-success':'btn-secondary'}`} onClick={() => this.served(v.orderId)}>served</button>
                    </div>
                </td>
                <td>{v.billId}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => this.deleteOrder(v.orderId)}>delete</button>
                </td>
            </tr>
        ))
    }
  </tbody>
</table>

                  )
              }
              </div>
          </div>
        </div>
      </Background>
    </div>
  )
}

export default withAuth()(Manage)
