const fs = require('fs')
const readline = require('readline')
const http = require('http')

const server = http.createServer((req,res)=> {
  fs.readFile('./index.html','utf-8',(err,data)=>{
      res.end(data)
  })
   
})

server.listen('8000','127.0.0.1',()=> {
    console.log('listening....')
})