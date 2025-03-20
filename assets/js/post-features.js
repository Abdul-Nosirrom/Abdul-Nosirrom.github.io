// assets/js/post-features.js

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // Foldout functionality
    // ============================================================
    const foldouts = document.querySelectorAll('.foldout');
    
    foldouts.forEach(function(foldout) {
      const header = foldout.querySelector('.foldout-header');
      const icon = foldout.querySelector('.foldout-icon');
      
      if (header) {
        header.addEventListener('click', function() {
          foldout.classList.toggle('open');
          
          // Update icon if it exists
          if (icon) {
            icon.textContent = foldout.classList.contains('open') ? '−' : '+';
          }
        });
      }
    });
    
    // ============================================================
    // Slideshow functionality
    // ============================================================
    const slideshows = document.querySelectorAll('.post-slideshow');
    
    slideshows.forEach(slideshow => {
      const slides = slideshow.querySelectorAll('.slideshow-slide');
      const prevBtn = slideshow.querySelector('.prev-slide');
      const nextBtn = slideshow.querySelector('.next-slide');
      const indicators = slideshow.querySelector('.slideshow-indicators');
      let currentSlide = 0;
      let slideInterval;
      
      if (slides.length <= 1) return; // No need for slideshow with only one slide
      
      // Create indicator dots
      if (indicators) {
        slides.forEach((_, index) => {
          const dot = document.createElement('span');
          dot.classList.add('indicator-dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => showSlide(index));
          indicators.appendChild(dot);
        });
      }
      
      // Show specific slide
      function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        
        // Remove active class from all indicators
        if (indicators) {
          const dots = indicators.querySelectorAll('.indicator-dot');
          dots.forEach(dot => dot.classList.remove('active'));
          dots[n].classList.add('active');
        }
        
        // Show current slide
        slides[n].style.display = 'block';
        currentSlide = n;
      }
      
      // Previous slide function
      function prevSlide() {
        let index = currentSlide - 1;
        if (index < 0) index = slides.length - 1;
        showSlide(index);
      }
      
      // Next slide function
      function nextSlide() {
        let index = currentSlide + 1;
        if (index >= slides.length) index = 0;
        showSlide(index);
      }
      
      // Add event listeners to buttons
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      
      // Setup auto advancement if enabled
      if (slideshow.getAttribute('data-auto') === 'true') {
        const interval = parseInt(slideshow.getAttribute('data-interval')) || 5000;
        
        // Start auto-advancing
        slideInterval = setInterval(nextSlide, interval);
        
        // Pause on hover
        slideshow.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
        });
        
        // Resume on mouse leave
        slideshow.addEventListener('mouseleave', () => {
          slideInterval = setInterval(nextSlide, interval);
        });
      }
      
      // Keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
    });
    
    // ============================================================
    // Citation tooltips (optional enhancement)
    // ============================================================
    const citations = document.querySelectorAll('.citation');
    
    citations.forEach(citation => {
      citation.setAttribute('title', 'Click to view reference');
      
      // Optional: Add smooth scrolling to citation references
      citation.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Highlight the target briefly
          targetElement.classList.add('highlight');
          setTimeout(() => {
            targetElement.classList.remove('highlight');
          }, 2000);
          
          // Smooth scroll
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
    
    console.log('Post features initialized successfully');
  });