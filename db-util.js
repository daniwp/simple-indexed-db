const fs = require('fs');

export const writeIndexMap = (index, map) => {
    try {
        fs.writeFileSync(`${__dirname}/index-map.db`, `${index}::${JSON.stringify(map)}`);
    } catch (err) { console.log(err) }
}

export const readIndexMap = () => {
    return fs.readFileSync(`${__dirname}/index-map.db`, 'utf8');
}

export const fileExists = () => {
    return fs.existsSync(`${__dirname}/index-map.db`);
}
