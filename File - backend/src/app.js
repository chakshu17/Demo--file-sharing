const express = require('express');
const app = express();
const routes = require('./routes/file.route')
/* middle ware */
const cors = require('cors')
app.use(express.json())
/* db connect */
require('./db/db')
app.use(cors())
app.use('/files', routes)
app.listen(4000, () => {
    console.log("Applcaition Served");
})