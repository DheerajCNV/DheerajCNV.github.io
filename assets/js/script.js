// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll shadow effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  header.style.boxShadow = window.scrollY > 100
    ? (document.body.classList.contains('dark-mode')
      ? '0 2px 10px rgba(0, 0, 0, 0.5)'
      : '0 2px 10px rgba(0, 0, 0, 0.1)')
    : (document.body.classList.contains('dark-mode')
      ? '0 2px 5px rgba(0, 0, 0, 0.3)'
      : '0 2px 5px rgba(0, 0, 0, 0.1)');
}, { passive: true }); // ADDED: This option improves scroll responsiveness

// ---- OBSERVER 1: For triggering animations ----
// This observer adds the 'visible' class to animate sections every time they appear on screen.
const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // This will add the .visible class when the element is intersecting (on-screen)
    // and remove it when it's not, allowing the animation to replay.
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 }); // Triggers when 10% of the section is visible

sectionsToAnimate.forEach(section => {
  animationObserver.observe(section);
});

// ---- OBSERVER 2: For highlighting the active nav link ----
// This observer detects which section is in the middle of the viewport and applies
// the 'active' class to the corresponding navigation link.
const navItems = document.querySelectorAll('.nav-links a'); // RENAMED from navLinks
const sectionsForNav = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('id');

      navItems.forEach(link => { // UPDATED to use navItems
        link.classList.remove('active');
        // Check if the link's href matches the intersecting section's id
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });

sectionsForNav.forEach(section => {
  navObserver.observe(section);
});

// Typewriter effect for name
document.addEventListener("DOMContentLoaded", () => {
  const name = "Dheeraj Chilukuri";
  const el = document.getElementById("typewriter-name");
  let index = 0;
  let typing = true;

  function typeLoop() {
    if (typing) {
      el.textContent = name.substring(0, index++);
      if (index > name.length) {
        typing = false;
        setTimeout(typeLoop, 1000); // pause before deleting
      } else {
        setTimeout(typeLoop, 75); // typing speed
      }
    } else {
      el.textContent = name.substring(0, --index);
      if (index === 0) {
        typing = true;
        setTimeout(typeLoop, 500); // pause before retyping
      } else {
        setTimeout(typeLoop, 50); // deleting speed
      }
    }
  }

  typeLoop();
});

//logo and company name hover effect
document.querySelectorAll('.company-logo').forEach(logo => {
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.1)';
    logo.style.transition = 'transform 0.3s ease';
  });

  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1)';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

//Read more/less button for project descriptions
document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const description = button.previousElementSibling;
    description.classList.toggle('expanded');
    button.textContent = description.classList.contains('expanded') ? 'Read less' : 'Read more';
  });
});

// Back to Top Button Logic
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Show button after scrolling 300px
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}, { passive: true });

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- Lightbox Functionality ---
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  // Find all images in the photo grid
  const galleryImages = document.querySelectorAll('.photo-grid .photo-item img');
  let currentIndex = 0;

  function showImage(index) {
    if (index >= galleryImages.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = galleryImages.length - 1;
    } else {
      currentIndex = index;
    }
    const imgSrc = galleryImages[currentIndex].src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      showImage(index);
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  prevBtn.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });

  // Close lightbox if user clicks outside of the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        showImage(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showImage(currentIndex + 1);
      } else if (e.key === 'Escape') {
        lightbox.classList.remove('active');
      }
    }
  });
});