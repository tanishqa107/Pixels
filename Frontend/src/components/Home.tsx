import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import { Heart } from "lucide-react";

import { useLikedImages } from "./LikedImagesContext";

type Content = {
  id: number;
  src: {
    medium: string;
    large: string;
    original: string;
  };
  photographer: string;
  alt?: string;
};

const Home: React.FC = () => {
  const [images, setImages] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { likedImages, toggleLike } = useLikedImages();


  

 const fetchImages = useCallback(async () => {
  setIsLoading(true);
  try {
    const res = await axios.get(`http://localhost:3000/api/pexels?page=${page}`);
    setImages((prev) => {
      const combined = [...prev, ...res.data.photos];
      const uniqueMap = new Map<number, Content>();
      combined.forEach(img => uniqueMap.set(img.id, img));

      // Return array of unique images
      return Array.from(uniqueMap.values());
    });
  } catch (error) {
    console.error("Failed to load images", error);
  }
  setIsLoading(false);
}, [page]);


  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isLoading]);


   useEffect(() => {
    const ids = images.map(i => i.id);
    const duplicates = ids.filter((id, idx) => ids.indexOf(id) !== idx);
    if (duplicates.length > 0) {
      console.warn("Duplicate IDs found:", duplicates);
    }
  }, [images]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-300">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-4 bg-white">
          <SearchBar />
        </div>

        <div className="p-6">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {images.map((image,index) => {
  const isLiked = likedImages.some(img => img.id === image.id);

  return (
    <div key={`${image.id}-${index}`} className="relative mb-6 break-inside group">
      <img
        src={image.src.large}
        alt={image.alt || "Pexels Art"}
        className="rounded-2xl w-full h-auto object-cover"
      />

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => toggleLike(image)}
          className={`bg-white/80 p-2 rounded-full shadow-md hover:cursor-pointer ${
            isLiked ? "text-red-600" : "text-gray-400"
          }`}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart className="h-4 w-4" />
        </button>
        {/* Bookmark button can be handled similarly if needed */}
      </div>
    </div>
  );
})}
          </Masonry>

          {/* Loader trigger */}
          <div ref={loaderRef} className="text-center py-10 text-gray-400">
            {isLoading ? "Loading more..." : "Scroll to load more"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
