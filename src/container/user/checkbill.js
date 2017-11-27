import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import instance from '../../libs/axios'

const Body = styled.div`
  height: 80vh;
  background: aqua;
`

const Banner = styled.div`
  text-align: center;
  background: #fff;
  width: 50%;
  margin: auto;
  font-weight: bold;
  height: 50px;
  padding-top: 10px;
`

const Row = styled.div`
  width: 50%;
  margin: auto !important;
  background: #ddd;
  padding: 20px;
  & > .bd {
    border-right: 1px solid #000;
  }
`
class CheckBill extends React.Component {
  state = {
    bill: {},
    time: '',
    now: '',
    tableNo: '',
    totalOrder: '',
    totalPrice: 0
  }

  componentWillMount = async () => {
    let billid = JSON.parse(localStorage.getItem('bill')).id
    let data = await instance
      .get(`/bill/${billid}/total`)
      .then(resp => resp.data)
    if (data.status) {
      let allMonth = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      data = data.data
      let bill = data.bill
      let t = new Date(bill.timeStamp)
      // t.setHours(t.getHours() + 7)
      // console.log(bill)
      let time = `${t.getDate()} ${
        allMonth[t.getMonth()]
      } ${t.getFullYear()}, ${this.twoDigit(t.getHours())}:${this.twoDigit(
        t.getMinutes()
      )}:${this.twoDigit(t.getSeconds())}`
      t = new Date()
      let now = `${t.getDate()} ${
        allMonth[t.getMonth()]
      } ${t.getFullYear()}, ${this.twoDigit(t.getHours())}:${this.twoDigit(
        t.getMinutes()
      )}:${this.twoDigit(t.getSeconds())}`
      this.setState({
        bill: data.bill,
        totalOrder: bill.totalQuantity,
        time,
        now,
        totalPrice: bill.totalPrice.toLocaleString()
      })
    }

    let tableid = JSON.parse(localStorage.getItem('table'))
    // eslint-disable-next-line
    if (tableid != undefined) {
      tableid = tableid.id
      // console.log(tableid)
      this.setState({ tableNo: tableid })
    } else {
      localStorage.setItem('table', JSON.stringify({ id: 1 }))
    }
  }

  twoDigit = number => {
    return `0${number}`.slice(-2)
  }

  render = () => (
    <div>
      <Body>
        <div className="container" style={{ paddingTop: '50px' }}>
          <Banner>Please contact staff for check the bill</Banner>
          <Row className="row">
            <div className="col-6 bd text-right">branch</div>
            <div className="col-6">KMUTT</div>
            <div className="col-6 bd text-right">date / time</div>
            <div className="col-6 ">{this.state.time}</div>
            <div className="col-6 bd text-right">table No.</div>
            <div className="col-6">{this.state.tableNo}</div>
            <div className="col-6 bd text-right">number of order</div>
            <div className="col-6">{this.state.totalOrder}</div>
            <div className="col-6 bd text-right" style={{ marginTop: '40px' }}>
              total price:
            </div>
            <div className="col-6" style={{ marginTop: '40px' }}>
              {this.state.totalPrice}.-
            </div>
            <div className="col-6 bd text-right">update data at</div>
            <div className="col-6">{this.state.now}</div>
          </Row>
          <div
            className="row justify-content-center"
            style={{ marginTop: '30px' }}
          >
            <div className="col-3">
              <Link to="/orderlist" className="btn btn-block btn-warning">
                VIEW ORDER
              </Link>
            </div>
            <div className="col-3">
              <Link to="/" className="btn-block btn btn-danger">
                HOME
              </Link>
            </div>
          </div>
        </div>
      </Body>
    </div>
  )
}

export default CheckBill
