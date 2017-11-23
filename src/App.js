import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import Index from './container/user'
import Orderlist from './container/user/orderlist'

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
    <Router>
      <Switch>
        <Route exact path='/' component={Index} />
        <Route path='/orderlist' component={Orderlist} />
      </Switch>
    </Router>
  )
}

export default App;
