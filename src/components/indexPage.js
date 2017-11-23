import React from 'react'
import styled from 'styled-components'
import instance from '../libs/axios'
import swal from 'sweetalert2'

import { Link } from 'react-router-dom'

import howTo from '../static/img/how-2.png'

const IdexContainer = styled.div`
    height: 73vh;
    background: #c1b482;
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

    & button {
        cursor: pointer
    }
`

const CardContainer = styled.div`
    min-height: 60vh;
`

const FixedIMG = styled.img`
    height: 11em;
    object-fit: cover;
    filter: ${props => props.status === 0 && 'grayscale(100%) !important'};
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
    ${ props => props.selectedCat === props.catId && `
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
                        onClick={ () => {props.onClickCat(v.cateId)} }
                        selectedCat={props.selCat}
                        cat={v.cateName}
                        catId={v.cateId}
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
        <img src={howTo} alt='how-to-use' />
        เมนูทางด้านซ้าย<br/>
        เพื่อเริ่มต้นการสั่งอาหาร
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
                props.cartList.map((v, i) => (
                    <div key={i} style={{ minHeight: '50px' }}>
                        <div className="row">
                            <div className="col-7 no-pad-r text-left" style={{paddingTop: '0px'}}>
                                {v.menuName} ({v.sizeName})
                            </div>
                            <div className="col-5 no-pad-a text-center">
                                <StyleOrderQuan
                                    onClick={() => props.editQ(v,'-')}
                                ><i className='fa fa-minus' /></StyleOrderQuan>
                                <NoQuan>{v.quantity}</NoQuan>
                                <StyleOrderQuan
                                    onClick={() => props.editQ(v,'+')}                                    
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
        selectedCat: 1,
        menuPerPage: 3,
        page: [],
        currentPage: 1,
        menudata: [],
        showmenu: [],
        selectedList: [],
        tableNo: 1,
        branch: {}
    }

    componentWillMount = async () => {
        window.onbeforeunload = () => {
            if(this.state.selectedList.length > 0) {
                return 'Are you sure you want to leave?'
            }
        }
        // return null if that's not defined
        let bill = JSON.parse(localStorage.getItem('bill'))
        if(bill == null) {
            let result = await instance.post('/bill', {
                branchId: 1
            }).then(data => data.data)

            // console.log(result)
            localStorage.setItem('bill', JSON.stringify({
                id: result.data.insertId
            }))
        }else {
            // searching for bill
            let billData = await instance.get(`/bill/${bill.id}`)
                .then(resp => resp.data)
            if(billData.data.length === 0) {
                // console.log('empty data')
            }
        }


        // localStorage.removeItem('scc-user')

        let data = await instance.get(`/category`)
            .then(resp => resp.data)
        if(data.status) {
            let cats = data.data
            this.setState({ 
                categorys: cats,
                selectedCat: cats[0].cateId
            })

        }

        data = await instance.get(`/menu/cate/1`)
            .then(resp => resp.data)
        if(data.status) {
            let rs = data.data
            // console.log(rs)
            // for find indx of page
            let max = Math.ceil(rs.length / this.state.menuPerPage)
            let page = []
            for(let i = 0; i<max; i++){
                page.push(i+1)
            }

            // show menu for index page
            let currentP = this.state.currentPage
            let menuPerP = this.state.menuPerPage
            let showmenu = rs.filter((v, i) => i < currentP * menuPerP && i >= (currentP-1) * menuPerP)
            // console.log(d)
            this.setState({ 
                showmenu,
                page,
                menudata: rs
            })
        }
    }

    selectCat = async (cat) => {
        if(this.state.selectedCat === cat){
            return
        }
        // console.log(cat)
        let data = await instance.get(`/menu/cate/${cat}`)
            .then(resp => resp.data)
        if(data.status) {
            let rs = data.data
            
            // for find indx of page
            let max = Math.ceil(rs.length / this.state.menuPerPage)
            let page = []
            for(let i = 0; i<max; i++){
                page.push(i+1)
            }

            // show menu for index page
            let currentP = 1
            let menuPerP = this.state.menuPerPage
            let showmenu = rs.filter((v, i) => i < currentP * menuPerP && i >= (currentP-1) * menuPerP)
            
            this.setState({ 
                showmenu,
                page,
                menudata: rs,
                currentPage: currentP
            })
        }
        this.setState({ selectedCat: cat })

    }

    addToList = async (e) => {
        let ListCart = this.state.selectedList
        let index = ListCart.findIndex((v, i) => v.menuPriceId === e.menuPriceId )
        // console.log(e)
        if (e.serveWithId !== null) {
        //   let result = await instance.get(`/menu/servewith/${e.menuId}`)
            // .then(resp => resp.data)
        //   console.log(result)
        }
        if(index > -1){ // ถ้ามีข้อมูล
            ListCart[index].quantity += 1
        } else {
            let product = {
                ...e,
                quantity: 1
            }
            ListCart.push(product)
        }
        this.setState({selectedList: ListCart})
    }

    editQuantity = (data, op) => {
        // console.log(data)
        // console.log(op)
        switch(op) {
            case '+': 
                data.quantity += 1
                break
            case '-':
                data.quantity -= 1
                if(data.quantity === 0){
                    let cart = this.state.selectedList
                    let index = cart.findIndex((v, i) => data.menuPriceId === v.menuPriceId)
                    cart.splice(index, 1)
                }
                break
            // eslint-disable-next-line
            default: ''
        }
        this.setState({})
    }

    changePage = (e) => {
        let currentP = e
        let menuPerP = this.state.menuPerPage
        let all = this.state.menudata
        let showmenu = all.filter((v, i) => i < currentP * menuPerP && i >= (currentP-1) * menuPerP)
        this.setState({
            currentPage: e,
            showmenu
        })
    }

    onSubmit = () => {
        let billId = JSON.parse(localStorage.getItem('bill')).id
        
        swal({
          title: 'Confirm orders',
          html: `you have ${this.state.selectedList.length} orders`,
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          customClass: 'Button',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            return new Promise((resolve, reject) => {
              let result// = {status: true}
              this.state.selectedList.map(async (d, i) => {
                result = await instance.post('/order', {
                  tableId: this.state.tableNo,
                  billId: billId,
                  orderStatus: 'prepared',
                  menupriceId: d.menuPriceId,
                  price: d.price,
                  quantity: d.quantity
                })
              })
              resolve(result)
            })
          }
        }).then((data) => {
        //   console.log(data)
          if(data.dismiss !== undefined){
            return
          }
          
          if (data.value) {
            this.setState({selectedList: []})
            swal({
              title: 'Success',
              html: `your order was created`,
              type: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            swal({
              title: 'Cancel',
              text: `Your order was not create.`,
              type: 'warning',
              confirmButtonText: 'OK'
            })
          }
        })

        
        // console.log('on submit')
    }

    render() {
        return(
            <div>
                <CategoryBar cats={this.state.categorys} selCat={this.state.selectedCat} onClickCat={this.selectCat} />
                <IdexContainer className='container-fluid'>
                    <div className="row justify-content-between">
                        
                        <div className="col-9 " style={{ paddingTop: '10px'}}>
                            <PageLinkGroup style={{marginBottom: '5px'}}>
                                {
                                    this.state.page.map(e => (
                                        <span key={e} className='page-item' style={{margin: '0 2px'}}>
                                            <button 
                                                className=" btn btn-dark"
                                                style={{ padding: '5px 10px', borderRadius: '50%', cursor: 'pointer'}}
                                                onClick={() => this.changePage(e)}
                                            >{e}<span className="sr-only" >(current)</span></button>
                                        </span>

                                    ))
                                }
                            </PageLinkGroup>
                            <div className="row">
                                {
                                    this.state.showmenu.map((v, i) => 
                                        (
                                            <div className="col-4" key={i} style={{transition: 'all .2s linear 0s'}}>
                                                <CardContainer className="card" >
                                                    <FixedIMG className="card-img-top" status={v.status} src={v.url} alt="Card image cap" />
                                                    <div className="card-body" style={{position: 'relative'}}>
                                                        <h4 className="card-title">{v.menuName} <b>({v.sizeName})</b></h4>
                                                        {
                                                            v.status === 0 && (
                                                                <span className='card-text text-danger'>สินค้าหมด</span>
                                                            )
                                                        }
                                                        <hr/>
                                                        <div style={{position: 'absolute', bottom: '10%', width: '85%'}}>
                                                            
                                                            
                                                            {
                                                                v.status === 0 ? (
                                                                    <button 
                                                                        className={`btn btn-block btn-secondary text-center disabled`} 
                                                                        disabled={true}
                                                                    >
                                                                        <span >{`${v.price} $`}</span>
                                                                    </button>
                                                                ) : (
                                                                    <div>
                                                                        <div className='size-block' style={{marginBottom: '10px'}}>
                                                                            price:
                                                                        </div>
                                                                        <button 
                                                                            className={`btn btn-block btn-warning text-center`} 
                                                                            style={{cursor: 'pointer'}}
                                                                            onClick={() => this.addToList(v)}
                                                                        >
                                                                            <span >{`${v.price} $`}</span>
                                                                        </button>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </CardContainer>
                                            </div>
                                        ))
                                }
                                
                            </div>
                        </div>

                        <div className="col-3">
                            <OrderList>
                                {
                                    this.state.selectedList.length === 0 ? (
                                        <EmptyOrderList />
                                    ) : (
                                        <FillOrderList cartList={this.state.selectedList} editQ={this.editQuantity} />
                                    )
                                }
                                <OrderGroupBtn>
                                    <button 
                                        className='btn btn-success btn-block'
                                        onClick={this.onSubmit}
                                        disabled={this.state.selectedList.length === 0}
                                    >สั่งอาหารทันที</button>
                                    <Link 
                                        to={`/orderlist`}
                                        className='btn btn-danger btn-block'
                                    >
                                        ดูรายการที่สั่ง
                                    </Link>
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