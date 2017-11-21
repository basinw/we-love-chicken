const resSQL_err = {
    status: false,
    data: 'server Database throws error for SQL'
}

module.exports = (express, connection) => {
    // import controller
    const TestController = require('./controllers/category.controller')(connection, resSQL_err)
    const MenuController = require('./controllers/menu.controller')(connection, resSQL_err)
    const MenuPriceController = require('./controllers/menuPrice.controller')(connection, resSQL_err)

    const OrderController = require('./controllers/order.controller')(connection, resSQL_err)
    const OrderMenuController = require('./controllers/orderMenu.controller')(connection, resSQL_err)
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
    router.route('/category').get(TestController.getAll)
    
    // // --------------------------
    // // |     MENU CONTROLLER     |
    // // --------------------------
    router.route('/menu').get(MenuController.getAll)
    router.route('/menu/:catid').get(MenuController.getByCatId)

    // // --------------------------
    // // |  MENU PRICE CONTROLLER  |
    // // --------------------------
    router.route('/menuprice').get(MenuPriceController.getAll)

    //------- STAFF ---------//
    // // --------------------------
    // // |   BRANCH CONTROLLER     |
    // // --------------------------
    router.route('/branch').get(BranchController.getAll)
    router.route('/branch').post(BranchController.create)
    
    // // --------------------------
    // // |    STAFF CONTROLLER     |
    // // --------------------------
    // router.route('/staff').get(StaffController.getAll)

    // // --------------------------
    // // |    ORDER CONTROLLER     |
    // // --------------------------
    router.route('/order').get(OrderController.getAll)
    router.route('/order').post(OrderController.create)

    // // --------------------------
    // // |  ORDER MENU CONTROLLER  |
    // // --------------------------
    router.route('/ordermenu').get(OrderMenuController.getAll)
    router.route('/ordermenu').post(OrderMenuController.create)

    // // --------------------------
    // // |     TABLE CONTROLLER    |
    // // --------------------------
    router.route('/table').get(TableController.getAll)

    // // --------------------------
    // // |     BILL CONTROLLER     |
    // // --------------------------
    router.route('/bill').get(BillController.getAll)
    router.route('/bill/:id').get(BillController.getById)
    router.route('/bill').post(BillController.create)

    



    return router
}






