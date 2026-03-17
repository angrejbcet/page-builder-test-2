"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/public/lib/utils";
import { useModal } from "@/providers/ModalProvider";

interface SlideData {
  id: string;
  image: string;
  headline: string;
  subheadline: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
}

type HeroHeight = "small" | "medium" | "large" | "fullscreen";

const HEIGHT_CLASSES: Record<HeroHeight, string> = {
  small: "min-h-[400px] @min-[768px]:min-h-[450px] @min-[1024px]:min-h-[500px]",
  medium: "min-h-[500px] @min-[768px]:min-h-[600px] @min-[1024px]:min-h-[700px]",
  large: "min-h-[600px] @min-[768px]:min-h-[700px] @min-[1024px]:min-h-[800px]",
  fullscreen: "min-h-screen",
};

const FIXED_HEIGHT_CLASSES: Record<HeroHeight, string> = {
  small: "h-[400px] @min-[768px]:h-[450px] @min-[1024px]:h-[500px]",
  medium: "h-[500px] @min-[768px]:h-[600px] @min-[1024px]:h-[700px]",
  large: "h-[600px] @min-[768px]:h-[700px] @min-[1024px]:h-[800px]",
  fullscreen: "h-screen",
};

export interface HeroSliderProps {
  slides: SlideData[];
  variant?: "slider" | "static" | "video" | string;
  height?: HeroHeight | string;
  elementStyles?: Record<string, string>;
}

