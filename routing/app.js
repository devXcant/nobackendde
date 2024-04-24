const fs = require ('fs');
const readline = require('readline');
const http = require('http')
const html = fs.readFileSync('./index.html','utf-8')

const server = http.createServer((req,res)=> {
    let path = req.url;
    if(path === '/' || path.toLocaleLowerCase() ==='/home'){
        res.end(html)
    } else  if(path.toLocaleLowerCase() ==='/about'){
        res.end('your in about page')
    }else  if(path.toLocaleLowerCase() ==='/contact'){
        res.end('your in contact page')
    } else {
        res.end('Error 404: PAge not found')
    }

    
})

server.listen('8000','127.0.0.1',()=>{
    console.log('listening')
})