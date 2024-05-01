const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res)=> {

})

///1st check

console.log('Program has started')

fs.readFile('./upload.txt', ()=> {
    console.log('file read complete')
})

setImmediate(()=> {
    console.log('Set immediate callback executed')
})

console.log('Program has Executed')


///2nd check


// server.listen('8000','127.0.0.1',()=>{
//     console.log('listening and watching you...')
// })

