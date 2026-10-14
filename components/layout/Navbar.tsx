import React from 'react';
import { NAV_ITEMS } from '../../constants';
import { NavItem } from '../../types';

interface NavbarProps {
  activeTab: NavItem;
  setActiveTab: (item: NavItem) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t border-base-200 shadow-t-lg z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-16">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item)}
                className={`flex flex-col items-center justify-center w-full text-sm font-medium transition-all duration-200 ease-in-out relative ${
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-primary'
                }`}
                aria-label={item.label}
              >
                {item.icon(isActive)}
                <span className={`mt-1 ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
