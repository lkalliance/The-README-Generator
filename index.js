// Packages to include in this application.
const fs = require('fs');
const inquirer = require('inquirer');
const generate = require('./utils/generateMarkdown.js');

// The questions that the user will be prompted with
const questions = [
    { message: "What is this application's TITLE?", name: "title", type: "input" },
    { message: "What is this application's DESCRIPTION?", name: "description", type: "input" },
    { message: "What is this application's INSTALLATION INSTRUCTIONS?", name: "installation", type: "input" },
    { message: "What is this application's USAGE INFORMATION?", name: "usage", type: "input" },
    { message: "What are some of this application's FEATURES?", name: "features", type: "input" },
    { message: "What is this application's CONTRIBUTION GUIDELINES?", name: "contributions", type: "input" },
    { message: "What is this application's TEST INSTRUCTIONS?", name: "test", type: "input" },
    { message: "What are the CREDITS for this application?", name: "credits", type: "input" },
    { message: "What is your GITHUB USERNAME?", name: "username", type: "input" },
    { message: "What is your EMAIL ADDRESS?", name: "email", type: "input" },
    { message: "Under what LICENSE is this application published?", name: "license", type: "list", choices: ["none", "Apache", "FreeBSD", "Revised BSD", "GPL", "Library GPL", "MIT", "Mozilla", "Creative Commons", "Eclipse"] },
    { message: "What is the NAME to put on the copyright notice?", name: "copyright", thpe: "input" }
];


init();



function init() {
    // Show the user the instructions
    console.log(`\n\x1b[33mWelcome to the README generator.\n\nRespond to any or all questions below\nto generate a new README file.\n\nTo create a new paragraph, insert "PPP".\nTo create a bullet point, preface with\n"BBB" for each, and insert "PPP" to\nreturn to regular text.\n\n`);

    askQs(questions);
}


function askQs(qs) {
    // Ask the questions
    inquirer.prompt(
        qs
    )
    .then( (response, err) => {
       if (err) console.log(err)
       else writeToFile(response);
    })
}

function writeToFile(data) {
    // This function sends the data to the generate module, and writes the return to the file.
    fs.writeFile('./result/README.md', generate.createText(data), (err) => {
        if (err) console.log(err)
    });

    cleanup();
}

function cleanup() {
    // Let's have a little fun!
    let count = 1;
    const finishUp = setInterval( () => {
        let text = "";
        for ( let i = 0; i < count; i++ ) text += ".";
        console.log(text);
        count++;
        if ( count == 5 ) {
            console.log(`\nDone!\n`);
            clearInterval(finishUp);
        }
    }, 750);
}
