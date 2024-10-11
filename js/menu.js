function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
    
    // Accessibilité: bascule le "aria-expanded"
    const isExpanded = navMenu.classList.contains('open');
    document.querySelector('.menu-icon').setAttribute('aria-expanded', isExpanded);
}

// Script pour le défilement fluide
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Empêche le comportement par défaut
        const targetId = this.getAttribute('href').substring(1); // Récupère l'ID de la section cible
        const targetElement = document.getElementById(targetId);

        // Défilement fluide vers la section cible
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
