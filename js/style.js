let currentSection = null;
let isApplying = false;

function applyStyles() {
    console.log("Applying styles 111111...");
    const blocHorizontal = document.querySelector('.blocHorizontal');
    // Appliquer les styles via JavaScript
    blocHorizontal.style.display = "flex";
    blocHorizontal.style.flexDirection = "row";
    blocHorizontal.style.width = "800vw";
    blocHorizontal.style.transform = "rotate(90deg) translateY(-100vh)";
    blocHorizontal.style.transformOrigin = "top left";
    blocHorizontal.style.scrollBehavior = "smooth"; // Activer un défilement fluide

    // Sélectionner l'élément avec la classe "container"
    const container = document.querySelector('.container');
    // Appliquer les styles via JavaScript
    container.style.width = "100vh";
    container.style.height = "100vw";
    container.style.overflowY = "scroll"; // Activer le défilement vertical
    container.style.scrollSnapType = "y mandatory"; // Activer le défilement par section

    container.style.transform = "rotate(-90deg) translateX(-100vh)";
    container.style.transformOrigin = "top left";
    container.style.overflowX = "hidden";

    // Cacher les barres de défilement dans certains navigateurs
    //container.style.msOverflowStyle = "none"; // Pour Internet Explorer et Edge
    //container.style.scrollbarWidth = "none";  // Pour Firefox
    //container.style.webkitOverflowScrolling = "none"; // Pour WebKit


    isApplying = true; // Mark that styles have been applied
}

function removeStyles() {
    console.log("Removing styles 22222...");
    const blocHorizontal = document.querySelector('.blocHorizontal');
    blocHorizontal.style.display = "";
    blocHorizontal.style.flexDirection = "column";
    blocHorizontal.style.width = "800vw";
    blocHorizontal.style.transform = "rotate(0deg) translateY(0vh)";
    blocHorizontal.style.transformOrigin = "top left";
    blocHorizontal.style.scrollBehavior = "smooth";

    const container = document.querySelector('.container');

    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.overflowY = "scroll"; // Activer le défilement vertical
    container.style.scrollSnapType = "y mandatory"; // Activer le défilement par section

    container.style.transform = "rotate(0deg) translateX(0vh)";
    container.style.transformOrigin = "top left";
    container.style.overflowX = "hidden";
    isApplying = false; // Mark that styles have been removed
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        if (entry.isIntersecting && sectionId !== currentSection) {
            console.log("Current visible section:", sectionId);

            if (["section1", "section3", "section5", "section7"].includes(sectionId) && !isApplying) {
                applyStyles();
            } else if (["section2", "section4", "section6", "section8"].includes(sectionId) && isApplying) {
                removeStyles();
            }

            currentSection = sectionId;
        }
    });
}, { threshold: 0.7 });

document.querySelectorAll('.slide').forEach(section => {
    observer.observe(section);
});
