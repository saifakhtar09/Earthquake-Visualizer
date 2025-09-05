import React from 'react';
import { 
  Globe, 
  BarChart3, 
  Shield, 
  MapPin, 
  Clock, 
  Smartphone,
  ExternalLink,
  Database
} from 'lucide-react';

function AboutPage() {
  const features = [
    {
      icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Real-time Global Data",
      description: "Live earthquake data from USGS covering worldwide seismic activity."
    },
    {
      icon: <MapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Interactive Mapping",
      description: "Explore earthquakes on an interactive map with magnitude-based colors."
    },
    {
      icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Analytics & Trends",
      description: "Charts and statistics to understand seismic patterns."
    },
    {
      icon: <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Mobile Friendly",
      description: "Fully responsive design that works on all devices."
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Auto-refresh",
      description: "Earthquake data refreshes every 5 minutes automatically."
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: "Reliable & Secure",
      description: "Built with trusted libraries and reliable APIs to ensure stable performance."
    }
  ];

  const technologies = [
    { name: "React 18", description: "UI library for building interactive interfaces" },
    { name: "React Leaflet", description: "Interactive maps with Leaflet in React" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "Vite", description: "Fast build tool and dev server" },
    { name: "USGS API", description: "Official earthquake data source" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 sm:p-4 bg-emerald-100 rounded-full">
              <Globe className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3">
            About Earthquake Visualizer
          </h1>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            A lightweight web app to visualize global seismic activity in real-time, 
            built for students, educators, and anyone curious about earthquakes.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Features */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {features.map((f, i) => (
              <div 
                key={i} 
                role="listitem"
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition"
              >
                <div className="flex items-center space-x-3 mb-3 text-emerald-600">
                  {f.icon}
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base lg:text-lg">{f.title}</h3>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm lg:text-base">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6">Built With</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {technologies.map((t, i) => (
              <div key={i} role="listitem" className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-800 text-sm sm:text-base lg:text-lg">{t.name}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-slate-600">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Source */}
        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Data Source</h2>
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 space-y-3 sm:space-y-0">
            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 mt-1" />
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base">
              Data comes from the{" "}
              <a 
                href="https://earthquake.usgs.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit USGS Earthquake Hazards Program"
                className="text-emerald-600 hover:underline"
              >
                USGS Earthquake Hazards Program
              </a>
              , updated every minute and refreshed in this app every 5 minutes.
            </p>
          </div>
        </section>

        {/* Links */}
        <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">Learn More</h2>
          <div className="space-y-3">
            <a 
              href="https://earthquake.usgs.gov/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Go to USGS Earthquake Hazards Program"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm lg:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>USGS Earthquake Hazards Program</span>
            </a>
            <a 
              href="https://www.usgs.gov/natural-hazards/earthquake-hazards" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Go to USGS Earthquake Science Resources"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm lg:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Earthquake Science Resources</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
