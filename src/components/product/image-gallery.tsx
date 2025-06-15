"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images?: Array<{ url: string; alt?: string | null }> | null; // Match productsRouter.getOne
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // Filter valid URLs from images
  const imageUrls = images?.filter((item): item is { url: string; alt?: string | null } => !!item.url).map(item => item.url) ?? [];

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const selectImage = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl organic-shape">
        <Image
          src={imageUrls[currentImage] ?? "/placeholder.png"}
          alt={`${alt} - Image ${currentImage + 1}`}
          fill
          className="object-cover transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        {imageUrls.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute border-terracotta text-white left-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute border-terracotta text-white right-2 top-1/2 -translate-y-1/2 rounded-full bg-transparent hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>
      {imageUrls.length > 1 && (
        <div className="flex gap-2 overflow-auto pb-2">
          {imageUrls.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                currentImage === index
                  ? "border-terracotta"
                  : "border-transparent hover:border-terracotta/50"
              }`}
              onClick={() => selectImage(index)}
            >
              <Image
                src={image ?? "/placeholder.png"}
                alt={`${alt} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}