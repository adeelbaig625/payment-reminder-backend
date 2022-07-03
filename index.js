const express=require('express')
const app=express()
const cron = require("node-cron");
var cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000
const dbref = require("./db");
const db = dbref.admin.firestore();
app.get('/sendnoti',async(req,res)=>
{
    let ids=[]
    try{
       const documents=await db.collection("Users").get()
    const docref=await documents.forEach(async doc => {
        console.log("Parent Document ID: ", doc.id);
        let subCollectionDocs = await  db.collection("Users").doc(doc.id).collection("Payments").get()
        subCollectionDocs.forEach(subdoc => {
                if(ids.indexOf(doc.id)==-1)
                {
                    console.log(subdoc.id)
                    ids.push(doc.id)
                }
        })
       
    })
    console.log(ids)
    }
    catch(e)
    {

    }
    
       
    });
  
//   const tokens = ["cqDUImaHG6D8TDYWYs0G8_:APA91bGp-cICCroJdoxDZIsjIXQosvBshYOkKMkEL-jtGdl7rP1rVXNCOcZ6r074b2-utByaXAskMbwAjIS9YQ26h17XS7Vds7tRnjb6eV72x2dd3naTrdp5R2INOrMGHx_5R7YPMa1i"];
//   var payload = {
//     notification: {
//       title: "Reminder",
//       body: "Please pay the dues."
//     }
//   };
  
//    var options = {
//     priority: "high",
//     timeToLive: 60 * 60 *24
//   };
  
//   dbref.admin
//     .messaging().sendToDevice("cqDUImaHG6D8TDYWYs0G8_:APA91bGp-cICCroJdoxDZIsjIXQosvBshYOkKMkEL-jtGdl7rP1rVXNCOcZ6r074b2-utByaXAskMbwAjIS9YQ26h17XS7Vds7tRnjb6eV72x2dd3naTrdp5R2INOrMGHx_5R7YPMa1i", payload, options)
//     .then((result) => {
//     return  res.status(200).json({message:"success"})
//     })
//     .catch((err) => {
//       console.log(err)
//       return res.status(502).json({message:err})
//     });
// });
cron.schedule("0 0 * * *", () => {
 
  console.log("hello")
  },{
    scheduled: true,
    timezone: "Asia/Karachi"
  });
app.listen(port)