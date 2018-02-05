const fs = require('fs');

export const read = (index) => {
    fs.readFile(`${__dirname}/database.db`, 'utf8', (err, data) => {
        console.log("---------------------------------------")
        if (err) {
            console.log("---------------- ERROR ----------------");
        } else {
            const result = data.split('\n')[index].split(',')[1];
            console.log("DATA:", result);
            console.log("--------------- SUCCESS ---------------")
        }
        console.log("---------------------------------------")
    });
}