import React from 'react'

const requireAuth = status => {
  if (status === 'WITHOUT') {
    // when load /login
    return Component =>
      class requireAuth extends React.Component {
        componentWillMount = () => {
          let token = localStorage.getItem('_token')

          if (token !== null) {
            this.props.history.push('/manage')
          }
        }

        render = () => <Component {...this.props} />
      }
  } else {
    return Component =>
      class requireAuth extends React.Component {
        componentWillMount = () => {
          let token = localStorage.getItem('_token')
          let path = this.props.location.pathname
          console.log(path)
          if (token === null || token === undefined) {
            this.props.history.push('/login')
          } else {
            let position = JSON.parse(localStorage.getItem('staff')).position
            if (
              position === 'Staff' &&
              (path === '/manage/menu' ||
                path === '/manage/staff' ||
                path === '/manage/income')
            ) {
              this.props.history.push('/manage')
            }
          }
        }

        render = () => <Component {...this.props} />
      }
  }
}

export default requireAuth
