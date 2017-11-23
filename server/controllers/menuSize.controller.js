module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT * 
            FROM MenuSize;
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
            FROM MenuSize
            WHERE sizeId = ${id};
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
        let sizeName = req.body.sizeName
        let description = req.body.desc
        if (sizeName !== undefined && description !== undefined) {
            con.query(
                `
                INSERT INTO MenuSize(sizeName, description) 
                VALUES ('${sizeName}', '${description}');
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
        let sizeId = req.params.id
        let sizeName = req.body.sizeName
        let description = req.body.desc
        if (sizeName !== undefined && description !== undefined) {
            con.query(
                `
                UPDATE MenuSize SET 
                    sizeName='${sizeName}',
                    description='${description}' 
                WHERE sizeId=${sizeId};
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
    delete: (req, res) => {
        let sizeId = req.params.id
        con.query(
            `
            DELETE FROM MenuSize 
            WHERE sizeId = ${sizeId};
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