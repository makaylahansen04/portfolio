// Import the terms from the module
import fun_terms from './terms.mjs';

// Define the random function
function random(num) {
    return Math.floor(Math.random() * num);
}

// Define the function to get a random list entry
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Define the termTemplate function
function termTemplate(term) {
    return `<figure class="term">
        <figcaption>
            <h2><class="term_name">${term.term}</h2>
            <p class="term__description">
                ${term.definition}
            </p>
        </figcaption>
    </figure>`;
}

// Function to display a random term on the page
function displayRandomTerm() {
    const term = getRandomListEntry(fun_terms);
    const termsSection = document.querySelector('.terms');
    termsSection.innerHTML = termTemplate(term);
}

// Viewer template function
function viewerTemplate(pic, alt) {
    return `<div class="overlay"></div>
            <div class="viewer">
                <button class="close-viewer">X</button>
                <img src="${pic}" alt="${alt}">
            </div>`;
}

// Image mapping for specific images
const imageMapping = {
    "wordle_img": "proimg/r_wordle.png",
    "meal_prep_img": "proimg/r_meal_prep.png",
    "linux": "proimg/r_linux.png"
};

// View handler function
function viewHandler(event) {
    const target = event.target;
    if (target.tagName === 'IMG') {
        const id = target.getAttribute('id');
        const fullImageSrc = imageMapping[id]; // Get the mapped full image source
        if (fullImageSrc) {
            const altText = target.getAttribute('alt');
            const viewerHTML = viewerTemplate(fullImageSrc, altText);
            document.body.insertAdjacentHTML('afterbegin', viewerHTML);
            document.querySelector('.close-viewer').addEventListener('click', closeViewer);
            document.querySelector('.overlay').addEventListener('click', closeViewer);
        }
    }
}

// Close viewer function
function closeViewer() {
    const viewer = document.querySelector('.viewer');
    const overlay = document.querySelector('.overlay');
    if (viewer) {
        viewer.remove();
    }
    if (overlay) {
        overlay.remove();
    }
}

// Function to set the theme based on localStorage
function setTheme(theme) {
    if (theme === 'Dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Function to save the theme to localStorage
function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('theme');

    // Load and apply the theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'Light';
    setTheme(savedTheme);
    selectElement.value = savedTheme;

    selectElement.addEventListener('change', function () {
        const selectedValue = this.value;
        setTheme(selectedValue);
        saveTheme(selectedValue);
    });

    // Display a random term when the page loads
    displayRandomTerm();

    // Add event listener to the gallery
    document.querySelector('.project').addEventListener('click', viewHandler);
});
