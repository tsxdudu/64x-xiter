import { Link } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { clearAuth, getAuth } from '../utils/auth';
import { useState, useEffect, useRef } from 'react';
import { Cart } from './Cart';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-surface text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            64x xiter
          </Link>
          
          <div className="flex items-center space-x-4">
            <Cart />
            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{user?.username}</span>
              </Link>
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          ref={menuRef}
          className={`md:hidden py-4 border-t border-gray-700 absolute top-16 left-0 right-0 bg-surface shadow-lg transition-all duration-200 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            <User className="w-5 h-5" />
            <span>{user?.username}</span>
          </Link>
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full mt-2 px-4"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}