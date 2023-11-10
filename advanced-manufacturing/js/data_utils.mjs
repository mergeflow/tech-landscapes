/*
remove spaces and noonalphanumeric chars from e.g. a company name so that it can be used as JSON index
*/
export function sanitizeJsonIndexName(name) {
    return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
}

/*
clean up raw date strings:
2023-10-06T00:00:00.0000000 -> 10-26-2023
*/
export function formatRawDate(dateString) {
    let dateStr = "2023-10-06T00:00:00.0000000";
    let dateObj = new Date(dateStr);

    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // months are 0-based in JavaScript
    let day = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();

    let formattedDate = `${month}-${day}-${year}`;

    return formattedDate;
}

/*
reformat numbers into US currency format:
3200000 -> $3,200,000
*/
export function numberToUsCurrency(number) {
    if (typeof number !== 'number') {
        throw new Error('Input was ' + number + ', must be a number');
    }
    if (number === null || number === undefined) {
        throw new Error("Input cannot be null or undefined");
    }
    if (number < 0) {
        return '-' + Math.abs(number).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    } else {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });
    }
}

/*
group companies by invention principles, only consider companies with topic relevance "3" (= highest)
*/
export function groupCompaniesByPrinciple(rawData) {
    if (rawData && rawData.companies) {
      return rawData.companies.reduce((acc, company) => {
        // Check for company's relevance and proceed only if the relevance_rating is "3"
        if (company.relevance && company.relevance.relevance_ranking === "3") {
          if (company.principles !== null && company.principles !== undefined) {
            company.principles
            .reduce((acc, principle) => {
              if (principle.principle_name !== null && principle.principle_name !== undefined && company.companyname !== null && company.companyname !== undefined) {
                if (!acc[principle.principle_name]) {
                  acc[principle.principle_name] = [];
                }
                acc[principle.principle_name] = acc[principle.principle_name].concat(company.companyname);
              }
              return acc;
            }, acc);
          }
        }
        return acc;
      }, {});
    } else {
      return {};
    }
}
