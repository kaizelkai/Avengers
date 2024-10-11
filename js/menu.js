function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
    
    // Accessibilité: bascule le "aria-expanded"
    const isExpanded = navMenu.classList.contains('open');
    document.querySelector('.menu-icon').setAttribute('aria-expanded', isExpanded);
}
