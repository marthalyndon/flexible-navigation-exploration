// Sub-navigation state management
const navItems = document.querySelectorAll('.nav-item');
const subNav = document.querySelector('.sub-nav');
const closeBtn = document.querySelector('.close-btn');
const subNavHeader = document.querySelector('.sub-nav-header h3');

// Toggle sub-nav on main nav item click
navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Update sub-nav header from title attribute
        const label = item.getAttribute('title');
        subNavHeader.textContent = label;
        
        // Show sub-nav
        subNav.classList.remove('hidden');
        
        // Generate different content based on clicked item
        updateSubNavContent(label);
    });
});

// Close sub-nav
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    subNav.classList.add('hidden');
    navItems.forEach(nav => nav.classList.remove('active'));
});

// Update sub-nav content based on selected main nav item
function updateSubNavContent(category) {
    const subNavContent = document.querySelector('.sub-nav-content');
    
    const contentMap = {
        'Dashboards': [
            { label: 'Front End', subItems: ['User Analytics', 'Performance Metrics', 'Engagement Dashboard'] },
            { label: 'Back End', subItems: ['API Performance', 'Database Metrics', 'Server Health'] },
            { label: 'Marketing', subItems: ['Campaign Performance', 'Social Media'] },
            { 
                label: 'All Dashboards', 
                subItems: [
                    'Revenue Analytics', 'Sales Pipeline', 'Customer Success', 'Product Usage',
                    'Infrastructure Monitoring', 'Security Overview', 'Compliance Dashboard',
                    'Team Performance', 'Bug Tracking', 'Release Management', 'Cost Analysis',
                    'Traffic Sources', 'Conversion Funnel', 'Email Campaigns', 'Mobile App Analytics'
                ]
            }
        ],
        'Analytics': [
            { label: 'Real-time', subItems: ['Live Users', 'Active Sessions', 'Current Events'] },
            { label: 'Reports', subItems: ['Daily Report', 'Weekly Summary', 'Monthly Overview', 'Quarterly Analysis'] },
            { label: 'Custom', subItems: ['Build Report', 'Saved Queries', 'Export Data'] }
        ],
        'Settings': [
            { label: 'Account', subItems: ['Profile Settings', 'Preferences', 'Notifications'] },
            { label: 'Security', subItems: ['Password', 'Two-Factor Auth', 'API Keys', 'Sessions'] },
            { label: 'Billing', subItems: ['Subscription', 'Payment Method', 'Invoices'] }
        ],
        'Team': [
            { label: 'Members', subItems: ['Active Users', 'Pending Invites', 'Deactivated'] },
            { label: 'Permissions', subItems: ['Roles', 'Access Control', 'Dashboard Sharing'] }
        ]
    };
    
    const items = contentMap[category] || [];
    
    // Example starred items - in real app these would come from user preferences
    const starredItems = ['Analytics Overview', 'User Metrics'];
    
    // Separate the "All Dashboards" section from user-made sections
    const userSections = items.slice(0, -1);
    const allDashboardsSection = items[items.length - 1];
    
    subNavContent.innerHTML = `
        <div class="starred-section">
            <h4 class="section-title">Starred</h4>
            <ul class="starred-items">
                ${starredItems.map(item => `
                    <li class="sub-item" draggable="true">
                        <span class="drag-handle">⋮⋮</span>
                        <span class="item-label">${item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        <ul class="sub-nav-items" id="dashboardList">
            ${userSections.map(item => `
                <li class="sub-nav-item" draggable="true">
                    <div class="item-content">
                        <div class="item-header">
                            <span class="drag-handle">⋮⋮</span>
                            <span class="label">${item.label}</span>
                        </div>
                        <ul class="sub-items expanded">
                            ${item.subItems.map(subItem => `
                                <li class="sub-item" draggable="true">
                                    <span class="drag-handle">⋮⋮</span>
                                    <span class="item-label">${subItem}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </li>
            `).join('')}
        </ul>
        <div class="add-section-container">
            <button class="add-section-btn" id="addSectionBtn">
                <span class="plus-icon">+</span>
                <span class="btn-label">Add Section</span>
            </button>
        </div>
        <div class="section-divider"></div>
        <ul class="sub-nav-items">
            <li class="sub-nav-item fixed-section">
                <div class="item-content">
                    <div class="item-header">
                        <span class="label">${allDashboardsSection.label}</span>
                    </div>
                    <ul class="sub-items expanded">
                        ${allDashboardsSection.subItems.map(subItem => `
                            <li class="sub-item" draggable="true">
                                <span class="drag-handle">⋮⋮</span>
                                <span class="item-label">${subItem}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </li>
        </ul>
    `;
    
    // Re-initialize drag functionality
    initDragAndDrop();
    initSubItemDrag();
    initAddSectionButton();
}

// Drag and drop functionality
let draggedElement = null;

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.sub-nav-item[draggable="true"]:not(.starred):not(.fixed-section)');
    
    draggables.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all items
    const items = document.querySelectorAll('.sub-nav-item');
    items.forEach(item => item.classList.remove('drag-over'));
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
    
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const parent = this.parentNode;
        const allItems = [...parent.querySelectorAll('.sub-nav-item')];
        const draggedIndex = allItems.indexOf(draggedElement);
        const targetIndex = allItems.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedElement, this.nextSibling);
        } else {
            parent.insertBefore(draggedElement, this);
        }
    }
    
    this.classList.remove('drag-over');
    
    return false;
}

// Drag and drop functionality for sub-items
let draggedSubItem = null;

function initSubItemDrag() {
    const draggableSubItems = document.querySelectorAll('.sub-item[draggable="true"]');
    
    draggableSubItems.forEach(item => {
        item.addEventListener('dragstart', handleSubItemDragStart);
        item.addEventListener('dragend', handleSubItemDragEnd);
        item.addEventListener('dragover', handleSubItemDragOver);
        item.addEventListener('drop', handleSubItemDrop);
        item.addEventListener('dragleave', handleSubItemDragLeave);
    });
    
    // Make section headers accept drops
    const sectionHeaders = document.querySelectorAll('.item-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('dragover', handleHeaderDragOver);
        header.addEventListener('drop', handleHeaderDrop);
        header.addEventListener('dragleave', handleHeaderDragLeave);
    });
}

function handleSubItemDragStart(e) {
    draggedSubItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.stopPropagation();
}

function handleSubItemDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over and dragging class from all sub-items and headers
    const items = document.querySelectorAll('.sub-item');
    items.forEach(item => {
        item.classList.remove('drag-over');
        item.classList.remove('dragging');
    });
    
    const headers = document.querySelectorAll('.item-header');
    headers.forEach(header => header.classList.remove('drag-over-header'));
    
    draggedSubItem = null;
}

function handleSubItemDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    if (this !== draggedSubItem && this.classList.contains('sub-item')) {
        this.classList.add('drag-over');
    }
    
    e.stopPropagation();
    return false;
}

function handleSubItemDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleSubItemDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedSubItem && draggedSubItem !== this && this.classList.contains('sub-item')) {
        const parent = this.parentNode;
        const allItems = [...parent.querySelectorAll('.sub-item')];
        const draggedIndex = allItems.indexOf(draggedSubItem);
        const targetIndex = allItems.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedSubItem, this.nextSibling);
        } else {
            parent.insertBefore(draggedSubItem, this);
        }
    }
    
    this.classList.remove('drag-over');
    
    return false;
}

// Handle dragging items over section headers
function handleHeaderDragOver(e) {
    if (!draggedSubItem) return;
    
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    // Don't allow dropping on "Starred" or "All Dashboards" sections
    const section = this.closest('.sub-nav-item');
    if (!section || section.classList.contains('fixed-section')) {
        return false;
    }
    
    this.classList.add('drag-over-header');
    e.stopPropagation();
    return false;
}

function handleHeaderDragLeave(e) {
    this.classList.remove('drag-over-header');
}

function handleHeaderDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    if (!draggedSubItem) return false;
    
    this.classList.remove('drag-over-header');
    
    // Don't allow dropping on "Starred" or "All Dashboards" sections
    const section = this.closest('.sub-nav-item');
    if (!section || section.classList.contains('fixed-section')) {
        return false;
    }
    
    // Get the target section's sub-items list
    const targetSubItems = this.parentElement.querySelector('.sub-items');
    
    if (targetSubItems) {
        // Clone the dragged item to add to new section
        const clonedItem = draggedSubItem.cloneNode(true);
        
        // Re-add event listeners to the cloned item
        clonedItem.addEventListener('dragstart', handleSubItemDragStart);
        clonedItem.addEventListener('dragend', handleSubItemDragEnd);
        clonedItem.addEventListener('dragover', handleSubItemDragOver);
        clonedItem.addEventListener('drop', handleSubItemDrop);
        clonedItem.addEventListener('dragleave', handleSubItemDragLeave);
        
        // Add to the target section
        targetSubItems.appendChild(clonedItem);
        
        // Remove from original location if it's from "All Dashboards"
        const originalSection = draggedSubItem.closest('.sub-nav-item');
        if (originalSection && originalSection.classList.contains('fixed-section')) {
            // Copy from All Dashboards - don't remove original
        } else {
            // Move from another section - remove original
            draggedSubItem.remove();
        }
    }
    
    return false;
}

// Add section functionality
function initAddSectionButton() {
    const addSectionBtn = document.getElementById('addSectionBtn');
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', handleAddSection);
    }
}

function handleAddSection() {
    const sectionName = prompt('Enter section name:');
    if (sectionName && sectionName.trim()) {
        createNewSection(sectionName.trim());
    }
}

function createNewSection(name) {
    const dashboardList = document.getElementById('dashboardList');
    
    // Create new section element
    const newSection = document.createElement('li');
    newSection.className = 'sub-nav-item';
    newSection.draggable = true;
    
    newSection.innerHTML = `
        <div class="item-content">
            <div class="item-header">
                <span class="drag-handle">⋮⋮</span>
                <span class="label">${name}</span>
            </div>
            <ul class="sub-items expanded">
            </ul>
        </div>
    `;
    
    // Add to the list
    dashboardList.appendChild(newSection);
    
    // Re-initialize drag functionality for both sections and items
    initDragAndDrop();
    initSubItemDrag();
}

// Initialize drag and drop on page load
initDragAndDrop();
initSubItemDrag();
initAddSectionButton();

// Optional: Click outside to close sub-nav
document.addEventListener('click', (e) => {
    if (!subNav.contains(e.target) && 
        !e.target.closest('.nav-item') && 
        !subNav.classList.contains('hidden')) {
        // Uncomment to enable click-outside-to-close
        // subNav.classList.add('hidden');
        // navItems.forEach(nav => nav.classList.remove('active'));
    }
});

