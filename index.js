// Packages to include in this application.
const fs = require('fs');
const inquirer = require('inquirer');
const generate = require('./utils/generateMarkdown.js');



init();



function init() {
    // This function sets up the application

    console.clear();
    console.log(`\n\x1b[33mWelcome to the README generator.`)

    // variable to record the user's editing preference
    let editor = "input";

    // first ask the user for their text editor preference
    howToEdit()
    .then( (response, err) => {
        if (err) console.log(err);
        else {
            if ( response.editor.indexOf("default") >= 0 ) editor = "editor"
            // now send generated questions to be displayed
            askQs(generateQuestions(editor), editor);
        }
    })
}

function howToEdit() {
    // This function asks the user what their preferred editor is

    // usage instructions
    console.log(`\n\x1b[33mBefore we begin, please indicate what method\nyou'd like to use for the potentially longer responses:\nwould you prefer to type right into the terminal,\nor use your terminal's default text editor?\n`)

    return inquirer.prompt({
        message: "Please make your selection:",
        name: "editor",
        type: "rawlist",
        choices: ["Enter text at the terminal prompt", "Use my terminal's default editor"]
    })
}

function generateQuestions(type) {
    // This function inserts the editor preference into the questions array and returns it
    // parameter "type" is the either "input" or "editor"

    const questions = [
        { message: "What is this application's TITLE?", name: "title", type: "input" },
        { message: "What is this application's DESCRIPTION?", name: "description", type: type },
        { message: "What is this application's INSTALLATION INSTRUCTIONS?", name: "installation", type: type },
        { message: "What is this application's USAGE INFORMATION?", name: "usage", type: type },
        { message: "What are some of this application's FEATURES?", name: "features", type: type },
        { message: "What is this application's CONTRIBUTION GUIDELINES?", name: "contributions", type: type },
        { message: "What is this application's TEST INSTRUCTIONS?", name: "test", type: type },
        { message: "What are the CREDITS for this application?", name: "credits", type: type },
        { message: "What is your GITHUB USERNAME?", name: "username", type: "input" },
        { message: "What is your EMAIL ADDRESS?", name: "email", type: "input" },
        { message: "What is the NAME to put on the copyright notice?", name: "copyright", thpe: "input" },
        { message: "Under what LICENSE is this application published?", name: "license", type: "list", choices: ["none", "Apache", "FreeBSD", "Revised BSD", "GPL", "Library GPL", "MIT", "Mozilla", "Creative Commons", "Eclipse"] }
    ]; 

    return questions;
}

function askQs(qs, type) {
    // This function prompts the user for inputs for the README
    // parameter "qs" is the array of questions
    // parameter "type" is the editing preference

    // usage instructions
    console.log(`\n\x1b[33mRespond to any or all questions below\nto generate a new README file.\n`)
    // display supplemental instructions specific to the editing type
    if (type == "input") console.log(`\x1b[33mTo create a new paragraph, insert "PPP".\nTo create a bullet point, preface with\n"BBB" for each, and insert "PPP" to\nreturn to regular text.\n`)
    else console.log(`\x1b[33mTraditionally long-form entries will be\ndone in your terminal's default editor.\n`)

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
    // This function sends the data to the generate module, and writes the return
    // parameter "data" is the user responses to the prompts

    fs.writeFile('./result/README.md', generate.createText(data), (err) => {
        if (err) console.log(err)
    });

    cleanup();
}

function cleanup() {
    // Let's have a little fun pretending it'll take a couple of seconds!
    
    console.log(`\n\x1b[33mgenerating...`)
    let count = 1;
    const finishUp = setInterval( () => {
        let text = "";
        for ( let i = 0; i < count; i++ ) text += ".";
        console.log(`\x1b[33m${text}`);
        count++;
        if ( count == 5 ) {
            console.log(`\n\x1b[33mDONE!\n\nYour README is located in '/result/'.\n`);
            clearInterval(finishUp);
        }
    }, 750);
}
