const con = require('../database');
const encryptHandler = require('../handlers/encryptHandler');
const {
  jwt: { createToken },
} = require('../handlers/');

module.exports = {
  selectAllUsers: async (req, res, next) => {
    try {
      const [rows, fields] = await con.promise().query(`select * from users`);
      return res.status(200).send(rows);
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    const hash = encryptHandler(password);
    try {
      const [
        users,
      ] = await con
        .promise()
        .query(
          `select id, username, email, roleID from users where username = ? and password = ?`,
          [username, hash]
        );
      let response;
      let statusCode;
      users.length !== 0
        ? (response = { ...users[0], token: createToken(users[0]) })
        : (response = { error: 'user not found' });
      response.error ? (statusCode = 404) : (statusCode = 200);
      return res.status(statusCode).send(response);
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      req.body.password = encryptHandler(req.body.password);
      const [insertUser] = await con.promise().query(`insert into users set ?`, req.body);
      const [
        getUser,
      ] = await con
        .promise()
        .query(`select id, username, email, roleID from users where id = ?`, [insertUser.insertId]);
      const response = {
        ...getUser[0],
        token: createToken(getUser[0]),
      };
      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  },
  keepLogin: async (req, res, next) => {
    const { id } = req.user;
    try {
      const [
        user,
      ] = await con
        .promise()
        .query(`select id, username, email, roleID from users where id = ?`, [id]);
      const response = {
        ...user[0],
        token: req.token,
      };
      return res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  },
  address: async (req, res, next) => {
    try {
      const userID = parseInt(req.params.id);
      // const { address, label, receiver, phone } = req.body;
      const [getAddress] = await con
        .promise()
        .query(`SELECT * FROM address WHERE userID = ?`, [userID]);
      return res.status(200).send(getAddress);
    } catch (err) {
      next(err);
    }
  },
  addNewAddress: async (req, res, next) => {
    try {
      console.log(req.body);
      const userID = parseInt(req.params.id);
      const { address, label, receiver, phone } = req.body;
      await con.promise().query(`
          INSERT INTO address 
            (userID, address, label, phone, receiver) 
          VALUES 
            (${userID},'${address}','${label}','${phone}', '${receiver}')
        `);
      return res.status(200).send({ status: 'success', message: 'add new address' });
    } catch (err) {
      next(err);
    }
  },
  changeAddress: async (req, res, next) => {
    try {
      console.log(req.body);
      const addressID = parseInt(req.params.id);
      const { address, label, receiver, phone } = req.body;
      await con.promise().query(`
          UPDATE address SET 
            address='${address}', label='${label}', phone='${phone}', receiver='${receiver}' 
          WHERE id=${addressID} 
        `);
      return res.status(200).send({ status: 'success', message: 'change address' });
    } catch (err) {
      next(err);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      console.log(id);
      await con.promise().query(`DELETE FROM address WHERE id = ${id}`);
      return res.status(200).send({ status: 'success', message: 'delete address' });
    } catch (err) {
      next(err);
    }
  },
};
