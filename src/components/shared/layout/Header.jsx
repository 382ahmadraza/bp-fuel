import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { Icon } from "../../../assets/icons";
import { navLinks } from "../../../data";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 "
            onClick={closeMenu}
          >
            <img src="/logo.png" alt="bp-fuel" className="w-32 sm:w-52" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-[#4CAF50] px-3 py-2 rounded-md ${
                  location.pathname === link.path
                    ? "text-[#4CAF50] bg-green-50"
                    : "text-[#424242]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => navigate("/bp-check")}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#45a049] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => navigate("/bp-check")}
              className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#45a049] transition-all duration-200 text-sm"
            >
              Get Started
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <Icon
                name={isMenuOpen ? "x" : "menu"}
                className="w-6 h-6 text-[#424242]"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="py-4 border-t border-gray-200 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block py-3 px-4 font-medium transition-colors hover:text-[#4CAF50] hover:bg-green-50 rounded-md ${
                  location.pathname === link.path
                    ? "text-[#4CAF50] bg-green-50"
                    : "text-[#424242]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
};
