const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { userRouter, productRouter, cartRouter } = require('./routers');
const { errorHandler } = require('./handlers');
const bearerToken = require('express-bearer-token');

require('dotenv').config();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bearerToken());

app.get('/', (req, res) => {
  return res.status(200).send('Commerce API');
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.use(errorHandler);

const port = process.env.API_PORT;
app.listen(port, () => console.log(`api running at ${port}`));
