import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';

export function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <main>
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Testimonials />
    </main>
  );
}