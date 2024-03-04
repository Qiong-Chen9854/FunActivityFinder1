import bodyParser from "body-parser";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));






app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {

  try{
    const type = req.body.type;
    const participants = req.body.participants
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`)
    const results = response.data;
    res.render("index.ejs",{
      data:results[Math.floor(Math.random()*results.length)],
    });
  } catch(error){
    res.render("index.ejs",{
      error:error.message,
    })
  }
});


app.listen(port,()=>{
  console.log(`Listening on port ${port}.`);
});



// document.querySelector(".go-Go").addEventListener("click",function(){
//   var buttonClicked = this.innerHTML;
//   playAnimation(buttonClicked);
// });

// function playAnimation(buttonClicked){
//   var button = document.querySelector(".go-"+buttonClicked);
//   currentButton.classList.add("pressed");

//   setTimeout(() => {
//     currentButton.classList.remove("pressed");
//   }, 100);
// }