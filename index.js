// Import the 'inquirer' module
const inquirer = require('inquirer');
// Imports the 'fs' module for file manipulation.
const fs = require('fs');

// License information with badge URLs
const licenses = {
  'MIT': {
    badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    notice: 'This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).',
  },
  'Apache-2.0': {
    badge: '[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    notice: 'This project is licensed under the [Apache-2.0 License](https://opensource.org/licenses/Apache-2.0).',
  },
  'GPL-3.0': {
    badge: '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    notice: 'This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0).',
  },
  'Other': {
    badge: '',
    notice: '',
  },
};

// Prompts for user information
const prompts = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How to install your project:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Write instructions on how to use your project:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: Object.keys(licenses),
  },
  {
    type: 'confirm',
    name: 'contributing',
    message: 'Do you want a section on contributing to your project?',
  },
  {
    type: 'confirm',
    name: 'tests',
    message: 'Do you want a section on tests for your project?',
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username (optional):',
  },
  {
    type: 'input',
    name: 'emailAddress',
    message: 'Enter your email address (optional):',
  },
  {
    type: 'input',
    name: 'myName',
    message: 'Enter your name and last name (optional):',
  },
];