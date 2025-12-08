// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const moonIcon = document.getElementById('icon-moon');
const sunIcon = document.getElementById('icon-sun');

// Başlangıç ay/güneş durumu (LocalStorage varsa onu al)
if(localStorage.getItem('theme') === 'dark'){
    body.classList.add('dark-mode');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
} else {
    body.classList.remove('dark-mode');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
}

// Click event
toggleButton.addEventListener('click', () => {
    if(body.classList.contains('dark-mode')){
        // Dark modu kapat
        body.classList.remove('dark-mode');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        // Dark modu aç
        body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
});


// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
  const container = document.querySelector(".skills-slider");

  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("slide");
        card.innerHTML = `
            <div class="card skillsText">
                <div class="card-body">
                    <img loading="lazy" src="./images/${item.image}" alt="${item.title}" />
                    <h3 class="card-title mt-3">${item.title}</h3>
                </div>
            </div>
        `;
        container.appendChild(card);
      });

      // Slider otomatik kaydırma
      let scrollAmount = 0;
      const slideWidth = container.querySelector(".slide").offsetWidth + 20;
      setInterval(() => {
        scrollAmount += slideWidth;
        if (scrollAmount >= container.scrollWidth - container.offsetWidth) {
          scrollAmount = 0;
        }
        container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }, 1000);
    });
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");

        card.innerHTML = `
                    <div class="flip-card">
                        <div class="flip-inner">
                            <!-- FRONT -->
                            <div class="flip-front">
                                <img loading="lazy" class="card-img-top" src="images/${item.image}" alt="${item.title}">
                                <h3 class="card-title mt-3">${item.title}</h3>
                            </div>

                            <!-- BACK -->
                            <div class="flip-back">
                                <p class="card-text">${item.text}</p>
                                <a href="${item.link}" class="btn btn-success" target="_blank">En Plus</a>
                            </div>
                        </div>
                    </div>
                `;

        row.appendChild(card);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    });
}


// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
