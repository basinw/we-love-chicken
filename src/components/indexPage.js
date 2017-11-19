import React from 'react'
import styled from 'styled-components'
import instance from '../libs/axios'

const IdexContainer = styled.div`
    height: 73vh;
    background: aqua;
`

const OrderList = styled.div`
    height: 73vh;
    width: 100%;
    display: inline-block;
    background: #f5f6f7;
    padding: 10px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
`

const OrderGroupBtn = styled.div`
    background: #f5f6f7;
    width: 100%;
    height: 20%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 20px;
`

const CardContainer = styled.div`
    min-height: 100%;
`

const FixedIMG = styled.img`
    height: 11em;
    object-fit: cover;
`

const CatStyle = styled.div`
    height: 7vh;
    background: #fff;
    padding: 20px auto;
`

const Category = styled.button`
    display: inline-block;
    background: transparent;
    padding: 5px 25px;
    border: 0;
    cursor: pointer;
    border-right: 1px solid #ddd;
    ${ props => props.selectedCat === props.cat && `
        color: red;
        font-weight: bold;
    ` }

    /* font-size: em; */
    &:hover {
        background: #555;
        border: 0;
        color: #fff;
        border-radius: 5px;
    }
`

const CategoryBar = (props) => (
    <CatStyle className='container-fluid'>
        <div style={{padding: '5px 0'}}>
            {
                props.cats.map((v, i) => (
                    <Category 
                        key={i}
                        onClick={ () => {props.onClickCat(v.cateName)} }
                        selectedCat={props.selCat}
                        cat={v.cateName}
                    >
                        {v.cateName}
                    </Category>
                ))
            }
        </div>
    </CatStyle>
)

const EmptyOrderList = props => (
    <div>
        ยังไม่มีรายการอาหารที่จะสั่ง
        <hr/>
        กรุณากด <br/>
        img <br/>
        รูปภาพอาหารเพื่อเริ่มต้น<br/>
        การสั่งอาหาร
        <hr/>
    </div>
)

const StyleFillOL = styled.div`
    width: 100%;
    height: 80%;
    background: #f5f6f7;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow-x: hidden;
    position: absolute;
    left: 0;
    right: -15px;
`

const StyleOrderQuan = styled.button`
    margin: 0 2px;
    background: transparent;
    color: red;
    cursor: pointer;
    font-weight: bold;
    border: 0;
    font-size: 1.5em;
    @media only screen and (max-width: 1025px){
        font-size: 1.25em;
        margin: 0;
    } 
`

const NoQuan = styled.span`
    display: inline-block;
    background: #444;
    width: 25px;
    color: #fff;
    text-align: center;

`

const FillOrderList = props => (
    <div style={{ position: 'relative', width: '100%', height: '100%'}}>
        <StyleFillOL>
            {
                [1,2,3,4,5,6, 1, 3, 4].map((v, i) => (
                    <div style={{ minHeight: '50px' }}>
                        <div className="row">
                            <div className="col-7 no-pad-r text-left" style={{paddingTop: '0px'}}>
                                menu menumenu ( s )
                            </div>
                            <div className="col-5 no-pad-a text-center">
                                <StyleOrderQuan
                                
                                ><i className='fa fa-minus' /></StyleOrderQuan>
                                <NoQuan>{v}</NoQuan>
                                <StyleOrderQuan
                                
                                ><i className='fa fa-plus' /></StyleOrderQuan>
                            </div>
                            
                        </div>
                        <hr/>
                    </div>
                ))
            }
        </StyleFillOL>
    </div>      
)

const PageLinkGroup = styled.a`
    & > a {
        /* display: inline-block; */
    }
    display: flex;
    justify-content: center;
    text-align:center;

`
class IndexComponent extends React.Component {
    state = {
        categorys: [],
        selectedCat: ''
    }

    componentWillMount = async () => {
        let data = await instance.get(`/category`)
            .then(resp => resp.data)
        if(data.status) {
            let cats = data.data
            this.setState({ 
                categorys: cats,
                selectedCat: cats[0].cateName
            })

        }
    }

    selectCat = (cat) => {
        this.setState({ selectedCat: cat })
    }

