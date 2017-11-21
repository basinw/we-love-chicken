module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
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
    getById: async (req, res) => {    
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
    create: async (req, res) => {    
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
})