module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {
        con.query(
            `
            SELECT * 
            FROM Category;
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