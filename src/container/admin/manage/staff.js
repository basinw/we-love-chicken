import React from 'react'
import styled from 'styled-components'

import Nav from './navbar'
import instance from '../../../libs/axios'
import withAuth from '../../../libs/withAuth'

const Background = styled.div`
  background: #e9ebee;
  height: 100vh;
  padding-top: 70px;
`

const Select = styled.select`
  width: 200px;
`

const Table = styled.div`
  margin-top: 20px;
  background: #fff;
  height: 380px;
  padding: 0 15px;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0.5em;
    height: 2em;
  }
  /* ::-webkit-scrollbar-button {
        background: #ccc
    } */
  ::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #ddd;
  }
`

const Thead = styled.div`
  border: 1px solid #000;
`

const GroupAction = styled.div`
  & > button {
    margin: 0 5px;
    cursor: pointer;
  }
`

const Row = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #eee;
  }
`
const Body = styled.div`
  margin-top: 30px;
  height: 100%;
`

class StaffManage extends React.Component {
  state = {
    branchs: [],
    selectedBranch: 5,
    staffs: []
  }
  componentWillMount = async () => {
    console.log(this.props.location)
    let branchData = await instance.get(`/branch`).then(res => res.data.data)
    console.log(branchData)
    this.setState({ branchs: branchData })

    let staffData = await instance.get(`/branch/5/staff`).then(res => res.data)
    staffData = staffData.data
    this.setState({ staffs: staffData })
  }
  onChangeBranch = e => {
    console.log(e.target.value)
  }

  render = () => (
    <div>
      <Nav {...this.props} />
      <Background>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 text-right">
              <div className="row justify-content-end">
                <div
                  className="col-12 col-md-5 text-center"
                  style={{ marginTop: '25px' }}
                >
                  branch: &nbsp;
                  <Select onChange={e => this.onChangeBranch(e)}>
                    {this.state.branchs.map((v, i) => (
                      <option key={i} value={v.branchId}>
                        {v.branchName}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-12 col-md-4">
                  &nbsp;&nbsp;
                  <button className="btn btn-success btn-block btn-sm">
                    ADD STAFF
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-9">
              <Table>
                <div
                  className="row"
                  style={{
                    position: 'fixed',
                    width: '64%',
                    zIndex: 2,
                    background: '#fff',
                    textAlign: 'center'
                  }}
                >
                  <Thead className="col-1">index</Thead>
                  <Thead className="col-4">name</Thead>
                  <Thead className="col-2">billCount</Thead>
                  <Thead className="col-2">position</Thead>
                  <Thead className="col-3">action</Thead>
                </div>
                <Body>
                  {this.state.staffs.map((v, i) => (
                    <Row className="row text-center" key={i}>
                      <div className="col-1 ">{v.staffId}</div>
                      <div className="col-4 text-left">{v.name}</div>
                      <div className="col-2">{v.billCount}</div>
                      <div className="col-2">{v.posName}</div>

                      {v.posName === 'Staff' ? (
                        <GroupAction className="col-3">
                          <button className="col-5 btn-sm btn btn-warning">
                            <i className="fa fa-pencil-square-o" /> edit
                          </button>
                          <button className="col-5 btn-sm btn btn-danger">
                            <i className="fa fa-trash" /> delete
                          </button>
                        </GroupAction>
                      ) : (
                        <div className="col-3">
                          <span className="text-muted">ไม่อนุญาตแก้ไข</span>
                        </div>
                      )}
                    </Row>
                  ))}
                </Body>
              </Table>
            </div>
          </div>
        </div>
      </Background>
    </div>
  )
}

export default withAuth()(StaffManage)
