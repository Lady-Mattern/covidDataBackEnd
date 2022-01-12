const express = require('express');
const indexRouter = express.Router();

const User = require('../models/user');
const CovidData = require('../models/covidData');

indexRouter.get('/data/seed', async (req, res) => {
    const data = [
        {
            state: 'CA',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (700000 - 200000) + 200000),
            totalRecovered: Math.floor(Math.random() * (1000000 - 3500000) + 1000000)
        },
        {
            state: 'PA',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (700000 - 200000) + 200000),
            totalRecovered: Math.floor(Math.random() * (3500000 - 1000000) + 1000000)
        },
        {
            state: 'OH',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (700000 - 200000) + 200000),
            totalRecovered: Math.floor(Math.random() * (3500000 - 1000000) + 1000000)
        },
        {
            state: 'NY',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (700000 - 200000) + 200000),
            totalRecovered: Math.floor(Math.random() * (3500000 - 1000000) + 1000000)
        },
        {
            state: 'OR',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (700000 - 200000) + 200000),
            totalRecovered: Math.floor(Math.random() * (3500000 - 1000000) + 1000000)
        },
        {
            state: 'MI',
            totalCases: Math.floor(Math.random() * (5000000 - 1000000) + 1000000),
            totalDeaths: Math.floor(Math.random() * (200000 - 700000) + 200000),
            totalRecovered: Math.floor(Math.random() * (1000000 - 3500000) + 1000000)
        },
    ]
    await CovidData.deleteMany({}) //deleted everything in the database
    await CovidData.create(data); //created new data from the seed data above. 
    res.redirect('/data')
})

indexRouter.get('/data', async (req, res) => {
    try {
        res.status(200).json(await CovidData.find({}))
    } catch (err) {
        res.status(400).json(error)
    }
})


module.exports = indexRouter;