const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res) =>{
    res.render('index' ,{
        title:'Weather App',
        name: 'Manoj Kumar'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
      title:'About Me',
      name:'Manoj kumar'

    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        helpText: 'This is some helpful text',
        title:'Help',
        name:'Manoj kumar'
    })
})

app.use(express.static(publicDirectoryPath))



// app.get('/help',(req,res) =>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },{
//         name:'Manoj',
//         age:45
//     }
// ])
// })
// app.get('/about',(req,res) =>{
//     res.send('<h1>About<h1>')
// })
app.get('/weather',(req,res) =>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
    

    // res.send({
    //     forecast:'It is snowing',
    //     location:'bangalore',
    //     address:req.query.address
    // })
})
app.get('/products',(req,res) =>{
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
    products:[]
   })
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Manoj kumar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res)=> {
 res.render('404',{
    title:'404',
    name:'Manoj kumar',
    errorMessage:'Page not found.' 
 })
})

app.listen(port,() =>{
    console.log('Server is up on the port 3000'+port)
})