'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Slider with no SSR
const Slider = dynamic(() => import('react-slick'), { 
  ssr: false,
  loading: () => <div className="carousel-loading">Loading carousel...</div>
});

// Import CSS only on client side
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Import CSS files only on client side
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
    setIsMounted(true);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (!isMounted) {
    return <div className="carousel-loading">Loading carousel...</div>;
  }

  return (
    <div className="carousel-container mb-8">
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel; 