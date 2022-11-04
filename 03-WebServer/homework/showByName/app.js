var fs  = require("fs")
var http  = require("http")
const { Http2ServerRequest } = require("http2")

// Escribí acá tu servidor
http.createServer((req, res)=>{
    const name = req.url.slice(1) // sin slice el req.url es /badboy, /resaca, etc. Con slice eliminamos el primer elemento de la string, la '/'.
    const files = fs.readdirSync("./images");
    for (const file of files) {
        if (file.includes(name)){
            res.writeHead(200, {"content type" : "image/jpg"})
            const img = fs.readFileSync(`./images/${name}_doge.jpg`) // Hay que leer la imagen antes de enviarla como response. 
            res.end(img);
        }
    }
    return res.writeHead(404).end("Not Found");
}).listen(3000, "localhost");