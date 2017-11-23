import React from 'react'
import styled from 'styled-components'
import instance from '../libs/axios'

const HeaderBar = styled.div`
    height: 7vh;
    background: #fff;
    padding: 20px auto;
`

const Body = styled.div`
    height: 73vh;
    background: purple;
    color: #fff;
    
`
class UserOrderlist extends React.Component {
    state = {
        time: '',
        date: '',
        name: 'asdf',
        now: '1234'
    }
    componentWillMount = async () => {
        let billid = JSON.parse(localStorage.getItem('bill')).id
        let orders = await instance.get(`/order/bill/${billid}`)
            .then(resp => resp.data)
        if(orders.status){
            orders = orders.data
            console.log(orders)
        }
        // console.log(bill)
        // let billId = bill.

        
    }
    
    t = () => {
        // let now = new Date()
        // let da = await fetch('http://localhost:3001/api/v1/tester')
        //     .then(resp => resp.json())
        //     .then(data => data.data[0]['current_timestamp()'])
        // console.log(`now : ${now}`) 
        // let t = new Date(da)
        // console.log(`ttt : ${t}`)
        // console.log('' + t.toTimeString().substring(0, 8))
        
        // let conf = new Date(da)
        // conf.setHours(conf.getHours() + 7)
        // console.log(`conf: ${conf}`)
        // this.setState({now: '' +conf})
        
    }

    onSubmit = () => {

    }
    onChange = (e) => {
        // e
        console.log(e)
    }

    render = () => (
        <div>
            <HeaderBar />
            <Body className='container-fluid'>
                {this.state.now}
                <form onSubmit={this.onSubmit}>
                    <input type="date" value={this.state.date} onChange={(e) => this.setState({date: e.target.value})} id={`date`}/>
                    <input type="time" value={this.state.time} onChange={(e) => this.setState({time: e.target.value})}/>
                    <button>submit</button>
                </form>
                user orderlist
            </Body>
        </div>
    )
}

export default UserOrderlist