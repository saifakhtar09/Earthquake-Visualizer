#  Earthquake Visualizer

A modern, responsive web application that visualizes real-time earthquake data from the USGS Earthquake API on an interactive world map. Built with React, Vite, Tailwind CSS, and Leaflet.

##  Live Demo
 **Sabdbox[View Live Application](https://r627js-5173.csb.app/)**
  **Netlify[View Live Application](https://earthquakeproject1.netlify.app/)**



##  Features

### Core Functionality
- **Real-time Data**: Fetches earthquake data from USGS API every 5 minutes
- **Interactive Map**: Displays earthquakes on a world map using react-leaflet
- **Detailed Information**: Click markers to view earthquake details (magnitude, time, location, depth)
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Advanced Filtering**: Filter by magnitude and search by region
- **Error Handling**: Comprehensive error handling with retry functionality

### User Interface
- **Clean Design**: Professional styling with Tailwind CSS
- **Magnitude Scale**: Color-coded markers based on earthquake severity
- **Side Panel**: Scrollable list of earthquakes with detailed information
- **Loading States**: Smooth loading indicators and animations
- **Auto-refresh**: Automatic data updates with manual refresh option

### Technical Features
- **Component Architecture**: Modular React components with clear separation of concerns
- **Context API**: Global state management for earthquake data
- **Custom Hooks**: Reusable logic for API calls and data processing
- **Performance**: Optimized rendering with efficient data structures
- **Accessibility**: WCAG compliant with proper ARIA labels

##  Tech Stack

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Mapping**: react-leaflet with OpenStreetMap tiles
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API with useReducer
- **API**: USGS Earthquake API for real-time data

##  Project Structure

```
earthquake-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── Chart.jsx               # Chart visualization component
│   │   ├── ErrorBoundary.jsx       # Error boundary wrapper
│   │   ├── Filters.jsx             # Filtering controls
│   │   ├── LoadingSpinner.jsx      # Loading indicator
│   │   ├── Map.jsx                 # Interactive earthquake map
│   │   ├── Sidebar.jsx             # Sidebar navigation
│   │   ├── EarthquakeList.jsx      # Scrollable earthquake list
│   │   └── Navbar.jsx              # Application header
│   ├── pages/
│   │   ├── AboutPage.jsx           # About page
│   │   ├── Home.jsx                # Main page
│   │   └── NotFound.jsx            # 404 page
│   ├── services/
│   │   └── api.js                  # API utilities and helpers
│   ├── context/
│   │   └── EarthquakeContext.jsx   # Global state management
│   ├── utils/
│   │   ├── constant.js             # App constants
│   │   ├── helper.js               # Utility helper functions
│   │   └── magnitudeScale.js       # Magnitude color/scale mappings
│   ├── __tests__/
│   │   ├── Chart.test.jsx
│   │   ├── EarthquakeList.test.jsx
│   │   ├── Home.test.jsx
│   │   └── LoadingSpinner.test.jsx
│   ├── App.jsx                     # Root application component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles and Tailwind imports
├── package.json
└── README.md

```

##  Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saifakhtar09/Earthquake-Visualizer.git
   cd earthquake-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

##  Deployment


### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run build && npm run deploy`

##  Configuration

### API Configuration
The app uses the USGS Earthquake API endpoint:
```
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
```

### Map Configuration
- Default center: [20, 0] (Equator)
- Default zoom: 2 (World view)
- Tiles: OpenStreetMap
- Custom markers based on magnitude

### Filter Configuration
- Magnitude range: 0.0 - 9.0
- Quick filters: All, Minor (3.0+), Light (4.0+), Moderate (5.0+), Strong (6.0+), Major (7.0+)
- Region search: Text-based filtering

##  Design System

### Color Palette
- **Primary Blue**: `#3B82F6` - Interactive elements
- **Emerald**: `#10B981` - Success states and micro earthquakes
- **Amber**: `#F59E0B` - Warning states and moderate earthquakes
- **Red**: `#EF4444` - Error states and major earthquakes
- **Gray Scale**: Various grays for text and backgrounds

### Typography
- **Font Family**: System UI fonts (ui-sans-serif, system-ui)
- **Heading Scale**: 1.25rem - 2rem
- **Body Text**: 0.875rem - 1rem
- **Small Text**: 0.75rem - 0.875rem

### Responsive Breakpoints
- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (side-by-side layout)

##  Testing

### Manual Testing Checklist
- [ ] Map loads and displays correctly
- [ ] Earthquake markers appear on map
- [ ] Clicking markers shows popup with details
- [ ] Earthquake list populates with data
- [ ] Filters work correctly (magnitude and region)
- [ ] Responsive design works on mobile
- [ ] Error handling displays appropriate messages
- [ ] Auto-refresh updates data
- [ ] External links open in new tabs

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

##  Troubleshooting

### Common Issues

**Map not loading:**
- Check internet connection
- Verify Leaflet CSS is loaded
- Check browser console for JavaScript errors

**No earthquake data:**
- Verify USGS API is accessible
- Check network connectivity
- Look for CORS issues in browser console

**Performance issues:**
- Limit the number of earthquakes displayed
- Check for memory leaks in React components
- Optimize marker rendering

### Debug Mode
Enable debug logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'true');
```



### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test on multiple browsers and devices
- Update documentation for new features
- Ensure responsive design principles

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **USGS** for providing free earthquake data API
- **OpenStreetMap** contributors for map tiles
- **Leaflet** team for the excellent mapping library
- **React** and **Vite** teams for development tools
- **Tailwind CSS** for utility-first styling

##  Support

For support or questions:
- Open an issue on GitHub
- Email: saifakhtar299@gmail.com
- Documentation: [https://github.com/saifakhtar09)

---

