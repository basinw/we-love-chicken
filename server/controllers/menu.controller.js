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
    getByCatId: async (req, res) => {    
        cateId = req.params.catid
        con.query(
            `
            SELECT * 
            FROM Menu m
            JOIN MenuPrice mp
            ON m.menuId = mp.menuId
            WHERE m.cateId = ${cateId};
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