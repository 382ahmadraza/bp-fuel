import React from 'react';
import { Hero } from '../components/home/sections/Hero';
import { Features } from '../components/home/sections/Features';
import { Team } from '../components/home/sections/Team';
import { CTA } from '../components/home/sections/CTA';
import { Stats } from '../components/home/sections/Stats';

export const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <Team />
      <CTA />
    </main>
  );
};