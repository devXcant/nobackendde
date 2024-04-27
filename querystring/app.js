const fs = require ('fs');
const readline = require('readline');
const http = require('http')
const html = fs.readFileSync('./index.html','utf-8')
const url = require('url')

const server = http.createServer((req,res)=> {
    let {query, pathname:path} = url.parse(request.url,true)
    console.log(x)
    // let path = req.url;
    if(path === '/' || path.toLocaleLowerCase() ==='/home'){
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        })
        res.end(html.replace('{{%CONTENT%}}', 'You are in home page'))
    } else  if(path.toLocaleLowerCase() ==='/about'){
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        })
        res.end(html.replace('{{%CONTENT%}}', 'You are in About page'))
    }else  if(path.toLocaleLowerCase() ==='/contact'){
        res.writeHead(200,{
            'Content-Type' : 'text/html'
        })
        res.end(html.replace('{{%CONTENT%}}', 'You are in Contact page'))
    } else {
        res.writeHead(404,{
            'Content-Type' : 'text/html'
        })
        res.end(html.replace('{{%CONTENT%}}', 'Error 404: Page not found'))
    }

    
})

server.listen('8000','127.0.0.1',()=>{
    console.log('listening....')
})