const fs = require('fs');
const http = require('http');
const url = require('url');

const html = fs.readFileSync('./index.html', 'utf-8');
const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
const productlist = fs.readFileSync('./productlist.html', 'utf-8');

function replaceHtml(template, product) {
    let output = template
        .replace('{{%NAME%}}', product.name)
        .replace('{{%USERNAME%}}', product.username)
        .replace('{{%EMAIL%}}', product.emails)
        .replace('{{%PASSWORD%}}', product.password)
        .replace('{{%PHONE%}}', product.phoneNumber);

    return output;
}

const server = http.createServer((req, res) => {
    const { query, pathname: path } = url.parse(req.url, true);

    if (path === '/' || path.toLowerCase() === '/home') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html.replace('{{%CONTENT%}}', productlist));
    } else if (path.toLowerCase() === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html.replace('{{%CONTENT%}}', 'You are in About page'));
    } else if (path.toLowerCase() === '/contact') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(html.replace('{{%CONTENT%}}', 'You are in Contact page'));
    } else if (path.toLowerCase() === '/products') {
        if (!query.id) {
            let productListArray = products.map((prod) => {
                return replaceHtml(productlist, prod);
            });
            let productresponseHtml = html.replace('{{%CONTENT%}}', productListArray.join(','));
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(productresponseHtml);
        } else {
            res.end('This is a product with ID = ' + query.id);
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(html.replace('{{%CONTENT%}}', 'Error 404: Page not found'));
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('listening....');
});
