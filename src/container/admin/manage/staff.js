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

class StaffManage extends React.Component {
  state = {
    branchs: [],
    selectedBranch: 1,
    staffs: [],
    modalshow: false,
    editName: '',
    editposition: '',
    editbranch: ''
  }
  componentWillMount = async () => {
    // console.log(this.props.location)
    let branchData = await instance.get(`/branch`).then(res => res.data.data)
    // console.log(branchData)
    this.setState({ branchs: branchData })

    let staffData = await instance.get(`/branch/1/staff`).then(res => res.data)
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
    // console.log(data)
    this.setState({
      editName: `${data.fname} ${data.lname}`,
      editposition: data.posName,
      editbranch: data.branchId,
      modalshow: true
    })
    // console.log(this.state)
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
            <div className="col-12 col-md-12 justify-content-center">
              <table
                className="table table-hover bg-white table-responsive mx-auto"
                style={{ marginTop: '20px', maxHeight: '70vh' }}
              >
                <thead className="text-center">
                  <tr>
                    <th scope="col">Staff id</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Bill Count</th>
                    <th scope="col">Position</th>
                    <th scope="col">action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.staffs.map((v, i) => (
                    <tr>
                      <th scope="row">{v.staffId}</th>
                      <td>{v.name}</td>
                      <td>{v.billCount}</td>
                      <td>{v.posName}</td>

                      {v.posName === 'Staff' ? (
                        <td>
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
                        </td>
                      ) : (
                        <td>
                          <span className="text-muted">ไม่อนุญาตแก้ไข</span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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
