module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT *
            FROM Tables;
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
            FROM Tables 
            WHERE tableId = ${id};;
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
    getByBranchId: (req, res) => {    
        let id = req.params.branchid
        con.query(
            `
            SELECT * FROM Tables t
            JOIN Branch b
            ON b.branchId = t.branchId
            WHERE b.branchId = ${id}
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
        let tableNo = req.body.tableNumber
        let branchId = req.body.branchId
        if(tableNo !== undefined && branchId !== undefined){
            con.query(
                `
                INSERT INTO Tables
                (tableNumber, branchId)
                VALUES (${tableNo}, ${branchId})
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
                data: 'information is not defined'
            })
        }
    },
    update: (req, res) => {    
        let id = req.params.id
        let tableNo = req.body.tableNumber
        let branchId = req.body.branchId
        if(tableNo !== undefined && branchId !== undefined){
            con.query(
                `
                UPDATE Tables SET 
                    tableNumber=${tableNo},
                    branchId=${branchId} 
                WHERE tableId=${id};
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
                data: 'information is not defined'
            })
        }
    },
    delete: (req, res) => {    
        let id = req.params.id
        con.query(
            `
            DELETE FROM Tables 
            WHERE tableId=${id};
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