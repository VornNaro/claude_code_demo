'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 'galaxy-s24-ultra',
    title: 'Galaxy S24 Ultra',
    subtitle: 'The ultimate Galaxy AI experience',
    description: 'Titanium frame. 200MP camera. Built-in S Pen.',
    bg: 'from-samsung-blue to-indigo-900',
    cta: 'Shop Now',
  },
  {
    id: 'galaxy-z-fold5',
    title: 'Galaxy Z Fold5',
    subtitle: 'Unfold your world',
    description: 'The most powerful foldable smartphone.',
    bg: 'from-purple-900 to-indigo-900',
    cta: 'Learn More',
  },
  {
    id: 'galaxy-buds3-pro',
    title: 'Galaxy Buds3 Pro',
    subtitle: 'Sound reimagined',
    description: 'AI-powered adaptive noise canceling with blade design.',
    bg: 'from-gray-800 to-gray-900',
    cta: 'Shop Now',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="relative overflow-hidden rounded-2xl mx-4 lg:mx-0">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={cn(
              'min-w-full bg-gradient-to-br text-white py-16 px-8 md:py-24 md:px-16',
              slide.bg
            )}
          >
            <div className="max-w-xl">
              <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-2">
                {slide.subtitle}
              </p>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                {slide.description}
              </p>
              <Link
                href={`/product/${slide.id}`}
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-2 h-2 rounded-full transition-all cursor-pointer',
              i === current ? 'bg-white w-6' : 'bg-white/50'
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
