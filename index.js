//importing required packages
var inquirer = require('inquirer');
var fs = require('fs');

//initializing the buffer that will be mutated and then written to file
var readmeBuffer = '';

//initializing the object that holds the user's CLI entries
var readmeEntries = 
{
    'title' : '', 
    'desc' : '', 
    'install' : '', 
    'usage' : '', 
    'contrib' : '', 
    'tests' : '', 
    'license' : '', 
    'authorName' : '', 
    'authorEmail' : '',
    'fileName' : ''
};

//a few common licenses to use, along with their url and badge icon markdown
const licenses =
{
    'Apache 2.0': ['https://opensource.org/licenses/Apache-2.0', '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'],
    'Creative Commons Attribution-NonCommercial' : ['https://creativecommons.org/licenses/by-nc/4.0/', '[![License: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc/4.0/)'],
    'GNU GPL v3' : ['https://www.gnu.org/licenses/gpl-3.0', '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'],
    'MIT' : ['https://opensource.org/licenses/MIT', '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'],
    'Mozilla Public License 2.0' : ['https://opensource.org/licenses/MPL-2.0', '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'],
}

//validator for if an entry was left blank
const isAnswerBlank = async (input) =>
{
    if (input == '') return 'This field is required';
    else return true;
}

//these are the main questions that are used to generate the readme
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a brief description of your project:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'install',
        message: 'Enter any installation information required to get your project working, or leave blank:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter any usage information your users should be aware of, or leave blank:',
    },
    {
        type: 'input',
        name: 'contrib',
        message: 'Enter any contributions you would like to attribute to, or leave blank:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter any testing information you would like to include, or leave blank:',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license to use for your project:',
        choices: Object.keys(licenses),
    },
    {
        type: 'input',
        name: 'username',
        message: 'Input your github username:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Input your email address:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'fileName',
        message: 'Enter the desired filename for your .md file:',
        default: 'readme.md',
    }
];

//for writing the readme to disk
function writeToFile(fileName, data)
{
    fs.appendFile(('./output/'+fileName), data, function (err)
    {
        if (err) throw err;
        console.log('Saved!');
    });
}

//takes all the user entries and formats the readme
function createReadme()
{
    readmeBuffer += `# ${readmeEntries.title} ${licenses[readmeEntries.license][1]}\n`;
    readmeBuffer += `### ${readmeEntries.desc}\n`;

    readmeBuffer += `## Table of Contents\n`;
    if (readmeEntries.install != "") readmeBuffer += `- [Installation](#installation)\n`;
    if (readmeEntries.usage != "") readmeBuffer += `- [Usage](#usage)\n`;
    if (readmeEntries.contrib != "") readmeBuffer += `- [Contributions](#contributions)\n`;
    if (readmeEntries.tests != "") readmeBuffer += `- [Testing](#testing)\n`;
    readmeBuffer += `- [License](#license)\n`;
    readmeBuffer += `- [Questions](#questions)\n`;

    if (readmeEntries.install != "") readmeBuffer += `## Installation:\n${readmeEntries.install}\n`;
    if (readmeEntries.usage != "") readmeBuffer += `## Usage\n${readmeEntries.usage}\n`;
    if (readmeEntries.contrib != "") readmeBuffer += `## Contributions\n${readmeEntries.contrib}\n`;
    if (readmeEntries.tests != "") readmeBuffer += `## Testing\n${readmeEntries.tests}\n`;
    readmeBuffer += `## License\nThis project utilizes the <a href="${licenses[readmeEntries.license][0]}">${readmeEntries.license}</a> license.\n`;
    readmeBuffer += `## Questions\nFor questions, you may contact ${readmeEntries.authorName} via email: <a href="mailto:${readmeEntries.authorEmail}">${readmeEntries.authorEmail}</a>`;

    console.log('Readme file created, saving to disk.');
    writeToFile(readmeEntries.fileName, readmeBuffer);
}

//the initial function that prompts the user with the readme questions
function init()
{
    inquirer.prompt(questions)
    .then((answers) =>
    {
        readmeEntries.title = answers.title;
        readmeEntries.desc = answers.description;
        readmeEntries.install = answers.install;
        readmeEntries.usage = answers.usage;
        readmeEntries.contrib = answers.contrib;
        readmeEntries.tests = answers.tests;
        readmeEntries.license = answers.license;
        readmeEntries.authorName = answers.username;
        readmeEntries.authorEmail = answers.email;
        readmeEntries.fileName = answers.fileName;

        console.log('Responses logged, creating readme file.');
        createReadme();        
    })
    .catch((error) =>
    {
        if (error.isTtyError)
        {
            console.log('prompt cannot- be rendered in the current environment.');
        } else
        {
            console.log('something went wrong.')
        }
    });
}

//an introduction to the script that confirms user intent before capturing CLI focus
console.log('Welcome to the readme generation script. This tool will generate a pre-formatted readme.md based on your parameters.');
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
        else return console.log('Goodbye.');
    });