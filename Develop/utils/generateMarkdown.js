const licenses = require("./licenses.js");

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string


// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README


const headers = {
  description: "Description",
  installation: "Installation Instructions",
  usage: "Usage Information",
  features: "Application Features",
  contributions: "Contribution Guidelines",
  test: "Test Instructions",
  username: "GitHub Username",
  email: "Developer Email",
  license: "Software License",
  copyright: "Copyright"
}

const today = new Date;




function writeToFile(data) {
  // This function takes the returned data and creates the text for the README
  // parameter "data" is the user's responses to the questions
  
  fs.writeFile('./README.md', text, (err) => {
      if (err) console.log(err)
  });
}

function createText(data) {
  // This function manages the accumulation of text for the README
  // parameter 'data' is the responses collected from the user

  let builtText = '';
  // iterate over the responses
  for ( [section, response] of Object.entries(data) ) {

      if ( section=="title" ) {
        builtText += renderTitle(response, data.license)
      } else if ( section=="license" ) {
        builtText += renderLicense(response, data.copyright)
      } else if ( response && section != "email" && section != "copyright" ) builtText += `${renderSection({ title: section, content: response })}`

      if (section=="description") builtText += `${renderTOC(data)}`
  }
  return builtText;
}


function renderTitle(data, license) {
  return `# ${data} ${licenses.data[license].badge}

`;
}

function renderSection(data) {
  return `## ${headers[data.title]}
  
${data.content.replaceAll("PPP ", "PPP").replaceAll("BBB ", "BBB").replaceAll("PPP",`

`).replaceAll("BBB", `
* `)}
  
`;
}

function renderTOC(data) {
  let ToC = `## Table of Contents
  
`;

  for ( [section, response] of Object.entries(data) ) {
    if ( section != "title" && section != "description" && section != "github" && section != "email" ) {
      ToC += 
`* [${headers[section]}](#${headers[section].toLowerCase().replaceAll(" ", "-")})
`
    }

  }

  return `${ToC}

`;
}

function renderLicense(license, party) {
  return `## Software License

This software is covered by a [${licenses.data[license].name}](${licenses.data[license].link}).

©${today.getFullYear()}, ${party}

${licenses.data[license].text}`
}

module.exports = { createText };
