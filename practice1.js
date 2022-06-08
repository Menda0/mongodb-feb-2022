/*
* === GOAL ===
* Create a command line interface to create and list and remove contact folders
* Every contact folder should be a container
* Create a command to create
* Create a command to list
* Create a command to remove
* */

const MongoClient = require("mongodb").MongoClient
const inquirer = require("inquirer")

const url = "mongodb://localhost:27017/contacts"
const client = new MongoClient(url)
client.connect()

async function listContactLists(){
    // show collections
    // use databaseName - Create and select database
    const database = client.db("contacts")

    // Get all collections in list form
    const collections = await database.listCollections().toArray()

    const formatedCollections = []
    for(const c of collections){
        formatedCollections.push({
            "name": c.name
        })
    }

    // Print all collection on the screen
    console.table(formatedCollections)

    menu() // Show menu again. Execute new tasks
}

function menu() {
    inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'action',
                message: 'Action',
                choices: ['List Contact Lists', 'Create Contact List', 'Remove Contact List'],
            },
        ])
        .then(function (answers) {
            switch (answers['action']) {
                case "List Contact Lists":
                    listContactLists();
                    break;
                case "Create Contact List":
                    // createContactList();
                    break;
                case "Remove Contact List":
                    // removeContactList();
                    break;
                default:
                    menu();
            }
        })
        .catch(error => {
            console.log(error);
        });
};
menu();