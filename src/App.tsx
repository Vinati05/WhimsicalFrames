import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, 
  Users, 
  Heart, 
  Image as ImageIcon,
  ChevronRight,
  Layout,
  PlayCircle,
  Edit,
  Camera,
  Sparkles,
  Share2,
  Clock,
  Palette
} from 'lucide-react';

type Template = {
  id: number;
  title: string;
  description: string;
  imageCount: number;
  preview: string;
  steps: {
    text: string;
    videoUrl: string;
  }[];
};

type Occasion = {
  id: number;
  title: string;
  icon: React.ReactNode;
  templates: Template[];
};

function App() {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [imageCount, setImageCount] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.photopea.com/api/photopea.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openPhotopeaEditor = () => {
    setShowEditor(true);
  };

  const handleImageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 6) {
      setImageCount(value);
    }
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      title: "Smart Templates",
      description: "Pre-designed layouts that adapt to your photos, making every creation look professional."
    },
    {
      icon: <Share2 className="w-6 h-6 text-purple-600" />,
      title: "Easy Sharing",
      description: "Export your creations in various formats perfect for social media and printing."
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      title: "Quick Creation",
      description: "Create stunning photo collections in minutes with our intuitive step-by-step guide."
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      title: "Creative Freedom",
      description: "Customize colors, filters, and effects to match your unique style and vision."
    }
  ];

  const occasions: Occasion[] = [
    {
      id: 1,
      title: "Birthday Celebrations",
      icon: <PartyPopper className="w-6 h-6" />,
      templates: [
        {
          id: 1,
          title: "Birthday Collage Story",
          description: "A vibrant collage perfect for birthday celebrations",
          imageCount: 4,
          preview: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format",
          steps: [
            {
              text: "Start by selecting your best 4 photos from the celebration. Choose photos with good lighting and clear faces.",
              videoUrl: "https://example.com/video1.mp4"
            },
            {
              text: "Arrange photos in a grid layout. Place the main birthday photo in the largest frame.",
              videoUrl: "https://example.com/video2.mp4"
            },
            {
              text: "Add birthday-themed stickers and GIFs to make it more festive.",
              videoUrl: "https://example.com/video3.mp4"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Friends Outings",
      icon: <Users className="w-6 h-6" />,
      templates: [
        {
          id: 2,
          title: "Adventure Carousel",
          description: "Perfect for sharing multiple moments from your outing",
          imageCount: 3,
          preview: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=500&auto=format",
          steps: [
            {
              text: "Select 3 photos that tell a story of your outing. Consider a mix of group shots and scenery.",
              videoUrl: "https://example.com/video4.mp4"
            },
            {
              text: "Use the carousel format to create a swipeable story series.",
              videoUrl: "https://example.com/video5.mp4"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Anniversary",
      icon: <Heart className="w-6 h-6" />,
      templates: [
        {
          id: 3,
          title: "Romantic Timeline",
          description: "A beautiful way to showcase your journey together",
          imageCount: 2,
          preview: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format",
          steps: [
            {
              text: "Choose two contrasting photos - one from the past and one recent.",
              videoUrl: "https://example.com/video6.mp4"
            },
            {
              text: "Add a romantic filter and overlay text with your anniversary date.",
              videoUrl: "https://example.com/video7.mp4"
            }
          ]
        }
      ]
    }
  ];

  const filteredTemplates = selectedOccasion?.templates.filter(
    template => template.imageCount <= imageCount
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-10 h-10 text-purple-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                WhimsyFrames
              </h1>
            </div>
            <p className="text-lg text-gray-600 italic">Because your stories deserve to shine!</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showEditor ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowEditor(false)}
                className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to tutorial</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900">Image Editor</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: "80vh" }}>
              <iframe
                src="https://www.photopea.com"
                width="100%"
                height="100%"
                className="border-0"
                allow="clipboard-write"
              />
            </div>
          </div>
        ) : !selectedOccasion ? (
          <>
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                Transform Your Photos Into<br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Stunning Stories
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                WhimsyFrames helps you create beautiful photo collections for every special moment. 
                Whether it's birthdays, friendships, or anniversaries, bring your memories to life with our 
                professional templates and easy-to-use editor.
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => window.scrollTo({ top: document.getElementById('occasions')?.offsetTop, behavior: 'smooth' })}
                  className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                <p className="text-lg text-gray-600">Create beautiful memories in three simple steps</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Choose Your Occasion</h3>
                  <p className="text-gray-600">Select from our curated collection of templates designed for every moment</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Add Your Photos</h3>
                  <p className="text-gray-600">Upload up to 6 of your favorite photos to tell your story</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customize & Share</h3>
                  <p className="text-gray-600">Personalize your creation and share it with the world</p>
                </div>
              </div>
            </div>

            <div id="occasions" className="scroll-mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Occasion</h2>
                <p className="text-lg text-gray-600">Start creating memories that last forever</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.id}
                    onClick={() => setSelectedOccasion(occasion)}
                    className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                        {React.cloneElement(occasion.icon as React.ReactElement, {
                          className: "w-8 h-8 text-purple-600"
                        })}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{occasion.title}</h3>
                    <p className="text-gray-600">Create stunning {occasion.title.toLowerCase()} memories</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : !selectedTemplate ? (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedOccasion(null)}
                className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to occasions</span>
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedOccasion.title} Templates
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <label className="block text-sm font-medium text-gray-700">
                How many images do you have? (0-6)
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={imageCount}
                  onChange={handleImageCountChange}
                  className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200"
                />
                <p className="mt-2 text-sm text-gray-500">Maximum 6 images allowed</p>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTemplates?.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={template.preview}
                      alt={template.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        {template.imageCount} images required
                      </span>
                      <button
                        onClick={() => setSelectedTemplate(template)}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        <span>Use Template</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedTemplate(null);
                    setCurrentStep(0);
                  }}
                  className="text-purple-600 hover:text-purple-700 flex items-center space-x-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Back to templates</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTemplate.title}
                </h2>
              </div>
              <button
                onClick={openPhotopeaEditor}
                className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Edit className="w-5 h-5" />
                <span>Open Editor</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <Layout className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold">Step {currentStep + 1} of {selectedTemplate.steps.length}</h3>
                </div>
                <p className="text-gray-700 text-lg mb-8">{selectedTemplate.steps[currentStep].text}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(selectedTemplate.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === selectedTemplate.steps.length - 1}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg disabled:opacity-50 hover:bg-purple-700 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <PlayCircle className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold">Tutorial Video</h3>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Video tutorial would play here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Create Something Beautiful?</h3>
            <p className="text-gray-600 mb-8">Join thousands of users who trust WhimsyFrames for their special moments</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              Start Creating Now
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;