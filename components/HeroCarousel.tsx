"use client";
import { useState, useEffect } from "react";

interface Slide {
  image: string;
  alt: string;
  stat?: string;
  label?: string;
}

interface Props {
  slides: Slide[];
  autoPlayInterval?: number;
}

export default function HeroCarousel({ slides, autoPlayInterval = 4000 }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-neutral-100">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

          {/* Stat Overlay (optional) */}
          {slide.stat && (
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-2xl font-black font-rounded">{slide.stat}</p>
              {slide.label && (
                <p className="text-sm font-medium opacity-90">{slide.label}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
