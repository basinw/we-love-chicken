module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT * 
            FROM Bill;
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
        let billId = req.params.id
        con.query(
            `
            SELECT * 
            FROM Bill
            WHERE billId = ${billId};
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
        let branchId = req.params.branchid
        con.query(
            `
            SELECT * FROM Bill b
            JOIN Branch br
            ON br.branchId = b.branchId 
            WHERE b.branchId = ${branchId};
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
        let branchId = req.body.branchId
        if (branchId !== undefined) {
            con.query(
                `
                INSERT INTO Bill(branchId, total) 
                VALUES (${branchId}, 0);
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
                data: 'information not found'
            })
        }
    },
    update: (req, res) => {    
        let billId = req.params.id
        let branchId = req.body.branchId
        let staffId = req.body.staffId
        let total = req.body.total
        let cash = req.body.cash
        let cashReturn = req.body.return
        if (branchId !== undefined && 
            staffId !== undefined && total !== undefined &&
            cash !== undefined && cashReturn !== undefined
            ) {
            con.query(
                `
                UPDATE Bill SET 
                    staffId=${staffId},
                    branchId=${branchId},
                    total=${total},
                    cash=${cash},
                    return=${cashReturn} 
                WHERE billId=${billId};
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
                data: 'information not found'
            })
        }
    },
    delete: (req, res) => {   
        let billId = req.params.id
        con.query(
            `
            DELETE FROM Bill 
            WHERE billId = ${billId};
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