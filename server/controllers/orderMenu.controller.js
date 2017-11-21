module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
        con.query(
            `
            SELECT *
            FROM OrderMenu;
            `, 
        (err, result, fields) => {
        if (err) res.json(resSQL_err)
                res.json({
                    status: true,
                    data: result
                })
            }
        )
    },
    create: async (req, res) => {    
        let orderId = req.body.orderId
        let menuPriceId = req.body.menuPriceId
        let price = req.body.price
        let quantity = req.body.quantity
        if (orderId !== undefined && menuPriceId !== undefined && price !== undefined && quantity !== undefined){
            con.query(
                `
                INSERT INTO 
                OrderMenu(orderId, menuPriceId, price, quantity) 
                VALUES (${orderId}, ${menuPriceId}, ${price}, ${quantity});
                `, 
            (err, result, fields) => {
            if (err) res.json(resSQL_err)
                    res.json({
                        status: true,
                        data: result
                    })
                }
            )
        } else {
            res.json({
                status: false,
                data: 'information is not founded'
            })
        }
    }
})