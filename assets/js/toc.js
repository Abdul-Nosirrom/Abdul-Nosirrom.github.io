// TOC handler
document.addEventListener('DOMContentLoaded', function() {
    // Add id attributes to all headings for TOC
    const postContent = document.querySelector('.post-content');
    const isSidebarToc = document.querySelector('.toc-sidebar') !== null;
    
    if (postContent && isSidebarToc) {
      // Generate IDs for all headings
      const headings = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(function(heading, index) {
        if (!heading.id) {
          const headingText = heading.textContent.trim();
          const slug = headingText
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          heading.id = slug || `heading-${index}`;
        }
      });
      
      const tocSidebar = document.querySelector('.toc-sidebar');
      
      // Create close button inside TOC
      const closeBtn = document.createElement('button');
      closeBtn.className = 'toc-close';
      closeBtn.innerHTML = '×';
      closeBtn.setAttribute('aria-label', 'Close Table of Contents');
      tocSidebar.appendChild(closeBtn);
      
    // Create separate toggle button that stays fixed on the side when TOC is hidden
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toc-fixed-toggle';
    toggleBtn.innerHTML = '→';
    toggleBtn.setAttribute('aria-label', 'Show Table of Contents');
    document.body.appendChild(toggleBtn);
          
      // Check if we should initially hide TOC based on screen width
      const shouldHide = window.innerWidth <= 1100;
      if (shouldHide) {
        tocSidebar.style.display = 'none';
        toggleBtn.style.display = 'flex';
      } else {
        tocSidebar.style.display = 'block';
        toggleBtn.style.display = 'none';
      }
      
      // Close button functionality
      closeBtn.addEventListener('click', function() {
        tocSidebar.style.display = 'none';
        tocSidebar.classList.remove('visible');
        toggleBtn.style.display = 'flex';
      });
      
      // Toggle button functionality
      toggleBtn.addEventListener('click', function() {
        tocSidebar.style.display = 'block';
        tocSidebar.classList.add('visible');
        toggleBtn.style.display = 'none';
      });
      
      // Close when clicking outside
      document.addEventListener('click', function(event) {
        if (!tocSidebar.contains(event.target) && 
            event.target !== toggleBtn &&
            tocSidebar.style.display === 'block' &&
            window.innerWidth <= 1100) {
          tocSidebar.style.display = 'none';
          tocSidebar.classList.remove('visible');
          toggleBtn.style.display = 'flex';
        }
      });
      
      // Update on window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth <= 1100) {
          // On narrow screens, hide TOC and show toggle if not already toggled
          if (!tocSidebar.classList.contains('visible')) {
            tocSidebar.style.display = 'none';
            toggleBtn.style.display = 'flex';
          }
        } else {
          // On wide screens, always show TOC and hide toggle
          tocSidebar.style.display = 'block';
          toggleBtn.style.display = 'none';
          tocSidebar.classList.remove('visible'); // Reset for next resize
        }
      });
    }
    
    // Smooth scroll for TOC links
    const tocLinks = document.querySelectorAll('.toc a, .toc-sidebar a');
    tocLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close TOC on small screens
          const tocSidebar = document.querySelector('.toc-sidebar');
          const toggleBtn = document.querySelector('.toc-fixed-toggle');
          
          if (tocSidebar && toggleBtn && window.innerWidth <= 1100) {
            tocSidebar.style.display = 'none';
            tocSidebar.classList.remove('visible');
            toggleBtn.style.display = 'flex';
          }
          
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
          
          // Update the URL hash without jumping
          history.pushState(null, null, '#' + targetId);
          
          // Update active link
          updateActiveTocLink(targetId);
        }
      });
    });
    
    // Highlight TOC item based on scroll position
    if (tocLinks.length) {
      const headingElements = Array.from(document.querySelectorAll('.post-content h1[id], .post-content h2[id], .post-content h3[id], .post-content h4[id], .post-content h5[id], .post-content h6[id]'));
      
      // Update active class for TOC links
      function updateActiveTocLink(headingId) {
        // Remove active class from all links/li elements
        document.querySelectorAll('.toc a, .toc li, .toc-sidebar a, .toc-sidebar li')
          .forEach(el => el.classList.remove('toc-active'));
        
        // Add active class to current heading link
        const selector = headingId ? `a[href="#${headingId}"]` : null;
        if (selector) {
          document.querySelectorAll(`.toc ${selector}, .toc-sidebar ${selector}`).forEach(link => {
            // Add active class to the link
            link.classList.add('toc-active');
            // Add active class to parent li
            if (link.parentElement) {
              link.parentElement.classList.add('toc-active');
            }
          });
        }
      }
      
      // Debounce function to limit scroll event firing
      function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
          const context = this, args = arguments;
          const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      }
      
      // Find heading currently in viewport
      function findCurrentHeadingInViewport() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Find the heading that's currently visible
        for (let i = 0; i < headingElements.length; i++) {
          const heading = headingElements[i];
          const nextHeading = headingElements[i + 1] || null;
          
          const headingTop = heading.getBoundingClientRect().top + window.scrollY;
          const headingBottom = nextHeading 
            ? (nextHeading.getBoundingClientRect().top + window.scrollY)
            : document.body.scrollHeight;
          
          // If current scroll is between this heading and the next
          if (scrollPosition >= headingTop - 120 && 
              (nextHeading === null || scrollPosition < headingBottom - 120)) {
            return heading;
          }
        }
        
        // Default to first heading if none is found and page is scrolled down
        if (scrollPosition > 100 && headingElements.length > 0) {
          return headingElements[0];
        }
        
        return null;
      }
      
      // Update the active TOC link on scroll
      function updateActiveOnScroll() {
        const currentHeading = findCurrentHeadingInViewport();
        
        if (currentHeading) {
          updateActiveTocLink(currentHeading.id);
        } else {
          // Clear active states if no heading is found
          updateActiveTocLink(null);
        }
      }
      
      // Update on scroll
      window.addEventListener('scroll', debounce(updateActiveOnScroll, 50));
      
      // Initial update
      updateActiveOnScroll();
    }
  });