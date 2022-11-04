var fs = require('fs');
const request = require('request');

const echo = (args, print) => {
    print(args.join(" "));
};

const pwd = (args, print) => {
    print(__dirname.split("\\").at(-1));
}

const date = (args, print) => {
    print(Date())
}

const ls = (args, print) => {
    fs.readdir(".", (error, files)=>{
        if (error) throw error;
        print(files.join("\n"));
    })
}

const cat = (args, print) => {
    fs.readFile(args.at(0), (error, data) => {
        if (error) throw error;
        print(data);
    })
}

const head = (args, print) => {
    fs.readFile(args.at(0), (error, data) => {
        if (error) throw error;
        print(data.split("\n").splice(0, 5).join("\n"));
    })
}

const tail = (args, print) => {
    fs.readFile(args.at(0), (error, data) => {
        if (error) throw error;
        print(data.split("\n").splice(-5).join("\n"));
    })
}

const curl = (args, print) => {
    request(args[0], (error, data)=>{
        if (error) throw error;
        print(data.body);
    })
}


module.exports = {
    echo,
    pwd,
    date,
    ls,
    cat,
    head,
    tail,
    curl,
}