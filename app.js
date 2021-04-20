const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
  var cityName=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=3739ed2e832ca6b066e2fb1d9a002e1e#";
  https.get(url , function(response)
   {
     response.on("data",function(data)
     {
       const x=JSON.parse(data);
       const temp=x.main.temp;
       const icon=x.weather[0].icon;
       const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<h1>The Temp of "+cityName+" is "+temp+" degree celcius</h1>");//pta ni bina h1 likhe neeche wala img ni ata
       res.write("<img src="+imgUrl+">");
       res.send();
     });
  });
});
app.listen(process.env.PORT || 8081, function() {
  console.log("Server running at 8081");
});
