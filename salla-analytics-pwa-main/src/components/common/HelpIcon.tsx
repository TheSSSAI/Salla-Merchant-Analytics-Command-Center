"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, ExternalLink } from 'lucide-react';

interface HelpIconProps {
  /** 
   * Unique identifier for fetching content if we were using a CMS.
   * For this implementation, we use direct title/description props.
   */
  id?: string;
  /** The title of the help popover */
  title: string;
  /** The main content/description text */
  description: string;
  /** Optional URL to a knowledge base article */
  learnMoreUrl?: string;
  /** Optional custom className for the trigger icon */
  className?: string;
}

/**
 * Contextual Help Component (US-060)
 * 
 * Renders a help icon that triggers a popover with explanatory text.
 * Implements accessibility best practices including keyboard navigation,
 * focus management, and aria attributes.
 * 
 * Uses a custom implementation for the popover to ensure zero external 
 * UI library dependencies (like Radix or Headless UI) are strictly required for compilation,
 * while maintaining enterprise-grade behavior.
 */
const HelpIcon: React.FC<HelpIconProps> = ({ 
  title, 
  description, 
  learnMoreUrl, 
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to trigger when closing via keyboard
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      <button
        ref={triggerRef}
        onClick={toggleOpen}
        type="button"
        className={`rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:text-gray-500 dark:hover:text-gray-300 ${className}`}
        aria-label={`Help information for ${title}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 transform rounded-lg border border-gray-200 bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:border-gray-700 dark:bg-gray-800 dark:ring-white dark:ring-opacity-10 sm:left-auto sm:right-0 sm:translate-x-0"
          role="dialog"
          aria-labelledby="help-title"
          aria-describedby="help-description"
        >
          <div className="mb-2 flex items-start justify-between">
            <h3 
              id="help-title" 
              className="text-sm font-semibold text-gray-900 dark:text-gray-100"
            >
              {title}
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              className="-mr-2 -mt-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Close help"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div id="help-description" className="text-xs text-gray-600 dark:text-gray-300">
            {description}
          </div>

          {learnMoreUrl && (
            <div className="mt-3 border-t border-gray-100 pt-2 dark:border-gray-700">
              <a 
                href={learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
              >
                Learn more
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}

          {/* Popover Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 sm:left-auto sm:right-4 sm:translate-x-0" />
        </div>
      )}
    </div>
  );
};

export default HelpIcon;