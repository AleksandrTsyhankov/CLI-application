const contactsArr = {
    listContacts: require('./controllers/contacts/listContacts'),
    getContactById: require('./controllers/contacts/getContactById'),
    removeContact: require('./controllers/contacts/removeContact'),
    addContact: require('./controllers/contacts/addContact'),
}

module.exports = contactsArr;