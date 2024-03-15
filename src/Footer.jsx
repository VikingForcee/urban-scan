import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Urban Scan. All rights reserved.</p>
    </footer>
  );
}

export default Footer;