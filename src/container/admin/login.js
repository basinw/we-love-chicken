import React from 'react'
import styled from 'styled-components'

import instance from '../../libs/axios'
import requireAuth from '../../libs/withAuth'

const LeftSide = styled.div`
  background-image: url('http://animalsbirds.com/wp-content/uploads/2016/07/chicken-nature-free-hd-wallpapers.jpg');
  height: 100vh;
  background-size: cover;
  padding: 10px;
  font-size: 2em;
  color: #fff;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  background-color: gray; //#007be8;
  background-position: center;
`

const RightSide = styled.div`
  /* background: purple; */
  height: 100vh;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
`

const Body = styled.div`
  & > .nopad {
    padding: 0 !important;
  }
`

const Filter = styled.div`
  height: 100vh;
  position: absolute !important;
  display: flex;
  align-items: flex-end;
  background: rgba(70, 161, 255, 0.4);
  font-size: 2em;
  color: #fff;
  font-weight: bold;
`

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    valid: true
  }

  componentWillMount = () => {}

  changeState = (args, value) => {
    value = value.target.value
    // eslint-disable-next-line
    this.state[args] = value
    this.setState({ valid: true })
  }

  onSubmit = async e => {
    e.preventDefault()
    let authen = await instance
      .post(`/staff/auth`, {
        username: this.state.username,
        pass: this.state.password
      })
      .then(resp => resp.data)
    authen = authen.data
    // console.log(authen)
    if (authen.length !== 0) {
      localStorage.setItem(
        'staff',
        JSON.stringify({
          name: authen[0].fname,
          position: authen[0].posName
        })
      )
      localStorage.setItem('_token', 1)
      this.props.history.push('/manage')
    } else {
      this.setState({
        valid: false,
        username: '',
        password: ''
      })
    }
  }

  render = () => (
    <div className="container-fluid">
      <Body className="row">
        <div className="col-7 nopad d-none d-sm-none d-md-block">
          <LeftSide />
        </div>
        <Filter className="col-md-7 d-none d-sm-none d-md-flex">
          WE LOVE CHICKEN
        </Filter>
        <div className="col-12 col-md-5 nopad" style={{ zIndex: 3 }}>
          <RightSide>
            <form onSubmit={e => this.onSubmit(e)}>
              <p className="display-4 text-info">STAFF LOGIN</p>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.changeState('username', e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={e => this.changeState('password', e)}
                  required
                />
              </div>
              <div
                className={`alert alert-danger text-center ${this.state.valid &&
                  'd-none'}`}
              >
                invalid username or password
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                Submit
              </button>
            </form>
          </RightSide>
        </div>
      </Body>
    </div>
  )
}

export default requireAuth('WITHOUT')(Login)
