const wrapperr = document.querySelector(".wrapperr");
const carousell = document.querySelector(".carousell");
const firstCarddWidth = carousell.querySelector(".cardd").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapperr i");
const carousellChildrens = [...carousell.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cardds that can fit in the carousell at once
let carddPerView = Math.round(carousell.offsetWidth / firstCarddWidth);

// Insert copies of the last few cardds to beginning of carousell for infinite scrolling
carousellChildrens.slice(-carddPerView).reverse().forEach(cardd => {
    carousell.insertAdjacentHTML("afterbegin", cardd.outerHTML);
});

// Insert copies of the first few cardds to end of carousell for infinite scrolling
carousellChildrens.slice(0, carddPerView).forEach(cardd => {
    carousell.insertAdjacentHTML("beforeend", cardd.outerHTML);
});

// Scroll the carousell at appropriate postition to hide first few duplicate cardds on Firefox
carousell.classList.add("no-transition");
carousell.scrollLeft = carousell.offsetWidth;
carousell.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousell left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousell.scrollLeft += btn.id == "left" ? -firstCarddWidth : firstCarddWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousell.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousell
    startX = e.pageX;
    startScrollLeft = carousell.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousell based on the cursor movement
    carousell.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousell.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousell is at the beginning, scroll to the end
    if(carousell.scrollLeft === 0) {
        carousell.classList.add("no-transition");
        carousell.scrollLeft = carousell.scrollWidth - (2 * carousell.offsetWidth);
        carousell.classList.remove("no-transition");
    }
    // If the carousell is at the end, scroll to the beginning
    else if(Math.ceil(carousell.scrollLeft) === carousell.scrollWidth - carousell.offsetWidth) {
        carousell.classList.add("no-transition");
        carousell.scrollLeft = carousell.offsetWidth;
        carousell.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousell
    clearTimeout(timeoutId);
    if(!wrapperr.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousell after every 2500 ms
    timeoutId = setTimeout(() => carousell.scrollLeft += firstCarddWidth, 2500);
}
autoPlay();

carousell.addEventListener("mousedown", dragStart);
carousell.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousell.addEventListener("scroll", infiniteScroll);
wrapperr.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapperr.addEventListener("mouseleave", autoPlay);

