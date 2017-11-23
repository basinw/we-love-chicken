import React from 'react'
import styled from 'styled-components'

import kailogo from '../static/img/chicken.png'
const HeaderContainer = styled.div`
    height: 20vh;
    background: #F8EECA;
    /* #1ba1e2; */
    /* #FFE3E5; */
    padding: 10px 0;
`
const ResponsiveH = styled.img`
    margin-top: 10px;
    height: 90px;
`

// const kailogo = `https://s.w.org/images/core/emoji/2.3/svg/1f413.svg`

const Header = (props) => (
    <HeaderContainer>
        <div className='container' >
            <div className="row">
                <div className="col-3">
                    <ResponsiveH src={kailogo} alt='logo'/>
                </div>
                <div className="col-6" style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}} >
                    {
                        (props.location.pathname === '/') ? (
                            <div>
                                S = small, M = Medium, L = large, R = Regular
                            </div>
                        ) : (
                            <div />
                        )
                    } 
                </div>
                <div className="col-3 text-right">
                    <h4>ร้าน {props.branch.branchName}</h4>
                    เบอร์โทรร้าน: {props.branch.telNo} <br />
                    เวลาทำการ: {props.branch.openTime.substring(0, 5)} - {props.branch.closeTime.substring(0, 5)} <br/>
                    โต๊ะเบอร์: {props.table} <br/>
                </div>
            </div>
        </div>
    </HeaderContainer>
)

export default Header