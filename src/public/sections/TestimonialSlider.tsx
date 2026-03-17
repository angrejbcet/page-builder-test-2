"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/public/lib/utils";

interface Review {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface TestimonialSliderProps {
  heading: string;
  highlight: string;
  reviews: Review[];
  variant?: "slider" | "grid" | "featured" | string;
  elementStyles?: Record<string, string>;
}

function ReviewCard({ review, large, elementStyles }: { review: Review; large?: boolean; elementStyles?: Record<string, string> }) {
  return (
    <div
      className={cn("bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col relative", large ? "p-4 @min-[640px]:p-6 @min-[1024px]:p-10" : "p-4 @min-[640px]:p-6 @min-[1024px]:p-8")}
      style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 rotate-180" />
      <div className="flex space-x-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" style={elementStyles?.starColor ? { fill: elementStyles.starColor, color: elementStyles.starColor } : undefined} />
        ))}
      </div>
      <p
        className={cn("text-gray-600 italic leading-relaxed flex-grow relative z-10", large ? "text-base @min-[768px]:text-lg mb-10" : "mb-8")}
        style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
      >
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-auto border-t border-gray-50 pt-6">
        <p
          className={cn("font-bold text-secondary", large ? "text-lg @min-[768px]:text-xl" : "text-lg")}
          style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
        >
          {review.author}
        </p>
        <p className="text-sm text-gray-500 font-medium">{review.location}</p>
      </div>
    </div>
  );
}

function TestimonialGrid({ heading, highlight, reviews, elementStyles }: Omit<TestimonialSliderProps, "variant">) {
  return (
    <section className="bg-white py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8">
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl @min-[768px]:text-4xl font-bold text-secondary mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
        <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <ReviewCard key={review.id || `review-${idx}`} review={review} elementStyles={elementStyles} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialFeatured({ heading, highlight, reviews, elementStyles }: Omit<TestimonialSliderProps, "variant">) {
  const featured = reviews[0];
  const rest = reviews.slice(1, 3);

  return (
    <section className="bg-white py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8">
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl @min-[768px]:text-4xl font-bold text-secondary mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
        <div className="grid @min-[1024px]:grid-cols-2 gap-8">
          {featured && <ReviewCard review={featured} large elementStyles={elementStyles} />}
          <div className="space-y-8">
            {rest.map((review, idx) => (
              <ReviewCard key={review.id || `review-${idx}`} review={review} elementStyles={elementStyles} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  heading,
  highlight,
  reviews = [],
  variant = "slider",
  elementStyles,
}) => {
  if (variant === "grid") return <TestimonialGrid heading={heading} highlight={highlight} reviews={reviews} elementStyles={elementStyles} />;
  if (variant === "featured") return <TestimonialFeatured heading={heading} highlight={highlight} reviews={reviews} elementStyles={elementStyles} />;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", breakpoints: { "(min-width: 768px)": { align: "start" } } },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="bg-white py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 overflow-hidden">
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl @min-[768px]:text-4xl font-bold text-secondary mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}></div>
        </div>

        <div className="relative max-w-full mx-auto">
          {/* Carousel Viewport */}
          <div className="overflow-hidden px-4 py-8" ref={emblaRef}>
            <div className="flex -ml-4">
              {reviews.map((review, idx) => (
                <div 
                  className="flex-[0_0_100%] min-w-0 pl-4 @min-[768px]:flex-[0_0_50%] @min-[1024px]:flex-[0_0_33.333%]" 
                  key={review.id || `review-${idx}`}
                >
                  <div
                    className="bg-white p-4 @min-[640px]:p-6 @min-[1024px]:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col relative"
                    style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
                  >
                    {/* Decorative Quote Icon */}
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 rotate-180" />
                    
                    {/* Stars */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" style={elementStyles?.starColor ? { fill: elementStyles.starColor, color: elementStyles.starColor } : undefined} />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-600 italic leading-relaxed mb-8 flex-grow relative z-10" style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                      "{review.quote}"
                    </p>
                    
                    {/* Author Info */}
                    <div className="mt-auto border-t border-gray-50 pt-6">
                      <p className="font-bold text-secondary text-lg" style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>{review.author}</p>
                      <p className="text-sm text-gray-500 font-medium">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4 @min-[640px]:space-x-8">
            <button
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Pagination Dots */}
            <div className="flex gap-3">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === selectedIndex ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
