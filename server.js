const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

// Middelware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Database Connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Routes
app.use("/users", require('./routes/users'));
app.use("/passwords", require('./routes/passwords'));
app.use("/collections", require('./routes/collections'));
app.get('/', (req, res) => {
    res.send("Server running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));