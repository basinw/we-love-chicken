import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
    height: 20vh;
    background: #FFE3E5;
    padding: 10px 0;
`
const ResponsiveH = styled.img`
    margin-top: 10px;
    height: 90px;
`

const kailogo = `https://s.w.org/images/core/emoji/2.3/svg/1f413.svg`

const Header = (props) => (
    <HeaderContainer>
        <div className='container' >
            <div className="row">
                <div className="col-7">
                    <ResponsiveH src={kailogo} alt=""/>
                </div>
                <div className="col-5 text-right">
                    <h3>เบอร์โทรร้าน: 086-757-8725</h3>
                    โต๊ะเบอร์ xx
                    
                </div>
            </div>
        </div>
    </HeaderContainer>
)

export default Header