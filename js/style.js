let currentSection = null;
let isApplying = false;

function applyStyles() {
    console.log("Applying styles...");
    const blocHorizontal = document.querySelector('.blocHorizontal');
    blocHorizontal.style.display = "flex";
    blocHorizontal.style.flexDirection = "row";
    blocHorizontal.style.width = "800vw";
    blocHorizontal.style.transform = "rotate(90deg) translateY(-100vh)";
    blocHorizontal.style.transformOrigin = "top left";

    const container = document.querySelector('.container');
    container.style.width = "100vh";
    container.style.height = "100vw";
    container.style.overflowY = "scroll";
    container.style.scrollSnapType = "y mandatory";
    container.style.transform = "rotate(-90deg) translateX(-100vh)";
    container.style.transformOrigin = "top left";
    container.style.overflowX = "hidden";

    isApplying = true;

    // Garder la section visible après l'application des styles
    const activeSection = document.querySelector(`#${currentSection}`);
    if (activeSection) {
        activeSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function removeStyles() {
    console.log("Removing styles...");
    const blocHorizontal = document.querySelector('.blocHorizontal');
    blocHorizontal.style.display = "flex";
    blocHorizontal.style.flexDirection = "column";
    blocHorizontal.style.width = "100%";
    blocHorizontal.style.transform = "";
    blocHorizontal.style.transformOrigin = "top left";

    const container = document.querySelector('.container');
    container.style.width = "100%";
    container.style.height = "100vh";
    container.style.overflowY = "scroll";
    container.style.scrollSnapType = "y mandatory";
    container.style.transform = "";
    container.style.transformOrigin = "top left";
    container.style.overflowX = "hidden";

    isApplying = false;

    // Garder la section visible après la suppression des styles
    const activeSection = document.querySelector(`#${currentSection}`);
    if (activeSection) {
        activeSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');

        if (entry.isIntersecting) {
            console.log("Current visible section:", sectionId);

            // Ne pas changer la section si on est déjà en train de changer de style
            if (sectionId !== currentSection) {
                const previousSection = currentSection;
                currentSection = sectionId;

                setTimeout(() => {
                    // Vérifiez si on est en train d'appliquer des styles
                    if (!isApplying) {
                        if (["section1", "section3"].includes(sectionId)) {
                            applyStyles();
                        }
                    } else {
                        // Appliquez removeStyles uniquement si vous passez à une section 2, 4, 6, ou 8
                        if (["section2", "section4"].includes(sectionId) && previousSection !== sectionId) {
                            removeStyles();
                        }
                    }
                },600); // Temporisation pour lisser la transition
            }
        }
    });
}, { threshold: 0.7 });

document.querySelectorAll('.slide').forEach(section => {
    observer.observe(section);
});
