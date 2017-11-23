module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT * 
            FROM MenuCategory;
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
            FROM MenuCategory
            WHERE cateId = ${id};
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
        let cateName = req.body.cateName
        if (cateName !== undefined) {
            con.query(
                `
                INSERT INTO MenuCategory(cateName) 
                VALUES ('${cateName}');
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
                data: 'information is not defined.'
            })
        }
    },
    update: (req, res) => {
        let cateName = req.body.cateName
        let cateId = req.params.id
        if (cateName !== undefined) {
            con.query(
                `
                UPDATE MenuCategory SET 
                cateName = '${cateName}' 
                WHERE cateId = ${cateId}
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
                data: 'information is not defined.'
            })
        }
    },
    deleteById: (req, res) => {
        let cateId = req.params.id
        con.query(
            `
            DELETE FROM MenuCategory 
            WHERE cateId = ${cateId};
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