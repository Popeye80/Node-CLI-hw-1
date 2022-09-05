const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const contactToFind = parsedContacts.filter(
      (contact) => contact.id === contactId
    );
    return contactToFind;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const filteredContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return parsedContacts.filter((contact) => contact.id === contactId);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const addedContact = { id: uuidv4(), name, email, phone };
    const newContactsList = [...parsedContacts, addedContact];
    fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return addedContact;
  } catch (error) {
    console.log(error);
  }
}

const updateContact = async (contactId, name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const filteredContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    const updatedContact = { id: contactId, name, email, phone };
    const newContactsList = [...filteredContacts, updatedContact];
    fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return updatedContact;
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
