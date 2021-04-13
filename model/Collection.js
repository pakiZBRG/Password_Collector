const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: String,
    webisteUrl: String,
    passwords: [{
        single: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Password",
            required: true
        }
    }]
})

module.exports = mongoose.model("Collection", collectionSchema);