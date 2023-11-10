const title = "Advanced manufacturing companies";

const today = new Date();
const formattedDate = `${today.getMonth() + 1}`.padStart(2, '0') + '-' + `${today.getDate()}`.padStart(2, '0') + '-' + today.getFullYear();
const dateCreated = `Created ${formattedDate}`;

const subheader = "The invention principles below are specific to advanced manufacturing. They are generated automatically, based on the original TRIZ invention principles.";

document.addEventListener('DOMContentLoaded', () => {
    document.title = title; // Sets the tab title

    document.getElementById('pageTitle').innerText = title;
    document.getElementById('header').innerText = title;
    document.getElementById('createdDate').innerText = dateCreated;
    document.getElementById('subheader').innerText = subheader;
});
