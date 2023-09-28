import express from 'express';
const routes = express.Router();
import dto from '../Dto/numbers.js';


routes.get('/',(req,res)=>{
    res.render('index');
});
routes.get('/otpPage',(req,res)=>{
    const phoneNumber = req.query.phoneNumber;
    res.render('otp',{phoneNumber});
})
routes.get('/home',(req,res)=>{
    res.render('home');
})
routes.post('/',dto.phoneNumber);
routes.get('/otp',dto.getOTP);

export default routes