function StaticHero({ slides, height = "large", elementStyles }: { slides: SlideData[]; height?: HeroHeight | string; elementStyles?: Record<string, string> }) {
  const { openContactModal } = useModal();
  const slide = slides[0];
  if (!slide) return null;
  const hClass = HEIGHT_CLASSES[height as HeroHeight] || HEIGHT_CLASSES.large;

  return (
    <div className={cn("relative w-full flex items-center", hClass)}>
      <div className="absolute inset-0" style={{ backgroundColor: "#1f2937" }}>
        {(slide.image?.startsWith("data:") || slide.image?.startsWith("http")) && (
          <img src={slide.image} alt={slide.headline || ""} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>
      <div className="relative z-10 max-w-[1325px] mx-auto w-full px-4 @min-[768px]:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl @min-[768px]:text-5xl @min-[1024px]:text-7xl font-bold text-white mb-6 leading-tight" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{slide.headline}</h1>
          <p className="text-lg @min-[768px]:text-2xl mb-10 text-gray-200" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{slide.subheadline}</p>
          <div className="flex flex-col @min-[640px]:flex-row items-start gap-4">
            {slide.cta1Text && slide.cta1Link && (
              slide.cta1Link === "/contact" ? (
                <button onClick={openContactModal} className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors cursor-pointer text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}>{slide.cta1Text}</button>
              ) : (
                <Link href={slide.cta1Link || "#"} className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}>{slide.cta1Text}</Link>
              )
            )}
            {slide.cta2Text && slide.cta2Link && (
              slide.cta2Link === "/contact" ? (
                <button onClick={openContactModal} className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors cursor-pointer text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}>{slide.cta2Text}</button>
              ) : (
                <Link href={slide.cta2Link || "#"} className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}>{slide.cta2Text}</Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoHero({ slides, height = "large", elementStyles }: { slides: SlideData[]; height?: HeroHeight | string; elementStyles?: Record<string, string> }) {
  const { openContactModal } = useModal();
  const slide = slides[0];
  if (!slide) return null;

  const hClass = HEIGHT_CLASSES[height as HeroHeight] || HEIGHT_CLASSES.large;

  return (
    <div className={cn("relative w-full flex items-center overflow-hidden", hClass)}>
      <div className="absolute inset-0 bg-secondary">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.3)_25%,transparent_25%,transparent_75%,rgba(0,0,0,0.3)_75%)] bg-[length:4px_4px] opacity-20" />
        {(slide.image?.startsWith("data:") || slide.image?.startsWith("http")) && (
          <img src={slide.image} alt={slide.headline || ""} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-transparent to-secondary/80" />
      </div>
      <div className="relative z-10 max-w-[1325px] mx-auto w-full px-4 @min-[768px]:px-8 text-center">
        <h1 className="text-4xl @min-[768px]:text-5xl @min-[1024px]:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{slide.headline}</h1>
        <p className="text-lg @min-[768px]:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{slide.subheadline}</p>
        <div className="flex flex-col @min-[640px]:flex-row items-center justify-center gap-4">
          {slide.cta1Text && slide.cta1Link && (
            slide.cta1Link === "/contact" ? (
              <button onClick={openContactModal} className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors cursor-pointer text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}>{slide.cta1Text}</button>
            ) : (
              <Link href={slide.cta1Link || "#"} className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}>{slide.cta1Text}</Link>
            )
          )}
          {slide.cta2Text && slide.cta2Link && (
            slide.cta2Link === "/contact" ? (
              <button onClick={openContactModal} className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors cursor-pointer text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}>{slide.cta2Text}</button>
            ) : (
              <Link href={slide.cta2Link || "#"} className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md transition-colors text-base @min-[768px]:text-lg" style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}>{slide.cta2Text}</Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides = [], variant = "slider", height = "large", elementStyles }) => {
  if (variant === "static") return <StaticHero slides={slides} height={height} elementStyles={elementStyles} />;
  if (variant === "video") return <VideoHero slides={slides} height={height} elementStyles={elementStyles} />;

  const { openContactModal } = useModal();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const hClass = FIXED_HEIGHT_CLASSES[height as HeroHeight] || FIXED_HEIGHT_CLASSES.large;

  return (
    <div className={cn("relative w-full", hClass)}>
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={slide.id || `slide-${index}`}>
              <div className="absolute inset-0" style={{ backgroundColor: index % 2 === 0 ? '#1f2937' : '#374151' }}>
                {(slide.image?.startsWith("data:") || slide.image?.startsWith("http")) && (
                  <img
                    src={slide.image}
                    alt={slide.headline || ""}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/60"></div>
              </div>

              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto text-white">
                  <h1 className="text-3xl @min-[640px]:text-4xl @min-[768px]:text-5xl @min-[1024px]:text-6xl font-bold mb-6 leading-tight drop-shadow-lg" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
                    {slide.headline}
                  </h1>
                  <p className="text-lg @min-[768px]:text-2xl mb-10 text-gray-200 drop-shadow-md" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
                    {slide.subheadline}
                  </p>
                  
                  <div className="flex flex-col @min-[640px]:flex-row items-center justify-center gap-4">
                    {slide.cta1Text && slide.cta1Link && (
                      slide.cta1Link === "/contact" ? (
                        <button 
                          onClick={openContactModal}
                          className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-8 rounded transition-colors w-full @min-[640px]:w-auto cursor-pointer"
                          style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}
                        >
                          {slide.cta1Text}
                        </button>
                      ) : (
                        <Link 
                          href={slide.cta1Link || "#"}
                          className="bg-primary hover:bg-primary-dark text-on-primary font-semibold py-3 px-8 rounded transition-colors w-full @min-[640px]:w-auto"
                          style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}
                        >
                          {slide.cta1Text}
                        </Link>
                      )
                    )}
                    {slide.cta2Text && slide.cta2Link && (
                      slide.cta2Link === "/contact" ? (
                        <button 
                          onClick={openContactModal}
                          className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-semibold py-3 px-8 rounded transition-colors w-full @min-[640px]:w-auto cursor-pointer"
                          style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}
                        >
                          {slide.cta2Text}
                        </button>
                      ) : (
                        <Link 
                          href={slide.cta2Link || "#"}
                          className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-semibold py-3 px-8 rounded transition-colors w-full @min-[640px]:w-auto"
                          style={{ ...(elementStyles?.cta2Bg ? { backgroundColor: elementStyles.cta2Bg } : {}), ...(elementStyles?.cta2Text ? { color: elementStyles.cta2Text } : {}) } as React.CSSProperties}
                        >
                          {slide.cta2Text}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10 hidden @min-[768px]:flex"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10 hidden @min-[768px]:flex"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-primary w-8" : "bg-white/50 hover:bg-white/80"
            )}
            style={index === selectedIndex && elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
