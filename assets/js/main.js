document.addEventListener('DOMContentLoaded', () => {
  // Sticky header logic
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu-overlay');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking outside or on a link
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.classList.contains('mobile-menu-overlay')) {
        mobileMenu.classList.remove('active');
      }
    });
  }
});

