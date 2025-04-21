const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.listen(3000,()=>{
    console.log(`server is running`);
})