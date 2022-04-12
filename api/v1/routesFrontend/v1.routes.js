import express from 'express';
const Router = express();

import Token from './token.routes';
Router.use('/token',Token);
Router.get('/', (req, res) => {
    return res.send("V1 Service Working")
})
export default Router;
