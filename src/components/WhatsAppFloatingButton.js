import React, { useState, useEffect } from 'react';


export default function FloatingActionButtons() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // Si se desplaza hacia abajo
        setIsVisible(false);
      } else {
        // Si se desplaza hacia arriba
        setIsVisible(true);
      }
      setLastScrollTop(st < 0 ? 0 : st);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <a 
        target="_blank" 
        rel="noopener noreferrer" 
        href="https://wa.me/56992679247"
        className={`fixed z-40 bottom-4 right-4 ${isVisible ? 'block' : 'hidden'} sm:bottom-7 sm:right-7`}
    >
        <img src="/georent_html/img/wpp-hover.png" alt="WhatsApp" className="w-10 h-10 sm:w-10 sm:h-10 md:w-19 md:h-19 lg:w-30 lg:h-30" />
    </a>
  );
}