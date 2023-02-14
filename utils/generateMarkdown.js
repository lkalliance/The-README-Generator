// Require the license data
const licenses = require("./licenses.js");

// A reference to convert a response name with a section header
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

// For use with the copyright
const today = new Date;


function createText(data) {
  // This function manages the accumulation of text for the README
  // parameter 'data' is the responses collected from the user

  let builtText = '';
  // iterate over the responses
  for ( [section, response] of Object.entries(data) ) {
      // send to the right renderer based on what section
      if ( section=="title" ) {
        builtText += renderTitle(response, data.license)
      } else if ( section=="license" ) {
        builtText += renderLicense(response, data.copyright)
      } else if ( response && section != "email" && section != "copyright" && section != "username" ) builtText += `${renderSection({ title: section, content: response })}`

      // if we just did the Description, follow with the ToC
      if (section=="description") builtText += `${renderTOC(data)}`
  }
  
  // if the user provided either an email address or GitHub username, do a Contact section
  if (data.email != "" || data.username != "") builtText += renderContact(data.username, data.email);
  return builtText;
}


function renderTitle(data, license) {
  // This function renders the main title
  // parameter "data" is the text of the header
  // parameter "license" is an object with various license bits

  return `# ${data} ${licenses.data[license].badge}\n\n`;
}

function renderSection(data) {
  // This function renders most of the sections
  // parameter "data" is the data for the current section

  return `## ${headers[data.title]}\n\n${data.content.replaceAll("PPP ", "PPP").replaceAll("BBB ", "BBB").replaceAll("PPP",`\n\n`).replaceAll("BBB", `\n* `)}\n\n`;
}

function renderTOC(data) {
  // This function creates a Table of Contents
  // parameter "data" is the collection of all user responses

  let ToC = `## Table of Contents\n\n`;

  // iterate over user responses
  for ( [section, response] of Object.entries(data) ) {
    // outside of selected user responses, if there is anything there create a link to it
    if ( section != "title" && section != "description" && section != "username" && section != "email" && response ) {
      ToC += `\n* [${headers[section]}](#${headers[section].toLowerCase().replaceAll(" ", "-")})`
    }
  }
  // if there's either an email or a GitHub username, then there will be a contact section
  if (data.email || data.username) ToC += `\n* [Contact the Developer](#contact-the-developer)`;

  return `${ToC}\n\n`;
}

function renderLicense(license, party) {
  // This function renders the license section
  // We will always return SOMETHING, even if all that is is a copyright and year.
  // parameter "license" is the selected license
  // paraemter "party" is the user-provided name to put in the copyright

  let licenseText = `## Software License\n\n©${today.getFullYear()}`;
  if (party) licenseText += `, ${party}`;
  if (license != "none") licenseText += `\n\nThis software is covered by a${ (startsWithVowel(licenses.data[license].name)) ? `n` : `` } [${licenses.data[license].name}](${licenses.data[license].link}).\n\n${licenses.data[license].text}\n\n`
  return licenseText;
}

function renderContact(github="", email="") {
  // This function renders the contact information, if the user gave any
  // parameter "github" is the github username
  // parameter "email" is the user's email address

  let contact = `## Questions?\n\n`;
  if (email) contact += `Contact me at <a href="mailto:${email}">${email}</a>${(github) ? `, or ` : `.`}`
  if (github) contact += `${(email) ? `visit` : `Visit`} my [GitHub profile](https://www.github.com/${github}).`
  return contact;
}

function startsWithVowel(str) {
  // This utility is for deciding to put "a" or "an" 
  
  const first = str.substring(0,1);
  const vowels = "AEIOU";
  return ( vowels.includes(first) );
}

module.exports = { createText };
