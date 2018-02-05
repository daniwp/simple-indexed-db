const fs = require('fs');

export const write = (key, value) => {
    fs.appendFile(`${__dirname}/database.db`, `${key},${value}\n`, (err) => {
        console.log("---------------------------------------")
        err
            ? console.log("---------------- ERROR ----------------")
            : console.log("--------------- SUCCESS ---------------");
        console.log("---------------------------------------")
    })
};

