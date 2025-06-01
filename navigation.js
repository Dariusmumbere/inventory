// navigation.js
document.addEventListener('DOMContentLoaded', function() {
    // Get all sidebar links and section contents
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const sectionContents = document.querySelectorAll('.section-content');
    
    // Function to switch between sections
    function switchSection(sectionId) {
        // Hide all sections
        sectionContents.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const selectedSection = document.getElementById(sectionId + '-section');
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
        
        // Close sidebar on mobile
        if (window.innerWidth < 992) {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('show');
        }
    }
    
    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the section to show from data-section attribute
            const sectionId = this.getAttribute('data-section');
            
            // Switch to the selected section
            switchSection(sectionId);
        });
    });
    
    // Initialize the dashboard as the default active section
    const defaultSection = 'dashboard';
    const defaultLink = document.querySelector(`.sidebar-menu a[data-section="${defaultSection}"]`);
    if (defaultLink) {
        defaultLink.classList.add('active');
        switchSection(defaultSection);
    }
});
