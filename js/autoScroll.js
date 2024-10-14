document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.slide');
    const container = document.querySelector('.container');
    let isScrolling = false;

    container.addEventListener('wheel', (e) => {
        if (isScrolling) return; // Bloquer les actions multiples

        let currentIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight) {
                currentIndex = index;
            }
        });

        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
            isScrolling = true;
            sections[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
        } else if (e.deltaY < 0 && currentIndex > 0) {
            isScrolling = true;
            sections[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
        }

        setTimeout(() => { isScrolling = false; }, 800);
    });

    container.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        setTimeout(() => { isScrolling = false; }, 800);
    });
});
