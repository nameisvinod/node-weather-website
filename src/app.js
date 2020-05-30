const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alucardan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        img: '/img/me.jpg',
        name: 'Alucardan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Weather helper',
        name: 'Alucardan'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            err: 'please provide an address'
        })
    }
    geocode(address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Alucardan',
        errormsg: 'Help docs not found',
        errorimg: '/img/404.jpg'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alucardan',
        errorimg: '/img/404.jpg'
    })
})

app.listen(port, () => {
    console.log('server started in port ' + port)
})