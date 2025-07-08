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
});

// Scroll fade-in animation for .fade-in-left and .fade-in-right
const faders = document.querySelectorAll('.fade-in-left, .fade-in-right');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

faders.forEach(el => appearOnScroll.observe(el));

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