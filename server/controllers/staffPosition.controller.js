module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT * 
            FROM StaffPosition;
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
            FROM StaffPosition
            WHERE posId = ${id};
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
        let positionName = req.body.posName
        if (positionName !== undefined) {
            con.query(
                `
                INSERT INTO StaffPosition(posName) 
                VALUES ('${positionName}');
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
        let positionName = req.body.posName
        let posId = req.params.id
        if (positionName !== undefined) {
            con.query(
                `
                UPDATE StaffPosition SET 
                    posName='${positionName}' 
                WHERE posId=${posId};
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
        let positionId = req.params.id
        con.query(
            `
            DELETE FROM StaffPosition 
            WHERE posId = ${positionId};
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