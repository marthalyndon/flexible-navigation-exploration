# Flexible Navigation Exploration

A prototype for a flexible, drag-and-drop navigation system designed for dashboard management. Features customizable sections, starred items, and an intuitive interface inspired by Slack's grouping patterns.

## Features

### 🌟 Starred Section
- Pin frequently-used dashboards at the top
- Sticky positioning keeps starred items always visible
- Drag items to reorder within starred section

### 📁 Custom Sections
- Create unlimited custom sections (e.g., "Front End", "Back End", "Marketing")
- Drag section headers to reorder sections
- Each section can contain multiple dashboard items
- Collapse/expand functionality for better organization

### 🎯 Drag-and-Drop Functionality
- **Reorder sections**: Drag section headers to reorganize
- **Reorder items**: Drag dashboard items within sections
- **Add to sections**: Drag items from "All Dashboards" onto section headers
- **Move between sections**: Drag items from one section to another
- Visual feedback with grab handles (appear on hover)

### 📊 All Dashboards
- Fixed bottom section containing all available dashboards
- Copy dashboards to custom sections without removing from "All Dashboards"
- Includes 15+ pre-configured dashboard types

### 🎨 Design Features
- Clean, modern light theme
- Icon-only main navigation bar (60px wide)
- Smooth animations and transitions
- Hover states for better UX
- Visual feedback during drag operations

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local development server)

### Running Locally

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flexible-navigation-exploration.git
cd flexible-navigation-exploration
```

2. Start a local server:
```bash
python3 -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage

### Creating a New Section
1. Click the **"+ Add Section"** button above the divider
2. Enter a name for your section (e.g., "DevOps", "Sales")
3. The new section appears with a grab handle for reordering

### Adding Dashboards to Sections
1. Scroll down to **"All Dashboards"**
2. Click and drag any dashboard item
3. Hover over a section header until it highlights in blue
4. Drop the item on the section header
5. The dashboard will be added to that section

### Reordering
- **Sections**: Hover over section name to see grab handle (⋮⋮), then drag
- **Items**: Hover over dashboard name to see grab handle, then drag

### Starred Items
- Drag items from any section into the "Starred" section at the top
- Starred items remain visible when scrolling

## File Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # All styling and theme
├── script.js           # Drag-and-drop functionality and interactions
└── README.md           # This file
```

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom properties (CSS variables), Flexbox, smooth transitions
- **Vanilla JavaScript**: Drag and Drop API, DOM manipulation
- **No frameworks or dependencies**: Pure web technologies

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Key Components

#### CSS Variables
The theme uses CSS custom properties for easy customization:
- `--nav-width`: Icon navigation width (60px)
- `--sub-nav-width`: Sidebar width (280px)
- `--primary-bg`: Main background color
- `--accent-color`: Interactive element color
- And more...

#### Drag-and-Drop Implementation
- Uses HTML5 Drag and Drop API
- Separate handlers for sections vs. items
- Visual feedback during drag operations
- Smart behavior: copy from "All Dashboards", move between sections

## Customization

### Changing the Theme
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-bg: #ffffff;
    --accent-color: #0071e3;
    /* ... other variables */
}
```

### Adding Default Sections
Edit the `contentMap` object in `script.js`:

```javascript
const contentMap = {
    'Dashboards': [
        { label: 'Your Section', subItems: ['Item 1', 'Item 2'] },
        // Add more sections here
    ]
}
```

## Future Enhancements

Potential features to explore:
- [ ] Persistent storage (localStorage/backend)
- [ ] Delete/rename sections
- [ ] Right-click context menus
- [ ] Keyboard shortcuts
- [ ] Search/filter functionality
- [ ] Multi-select and bulk operations
- [ ] Undo/redo functionality
- [ ] Export/import section configurations
- [ ] Dark mode toggle
- [ ] Collaborative editing

## License

MIT License - feel free to use this project for any purpose.

## Contributing

This is an exploration/prototype project. Feel free to fork and experiment!

## Acknowledgments

Inspired by modern dashboard interfaces and Slack's channel organization patterns.

