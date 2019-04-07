const express = require('express')
const mongoose = require('mongoose')
const config = require('./config.json')
const path = require('path');



const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
        // .then(console.log('Connected MongoDb'))
        // .catch(console.log)
				
// ========== middleware parser(3rd/built-in) ==========
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// const {Users} = require('./models/users');


// config routes
// app.use('/api/users', require('./routes/users'))
// app.use('/api/store', require('./routes/api/store'))
// app.use('/api/item', require('./routes/api/item'))

const port = process.env.PORT | 6000
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
