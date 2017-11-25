import React from 'react'
import styled from 'styled-components'

import Nav from './navbar'
import instance from '../../../libs/axios'
import withAuth from '../../../libs/withAuth'

const Background = styled.div`
  background: #e9ebee;
  height: 100vh;
  padding-top: 70px;
  & > .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
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
    staffs: [],
    modalshow: false,
    editName: '',
    editposition: '',
    editbranch: ''
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
  onChangeBranch = async e => {
    let value = e.target.value
    let staffData = await instance
      .get(`/branch/${value}/staff`)
      .then(res => res.data)
    staffData = staffData.data
    this.setState({
      staffs: staffData,
      selectedBranch: value
    })
  }

  onEditStaff = async e => {
    let data = await instance.get(`/staff/${e}`).then(res => res.data)
    data = data.data[0]
    console.log(data)
    this.setState({
      editName: `${data.fname} ${data.lname}`,
      editposition: data.posName,
      editbranch: data.branchId,
      modalshow: true
    })
    console.log(this.state)
  }

  onDeleteStaff = async e => {}

  onAddStaff = () => {
    this.setState({
      modalshow: true,
      editName: '',
      editposition: '',
      editbranch: ''
    })
  }

  onSubmitEdit = e => {
    e.preventDefault()
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
                  <Select
                    className="form-control form-control-sm col-8 d-inline-block"
                    onChange={e => this.onChangeBranch(e)}
                  >
                    {this.state.branchs.map((v, i) => (
                      <option key={i} value={v.branchId}>
                        {v.branchName}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-12 col-md-4">
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-success btn-block btn-sm"
                    onClick={this.onAddStaff}
                  >
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
                          <button
                            className="col-5 btn-sm btn btn-warning"
                            onClick={() => this.onEditStaff(v.staffId)}
                          >
                            <i className="fa fa-pencil-square-o" /> edit
                          </button>
                          <button
                            className="col-5 btn-sm btn btn-danger"
                            onClick={() => this.onDeleteStaff(v.staffData)}
                          >
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

        <div className={`modal fade ${this.state.modalshow && 'show d-block'}`}>
          <div className="modal-dialog " role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Staff management
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => this.setState({ modalshow: false })}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={e => this.onSubmitEdit(e)}>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      first name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.editName}
                      onChange={e =>
                        this.setState({ editbName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.editName}
                      onChange={e =>
                        this.setState({ editbName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="recipient-name" className="col-form-label">
                      StaffName
                    </label>
                    <select className="form-control">
                      {this.state.branchs.map((v, i) => (
                        <option
                          key={i}
                          value={v.branchId}
                          defaultValue={this.state.editbranch}
                        >
                          {v.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => this.setState({ modalshow: false })}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  )
}

export default withAuth()(StaffManage)
