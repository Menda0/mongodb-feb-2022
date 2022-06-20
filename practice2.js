const inquirer = require('inquirer')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
client.connect()

// Listar Contactos
// Criar contactos
// Apagar contactos

function listContacts(contactList){
    // db.business.find()
    // db -> database
    // business -> collection
    // find -> operation

    const database = client.db('contacts')
    const collection = database.collection(contactList)
}

function options(){

    const questions = [
        {
            type: "input",
            name: "contactList",
            message: "Type a contact list"
        },
        {
            type: "rawlist",
            name: "action",
            message: "Choose an action",
            choices: ["List Contacts", "Create Contact", "Remove Contact", "Exit"]
        }
    ]

    inquirer.prompt(questions).then(function (answers){
        const contactList = answers.contactList
        const action = answers.action

        switch(action){
            case "List Contacts":
                listContacts()
                break;
            case "Create Contact":
               // createContact()
                break;
            case "Remove Contact":
                // removeContacts()
                break;
            case "Exit":
                process.exit()
            default:
                options()
        }
    })
}

options()