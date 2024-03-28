const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db.config")
const router = require("./routes/index")
db.sequelize.sync();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/v1/',router)

app.get('/test',(req,res)=>{
  res.send('server is working fine')
})


const PORT = 8080;
app.listen(PORT, () => {
console.log (`Server is running on port ${PORT}`);
});