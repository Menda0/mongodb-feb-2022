// 1. Create an interface that asks the user to add a contact and ask organization info as well
// (Use normalize data model)
// 2. Create an interface that shows the total number of contacts by organization

// Company, Total
// MoOngy, 100
// Betacode, 10
// Auchan, 3

// 3. Create an interface that list all contact numbers of one organization

// Company, Numbers
// MoOngy, ["+351 54634566345", "+351 455325324"]

// 1. Training aggregate
// 2. Training operation $group
// 2.1 Training $sum
// 2.2 Training $push or $addToSet
// 3. Training $lokup

// 4. Create an interface that list all contacts with organization info

const inquirer = require('inquirer')
const MongoClient = require("mongodb").MongoClient

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)
client.connect()
const db = client.db("contacts")
const business = db.collection("business")
const companies = db.collection("companies")


async function insertContact(){
    const listCompanies = await companies.find().toArray()
    const questions = [
        {
            type: "input",
            name: "name",
            message: "Contact Name"
        },
        {
            type: "input",
            name: "number",
            message: "Type a number"
        },
        {
            type: "list",
            name: "company",
            message: "Choose a company",
            choices: listCompanies.map(function(c){
                return {
                    "name": c.name,
                    value: c._id
                }
            })
        }
    ]

    const contact = await inquirer.prompt(questions)

    const result = await business.insertOne(contact)
    console.log("New contact inserted with name "+contact.name)
    menu()
}

async function menu() {
    const questions = [
        {
            type:"rawlist",
            name:"action",
            message:"Choose an action",
            choices: ['Insert Business Contact', 'List Business Contacts', 'Get total contacts', 'Get all contacts of company', 'Exit']
        }
    ]

    const {action} = await inquirer.prompt(questions)

    switch(action){
        case "Insert Business Contact":
            insertContact()
            break
        case "List Business Contacts":
            // listBusinessContacts()
            break
        case "Get Total Contacts":
            // getTotalContacts()
            break
        case "Get all contacts of company":
            // getAllContactsOfCompany()
            break
        case 'Exit':
            process.exit()
        default:
            menu()
    }
}

menu()