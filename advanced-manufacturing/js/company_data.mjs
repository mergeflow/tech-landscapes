import { sanitizeJsonIndexName, formatRawDate, numberToUsCurrency, groupCompaniesByPrinciple } from "./data_utils.mjs";
import { factoryAutomationCompanyData } from "./factory_automation_company_data.mjs";
import { factoryAutomationInventionPrinciples } from "./factory_automation_invention_principles_data.mjs";

/*
transform company data so that company name is used as index
*/
let transformedCompanyData = {
    "companies" : {}
}
factoryAutomationCompanyData.companies.forEach(company => {
    let key = sanitizeJsonIndexName(company.companyname);
    transformedCompanyData.companies[key] = company;
});

// Function to populate the modal with data by name
function populateModal(companyName) {
    var data = transformedCompanyData.companies[companyName];
    if (data) {
      var modalBody = document.getElementById('modal-body');

      let principlesHtml = transformedCompanyData.companies[companyName].principles.map(principle => {
        return `
          <div class="principle">
            <div class="smallfont"><strong>${principle.principle_name}</strong></div>
            <div class="smallfont">${principle.principle_explanation}</div>
          </div>
        `;
      }).join('');

      modalBody.innerHTML = `
      <h2>${data.companyname}</h2>
      <p class="smallfont">Venture funding: ${numberToUsCurrency(parseFloat(data.funding_amount))} (on ${formatRawDate(data.date)})</p>
      <p class="smallfont"><a href="${data.url}" target="_blank">news about the funding <i class="fa-solid fa-link"></i></a></p>
      <div class="info-container">
        <div class="info-block">
          <h3>Technology</h3>
          <p class="smallfont">${data.unique_technology}</p>
        </div>
        <div class="info-block">
          <h3>Solved Problem</h3>
          <p class="smallfont">${data.solved_problem}</p>
        </div>
        <div class="info-block">
          <h3>Use Cases</h3>
          <p class="smallfont">${data.use_case}</p>
        </div>
      </div>    
      <h3>Invention Principles</h3>
      ${principlesHtml}
      <button onclick="closeModal('companyDetailsModal')" class="primary-button">Close</button>
      `;
    } else {
      // Handle the case where the name does not exist in the data
      var modalBody = document.getElementById('modal-body');
      modalBody.innerHTML = `<p>No data found for ${compName}.</p>`;
    }
}

// Modal control script
var modal = document.getElementById('companyDetailsModal');
  
// Event listeners for the modal triggers
document.querySelectorAll('.modal-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      // use the person name to select the right data
      var companyName = this.getAttribute('data-name');
      populateModal(companyName);
      modal.style.display = 'block';
    });
});

// Function to load and display companies grouped by invention principles
export function loadAndDisplayCompanies() {
    const groupedCompanies = groupCompaniesByPrinciple(factoryAutomationCompanyData);

    // Get the div where you want to add content
    var companiesDiv = document.getElementById('companies');
    // Clear existing content
    companiesDiv.innerHTML = '';
    for (const principle in groupedCompanies) {
      if (groupedCompanies.hasOwnProperty(principle)) {
        // Sort companies alphabetically A-Z
        const sortedCompanies = groupedCompanies[principle].sort();

        var boxDiv = document.createElement('div');
        boxDiv.className = 'box'
        boxDiv.innerHTML = `
        <button class="toggle-button" onclick="toggleContent(this)"><i class="fas fa-angle-down"></i></button>
        <h2>${principle}</h2>
        <p>${factoryAutomationInventionPrinciples.principles.find(p => p.name === principle).description}</p>
        `

        var collapsibleContentDiv = document.createElement('div');
        collapsibleContentDiv.className = 'collapsible-content';
        
        // Create a new div for the principle row
        var principleDiv = document.createElement('div');
        principleDiv.className = 'row principle-row';
        var tilesContainer = document.createElement('div');
        tilesContainer.className = 'tiles-container';
  
        // Create and append a div for each company within this principle
        sortedCompanies.forEach(companyName => {
          var companyDiv = document.createElement('div');
          companyDiv.className = 'company-tile';

          // Find the company data by company name
          let companyData = factoryAutomationCompanyData.companies.find(company => sanitizeJsonIndexName(company.companyname) === sanitizeJsonIndexName(companyName));

          // Check if companyData exists and has the unique_technology property
          let uniqueTechnology = companyData && companyData.unique_technology ? companyData.unique_technology : 'Technology details not available';

          companyDiv.innerHTML = `
          <h3>${companyName}</h3>
          <p class="smallfont">${uniqueTechnology}</p>
          <a href="#" class="modal-trigger smallfont" data-name="${sanitizeJsonIndexName(companyName)}">Show details &#8599;</a><br>
          `;
          tilesContainer.appendChild(companyDiv);
        });
  
        principleDiv.appendChild(tilesContainer);
        collapsibleContentDiv.appendChild(principleDiv);
        boxDiv.appendChild(collapsibleContentDiv);
        companiesDiv.appendChild(boxDiv);
      }
    }

    // Add event listeners for modal triggers
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
      trigger.addEventListener('click', function(event) {
        event.preventDefault();
        const companyName = this.getAttribute('data-name');
        populateModal(companyName);
        document.getElementById('companyDetailsModal').style.display = 'block';
      });
    });
}

// execute the function as soon as this module is loaded
loadAndDisplayCompanies();

// Add click event listener to the button -- not needed at the moment because this happens upon load of page now
//document.getElementById('loadCompanies').addEventListener('click', loadAndDisplayCompanies);