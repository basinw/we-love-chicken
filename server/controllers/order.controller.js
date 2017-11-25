module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
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
    getById: (req, res) => {    
        let id = req.params.id
        con.query(
            `
            SELECT *
            FROM Orders
            WHERE orderId = ${id};
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
        let menuPriceId = req.body.menupriceId
        let price = req.body.price
        let quantity = req.body.quantity
        if (tableId !== undefined && billId !== undefined && orderStatus !== undefined &&
            menuPriceId !== undefined && price !== undefined && quantity !== undefined
            ) {
            con.query(
                `
                INSERT INTO Orders(tableId, billId, orderStatus, menuPriceId, price, quantity) 
                VALUES (${tableId}, ${billId}, '${orderStatus}', ${menuPriceId}, ${price}, ${quantity});
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
    update: (req, res) => {    
        let orderId = req.params.id
        let tableId = req.body.tableId
        let billId = req.body.billId
        let orderStatus = req.body.orderStatus
        let menuPriceId = req.body.menupriceId
        let price = req.body.price
        let quantity = req.body.quantity
        if (tableId !== undefined && billId !== undefined && orderStatus !== undefined &&
            menuPriceId !== undefined && price !== undefined && quantity !== undefined
            ) {
            con.query(
                `                
                UPDATE Orders SET 
                    tableId=${tableId},
                    billId=${billId},
                    orderStatus='${orderStatus}',
                    menuPriceId=${menuPriceId},
                    price=${price},
                    quantity=${quantity} 
                WHERE orderId=${orderId};
                `,
            (err, result, fields) => {
            if (err) res.json(resSQL_err)
                    console.log(result)
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
    delete: (req, res) => {    
        let id = req.params.id
        con.query(
            `
            DELETE FROM Orders 
            WHERE orderId = ${id};
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
    getByJoinBill: (req, res) => {
        let id = req.params.billid
        con.query(
            `
            SELECT o.orderStatus, m.menuName, ms.sizeName, o.quantity, o.price, o.price * o.quantity 'priceOrder'
            FROM Orders o
            JOIN Bill b
            ON b.billId = o.billId
            JOIN MenuPrice mp 
            ON mp.menuPriceId = o.menuPriceId
            JOIN Menu m 
            ON m.menuId = mp.menuId
            JOIN MenuSize ms 
            ON ms.sizeId = mp.sizeId
            WHERE b.billId = ${id}
            ORDER BY o.orderId;
            `,
        (err, result, fields) => {
        if (err) res.json(resSQL_err)
                res.json({
                    status: true,
                    data: result
                })
            }
        )
    }
    
})