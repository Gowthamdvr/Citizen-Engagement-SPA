
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Vision', id: 'vision' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Volunteer', id: 'volunteer' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHome = currentView === 'home';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'nav-glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => handleLinkClick('home')} 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">AV</div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled || !isHome ? 'text-slate-900' : 'text-white'}`}>
              Dr. Arjun Vardhan
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-semibold transition-colors ${
                  currentView === link.id 
                    ? 'text-blue-600' 
                    : (scrolled || !isHome ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white')
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleLinkClick('volunteer')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              Join Movement
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled || !isHome ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col items-center justify-center h-full space-y-8">
          <button onClick={() => handleLinkClick('home')} className="text-2xl font-bold text-slate-800">Home</button>
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)}
              className={`text-2xl font-bold ${currentView === link.id ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('volunteer')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-xl"
          >
            Join Movement
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
