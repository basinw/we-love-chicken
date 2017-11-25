module.exports = (con, resSQL_err) => ({
  getAll: (req, res) => {
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
  getById: (req, res) => {
    let id = req.params.id
    con.query(
      `
            SELECT *
            FROM Menu m
            WHERE m.menuId = ${id};
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
  getByCatId: (req, res) => {
    cateId = req.params.catid
    con.query(
      `
            SELECT * 
            FROM Menu m
            JOIN MenuPrice mp
            ON m.menuId = mp.menuId
            JOIN MenuSize ms
            ON ms.sizeId = mp.sizeId
            WHERE m.cateId = ${cateId}
            ORDER BY mp.status DESC, lower(m.menuName), mp.sizeId;
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
  getServeWith: (req, res) => {
    let id = req.params.menuid
    con.query(
      `SELECT s.* 
            FROM Menu m 
            JOIN Menu s 
            ON s.serveWithId = m.menuId
            WHERE m.menuId = ${id}`,
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
    let name = req.body.menuName
    let cateId = req.body.cateId
    let url = req.body.url
    let serveWithId = req.body.serveId
    if (name !== undefined && cateId !== undefined && url !== undefined) {
      if (serveWithId === undefined) {
        serveWithId = "null"
      }
      con.query(
        `
                INSERT INTO Menu(menuName, cateId, url, serveWithId) 
                VALUES ('${name}', ${cateId}, '${url}', ${serveWithId});
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
        data: "information is not defined"
      })
    }
  },
  update: (req, res) => {
    let menuId = req.params.id
    let name = req.body.menuName
    let cateId = req.body.cateId
    let url = req.body.url
    let serveWithId = req.body.serveId
    if (name !== undefined && cateId !== undefined && url !== undefined) {
      if (serveWithId === undefined) {
        serveWithId = "null"
      }
      con.query(
        `
                UPDATE Menu SET 
                    menuName='${name}',
                    cateId=${cateId},
                    url='${url}',
                    serveWithId=${serveWithId} 
                WHERE menuId=${menuId};
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
        data: "information is not defined"
      })
    }
  },
  delete: (req, res) => {
    let menuId = req.params.id
    con.query(
      `
            DELETE FROM Menu 
            WHERE menuId=${menuId}
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
