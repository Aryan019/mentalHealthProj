
function autoplayCaarousel() {
    const caarouselEl = document.getElementById("caarousel");
    const slideeContainerEl = caarouselEl.querySelector("#slidee-container");
    const slideeEl = caarouselEl.querySelector(".slidee");
    let slideeWidth = slideeEl.offsetWidth;
    // Add click handlers
    document.querySelector("#backk-button")
        .addEventListener("click", () => navigate("backkward"));
    document.querySelector("#forwardd-button")
        .addEventListener("click", () => navigate("forwardd"));
    document.querySelectorAll(".slidee-indicator")
        .forEach((dot, index) => {
            dot.addEventListener("click", () => navigate(index));
            dot.addEventListener("mouseenter", () => clearInterval(autoplay));
        });
    // Add keyboard handlers
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') {
            clearInterval(autoplay);
            navigate("backkward");
        } else if (e.code === 'ArrowRight') {
            clearInterval(autoplay);
            navigate("forwardd");
        }
    });
    // Add resize handler
    window.addEventListener('resize', () => {
        slideeWidth = slideeEl.offsetWidth;
    });
    // Autoplay
    const autoplay = setInterval(() => navigate("forwardd"), 3000);
    slideeContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
    // Slidee transition
    const getNewScrollPosition = (arg) => {
        const gap = 10;
        const maxScrollLeft = slideeContainerEl.scrollWidth - slideeWidth;
        if (arg === "forwardd") {
            const x = slideeContainerEl.scrollLeft + slideeWidth + gap;
            return x <= maxScrollLeft ? x : 0;
        } else if (arg === "backkward") {
            const x = slideeContainerEl.scrollLeft - slideeWidth - gap;
            return x >= 0 ? x : maxScrollLeft;
        } else if (typeof arg === "number") {
            const x = arg * (slideeWidth + gap);
            return x;
        }
    }
    const navigate = (arg) => {
        slideeContainerEl.scrollLeft = getNewScrollPosition(arg);
    }
    // Slidee indicators
    const slideeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideeIndex = entry.target.dataset.slideeindex;
                caarouselEl.querySelector('.slidee-indicator.active').classList.remove('active');
                caarouselEl.querySelectorAll('.slidee-indicator')[slideeIndex].classList.add('active');
            }
        });
    }, { root: slideeContainerEl, threshold: .1 });
    document.querySelectorAll('.slidee').forEach((slidee) => {
        slideeObserver.observe(slidee);
    });
}
autoplayCaarousel();
        

