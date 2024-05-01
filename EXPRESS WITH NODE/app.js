const express = require('express');
let app = express();

//create a server
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
})

//Route = http method + url
// app.get('/', (req,res)=> {
//     res.status(200).json({message: 'hello world',status: '200'})
// })

app.get('/', (req,res)=> {
    res.status(200).send('<h1> Hello from expresss server </h1>')
})

// app.post('/', (req,res)=> {
//     res.status(200).json({message: 'hello world',status: '200'})
// })


