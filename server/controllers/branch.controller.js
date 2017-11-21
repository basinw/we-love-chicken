module.exports = (con, resSQL_err) => ({
    getAll: async (req, res) => {    
        con.query(
            `
            SELECT * 
            FROM Branch;
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
        let branchName = req.body.branchName
        let address = req.body.address
        let district = req.body.district
        let province = req.body.province
        let telNo = req.body.telNo
        if(branchName !== undefined && address !== undefined &&
            district !== undefined && province !== undefined &&
            telNo !== undefined){

            con.query(
                `
                INSERT INTO Branch
                (branchName, address, district, province, telNo) 
                VALUES ('${branchName}', '${address}', '${district}', '${province}', '${telNo}' );
                `, 
            (err, result, fields) => {
            if (err) res.json(resSQL_err)
                    res.json({
                        status: true,
                        data: result
                    })
                }
            )
        }else{
            res.json({
                status: false,
                data: 'information not found'
            })
        }
    }
})