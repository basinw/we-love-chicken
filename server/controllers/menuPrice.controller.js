module.exports = (con, resSQL_err) => ({
    getAll: (req, res) => {    
        con.query(
            `
            SELECT *
            FROM Menu m
            JOIN MenuPrice mp
            ON m.menuId = mp.menuId
            JOIN MenuCategory c
            ON m.cateId = c.cateId;
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
            FROM MenuPrice mp
            JOIN Menu m
            ON m.menuId = mp.menuId
            WHERE mp.menuPriceId = ${id};
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
        let menuId = req.body.menuId
        let sizeId = req.body.sizeId
        let price = req.body.price
        let status = req.body.status
        if(menuId !== undefined && sizeId !== undefined && price !== undefined){
            if(status === undefined){
                status = 1
            }
            con.query(
                `
                INSERT INTO MenuPrice(menuId, sizeId, price, status) 
                VALUES (${menuId}, ${sizeId}, ${price}, ${status});
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
    },
    update: (req, res) => {
      let menupriceId = req.params.id
      let menuId = req.body.menuId
      let sizeId = req.body.sizeId
      let price = req.body.price
      let status = req.body.status
      
      if(menuId !== undefined && sizeId !== undefined && price !== undefined){
          if(status === undefined){
              status = 1
          }
          con.query(
              `
              UPDATE MenuPrice SET 
                menuId=${menuId},
                sizeId=${sizeId},
                price=${price},
                status=${status} 
              WHERE menuPriceId=${menupriceId};
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
  },
  delete: (req, res) => {
    let menupriceId = req.params.id
        con.query(
            `
            DELETE FROM MenuPrice
            WHERE menupriceId = ${menupriceId};
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