module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
        con.query(
            `
            SELECT *
            FROM Orders;
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
    create: (req, res) => {    
        let tableId = req.body.tableId
        let billId = req.body.billId
        let orderStatus = req.body.orderStatus
        if (tableId !== undefined && billId !== undefined && orderStatus !== undefined) {
            con.query(
                `
                INSERT INTO Orders
                (tableId, billId, orderStatus) 
                VALUES (${tableId}, ${billId}, '${orderStatus}');
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
                data: 'information incorrect'
            })
        }
    },

    
})