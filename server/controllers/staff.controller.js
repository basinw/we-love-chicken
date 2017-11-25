module.exports = (con, resSQL_err) => ({
  getAll: async (req, res) => {
    con.query(
      `
            SELECT * 
            FROM Staff;
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
            FROM Staff s
            JOIN StaffPosition sp
            ON s.positionId = sp.posId
            JOIN Branch b
            ON b.branchId = s.branchId
            WHERE staffId = ${id};
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
    let fName = req.body.fName
    let lName = req.body.lName
    let username = req.body.username
    let password = req.body.pass
    let positionId = req.body.positionId
    let branchId = req.body.branchId
    if (
      fName !== undefined &&
      lName !== undefined &&
      username !== undefined &&
      password !== undefined &&
      positionId !== undefined &&
      branchId !== undefined
    ) {
      con.query(
        `
                INSERT INTO Staff(fname, lname, username, password, positionId, branchId) 
                VALUES ('${fName}', '${lName}', '${username}', PASSWORD('${
          password
        }'), ${positionId}, ${branchId});
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
    let id = req.params.id
    let fName = req.body.fName
    let lName = req.body.lName
    let username = req.body.username
    let password = req.body.pass
    let positionId = req.body.positionId
    let branchId = req.body.branchId
    if (
      fName !== undefined &&
      lName !== undefined &&
      username !== undefined &&
      password !== undefined &&
      positionId !== undefined &&
      branchId !== undefined
    ) {
      con.query(
        `
                UPDATE Staff SET 
                    fname='${fName}',
                    lname='${lName}',
                    username='${username}',
                    password=PASSWORD('${password}'),
                    positionId=${positionId},
                    branchId=${branchId} 
                WHERE staffId=${id};
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
    let staffId = req.params.id
    con.query(
      `
            DELETE FROM Staff 
            WHERE staffId = ${staffId};
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
  checkusername: (req, res) => {
    let username = req.params.user
    con.query(
      `
            SELECT username 
            FROM Staff 
            WHERE username = '${username}';
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
  auth: (req, res) => {
    let username = req.body.username
    let password = req.body.pass
    if (username !== undefined && password !== undefined) {
      con.query(
        `
                SELECT * FROM Staff s
                JOIN StaffPosition sp
                ON s.positionId = sp.posId
                WHERE s.username = '${username}' 
                AND s.password = PASSWORD('${password}');
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
        data: 'information is not defined'
      })
    }
  }
})
