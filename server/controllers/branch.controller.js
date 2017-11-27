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
  getById: async (req, res) => {
    let id = req.params.id
    if (!isNaN(id)) {
      con.query(
        `
                SELECT * 
                FROM Branch
                WHERE branchId = ${id};
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
        data: 'invalid number'
      })
    }
  },
  create: async (req, res) => {
    let branchName = req.body.branchName
    let address = req.body.address
    let district = req.body.district
    let province = req.body.province
    let telNo = req.body.telNo

    let openTime = '00:00'
    let closeTime = '00:00'
    if (req.body.openTime !== undefined) {
      openTime = req.body.openTime
    }
    if (req.body.closeTime !== undefined) {
      closeTime = req.body.closeTime
    }
    if (
      branchName !== undefined &&
      address !== undefined &&
      district !== undefined &&
      province !== undefined &&
      telNo !== undefined
    ) {
      con.query(
        `
                INSERT INTO Branch(branchName, openTime, closeTime, address, district, province, telNo) 
                VALUES ('${branchName}', '${openTime}', '${closeTime}', '${
          address
        }', '${district}', '${province}', '${telNo}');
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
        data: 'information not found'
      })
    }
  },
  update: (req, res) => {
    let branchId = req.params.id
    let branchName = req.body.branchName
    let address = req.body.address
    let district = req.body.district
    let province = req.body.province
    let telNo = req.body.telNo
    let openTime = req.body.openTime
    let closeTime = req.body.closeTime
    if (
      branchName !== undefined &&
      address !== undefined &&
      district !== undefined &&
      province !== undefined &&
      telNo !== undefined &&
      openTime !== undefined &&
      closeTime !== undefined
    ) {
      con.query(
        `
                UPDATE Branch SET 
                    branchName='${branchName}',
                    openTime='${openTime}',
                    closeTime='${closeTime}',
                    address='${address}',
                    district='${district}',
                    province='${province}',
                    telNo='${telNo}' 
                WHERE branchId=${branchId};
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
        data: 'information not found'
      })
    }
  },
  delete: (req, res) => {
    let branchId = req.params.id
    con.query(
      `
            DELETE FROM Branch 
            WHERE branchId = ${branchId};
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
  getstaff: (req, res) => {
    const id = req.params.id
    con.query(
      `
      SELECT s.staffId, CONCAT(s.fname, ' ', s.lname) 'name', sp.posName, count(bi.billId) 'billCount'
      FROM Staff s 
      LEFT JOIN Bill bi 
      ON bi.staffId = s.staffId 
      JOIN StaffPosition sp 
      ON s.positionId = sp.posId 
      WHERE EXISTS ( 
          SELECT b.branchId 
          FROM Branch b 
          WHERE b.branchId = s.branchId 
          AND b.branchId = ${id}
    )
    GROUP BY s.staffId
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
  getTotal: (req, res) => {
    const id = req.params.id
    const from = req.body.from
    const to = req.body.to
    if (from !== undefined && to !== undefined) {
      con.query(
        `
        SELECT branchName, SUM(total) AS "totalIncome"
        FROM Bill JOIN Branch
        ON Bill.branchId = Branch.branchId
        WHERE Branch.branchId = ${id} AND Bill.timeStamp BETWEEN '${
          from
        } 00:00' AND '${to} 23:59'
        AND time(Bill.timeStamp) BETWEEN Branch.openTime AND Branch.closeTime
        GROUP BY Bill.branchId HAVING COUNT(billId) > 0;
        `,
        (err, result, fields) => {
          if (err) res.json(resSQL_err)
          let resData = {
            ...result[0],
            from,
            to
          }
          res.json({
            status: true,
            data: resData
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
