const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidDataSchema = new Schema({
    state: String,
    totalCases: Number,
    totalDeaths: Number,
    totalRecovered: Number
}, 
{
    timestamps: true
})

module.exports = mongoose.model('CovidData', covidDataSchema);
