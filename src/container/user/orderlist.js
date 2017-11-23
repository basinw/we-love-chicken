import React from 'react'
import UserOrderlist from '../../components/user_orderlist'

// import instance from '../../libs/axios'
class Orderlist extends React.Component {
    state = {
        
    }

    componentWillMount = () => {
    }
    render = () => {
        return this.state.branch === {} ? (
            <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                Loading . . . 
            </div>
        ) : (
            <UserOrderlist />
        )
    }
}

export default Orderlist