const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
    state: String,
    totalCases: Number,
    totalDeaths: Number,
    totalRecovered: Number
},
{
    timestamps: true
})

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    favorites: [favoritesSchema]
}, 
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);
