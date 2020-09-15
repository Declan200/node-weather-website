const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
    //define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Declan Glover'
    })
})
app.get('/about', (req, res) => [
    res.render('about', {
        title: 'About',
        name: 'Declan Glover'
    })
])
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Declan Glover',
        helpMessage: 'For support please email Declan',
        errorMessage: 'Page not Found'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })
        }
        console.log(req.query.search)
        res.send({
            products: []
        })
    })
    //app.com
    //app.com/help
    //app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Declan Glover',
        errorMessage: 'Help article not found',
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Declan Glover',
        errorMessage: 'Page not found'

    })
})

app.listen(port, () => {
        console.log('Server is up on port ' + port)
    })
    //defailt locahost connection example below
    // app.listen(3000, () => {
    //     console.log('Server is up on port 3000.')
    // })

console.log('This is a test')