import React from "react"
import styled from "styled-components"
import instance from "../libs/axios"
import { Link } from "react-router-dom"

const HeaderBar = styled.div`
  height: 7vh;
  background: #fff;
  padding: 20px auto;
  padding-top: 12px;
  position: relative;
  display: flex;
  & > div {
    font-weight: bold;
    bottom: 0;
    border-bottom: 1px solid black;
  }
  & div {
    border-right: 1px solid #000;
  }
`

const Body = styled.div`
  height: 73vh;
  background: #c9ffd6;
  color: #fff;
`

const TR = styled.div`
  border-bottom: 1px solid #aaa;
  color: #000;
  & div {
    text-align: center;
    border-right: 0.5px solid #ddd;
  }
`

const Tbody = styled.div`
  height: 57vh;
  background: #fff;
  overflow-y: scroll;
  user-select: none;
  ::-webkit-scrollbar {
    width: 0.5em;
    height: 2em;
  }
  /* ::-webkit-scrollbar-button {
        background: #ccc
    } */
  ::-webkit-scrollbar-track-piece {
    background: yellow;
  }
  ::-webkit-scrollbar-thumb {
    background: green;
  }
`

const GroupBtn = styled.div`
  margin-top: 1.5em;
`

// order status
const Status = styled.div`
  color: ${props => (props.status === "prepared" ? "green" : "#da8400")};
  /* //  */
`
class UserOrderlist extends React.Component {
  state = {
    orders: []
  }
  componentWillMount = async () => {
    let billid = JSON.parse(localStorage.getItem("bill")).id
    let orders = await instance
      .get(`/order/bill/${billid}`)
      .then(resp => resp.data)
    if (orders.status) {
      orders = orders.data
      this.setState({ orders })
    }
    // let billId = bill.
  }

  t = () => {
    // let now = new Date()
    // let da = await fetch('http://localhost:3001/api/v1/tester')
    //     .then(resp => resp.json())
    //     .then(data => data.data[0]['current_timestamp()'])
    // console.log(`now : ${now}`)
    // let t = new Date(da)
    // console.log(`ttt : ${t}`)
    // console.log('' + t.toTimeString().substring(0, 8))
    // let conf = new Date(da)
    // conf.setHours(conf.getHours() + 7)
    // console.log(`conf: ${conf}`)
    // this.setState({now: '' +conf})
  }

  onSubmit = () => {}
  onChange = e => {
    // e
    console.log(e)
  }

  render = () => (
    <div>
      <HeaderBar>
        <div className="container">
          <div className="row text-center">
            <div className="col-1">#</div>
            <div className="col-2">status</div>
            <div className="col-7">menu</div>
            <div className="col-1">quantity</div>
            <div className="col-1">price</div>
          </div>
        </div>
      </HeaderBar>
      <Body>
        <Tbody className="container">
          {this.state.orders.map((v, i) => (
            <TR className="row" key={i}>
              <div className="col-1">
                <b>{i + 1}</b>
              </div>
              <Status className="col-2" status={v.orderStatus}>
                <i
                  className={`fa fa-${
                    v.orderStatus === "prepared" ? "bars" : "check-circle"
                  }`}
                />{" "}
                &nbsp;
                {v.orderStatus}
              </Status>
              <div className="col-7 text-left">
                {v.menuName} ({v.sizeName})
              </div>
              <div className="col-1">{v.quantity}</div>
              <div className="col-1 text-right">
                {v.priceOrder.toLocaleString()}
              </div>
            </TR>
          ))}
        </Tbody>
        <GroupBtn className="container">
          <div className="row justify-content-center">
            <div className="col-2">
              <Link to="/" className="btn-block btn btn-warning">
                HOME
              </Link>
            </div>
            <div className="col-2">
              <Link to="/check-bill" className="btn-block btn btn-danger">
                BILL
              </Link>
            </div>
          </div>
        </GroupBtn>
      </Body>
    </div>
  )
}

export default UserOrderlist
