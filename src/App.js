import React, { Component } from 'react';
import { withRouter , Route, Switch } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

// import Index from './container/user'
// import Orderlist from './container/user/orderlist'
// import CheckBill from './container/user/checkbill'

import UserGroup from './container/user/userpage'

// import static css
import './static/css/bootstrap.min.css'
import './static/css/font-awesome.min.css'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    // hide scrollbar
    ::-webkit-scrollbar {
        display: none;
    }
  }
  body {
  
}
  .no-pad-r {
    padding-right: 0;
  }
  .no-pad-a {
    padding: 0;
  }
  .fa-plus, .fa-minus{
    font-size: 12px;
  }
  .col-4 {
    padding: 0 9px;
  }
`

class App extends Component {

  render = () => (
    <div>
      <Switch>
        {/* <Route path='' component={() => (<div>test</div>)} /> */}
        <Route path='/' component={UserGroup} />
        <Route exact path='/' component={UserGroup} />
        {/* <Route path='/orderlist' component={Orderlist} />
        <Route path='/checkbill' component={CheckBill} /> */}
      </Switch>
    </div>
  )
}

export default withRouter(App)
