module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
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
    create: async (req, res) => {    
        let tableNo = req.body.tableNumber
        let branchId = req.body.branchId
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
    },
})