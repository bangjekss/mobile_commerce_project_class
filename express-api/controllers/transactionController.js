const con = require('../database');
const moment = require('moment');

module.exports = {
  getTransactionsByUserID: async (req, res, next) => {
    try {
      const [
        transactionData,
      ] = await con
        .promise()
        .query(`select * from transaction where userID = ? order by id desc`, [req.params.id]);
      const [transactionItems] = await con.promise().query(`
          SELECT 
            ti.id, ti.transactionID, p.name, ti.quantity, ti.price, ti.imagepath
          FROM transaction_item ti
          JOIN products p ON p.id = ti.productID
        `);
      const response = transactionData.map((val) => {
        return {
          ...val,
          items: transactionItems.filter((item) => {
            return item.transactionID === val.id;
          }),
        };
      });
      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  },
  postTransaction: async (req, res, next) => {
    try {
      const { items } = req.body;
      console.log(items);
      const detailDate = new Date();
      let totalPrice = 0;
      items.forEach((value) => {
        totalPrice += value.price * value.quantity;
        value.imagepath = value.image[0].imagepath;
      });
      const transactionBody = {
        userID: req.params.id,
        statusID: 1,
        totalPrice,
        detailDate,
        date: detailDate.getDate(),
        month: detailDate.getMonth(),
        year: detailDate.getFullYear(),
      };
      console.log(items[0]);
      const [transaction] = await con
        .promise()
        .query(`insert into transaction set ?`, [transactionBody]);
      const values = [];
      items.forEach(({ productID, quantity, price, imagepath }) => {
        values.push([productID, quantity, transaction.insertId, price, imagepath]);
      });
      const [
        transactionItems,
      ] = await con
        .promise()
        .query(
          `insert into transaction_item (productID, quantity, transactionID, price, imagepath) values ?`,
          [values]
        );

      return res
        .status(200)
        .send({ id: transaction.insertId, status: 'created', items, transactionBody, values });
    } catch (err) {
      next(err);
    }
  },
};
