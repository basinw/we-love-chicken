import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Body = styled.div`
    height: 80vh;
    background: aqua;
`

class CheckBill extends React.Component {
    render = () => (
        <div>
            <Body >
                <div className='container' style={{paddingTop: '50px'}}>
                    <div className="row">
                        <div className="col-6 text-right">
                            branch
                        </div>
                        <div className="col-6">
                            KMUTT
                        </div>
                        <div className="col-6 text-right">
                            date / time
                        </div>
                        <div className="col-6 ">
                            {new Date().toLocaleString()}
                        </div>
                        <div className="col-6 text-right">
                            table No.
                        </div>
                        <div className="col-6">
                            1
                        </div>
                        <div className="col-6 text-right">
                            number of order
                        </div>
                        <div className="col-6">
                            (mock up)
                        </div>
                        <div className="col-6 text-right">
                            total
                        </div>
                        <div className="col-6">
                            (mockup)
                        </div>
                        <div className="col-6 text-right">
                            update data at
                        </div>
                        <div className="col-6">
                            {new Date().toLocaleString()}
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{marginTop: '100px'}}> 
                        <div className="col-3">
                            <Link to='/orderlist' className='btn btn-block btn-warning'>VIEW ORDER</Link>
                        </div>
                        <div className="col-3">
                            <Link to='/' className='btn-block btn btn-danger'>HOME</Link>
                        
                        </div>
                    </div>
                </div>
                
            </Body>
        </div> 
    )
}

export default CheckBill