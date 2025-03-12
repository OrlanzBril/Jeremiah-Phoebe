const indicators = document.querySelectorAll('.indicator');
const colorBox = document.getElementById('color-box');
const men = document.getElementById('attireMen');
const women = document.getElementById('attireWomen');
const dataColor = ["#6c0021", "#560116", "#8badb7", "#0b1328","#040a18"];
const example = ["1.png","2.png","3.png","4.png","5.png"];
let menLoc = "AttireMen/";
let womenLoc = "AttireWomen/";
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");
const table = document.getElementById("dataTable");
const headers = table.querySelectorAll("th");
const rows = table.querySelectorAll("tr");

let currentColumn = 0; // Initially show the first column
const totalColumns = headers.length;
// console.log(headers);

function updateTable() {
  // Loop through each column and hide/show accordingly
  headers.forEach((header, index) => {
    if (index === currentColumn) {
      header.style.display = "";
      header.classList.add('typing');
        
      setTimeout(() => {
        header.classList.remove('typing');
      }, 2000);
    } else {
      header.style.display = "none";
    }
  });

  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    console.log(cells);
    cells.forEach((cell, index) => {
      if (index === currentColumn) {
        cell.style.display = "";
        cell.classList.add('typing');
        
        setTimeout(() => {
          cell.classList.remove('typing');
        }, 2000);
      } else {
        cell.style.display = "none";
      }
    });
  });
}

prevArrow.addEventListener("click", function() {
  if (currentColumn > 0) {
    currentColumn--;
    updateTable();
  }
});

nextArrow.addEventListener("click", function() {
  if (currentColumn < totalColumns - 1) {
    currentColumn++;
    updateTable();
  }
});

// Initial update

// Function to set the active color
// Add event listener to each color swatch

function setActiveColor(swatch) {
    console.log(swatch);
    // Remove active class from all swatches
    indicators.forEach(s => s.classList.remove('active'));

    // Add active class to the clicked swatch
    swatch.classList.add('active');

    // Get the color from the clicked swatch and apply it to the color box
    const color = swatch.getAttribute('data-color');
    colorBox.style.backgroundColor = dataColor[color-1];


    // Fade out the current image
    men.style.opacity = '0';
    women.style.opacity = '0';
    
    // After the fade-out, change the image source
    setTimeout(function() {
        // Toggle the image source
        men.src = menLoc + example[color-1];
        women.src = womenLoc + example[color-1];

        men.style.opacity = '1';
        women.style.opacity = '1';
    }, 600);  // Wait for 500ms to allow the fade-out to complete
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('show');
        // section.classList.add('hidden');
    });

    const navs = document.querySelectorAll('.nav');
    navs.forEach(nav => {
        nav.classList.remove('active');
        // section.classList.add('hidden');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('show');
        selectedSection.focus();
        // selectedSection.classList.remove('hidden');
    }
    const activeButton = document.querySelector(`.nav[data-target="${sectionId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Set the first swatch as active on load
document.addEventListener('DOMContentLoaded', function() {
    setActiveColor(indicators[0]); // Make the first swatch active by default
    showSection('venue');
    updateTable();
});

indicators.forEach(swatch => {
    swatch.addEventListener('click', function() {
        setActiveColor(swatch); // Update active color when clicked
    });
});