/**
 * Enhanced Gallery Functionality
 * - Handles slide navigation
 * - Updates thumbnail active states
 * - Manages counter display
 * - Supports keyboard navigation
 * - Supports fullscreen mode
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeGalleries();
    
    function initializeGalleries() {
      const gallerySliders = document.querySelectorAll('.gallery-slider');
      
      gallerySliders.forEach(gallerySlider => {
        const galleryContainer = gallerySlider.closest('.gallery-container');
        if (!galleryContainer) return;
        
        const slides = gallerySlider.querySelectorAll('.gallery-slide');
        const thumbnails = galleryContainer.querySelectorAll('.gallery-thumbnail');
        const prevBtn = galleryContainer.querySelector('.prev-slide');
        const nextBtn = galleryContainer.querySelector('.next-slide');
        const currentSlideElement = galleryContainer.querySelector('.current-slide');
        const fullscreenToggleBtn = galleryContainer.querySelector('.fullscreen-toggle');
        
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        let isFullscreen = false;
        
        // Show a specific slide
        function showSlide(index) {
          // Hide all slides
          slides.forEach(slide => slide.style.display = 'none');
          
          // Remove active class from all thumbnails
          thumbnails.forEach(thumb => thumb.classList.remove('active'));
          
          // Show current slide and activate thumbnail
          slides[index].style.display = 'block';
          thumbnails[index].classList.add('active');
          
          // Update counter
          if (currentSlideElement) {
            currentSlideElement.textContent = index + 1;
          }
          
          // Scroll thumbnail into view if needed
          if (thumbnails[index]) {
            scrollThumbnailIntoView(thumbnails[index]);
          }
          
          currentSlide = index;
        }
        
        // Navigate to previous slide
        function prevSlide() {
          let index = currentSlide - 1;
          if (index < 0) index = slides.length - 1;
          showSlide(index);
        }
        
        // Navigate to next slide
        function nextSlide() {
          let index = currentSlide + 1;
          if (index >= slides.length) index = 0;
          showSlide(index);
        }
        
        // Scroll thumbnail into view if partially visible
        function scrollThumbnailIntoView(thumbnail) {
          const container = thumbnail.closest('.gallery-thumbnails-container');
          if (!container) return;
          
          const containerRect = container.getBoundingClientRect();
          const thumbnailRect = thumbnail.getBoundingClientRect();
          
          // If thumbnail is not fully visible, scroll it into view
          if (thumbnailRect.left < containerRect.left || thumbnailRect.right > containerRect.right) {
            container.scrollLeft = thumbnail.offsetLeft - container.offsetWidth / 2 + thumbnail.offsetWidth / 2;
          }
        }
        
        // Toggle fullscreen mode
        function toggleFullscreen() {
          isFullscreen = !isFullscreen;
          
          if (isFullscreen) {
            galleryContainer.classList.add('fullscreen');
            document.body.classList.add('gallery-fullscreen-active');
            
            // Ensure the current slide's image is properly sized
            setTimeout(() => {
              // Trigger a resize event to ensure images are properly sized
              window.dispatchEvent(new Event('resize'));
            }, 100);
          } else {
            galleryContainer.classList.remove('fullscreen');
            document.body.classList.remove('gallery-fullscreen-active');
            
            // Ensure the current slide's image is properly sized
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'));
            }, 100);
          }
        }
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (fullscreenToggleBtn) fullscreenToggleBtn.addEventListener('click', toggleFullscreen);
        
        // Thumbnail click events
        thumbnails.forEach((thumb, index) => {
          thumb.addEventListener('click', () => showSlide(index));
        });
        
        // Initialize first slide
        showSlide(0);
        
        // Add swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallerySlider.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        gallerySlider.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
          const minSwipeDistance = 50;
          if (touchEndX < touchStartX - minSwipeDistance) {
            // Swiped left, go to next slide
            nextSlide();
          } else if (touchEndX > touchStartX + minSwipeDistance) {
            // Swiped right, go to previous slide
            prevSlide();
          }
        }
        
        // Allow ESC key to exit fullscreen
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && isFullscreen) {
            toggleFullscreen();
          }
        });
      });
    }
    
    // Keyboard navigation
    function handleKeyboardNavigation(e) {
      // Only handle keyboard events if a gallery is present
      if (!document.querySelector('.gallery-slider')) return;
      
      if (e.key === 'ArrowLeft') {
        const prevButtons = document.querySelectorAll('.prev-slide');
        if (prevButtons.length > 0) {
          // Use the first gallery's prev button if multiple galleries exist
          prevButtons[0].click();
        }
      } else if (e.key === 'ArrowRight') {
        const nextButtons = document.querySelectorAll('.next-slide');
        if (nextButtons.length > 0) {
          // Use the first gallery's next button if multiple galleries exist
          nextButtons[0].click();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        // F key toggles fullscreen
        const fullscreenToggle = document.querySelector('.fullscreen-toggle');
        if (fullscreenToggle) {
          fullscreenToggle.click();
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyboardNavigation);
  });