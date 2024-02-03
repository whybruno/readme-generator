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

// Generate README template based on user input
function generateReadme(answers) {
  const licenseInfo = licenses[answers.license];

  let readme = `# ${answers.title}\n\n`;
  if (answers.license !== 'Other') {
    readme += `${licenseInfo.badge}\n\n`;
  };
  readme += `## Table of Contents\n\n`;
  readme += `* [Installation](#installation)\n`;
  readme += `* [Usage](#usage)\n`;
  readme += `* [License](#license)\n`;
  if (answers.contributing) {
    readme += `* [Contributing](#contributing)\n`;
  }
  if (answers.tests) {
    readme += `* [Tests](#tests)\n`;
  }
  readme += `* [Questions](#questions)\n\n`;
  readme += `## Installation\n\n`;
  readme += `${answers.installation}\n\n`;
  readme += `## Usage\n\n`;
  readme += `${answers.usage}\n\n`;
  readme += `## License\n\n`;
  readme += `${licenseInfo.notice}\n\n`;
  readme += `Copyright © 2024 ${answers.myName}.\n\n`;
  if (answers.contributing) {
    readme += `## Contributing\n\n`;
    readme += `See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on contributing to this project.\n\n`;
  }
  if (answers.tests) {
    readme += `## Tests\n\n`;
    readme += `See [TESTING.md](./TESTING.md) for details on running tests for this project.\n\n`;
  }
  readme += `## Questions\n\n`;
  if (answers.githubUsername) {
    readme += `If you have any questions, feel free to reach out to me on GitHub: [${answers.githubUsername}](https://github.com/${answers.githubUsername}).\n\n`;
  } else {
    readme += `If you have any questions, feel free to reach out to me.\n\n`;
  };
  if (answers.emailAddress) {
    readme += `[Ask Me](mailto:${answers.emailAddress})\n\n`;
  };

  return readme;
};

// Function to generate the CONTRIBUTING.md file
function generateContributing(answers) {
  if (!answers.contributing) return;

  const contributingContent = `# How to Contribute

  Thank you for your interest in contributing to the ${answers.title} project!

  ## Guidelines

  * Make sure you have read and understood the [README.md](./README.md).
  * Follow project style conventions.
  * Create branches for your changes.
  * Write commits with clear and concise messages.
  * Submit pull requests to the main branch.

  ## Testing

  * Run tests before submitting a pull request.
  * Fix all testing errors before requesting review.

  ## Questions

  If you have any questions, feel free to open an issue on GitHub.

  `;

  fs.writeFile('CONTRIBUTING.md', contributingContent, (err) => {
    if (err) {
      console.error('Error creating CONTRIBUTING:', err);
    } else {
      console.log('CONTRIBUTING.md generated successfully!');
    };
  });
};

// Run the application
inquirer.prompt(prompts).then((answers) => {
  const readmeContent = generateReadme(answers);
  fs.writeFile('README.md', readmeContent, (err) => {
    if (err) {
      console.error('Error creating README:', err);
    } else {
      console.log('README.md generated successfully!');
    }
  });
  // Call the generateContributing function
  generateContributing(answers);
});