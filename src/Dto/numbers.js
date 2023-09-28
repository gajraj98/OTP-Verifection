import dao from '../Dao/numbers.js';
import { response } from 'express';

export default class Dto{
    static async phoneNumber(req,res,next){
        try{
           const phNumber = req.body.code +req.body.number;
           const min = 1000; 
           const max = 9999; 
           const otp =  Math.floor(Math.random() * (max - min + 1)) + min;
          const response =  await  dao.phoneNumber(phNumber,otp);
          if(!response){
            res.send("error");
           }
           else{
            res.status(200).send("OTP Generated");
           }
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    static async getOTP(req,res,next){
        try{
            const phoneNumber = req.query.phoneNumber;
            console.log(phoneNumber);
            const otp = await dao.getOTP(phoneNumber);
            console.log(otp);
            res.status(200).send(otp.toString());
        }
        catch(e){
            res.status(500).send(e.message);
        }
    }
}