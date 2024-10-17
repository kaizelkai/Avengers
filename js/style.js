let currentSection = null;
let isApplying = false;

// Fonction pour désactiver le défilement
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Fonction pour réactiver le défilement
function enableScroll() {
    document.body.style.overflow = 'auto';
}

// Garder la section visible après l'application des styles
function ensureSectionIsVisible() {
    const activeSection = document.querySelector(`#${currentSection}`);
    if (activeSection) {
        // Désactiver le défilement pendant le recentrage
        disableScroll();

        // Forcer le défilement jusqu'à la section souhaitée
        window.scrollTo({
            top: activeSection.offsetTop,
            behavior: "smooth"
        });

        // Utiliser scrollIntoView pour s'assurer qu'elle reste bien visible
        setTimeout(() => {
            activeSection.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            });

            // Ajuster le défilement manuellement si nécessaire (assure que c'est bien centré)
            const rect = activeSection.getBoundingClientRect();
            if (rect.top < 0 || rect.bottom > window.innerHeight) {
                activeSection.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            // Réactiver le défilement après la mise en place de la section
            setTimeout(() => {
                enableScroll();
            }, 100); // Ajustez la temporisation si nécessaire
        }, 50); // Temporisation pour laisser les autres transitions se terminer
    }
}
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
    ensureSectionIsVisible();
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
    ensureSectionIsVisible();
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
