// assets/js/tag-filter.js
/**
 * Simple Tag Filtering System
 * - Tags are highlighted when selected
 * - Clicking a tag toggles its selection
 * - Clear All button removes all filters
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find required elements
    const tagList = document.getElementById('tagList');
    const postList = document.getElementById('postList');
    const activeFilters = document.getElementById('activeFilters');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const posts = document.querySelectorAll('.post-item');
    
    // No posts or tag list? Exit early
    if (!tagList || !postList || !posts.length) return;
    
    // Track active tags
    let activeTags = [];
    
    // Hide active filters section initially
    if (activeFilters) {
      activeFilters.classList.add('hidden');
    }
    
    // Handle tag clicks
    tagList.addEventListener('click', function(e) {
      const target = e.target.closest('.tag-filter');
      if (!target) return;
      
      const tag = target.getAttribute('data-tag');
      
      // Toggle active state
      if (activeTags.includes(tag)) {
        // Remove tag
        activeTags = activeTags.filter(t => t !== tag);
        target.classList.remove('active');
      } else {
        // Add tag
        activeTags.push(tag);
        target.classList.add('active');
      }
      
      // Update UI
      updateActiveFiltersVisibility();
      filterPosts();
    });
    
    // Handle clear button click
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
        // Reset active tags
        activeTags = [];
        
        // Remove active class from all tag buttons
        document.querySelectorAll('.tag-filter.active').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Update UI
        updateActiveFiltersVisibility();
        filterPosts();
      });
    }
    
    // Show/hide active filters section
    function updateActiveFiltersVisibility() {
      if (activeFilters) {
        if (activeTags.length === 0) {
          activeFilters.classList.add('hidden');
        } else {
          activeFilters.classList.remove('hidden');
        }
      }
    }
    
    // Filter posts based on selected tags
    function filterPosts() {
      // If no tags selected, show all posts
      if (activeTags.length === 0) {
        posts.forEach(post => post.style.display = '');
        return;
      }
      
      // Filter posts by selected tags
      posts.forEach(post => {
        const postTags = post.getAttribute('data-tags');
        
        // Skip posts without tags
        if (!postTags) {
          post.style.display = 'none';
          return;
        }
        
        // Check if post has all selected tags
        const postTagsArray = postTags.trim().split(' ');
        const showPost = activeTags.every(tag => postTagsArray.includes(tag));
        
        post.style.display = showPost ? '' : 'none';
      });
    }
  });