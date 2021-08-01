const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const { static } = require("express");
const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res)
{
    var firstn=req.body.fname;
    var snamee=req.body.sname;
    var email=req.body.email;
    var phone=req.body.number;
    var data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields :{
                    FNAME:firstn,
                    LNAME:snamee,
                    PHONE:phone
                }
            }
        ]
        
    };
    var jsonData=JSON.stringify(data);
    var options={
         url:"https://us7.api.mailchimp.com/3.0/lists/1365616ffd ",
         method: "POST",
         headers:{
             "Authorization": "Sunidhi1 f2200fdf68657b806f236318218f7b23-us7"
         },
          body: jsonData
        };
    request(options,function(error, response, body){
    if(error)
    {
        res.sendFile(__dirname+"/failure.html");
    }
    else{
       if(response.statusCode===200)
       {
        res.sendFile(__dirname+"/success.html");
       }
       else{
        res.sendFile(__dirname+"/failure.html");
       }
    }
    }); 
});
app.post("/failure.html",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000,function()
{
    console.log("System is running on port 3000.");
});

 
