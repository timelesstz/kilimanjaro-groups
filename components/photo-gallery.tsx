"use client"

import { useState } from "react"
import Image from "next/image"

interface Photo {
  src: string
  alt: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[600px]">
      <Image
        src={photos[currentPhotoIndex].src || "/placeholder.svg"}
        alt={photos[currentPhotoIndex].alt}
        fill
        className="object-cover rounded-lg"
      />
      <button
        onClick={prevPhoto}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={nextPhoto}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        {currentPhotoIndex + 1} / {photos.length}
      </div>
    </div>
  )
}

