document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. ANIMAZIONE RUOLO DINAMICO (Hero Home)
     ========================================== */
  const roleElement = document.querySelector(".animated-role");

  if (roleElement) {
    const roles = [
      
      "Test Manager",
      "UX/UI Designer",
      "Architetto"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        currentSpeed = delayBetweenRoles;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        currentSpeed = 500;
      }

      setTimeout(typeEffect, currentSpeed);
    }

    typeEffect();
  }


  /* ==========================================
     2. GESTIONE MENU MOBILE (Scroll Lock & Auto-Close)
     ========================================== */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  if (menuToggle) {
    // Blocca lo scroll del body quando il menu mobile è aperto
    menuToggle.addEventListener("change", () => {
      if (menuToggle.checked) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Chiudi il menu mobile quando si clicca su un link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.checked = false;
        document.body.style.overflow = "";
      });
    });
  }


  /* ==========================================
     3. INTERSECTION OBSERVER (Animazioni Scroll)
     ========================================== */
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -5% 0px",
    threshold: 0.05
  };

  const globalObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible", "is-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(`
    .row-esperienza,
    .vertical-line,
    .divider-h, 
    .divider-v, 
    .skill-category-block, 
    .contact-page-section,
    .reveal-item,
    .reveal-left,
    .reveal-right,
    .reveal-section
  `);

  elementsToAnimate.forEach((el) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-visible", "is-active");
      } else {
        globalObserver.observe(el);
      }
    }
  });

});

document.addEventListener('DOMContentLoaded', () => {
  const bentoItems = document.querySelectorAll('.bento-item');
  const carouselInner = document.getElementById('carouselInnerContainer');
  const lightboxModalEl = document.getElementById('lightboxModal');
  const lightboxCarouselEl = document.getElementById('lightboxCarousel');

  if (!lightboxModalEl || !lightboxCarouselEl || !carouselInner || bentoItems.length === 0) return;

  // Inizializza la modale di Bootstrap
  const modalInstance = new bootstrap.Modal(lightboxModalEl);

  // 1. Popola il carousel con tutte le immagini presenti nella Bento Grid
  bentoItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (!img) return;

    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt') || `Foto ${index + 1}`;

    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    carouselItem.innerHTML = `
      <div class="lightbox-carousel-item">
        <img src="${src}" alt="${alt}" class="lightbox-img img-fluid">
      </div>
    `;
    carouselInner.appendChild(carouselItem);

    // 2. Al click sulla foto della griglia, apre la modale direttamente alla foto selezionata
    item.addEventListener('click', () => {
      carouselInstance.to(index);
      modalInstance.show();
    });
  });

  // 3. Inizializza il Carousel di Bootstrap
  const carouselInstance = new bootstrap.Carousel(lightboxCarouselEl, {
    interval: false, // Nessun cambio automatico a tempo
    touch: true      // Supporto per swipe touch
  });

  // 4. Navigazione con la Tastiera (Frecce Sinistra e Destra)
  document.addEventListener('keydown', (e) => {
    if (lightboxModalEl.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        carouselInstance.prev();
      } else if (e.key === 'ArrowRight') {
        carouselInstance.next();
      }
    }
  });

  // 5. Swipe Touch Gestures (Mobile / Tablet)
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxCarouselEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxCarouselEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 40; // Pixel minimi per considerare lo swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      carouselInstance.next(); // Swipe verso sinistra -> Foto successiva
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      carouselInstance.prev(); // Swipe verso destra -> Foto precedente
    }
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Sostituisci con il tuo Service ID e Template ID presi da EmailJS
      emailjs.sendForm('service_oaa8q5l', 'template_5tvtn8n', this)
        .then(function() {
            alert('Messaggio inviato con successo!');
            contactForm.reset();
        }, function(error) {
            alert('Errore nell\'invio del messaggio. Riprova.', error);
        });
    });
  }
});