const header = document.querySelector(".header");
const menuBar = document.querySelector(".menu-bar");
const navBar = document.querySelector(".navbar");
const close = document.querySelector(".close");

const navlinks = document.querySelectorAll(".navlink");

const tabBtns = document.querySelectorAll(".tab-btn");
const featuredCards = document.querySelectorAll(".featured-card");
const sections = document.querySelectorAll(".section");
const backToTop = document.querySelector(".backToTop");

window.addEventListener("DOMContentLoaded", () => {

    if (menuBar) {
        menuBar.addEventListener("click", openMenu);
    }

    if (close) {
        close.addEventListener("click", closeMenu);
    }

    if (tabBtns) {
        tabBtns.forEach((btn) => {
            btn.addEventListener("click", toggleTab);
        })
    }

    // Pre - Loader
    let preloader = document.getElementById("preloader");
    let mainContent = document.getElementById("main-content");

    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
            mainContent.style.display = "block";
            setTimeout(() => {
                mainContent.style.opacity = "1";
                mainContent.style.transform = "translateY(0)";
            }, 100);
        }, 500);
    }, 1500);
})


window.addEventListener("scroll", () => {

    // active class on nav link
    let current = "";

    // loop through sections to check which is in viewport
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    })

    navlinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
            navBar.classList.remove("active");
        }
    })

    // Back to Top btn
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
})


// To close the nav bar 
navlinks.forEach((link) => {
    link.addEventListener("click", () => {
        navBar.classList.remove("active");
    })
})


// On click event for backToTop btn
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})



function toggleTab() {
    const category = this.getAttribute('data-category'); // get category by data category value

    // Remove active class form all tab buttons
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active"); // add active class current button


    // Filter item based in category
    featuredCards.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
            item.style.display = "block";
            item.classList.add("fadeIn");
        } else {
            item.style.display = "none";
        }
    })


    console.log(category);
}

// close navbar
function closeMenu(e) {
    let parent = e.target.parentNode.parentNode;
    if (parent.classList.contains("active")) {
        parent.classList.remove("active");
    }
}

// toggle navbar
function openMenu() {
    navBar.classList.toggle("active");
}