document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.sidebar a, .sidebar .menu-group');
    const dropdowns = document.querySelectorAll('.sidebar-dropdown');
    const notifToggle = document.getElementById('notifToggle');
    const notifPanel = document.getElementById('notifPanel');
    const sidebarCheckbox = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const openBtn = document.querySelector('label[for="menu-toggle"].open-btn');

    function updateParentStates() {
        dropdowns.forEach(dropdown => {
            const summary = dropdown.querySelector('.menu-group');
            const childLinks = dropdown.querySelectorAll('.menu-link');
            const hasActiveChild = Array.from(childLinks).some(link => link.classList.contains('active'));

            if (summary) {
                if (hasActiveChild && !dropdown.open) {
                    summary.classList.add('active');
                } else {
                    summary.classList.remove('active');
                }
            }
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if (this.classList.contains('menu-group')) {
                return;
            }

            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                menuItems.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                updateParentStates();
            }
        });
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('toggle', updateParentStates);
    });

    if (notifToggle && notifPanel) {
        notifToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            notifPanel.classList.toggle('open');
        });

        notifPanel.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    if (openBtn && sidebarCheckbox) {
        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sidebarCheckbox.checked = !sidebarCheckbox.checked;
        });
    }

    if (sidebar) {
        sidebar.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', function (e) {
        const clickedNotif = notifToggle && notifToggle.contains(e.target);
        const clickedNotifPanel = notifPanel && notifPanel.contains(e.target);
        if (sidebarCheckbox && sidebarCheckbox.checked && sidebar && !sidebar.contains(e.target) && (!openBtn || !openBtn.contains(e.target))) {
            sidebarCheckbox.checked = false;
        }

        if (notifPanel && notifPanel.classList.contains('open') && !clickedNotif && !clickedNotifPanel) {
            notifPanel.classList.remove('open');
        }
    });

    updateParentStates();
});

document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".sidebar-content a");
    const pageSections = document.querySelectorAll(".page-section");
    const headerTitle = document.querySelector(".page-header h3");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Find the target page ID from data-page attribute
            const targetPage = link.getAttribute("data-page");
            
            if (targetPage) {
                e.preventDefault(); // Stop page reload for dynamic links

                // 1. Switch Active Class on Sidebar Links
                menuLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");

                // 2. Dynamic Title updates in the Top Header
                headerTitle.textContent = link.textContent.trim();

                // 3. Hide all page sections, show only the target section
                pageSections.forEach(section => {
                    if (section.id === `page-${targetPage}`) {
                        section.classList.remove("d-none"); // Show section
                    } else {
                        section.classList.add("d-none");    // Hide section
                    }
                });
            }
        });
    });
});