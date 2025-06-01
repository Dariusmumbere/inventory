// navigation.js
document.addEventListener('DOMContentLoaded', function() {
    // Get all sidebar links and section contents
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sectionContents = document.querySelectorAll('.section-content');

    // Function to hide all sections
    function hideAllSections() {
        sectionContents.forEach(section => {
            section.classList.remove('active');
        });
    }

    // Function to show a specific section
    function showSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }
    }

    // Add click event listeners to all sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            hideAllSections();
            
            // Show selected section
            const sectionId = this.getAttribute('data-section') + '-section';
            showSection(sectionId);
            
            // Close sidebar on mobile (if open)
            const sidebar = document.getElementById('sidebar');
            if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    });

    // Initialize the dashboard as the default active section
    const defaultLink = document.querySelector('.sidebar-menu a[data-section="dashboard"]');
    if (defaultLink) {
        defaultLink.classList.add('active');
        showSection('dashboard-section');
    }
});
