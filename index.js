const express=require('express')
const app=express()
const cron = require("node-cron");
var cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000
const dbref = require("./db");
const db = dbref.admin.firestore();

/* the job will start at every 12 am */
cron.schedule("* 0 * * *", async() => {
 
    try{
        let ids=[]
        var payload = {
            notification: {
            title: "Reminder",
            body: "Please pay the dues."
            }
        };
  

        var options = {
            priority: "high",
            timeToLive: 60 * 60 *24
        };
       const documents=await db.collection("Users").get()

        const docref=await documents.forEach(async doc => {
        let subCollectionDocs = await  db.collection("Users").doc(doc.id).collection("Payments").get()
        subCollectionDocs.forEach(async(subdoc) => {
                if(ids.indexOf(doc.id)==-1 && subdoc.data().status==false)
                {
                    const sendNotification=await dbref.admin.messaging()
                    .sendToDevice(doc.data().token, payload, options)
                    ids.push(doc.id)
                   
                }
        }) 
    })
    
    }
    catch(e)
    {
            console.log(e)
    }
  },{
    scheduled: true,
    timezone: "Asia/Karachi"
  });
app.listen(port)