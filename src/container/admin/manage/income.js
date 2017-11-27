import React from 'react'
import styled from 'styled-components'

import withAuth from '../../../libs/withAuth'
import instance from '../../../libs/axios'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from 'react-dates'

import swal from 'sweetalert2'

import Nav from './navbar'

const Background = styled.div`
  padding-top: 55px;
  background: #e9ebee;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

const allMonth = [
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
class Income extends React.Component {
  state = {
    branchs: [],
    from: '',
    to: '',
    selectedBranch: 1,
    result: ''
  }

  componentWillMount = async () => {
    let { data } = await instance.get('/branch')
    data = data.data
    let dump = { branchId: 0, branchName: '-' }
    // console.log(data)

    // console.log(data)
    this.setState({ branchs: data })
  }

  onSubmit = async e => {
    e.preventDefault()
    let { selectedBranch, from, to } = this.state
    // console.log(selectedBranch)
    // console.log(from)
    // console.log(to)
    let { data } = await instance.post(`/branch/${selectedBranch}/income`, {
      from,
      to
    })
    data = data.data
    // console.log(data.data)
    if (data.branchName === undefined) {
      data.branchName = ''
      data.totalIncome = 0
    }
    let temp1 = data.from.split('-')
    let temp2 = data.to.split('-')
    data.from = `${temp1[2]} ${allMonth[+temp1[1] - 1]} ${temp1[0]}`
    data.to = `${temp2[2]} ${allMonth[+temp2[1] - 1]} ${temp1[0]}`
    // console.log(data)
    this.setState({ result: data })
  }

  selectedBranch = e => {
    // console.log(e)
  }
  onChanageBranch = e => {}
  render = () => (
    <div>
      <Nav {...this.props} />
      <Background>
        <div className="container">
          <h2 className="mt-2 display-5 text-center">total income </h2>
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col-6 text-right pt-2">branch: </div>
                  <div className="col-6">
                    <select
                      className="form-control"
                      required
                      onChange={e =>
                        this.setState({ selectedBranch: e.target.value })
                      }
                    >
                      {this.state.branchs.map((e, i) => (
                        <option value={e.branchId} key={i}>
                          {e.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mb-2">
                <div className="row d-md-flex justify-content-end">
                  <div className="col-2 col-md-7 pt-2 text-right">From:</div>
                  <div className="col-10 col-md-5">
                    <input
                      type="date"
                      className="form-control"
                      required
                      onChange={e => this.setState({ from: e.target.value })}
                    />
                  </div>
                  <div className="col-2 col-md-7 mt-2 pt-2 text-right">To:</div>
                  <div className="col-10 col-md-5 mt-2">
                    <input
                      type="date"
                      className="form-control"
                      required
                      onChange={e => this.setState({ to: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row justify-content-end mt-2">
                  <div className="col-4">
                    <button className="btn btn-block btn-success">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="row  justify-content-center">
            {this.state.result !== '' && (
              <div className="col-12 bg-white col-md-8">
                <div className="row">
                  <div className="col-4">
                    {'branch: '}
                    <b>{this.state.result.branchName}</b>
                  </div>
                  <div className="col-4">
                    <b>from:</b> {this.state.result.from}
                    <br />
                    <b>to:</b> {this.state.result.to}
                  </div>
                  <div className="col-4">
                    <b>total income: </b>
                    {this.state.result.totalIncome}.-
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Background>
    </div>
  )
}

export default withAuth()(Income)
