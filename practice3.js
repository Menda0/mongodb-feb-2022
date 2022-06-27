// 1. Search for a contact in my contact list
// 2. List all my contacts in alphabetic order
// 3. Create a pagination system that shows all my contacts

//  Marco - 20365353
//  Danilo - 34255342
//  More(y/n) y
//  Tiago - 6452432
//  Aguiar - 436345523

const MongoClient = require("mongodb").MongoClient
const inquirer = require("inquirer")

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
client.connect()
const database = client.db("contacts")

// List all contacts paginated and ordered
function listContacts(contactList){
    console.log("TODO: Listing contact list ...")
    options()
}

async function options(){

    // Question to be asked to the user
    const questions = [
        {
            type: "input",
            name: "contactList",
            message: "Please type a contact list"
        },
        {
            type: "rawlist",
            name: "action",
            message: "Choose an action",
            choices: ["List Contacts", "Search Contact", "Exit"]
        }
    ]

    // Ask questions to the user
    const answers = await inquirer.prompt(questions)

    const {contactList, action} = answers

    switch(action){
        case "List Contacts":
            // if action == List Contacts
            listContacts(contactList)
            break
        case "Search Contact":
            // if action == Search Contact
            // searchContact
            break
        case "Exit":
            // if action == Exit
            // close program
            process.exit()
        default:
            // else show interface again
            options()
    }
}

// run interface
options()