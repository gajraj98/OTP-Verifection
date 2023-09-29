import dao from '../Dao/numbers.js';
import express from 'express';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
const accountSid = "ACc502c1007c37406ca6783b1477c0740c";
const token = "1187316fce9b4f928dadbc5a39c1e645";
const client = twilio(accountSid, token);




export default class Dto {
    static async phoneNumber(req, res, next) {
        try {
            const phNumber = req.body.code + req.body.number;
            console.log(phNumber);
            const min = 1000;
            const max = 9999;
            const otp = Math.floor(Math.random() * (max - min + 1)) + min;

            client.messages.create({
                body: `Alert!! Your Bank account is in problem your otp is ${otp}`,
                to: '+' + phNumber,
                from: '+12565677671'
            })
                .then(message => console.log(message.sid))
                .catch(error => console.error(error.message));




            console.log('stage2');
            const response = await dao.phoneNumber(phNumber, otp);

            if (!response) {
                res.send("error");
            }
            else {
                res.status(200).send("OTP Generated");
            }
        }
        catch (e) {
            res.status(500).send(e.message)
        }
    }
    static async getOTP(req, res, next) {
        try {
            const phoneNumber = req.query.phoneNumber;
            console.log(phoneNumber);
            const otp = await dao.getOTP(phoneNumber);
            console.log(otp);
            res.status(200).send(otp.toString());
        }
        catch (e) {
            res.status(500).send(e.message);
        }
    }
}