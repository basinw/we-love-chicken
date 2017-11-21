module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
        con.query(
            `
            SELECT *
            FROM Menu m
            JOIN MenuPrice mp
            ON m.menuId = mp.menuId;
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
        let id = req.params.id
        con.query(
            `
            SELECT * 
            FROM MenuPrice
            WHERE menuPriceId = ${id};
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
    getByMenuId: async (req, res) => {    
        let id = req.params.id
        con.query(
            `
            SELECT * 
            FROM MenuPrice
            WHERE menuPriceId = ${id};
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