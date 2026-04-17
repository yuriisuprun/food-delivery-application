/**
 * Header Component JavaScript
 * Handles mobile navigation, search overlay, user dropdown, and accessibility
 */

class HeaderComponent {
  constructor() {
    this.header = document.querySelector('.header');
    this.mobileToggle = document.querySelector('.header__mobile-toggle');
    this.mobileNav = document.querySelector('.header__mobile-nav');
    this.searchBtn = document.querySelector('.header__search-btn');
    this.searchOverlay = document.querySelector('.header__search-overlay');
    this.searchInput = document.querySelector('.header__search-input');
    this.searchClose = document.querySelector('.header__search-close');
    this.searchForm = document.querySelector('.header__search-form');
    this.userBtn = document.querySelector('.header__user-btn');
    this.userDropdown = document.querySelector('.header__dropdown');
    this.themeToggle = document.querySelector('.header__theme-toggle');
    this.mobileThemeToggle = document.querySelector('.header__mobile-theme-toggle');
    
    this.isSearchOpen = false;
    this.isMobileNavOpen = false;
    this.isUserDropdownOpen = false;
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupKeyboardNavigation();
    this.setupScrollBehavior();
    this.initializeTheme();
  }

  bindEvents() {
    // Mobile navigation toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileNav();
      });
    }

    // Search functionality
    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    }

    if (this.searchClose) {
      this.searchClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeSearch();
      });
    }

    if (this.searchOverlay) {
      this.searchOverlay.addEventListener('click', (e) => {
        if (e.target === this.searchOverlay) {
          this.closeSearch();
        }
      });
    }

    if (this.searchForm) {
      this.searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSearch();
      });
    }

    // User dropdown
    if (this.userBtn) {
      this.userBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleUserDropdown();
      });
    }

    // Theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }

    if (this.mobileThemeToggle) {
      this.mobileThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isUserDropdownOpen && !this.userBtn.contains(e.target) && !this.userDropdown.contains(e.target)) {
        this.closeUserDropdown();
      }
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
      this.handleKeydown(e);
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Handle logout buttons
    const logoutButtons = document.querySelectorAll('.header__dropdown-item--logout, .header__mobile-link--logout');
    logoutButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    });
  }

  setupKeyboardNavigation() {
    // Trap focus in search overlay when open
    if (this.searchOverlay) {
      const focusableElements = this.searchOverlay.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.searchOverlay.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && this.isSearchOpen) {
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        });
      }
    }
  }

  setupScrollBehavior() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        this.header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        this.header.style.boxShadow = 'none';
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    
    this.mobileToggle.setAttribute('aria-expanded', this.isMobileNavOpen.toString());
    this.mobileNav.setAttribute('aria-hidden', (!this.isMobileNavOpen).toString());
    
    if (this.isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first link in mobile nav
      const firstLink = this.mobileNav.querySelector('.header__mobile-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileNav() {
    if (this.isMobileNavOpen) {
      this.isMobileNavOpen = false;
      this.mobileToggle.setAttribute('aria-expanded', 'false');
      this.mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  openSearch() {
    this.isSearchOpen = true;
    this.searchBtn.setAttribute('aria-expanded', 'true');
    this.searchOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus search input
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.focus();
      }
    }, 100);
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.searchBtn.setAttribute('aria-expanded', 'false');
    this.searchOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Return focus to search button
    this.searchBtn.focus();
  }

  handleSearch() {
    const query = this.searchInput.value.trim();
    if (query) {
      console.log('Searching for:', query);
      // Implement search functionality here
      // Example: window.location.href = `/search?q=${encodeURIComponent(query)}`;
      this.closeSearch();
    }
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    
    this.userBtn.setAttribute('aria-expanded', this.isUserDropdownOpen.toString());
    this.userDropdown.setAttribute('aria-hidden', (!this.isUserDropdownOpen).toString());
    
    if (this.isUserDropdownOpen) {
      // Focus first dropdown item
      const firstItem = this.userDropdown.querySelector('.header__dropdown-item');
      if (firstItem) {
        setTimeout(() => firstItem.focus(), 50);
      }
    }
  }

  closeUserDropdown() {
    if (this.isUserDropdownOpen) {
      this.isUserDropdownOpen = false;
      this.userBtn.setAttribute('aria-expanded', 'false');
      this.userDropdown.setAttribute('aria-hidden', 'true');
    }
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'Escape':
        if (this.isSearchOpen) {
          this.closeSearch();
        } else if (this.isUserDropdownOpen) {
          this.closeUserDropdown();
          this.userBtn.focus();
        } else if (this.isMobileNavOpen) {
          this.closeMobileNav();
          this.mobileToggle.focus();
        }
        break;
        
      case '/':
        // Quick search shortcut (Cmd/Ctrl + /)
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          this.openSearch();
        }
        break;
        
      case 'ArrowDown':
        if (this.isUserDropdownOpen) {
          e.preventDefault();
          this.navigateDropdown('down');
        }
        break;
        
      case 'ArrowUp':
        if (this.isUserDropdownOpen) {
          e.preventDefault();
          this.navigateDropdown('up');
        }
        break;
    }
  }

  navigateDropdown(direction) {
    const items = Array.from(this.userDropdown.querySelectorAll('.header__dropdown-item'));
    const currentIndex = items.indexOf(document.activeElement);
    
    let nextIndex;
    if (direction === 'down') {
      nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }
    
    items[nextIndex].focus();
  }

  handleResize() {
    // Close mobile nav on resize to desktop
    if (window.innerWidth >= 768 && this.isMobileNavOpen) {
      this.closeMobileNav();
    }
  }

  handleLogout() {
    // Implement logout functionality
    console.log('Logging out...');
    // Example: 
    // fetch('/api/logout', { method: 'POST' })
    //   .then(() => window.location.href = '/login');
  }

  // Public methods for external use
  showNotification(message, type = 'info') {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  updateUserAvatar(avatarUrl) {
    const avatar = document.querySelector('.header__avatar');
    if (avatar && avatarUrl) {
      avatar.src = avatarUrl;
    }
  }

  setActiveNavItem(path) {
    // Remove active class from all nav items
    const navLinks = document.querySelectorAll('.header__nav-link, .header__mobile-link');
    navLinks.forEach(link => {
      link.classList.remove('header__nav-link--active');
    });
    
    // Add active class to matching nav item
    const activeLink = document.querySelector(`[href="${path}"]`);
    if (activeLink) {
      activeLink.classList.add('header__nav-link--active');
    }
  }

  // Theme Management Methods
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  initializeTheme() {
    // Apply the current theme
    this.applyTheme(this.currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update button attributes and labels
    if (this.themeToggle) {
      this.themeToggle.setAttribute('data-theme', theme);
      this.themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
    
    if (this.mobileThemeToggle) {
      this.mobileThemeToggle.setAttribute('data-theme', theme);
    }
    
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme === 'dark' ? '#111827' : '#FFFFFF';
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    this.setStoredTheme(this.currentTheme);
    
    // Announce theme change to screen readers
    const announcement = `Switched to ${this.currentTheme} mode`;
    this.announceToScreenReader(announcement);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Performance optimization: Use Intersection Observer for scroll effects
class HeaderScrollObserver {
  constructor(header) {
    this.header = header;
    this.init();
  }

  init() {
    // Create a sentinel element at the top of the page
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '100px';
    sentinel.style.left = '0';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.header.classList.remove('header--scrolled');
          } else {
            this.header.classList.add('header--scrolled');
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const headerComponent = new HeaderComponent();
  
  // Initialize scroll observer if supported
  if ('IntersectionObserver' in window) {
    new HeaderScrollObserver(headerComponent.header);
  }
  
  // Make header component globally available
  window.headerComponent = headerComponent;
});

// Service Worker registration for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}