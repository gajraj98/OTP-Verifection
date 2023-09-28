import mongodb from 'mongodb';
const objectId = mongodb.ObjectId;
let session;
export default class Dao{
    static async injectDb(conn){
         if(session){
            return;
         }
         try{
            session = await conn.db('otpBox').collection('otp');
         }
         catch(e){
            console.log("error in indexDao" + e.message);
         };
    }
   
    static async phoneNumber(phNumber,otp){
        try{
            const list = {
               phNumber:phNumber,
               otp:otp,
            };
          return  await session.insertOne(list)
       }
       catch(e){
           console.log(e.message);
           return {Error:e.message};
       }
    }
    static async getOTP(phoneNumber) {
      try {
         console.log(phoneNumber);
          const otpRecord = await session
          .find({ phNumber:  phoneNumber.toString() })
          .sort({ timestamp: -1 })
          .limit(1)
          .toArray();
  
          return otpRecord[0].otp; // Return the result
      } catch (e) {
          return e; // Handle any errors here
      }
  }
  
  
}