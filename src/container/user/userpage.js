import React from 'react'

import {Switch, Route } from 'react-router-dom'
import instance from '../../libs/axios'

import Index from './index'
import OrderList from './orderlist'
import CheckBill from './checkbill'

import HeaderComponent from '../../components/Header'

class UserPage extends React.Component {
    state = {
        show: false,
        // header
        tableNo: '',
        branch: {},
    }
  
    componentWillMount = async () => {
        let tableid = JSON.parse(localStorage.getItem('table'))
        // eslint-disable-next-line
        if(tableid == undefined){
            tableid = 1
        }else {
            tableid = tableid.id
        }
            let tableData = await instance.get(`/table/${tableid}`)
                .then(resp => resp.data)
            if(tableData.status){
                tableData = tableData.data[0]
                let branchData = await instance.get(`/branch/${tableData.branchId}`)
                .then(resp => resp.data)
                branchData = branchData.data[0]
                // console.log(branchData)
                
                this.setState({
                    tableNo: tableData.tableNumber,
                    branch: branchData
                })
            }
        // console.log(this.props)
        let url = this.props.location.pathname
        // console.log(url)
        let rs = ['/', '/orderlist', '/check-bill'].findIndex(e => e === url)
        // console.log(rs)
        if(rs > -1){
            this.setState({show: true})
        }
    }
    render = () => (
        <div>
            {
                this.state.show ? (
                    <HeaderComponent branch={this.state.branch} table={this.state.tableNo} {...this.props}/>
                ):(
                    <span></span>
                )
            }
            <Switch>
                <Route exact path={`/`} component={Index} />
                <Route exact path={`/orderlist`} component={OrderList} />
                <Route exact path={`/check-bill`} component={CheckBill} />
            </Switch>
        </div>
    )        
}

export default UserPage