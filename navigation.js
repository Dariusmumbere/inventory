/**
 * StockMaster Navigation Controller
 * Handles all navigation functionality for the StockMaster inventory management system
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sectionContents = document.querySelectorAll('.section-content');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Initialize navigation
    initNavigation();

    /**
     * Initialize all navigation functionality
     */
    function initNavigation() {
        // Set up mobile menu toggle
        setupMobileMenu();
        
        // Set up sidebar navigation
        setupSidebarNavigation();
        
        // Set up tab navigation
        setupTabNavigation();
        
        // Set up initial active section
        setInitialActiveSection();
    }

    /**
     * Set up mobile menu toggle functionality
     */
    function setupMobileMenu() {
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('show');
                document.body.classList.toggle('sidebar-open');
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 992 && 
                !sidebar.contains(e.target) && 
                e.target !== menuToggle) {
                sidebar.classList.remove('show');
                document.body.classList.remove('sidebar-open');
            }
        });
    }

    /**
     * Set up sidebar navigation functionality
     */
    function setupSidebarNavigation() {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section from data attribute
                const sectionId = this.getAttribute('data-section');
                
                if (sectionId) {
                    // Switch to the selected section
                    switchSection(sectionId);
                    
                    // Close sidebar on mobile
                    if (window.innerWidth < 992) {
                        sidebar.classList.remove('show');
                        document.body.classList.remove('sidebar-open');
                    }
                }
            });
        });
    }

    /**
     * Set up tab navigation functionality
     */
    function setupTabNavigation() {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                if (tabId) {
                    // Switch to the selected tab
                    switchTab(tabId);
                }
            });
        });
    }

    /**
     * Set the initial active section based on URL hash or default to dashboard
     */
    function setInitialActiveSection() {
        // Get section from URL hash if present
        const hash = window.location.hash.substring(1);
        const validSections = ['dashboard', 'products', 'inventory', 'sales', 'suppliers', 'reports', 'settings'];
        
        if (hash && validSections.includes(hash)) {
            switchSection(hash);
        } else {
            // Default to dashboard
            switchSection('dashboard');
        }
    }

    /**
     * Switch to a specific section
     * @param {string} sectionId - The ID of the section to switch to
     */
    function switchSection(sectionId) {
        // Validate section ID
        if (!sectionId) return;
        
        // Update URL hash
        window.location.hash = sectionId;
        
        // Update active state in sidebar
        updateSidebarActiveState(sectionId);
        
        // Hide all sections
        hideAllSections();
        
        // Show the selected section
        const sectionElement = document.getElementById(`${sectionId}-section`);
        if (sectionElement) {
            sectionElement.classList.add('active');
            
            // Load section data if needed
            loadSectionData(sectionId);
        }
    }

    /**
     * Update the active state in the sidebar navigation
     * @param {string} sectionId - The ID of the active section
     */
    function updateSidebarActiveState(sectionId) {
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Hide all content sections
     */
    function hideAllSections() {
        sectionContents.forEach(section => {
            section.classList.remove('active');
        });
    }

    /**
     * Load data for a specific section
     * @param {string} sectionId - The ID of the section to load data for
     */
    function loadSectionData(sectionId) {
        // In a complete application, this would call specific data loading functions
        // For this example, we'll just log which section was loaded
        console.log(`Loading data for section: ${sectionId}`);
        
        // You would typically have functions like:
        /*
        switch(sectionId) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'products':
                loadProductsData();
                break;
            // ... other cases
        }
        */
    }

    /**
     * Switch to a specific tab within the current section
     * @param {string} tabId - The ID of the tab to switch to
     */
    function switchTab(tabId) {
        // Validate tab ID
        if (!tabId) return;
        
        // Get the parent tabs container
        const tabsContainer = document.querySelector(`.tab[data-tab="${tabId}"]`)?.closest('.tabs');
        if (!tabsContainer) return;
        
        // Update active state for tabs
        tabsContainer.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        tabsContainer.querySelector(`.tab[data-tab="${tabId}"]`)?.classList.add('active');
        
        // Hide all tab contents in this section
        const tabContentContainer = tabsContainer.nextElementSibling;
        if (tabContentContainer) {
            tabContentContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the selected tab content
            const tabContent = tabContentContainer.querySelector(`#${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
                
                // Load tab data if needed
                loadTabData(tabId);
            }
        }
    }

    /**
     * Load data for a specific tab
     * @param {string} tabId - The ID of the tab to load data for
     */
    function loadTabData(tabId) {
        // In a complete application, this would call specific data loading functions
        console.log(`Loading data for tab: ${tabId}`);
        
        // You would typically have functions like:
        /*
        switch(tabId) {
            case 'all':
                loadAllInventoryData();
                break;
            case 'low':
                loadLowStockData();
                break;
            // ... other cases
        }
        */
    }

    // Make navigation functions available globally if needed
    window.StockMaster = window.StockMaster || {};
    window.StockMaster.Navigation = {
        switchSection,
        switchTab
    };
});

// Error handling for the navigation module
window.addEventListener('error', function(e) {
    console.error('Navigation error:', e.message, e.filename, e.lineno, e.colno);
    
    // You could add error recovery or user notification here
    // For example, show a toast notification:
    /*
    const toast = document.createElement('div');
    toast.className = 'toast error';
    toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>Navigation error occurred. Please try again.</span>
    `;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
    */
});
