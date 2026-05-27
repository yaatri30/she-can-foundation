document.addEventListener("DOMContentLoaded", () => {

  /* ELEMENT SELECTORS*/
  const preloader = document.querySelector(".preloader");
  const header = document.querySelector(".header");
  const themeToggle = document.querySelector(".theme-toggle");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");
  const revealElements = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const hero = document.querySelector(".hero");
  const contactForm = document.querySelector(".contact-form");

  /* PRELOADER */
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 900);
  });

  /* DARK / LIGHT MODE */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const icon = themeToggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  /* MOBILE MENU */
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });

  /* STICKY HEADER */
  const handleHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  handleHeader();

  /* BACK TO TOP BUTTON */
  const handleBackToTop = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  /* SCROLL REVEAL */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.15
  });
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* ANIMATED COUNTERS */
  let countersStarted = false;
  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const duration = 2000;
    const stepTime = 16;
    let current = 0;
    const increment = target / (duration / stepTime);
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent =
          Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent =
          target.toLocaleString() + "+";
      }
    };
    updateCounter();
  };
  const counterSection = document.querySelector("#impact");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        counters.forEach(counter => {
          animateCounter(counter);
        });
        countersStarted = true;
      }
    });
  }, {
    threshold: 0.3
  });
  if (counterSection) {
    counterObserver.observe(counterSection);
  }

  const handleParallax = () => {
    if (!hero) return;
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY =
      `${scrolled * 0.4}px`;
    const shapes = document.querySelectorAll(".hero-bg-shape");
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.08;
      shape.style.transform =
        `translateY(${scrolled * speed}px)`;
    });
  };

  /* CONTACT FORM */
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent =
          "✓ Message Sent";
        submitBtn.style.opacity = "0.9";
        contactForm.reset();
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
        }, 2500);
      }, 1200);
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const activateMenu = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");
      const menuLink =
        document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
      if (
        scrollY > sectionTop &&
        scrollY <= sectionTop + sectionHeight
      ) {
        menuLink?.classList.add("active-link");
      } else {
        menuLink?.classList.remove("active-link");
      }
    });
  };

  /* GALLERY HOVER PERFORMANCE */
  const galleryImages = document.querySelectorAll(".gallery-item img");
  galleryImages.forEach(image => {
    image.setAttribute("loading", "lazy");
  });

  /* INTERSECTION ANIMATION FOR CARDS*/
  const cards = document.querySelectorAll(
    ".about-card, .program-card, .testimonial-card, .impact-card"
  );
  const cardObserver =
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              {
                opacity: 0,
                transform: "translateY(40px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 800,
              easing: "ease-out",
              fill: "forwards"
            }
          );
          cardObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
  cards.forEach(card => {
    cardObserver.observe(card);
  });

  /* THROTTLED SCROLL HANDLER */
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleHeader();
        handleBackToTop();
        activateMenu();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, {
    passive: true
  });

  /* HERO ENTRANCE ANIMATION */
  const heroElements = document.querySelectorAll(
    ".hero .reveal"
  );
  heroElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform =
      "translateY(40px)";
    setTimeout(() => {
      element.style.transition =
        "all .9s ease";
      element.style.opacity = "1";
      element.style.transform =
        "translateY(0)";
    }, 300 + (index * 180));
  });

  /* CRITICAL IMAGES */
  const heroImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200"
  ];
  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});