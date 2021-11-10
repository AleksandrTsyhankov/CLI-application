const { Command } = require('commander');
const chalk = require('chalk');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
(async ({ action, id, name, email, phone }) => {
    try {
        switch (action) {
            case 'list':
                const contacts = await listContacts();
                console.table(contacts);
                break;
        
            case 'get':
                const contactById = await getContactById(id);
                if (contactById) {
                    console.log(chalk.green('Contact found'));
                    console.log(contactById);
                    return;
                }
                console.log(chalk.yellow('Contact not found'));
                break;
        
            case 'add':
                const contact = await addContact(name, email, phone);
                console.log(chalk.green('Add new contact'));
                console.log(contact);
                break;
        
            case 'remove':
                const removedContact = await removeContact(id);
                console.log(chalk.red('Contact was deleted:'))
                console.log(removedContact);
                break;
        
            default:
                console.warn(chalk.red('31m Unknown action type!'));
        }
    } catch (error) {
        console.error(chalk.red(error.message));
    }
})(argv);

