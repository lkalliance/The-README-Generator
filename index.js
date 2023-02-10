// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generate = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    { message: "What is this application's TITLE?", name: "title", type: "input" },
    { message: "What is this application's DESCRIPTION?", name: "description", type: "input" },
    { message: "What is this application's INSTALLATION INSTRUCTIONS?", name: "installation", type: "input" },
    { message: "What is this application's USAGE INFORMATION?", name: "usage", type: "input" },
    { message: "What are some of this application's FEATURES?", name: "features", type: "input" },
    { message: "What is this application's CONTRIBUTION GUIDELINES?", name: "contributions", type: "input" },
    { message: "What is this application's TEST INSTRUCTIONS?", name: "test", type: "input" },
    { message: "What are the CREDITS for this application?", name: "test", type: "input" },
    { message: "What is your GITHUB USERNAME?", name: "username", type: "input" },
    { message: "What is your EMAIL ADDRESS?", name: "email", type: "input" },
    { message: "Under what LICENSE is this application published?", name: "license", type: "list", choices: ["Apache", "FreeBSD", "Revised BSD", "GPL", "Library GPL", "MIT", "Mozilla", "Creative Commons", "Eclipse", "none"] },
    { message: "What is the NAME to put on the copyright notice?", name: "copyright", thpe: "input" }
];

// TODO: Create a function to write README file

// to create a new file: fs.writeFile('path', content, err=>etc.)
// to append to an existing file: fs.appendFile('path', content, err=>etc.)



// TODO: Create a function to initialize app
function init() {
    console.log(`
\x1b[33mWelcome to the README generator.
Respond to any or all questions below
to generate a new README file.

To create a new paragraph, insert "PPP".
To create a bullet point, preface with
"BBB" for each, and insert "PPP" to
return to regular text.
`)
    askQs(questions);
}

// Function call to initialize app
init();

function askQs(qs) {
    inquirer.prompt(
        qs
    )
    .then( (response, err) => {
       if (err) console.log(err)
       else writeToFile(response);
       //writeToFile(generate.createText(response))
    })
}

function writeToFile(data) {
    // This function takes the accumulated data and writes the README
    fs.writeFile('./result/README.md', generate.createText(data), (err) => {
        if (err) console.log(err)
    });
}
