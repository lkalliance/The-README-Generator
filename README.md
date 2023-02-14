# The README Generator [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The README Generator is a CLI application that accepts input from the user by way of screen prompts, and generates a README file with that content.

This application will be incredibly useful because you have NO IDEA how much time I spend crafting README files. In fact, with only a slight bit of editing, this very README you're looking at right now was generated using this tool!


## Table of Contents


* [Installation Instructions](#installation-instructions)
* [Usage Information](#usage-information)
* [Application Features](#application-features)
* [Credits](#credits)
* [Software License](#software-license)
* [Contact the Developer](#contact-the-developer)

## Installation Instructions

The README Generator is a Node.js application. It requires the presence of Node.js (it was developed and tested on version 18.13.0), and also the installation (either globally or locally) of the Inquirer module, available via npm.

There are two additional JavaScript modules that come with the application, which should be placed in a "/utils/" directory below the main file, "index.js".


## Usage Information

<img src="./assets/images/screenshots.gif" width="400" />

The user launches the application with the command "node index.js" while in the main directory. The README Generator will first ask the user what interface they would like to use for long-form entry, such as this one I'm typing right now. The user chooses from a numbered list: either type directly into the CLI interface, or to use his default text editor (which is what I am doing right now).

Once they have made their choice, the application presents them with a variety of prompts, each of which the user can answer. Each prompt is optional: the README file output at the end does not require all fields to be answered.

The last prompt is for the license to apply to the application. The user will have a list to choose from, by way of the arrow keys on their keyboard.

Once all the prompts have been answered, The README Generator...generates a README, in Markdown format, and places it in the "/result/" directory.


## Application Features

The README Generator has several features intended to make the process as convenient as possible:

* Automatic generation of the README file
* List-based selection of the appropriate software license
* A choice of interface for long-form answers: either the user's default text editor, or direct input onto the command line. With the latter, the user has the option of inserting paragraph breaks and bullets using indicated wildcards.
* Automatic generation of a license section, that includes a summary text of the license, a link to more information, and a badge placed in the headline with another link to the license
* Automatic creation of a Table of Contents, placed after the software's Description
* Automatic creation of a "Questions?" section, with links to the developer's email address and GitHub profile, if the user provides them



## Credits

The code for The README Generator is all original, written by the developer Lee Klusky. But it does rest on the foundation of Node.js and on the Inquirer module.

This application is also made possible through the guidance of the instructor staff of the University of Minnesota Full Stack Coding Bootcamp, and with the assorted wisdom of coders from around the Web, most notably at [Stack Overflow](https://stackoverflow.com), [W3Schools](https://w3schools.com), and the [Mozilla Develper Network](https://developer.mozilla.org).


## Software License

©2023, Lee Klusky

This software is covered by a [MIT License](https://opensource.org/licenses/MIT).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Questions?

Contact me at <a href="mailto:lkbootcamp@yahoo.com">lkbootcamp@yahoo.com</a>, or visit my [GitHub profile](https://www.github.com/lkalliance).