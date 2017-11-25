import React from 'react'

import { Link } from 'react-router-dom'

class Nav extends React.Component {
  state = {
    dropdown: false,
    nav: false,
    name: '',
    position: ''
  }

  logout = () => {
    localStorage.removeItem('_token')
    this.props.history.push('/login')
  }

  componentWillMount = () => {
    let data = JSON.parse(localStorage.getItem('staff'))
    // console.log(data)
    this.setState({
      name: data.name,
      position: data.position
    })
  }

  render = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top navbar-dark bg-dark">
      <span
        className="navbar-brand"
        onClick={() => this.props.history.push('/')}
      >
        CHICKEN
      </span>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => this.setState({ nav: !this.state.nav })}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className={`collapse navbar-collapse ${this.state.nav && 'show'}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${this.props.location.pathname === '/manage' &&
              'active'}`}
          >
            <Link to="/manage" className="nav-link">
              Order
            </Link>
          </li>
          {/* {this.state.position === 'Manager' && (
            <li
              className={`nav-item ${this.props.location.pathname ===
                '/manage/menu' && 'active'}`}
            >
              <Link to="/manage/menu" className="nav-link">
                Menu
              </Link>
            </li>
          )} */}
          {this.state.position === 'Manager' && (
            <li
              className={`nav-item ${this.props.location.pathname ===
                '/manage/staff' && 'active'}`}
            >
              <Link to="/manage/staff" className="nav-link">
                Staff
              </Link>
            </li>
          )}
          {this.state.position === 'Manager' && (
            <li
              className={`nav-item ${this.props.location.pathname ===
                '/manage/income' && 'active'}`}
            >
              <Link to="/manage/income" className="nav-link">
                Income
              </Link>
            </li>
          )}
        </ul>
        <div className="my-2 my-lg-0">
          <span className="h4 text-white">welcome, {this.state.name} </span>
          <button
            className="btn btn-warning"
            style={{ cursor: 'pointer' }}
            onClick={this.logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
