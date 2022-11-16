// TODO: Include packages needed for this application
var inquirer = require('inquirer');
var fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a brief description of your project',
    },
    {
        type: 'input',
        name: 'install',
        message: 'Enter any installation information required to get your project working, or leave blank',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter any usage information your users should be aware of, or leave blank',
    },
    {
        type: 'input',
        name: 'contrib',
        message: 'Enter any contributions you would like to attribute to, or leave blank',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter any testing information you would like to include, or leave blank',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license to use for your project',
        choices: ['License 1', 'License 2', 'License 3'],
    },
    {
        type: 'input',
        name: 'username',
        message: 'Input your github username',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Input your email address',
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init()
{
    inquirer.prompt(questions)
    .then((answers) =>
    {
        console.log(answers);
    })
    .catch((error) =>
    {
        if (error.isTtyError)
        {
        // Prompt couldn't be rendered in the current environment
        } else
        {
        // Something else went wrong
        }
    });
}

// Function call to initialize app
console.log("Welcome to the readme generation script. This tool will generate a pre-formatted readme.md based on your parameters.");
inquirer.prompt(
    [
        {
            type: 'confirm',
            name: 'begin',
            message: 'Would you like to begin?',
        }
    ]).then((response) =>
    {
        if (response.begin) return init();
        else return console.log("Goodbye.");
    });
