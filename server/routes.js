const resSQL_err = {
    status: false,
    data: 'server Database throws error for SQL'
}

module.exports = (express, connection) => {
    // import controller
    const CategoryController = require('./controllers/category.controller')(connection, resSQL_err)
    const MenuController = require('./controllers/menu.controller')(connection, resSQL_err)
    const MenuPriceController = require('./controllers/menuPrice.controller')(connection, resSQL_err)
    const MenuSizeController = require('./controllers/menuSize.controller')(connection, resSQL_err)

    const StaffController = require('./controllers/staff.controller')(connection, resSQL_err)
    const StaffPostionController = require('./controllers/staffPosition.controller')(connection, resSQL_err)

    const OrderController = require('./controllers/order.controller')(connection, resSQL_err)
    const TableController = require('./controllers/table.controller')(connection, resSQL_err)
    const BranchController = require('./controllers/branch.controller')(connection, resSQL_err)
    const BillController = require('./controllers/bill.controller')(connection, resSQL_err)

    //init router
    const router = express.Router()

    // API ROOT - Display Available Routes
	router.get('/', (req, res) => {
        res.json({
            name: 'DB_Restaurant (MySQL) - API', 
            version: '1.0',
        })
    })
    

    //------ FOOD ----------//
    // // --------------------------
    // // |   CATEGORY CONTROLLER   |
    // // --------------------------
    router.group('/category', (categoryRouter) => {
        categoryRouter.route('/').get(CategoryController.getAll)
        categoryRouter.route('/').post(CategoryController.create)
        categoryRouter.route('/:id').get(CategoryController.getById)
        categoryRouter.route('/:id').put(CategoryController.update)
        categoryRouter.route('/:id').put(CategoryController.deleteById)
    })
    
    // // --------------------------
    // // |  MENU SIZE CONTROLLER   |
    // // --------------------------
    router.group('/menusize', (menusizeRouter) => {
        menusizeRouter.route('/').get(MenuSizeController.getAll)
        menusizeRouter.route('/').post(MenuSizeController.create)
        menusizeRouter.route('/:id').get(MenuSizeController.getById)
        menusizeRouter.route('/:id').put(MenuSizeController.update)
        menusizeRouter.route('/:id').delete(MenuSizeController.delete)
    })
    
    // // --------------------------
    // // |     MENU CONTROLLER     |
    // // --------------------------
    router.group('/menu', (menuRouter) => {
        menuRouter.route('/').get(MenuController.getAll)
        menuRouter.route('/').post(MenuController.create)
        menuRouter.route('/:id').get(MenuController.getById)
        menuRouter.route('/:id').put(MenuController.update)
        menuRouter.route('/:id').delete(MenuController.delete)
        menuRouter.route('/cate/:catid').get(MenuController.getByCatId) 
    })

    // // --------------------------
    // // |  MENU PRICE CONTROLLER  |
    // // --------------------------
    router.group('/menuprice', (menupriceRouter) => {
        menupriceRouter.route('/').get(MenuPriceController.getAll)
        menupriceRouter.route('/').post(MenuPriceController.create)
        menupriceRouter.route('/:id').get(MenuPriceController.getById)
        menupriceRouter.route('/:id').put(MenuPriceController.update)
        menupriceRouter.route('/:id').delete(MenuPriceController.delete)
    })

    //------- STAFF ---------//
    // // --------------------------
    // // |   BRANCH CONTROLLER     |
    // // --------------------------
    router.group('/branch', (branchRouter) => {
        branchRouter.route('/').get(BranchController.getAll)
        branchRouter.route('/').post(BranchController.create)
        branchRouter.route('/:id').get(BranchController.getById)
        branchRouter.route('/:id').put(BranchController.update)
        branchRouter.route('/:id').delete(BranchController.delete)
    })

    // // --------------------------
    // // |    STAFF CONTROLLER     |
    // // --------------------------
    router.group('/staff', (staffRouter) => {
        staffRouter.route('/').get(StaffController.getAll)
        staffRouter.route('/').post(StaffController.create)
        staffRouter.route('/checkuser/:user').get(StaffController.checkusername)
        staffRouter.route('/auth').post(StaffController.auth)
        staffRouter.route('/:id').get(StaffController.getById)
        staffRouter.route('/:id').put(StaffController.update)
        staffRouter.route('/:id').delete(StaffController.delete)
    })

    // ---------------- pass
    // // --------------------------
    // // |STAFF POSITION CONTROLLER|
    // // --------------------------
    router.group('/staffposition', (staffpositionRouter) => {
        staffpositionRouter.route('/').get(StaffPostionController.getAll)
        staffpositionRouter.route('/').post(StaffPostionController.create)
        staffpositionRouter.route('/:id').get(StaffPostionController.getById)
        staffpositionRouter.route('/:id').put(StaffPostionController.update)
        staffpositionRouter.route('/:id').delete(StaffPostionController.delete)
    })

    // pass

    // // --------------------------
    // // |    ORDER CONTROLLER     |
    // // --------------------------
    router.group('/order', (orderRouter) => {
        orderRouter.route('/').get(OrderController.getAll)
        orderRouter.route('/').post(OrderController.create)
        orderRouter.route('/:id').get(OrderController.getById)
        orderRouter.route('/:id').put(OrderController.update)
        orderRouter.route('/:id').delete(OrderController.delete)

        // query using join between 'order' and 'ordermenu'
        orderRouter.route('/bill/:billid').get(OrderController.getByJoinBill)
    })

    // // --------------------------
    // // |  ORDER MENU CONTROLLER  |
    // // --------------------------
    // router.group('/ordermenu', (ordermenuRouter) => {
    //     ordermenuRouter.route('/').get(OrderMenuController.getAll)
    //     ordermenuRouter.route('/').post(OrderMenuController.create)
    //     ordermenuRouter.route('/:id').get(OrderMenuController.getById)
    //     ordermenuRouter.route('/:id').put(OrderMenuController.update)
    //     ordermenuRouter.route('/:id').delete(OrderMenuController.delete)
        
    //     ordermenuRouter.route('/bill/:billid').get(OrderMenuController.joinOrder)
    // })


    // // --------------------------
    // // |     TABLE CONTROLLER    |
    // // --------------------------
    router.group('/table', (tableRouter) => {
        tableRouter.route('/').get(TableController.getAll)
        tableRouter.route('/').post(TableController.create)
        tableRouter.route('/:id').get(TableController.getById)
        tableRouter.route('/:id').put(TableController.update)
        tableRouter.route('/:id').delete(TableController.delete)

        tableRouter.route('/branch/:branchid').get(TableController.getByBranchId)
    })

    // // --------------------------
    // // |     BILL CONTROLLER     |
    // // --------------------------
    router.group('/bill', (billRouter) => {
        billRouter.route('/').get(BillController.getAll)
        billRouter.route('/').post(BillController.create)
        billRouter.route('/:id').get(BillController.getById)
        billRouter.route('/:id').put(BillController.update)
        billRouter.route('/:id').delete(BillController.delete)

        billRouter.route('/branch/:branchid').get(BillController.getByBranchId)

        
    })


    return router
}






