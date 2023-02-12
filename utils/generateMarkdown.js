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
  credits: "Credits",
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
  
  if (data.email != "" || data.username != "") builtText += renderContact(data.username, data.email);
  return builtText;
}


function renderTitle(data, license) {
  return `# ${data} ${licenses.data[license].badge}\n\n`;
}

function renderSection(data) {
  return `## ${headers[data.title]}\n\n${data.content.replaceAll("PPP ", "PPP").replaceAll("BBB ", "BBB").replaceAll("PPP",`\n\n`).replaceAll("BBB", `\n* `)}\n\n`;
}

function renderTOC(data) {
  let ToC = `## Table of Contents\n\n`;

  for ( [section, response] of Object.entries(data) ) {
    if ( section != "title" && section != "description" && section != "username" && section != "email" && response) {
      ToC += `\n* [${headers[section]}](#${headers[section].toLowerCase().replaceAll(" ", "-")})`
    }
  }

  if (data.email || data.username) ToC += `\n* [Contact the Developer](#contact-the-developer)`;

  return `${ToC}\n\n`;
}

function renderLicense(license, party) {
  let licenseText = `## Software License\n\n©${today.getFullYear()}`;
  if (party) licenseText += `, ${party}`;
  if (license != "none") licenseText += `\n\nThis software is covered by a${ (startsWithVowel(licenses.data[license].name)) ? `n` : `` } [${licenses.data[license].name}](${licenses.data[license].link}).\n\n${licenses.data[license].text}\n\n`
  return licenseText;
}

function renderContact(github="", email="") {
  let contact = `## Contact the Developer\n\n`;
  if (email) contact += `Contact me at <a href="mailto:${email}">${email}</a>${(github) ? `, or ` : `.`}`
  if (github) contact += `${(email) ? `visit` : `Visit`} my [GitHub profile](https://www.github.com/${github}).`
  return contact;
}

function startsWithVowel(str) {
  const first = str.substring(0,1);
  const vowels = "AEIOU";
  return ( vowels.includes(first) );
}

module.exports = { createText };
