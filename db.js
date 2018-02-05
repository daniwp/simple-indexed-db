import { write } from './db-write';
import { read } from './db-read';
import { writeIndexMap, readIndexMap, fileExists } from './db-util';

process.stdin.resume();
process.stdin.setEncoding('utf8');

let index = -1;
let hashMap = {};

initiate();
setupUserInputHandler();

function setupUserInputHandler() {
    process.stdin.on('data', (argv) => {
        try {
            const input = argv.trim().split("::");
            const cmd = input[0].trim();
            switch (cmd) {
                case "help":
                    handleHelp();
                    break;
                case "write":
                    handleWrite(input);
                    break;
                case "read":
                    handleRead(input);
                    break;
                case "exit":
                    console.log("Connection closed...")
                    process.exit();
                default:
                    console.log("Unknown command");
            }
        } catch (err) {
            console.log("ERROR", err);
        }
    });
}

function handleRead(input) {
    const key = input[1].trim();
    const index = hashMap[key];

    index || index > -1
        ? read(index)
        : console.log("NO ENTRIES FOUND")
}

function handleWrite(input) {
    if (!input[1] || !input[2]) {
        console.log("WRONG ARGUMENTS (Write help:: for commands)");
        return;
    };

    const key = input[1].trim();
    const value = input[2].trim();

    if (hashMap[key] !== undefined) {
        console.log("DUPLICATE ENTRY - DB DOES NOT SUPPORT EDITS :( ")
        return;
    }
    hashMap[key] = ++index;

    write(key, value);
}

function handleHelp() {
    console.log("\nCOMMANDS:\n");
    console.log("Write to DB: 'write:: key:: value'");
    console.log("Read from DB: 'read:: key'\n");
}

function initiate() {
    setupExitHandlers();
    retrieveIndexMap();
}

function setupExitHandlers() {
    process.on('exit', () => { writeIndexMap(index, hashMap); })
    process.on('uncaughtException', () => { writeIndexMap(index, hashMap); })
    process.on('SIGINT', () => { writeIndexMap(index, hashMap); })
    process.on('SIGTERM', () => { writeIndexMap(index, hashMap); })
}

function retrieveIndexMap() {
    console.log("---------------------------------------")
    console.log("---------- DATABASE STARTED -----------")
    console.log("---------------------------------------")
    console.log("Write 'help::' for commands\n")
    try {
        if (fileExists()) {
            let data = readIndexMap()
            if (data) {
                data = data.split('::');
                index = data[0];
                try {
                    hashMap = JSON.parse(data[1]);
                } catch (err) { console.log(err) }
            }
        }
    } catch (err) {
        console.log(err)
    }
}