    render() {
        return(
            <div>
                <CategoryBar cats={this.state.categorys} selCat={this.state.selectedCat} onClickCat={this.selectCat} />
                <IdexContainer className='container-fluid'>
                    <div className="row justify-content-between">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: '10px'
                        }}>
                            <button style={{
                                display: 'inline-block',
                                borderRadius: '50%',
                                fontSize: '1.5em'
                            }}><i className='fa fa-arrow-left'/></button>
                        </div>
                        <div className="col-8 " style={{ paddingTop: '10px'}}>
                            <PageLinkGroup style={{marginBottom: '5px'}}>
                                <span className='page-item' style={{margin: '0 2px'}}>
                                    <button className=" btn btn-secondary">1<span className="sr-only">(current)</span></button>
                                </span>
                                <span className='page-item' style={{margin: '0 2px'}}>
                                    <button className=" btn btn-secondary">2<span className="sr-only">(current)</span></button>
                                </span>
                            </PageLinkGroup>
                            <div className="row">
                                <div className="col-4">
                                    <CardContainer className="card" 
                                    // style={{width: '100%'}}
                                    >
                                        <FixedIMG className="card-img-top" src="https://media1.s-nbcnews.com/j/newscms/2017_20/1215661/baked-chicken-today-170519-tease_15b214baba5431d761c7a46cf08e062c.today-inline-large.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h4 className="card-title">Menu title {this.state.selectedCat}</h4>
                                            <p className="card-text">Some quick example.</p>
                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            <hr/>
                                            <div className='size-block' style={{marginBottom: '10px'}}>
                                                size:
                                                <span className='float-right'>price</span>
                                            </div>
                                            <button className='btn btn-block btn-warning text-left'>
                                                S
                                                <span className='float-right'>100 $</span>
                                            </button>
                                            <button className='btn btn-block btn-warning text-left'>
                                                M
                                                <span className='float-right'>200 $</span>
                                            </button>
                                            <button className='btn btn-block btn-warning text-left'>
                                                L
                                                <span className='float-right'>300 $</span>
                                            </button>
                                        </div>
                                    </CardContainer>
                                </div>
                                <div className="col-4">
                                    <CardContainer className="card" 
                                    // style={{width: '100%'}}
                                    >
                                        <FixedIMG className="card-img-top" src="https://budgetbytes.com/wp-content/uploads/2016/07/Cook-Chicken-in-Skillet.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h4 className="card-title">Menu title</h4>
                                            <p className="card-text">Some quick example.</p>
                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            <hr/>
                                            <div className='size-block' style={{marginBottom: '10px'}}>
                                                size:
                                                <span className='float-right'>price</span>
                                            </div>
                                            <button className='btn btn-block btn-warning text-left'>
                                                R
                                                <span className='float-right'>250 $</span>
                                            </button>
                                        </div>
                                    </CardContainer>
                                </div>
                                <div className="col-4">
                                    <CardContainer className="card" 
                                    // style={{width: '100%'}}
                                    >
                                    
                                                  
                                        <FixedIMG className="card-img-top" src="https://www.sciencedaily.com/images/2017/05/170502204556_1_900x600.jpg" alt="Card image cap" style={{objectFit: 'contain'}}/>
                                        <div className="card-body">
                                            <h4 className="card-title">Menu title</h4>
                                            <p className="card-text">Some quick example.</p>
                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                            <hr/>
                                            <div className='size-block' style={{marginBottom: '10px'}}>
                                                size:
                                                <span className='float-right'>price</span>
                                            </div>
                                            <button className='btn btn-block disabled btn-warning text-left'>
                                                S
                                                <span className='float-right'>250 $</span>
                                            </button>
                                            <button className='btn btn-block btn-warning text-left'>
                                                M
                                                <span className='float-right'>500 $</span>
                                            </button>
                                        </div>
                                    </CardContainer>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <button style={{
                                display: 'inline-block',
                                borderRadius: '50%',
                                fontSize: '1.5em'
                            }}><i className='fa fa-arrow-right'/></button>
                        </div>

                        <div className="col-3">
                            <OrderList>
                                {/* <EmptyOrderList /> */}
                                <FillOrderList />
                                <OrderGroupBtn>
                                    <button className='btn btn-success btn-block'>สั่งอาหารทันที</button>
                                    <button className='btn btn-danger btn-block'>ดูรายการที่สั่ง</button>
                                </OrderGroupBtn>
                            </OrderList>
                        </div>
                    </div>
                </IdexContainer>
            </div>
        )
    }
}

export default IndexComponent