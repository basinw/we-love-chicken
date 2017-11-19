const resSQL_err = {
    status: false,
    data: 'server Database throws error for SQL'
}

module.exports = (express, connection) => {
    // import controller
    const TestController = require('./controllers/category.controller')(connection, resSQL_err)
    
    //init router
    const router = express.Router()

    // API ROOT - Display Available Routes
	router.get('/', (req, res) => {
        res.json({
            name: 'DB_Restaurant (MySQL) - API', 
            version: '1.0',
        })
    })

    // // --------------------------
    // // |   CATEGORY CONTROLLER   |
    // // --------------------------
    router.route('/category').get(TestController.getAll)


    return router
}






