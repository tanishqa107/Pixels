import { createContext, useContext, useState,ReactNode } from 'react';

type Content = {
  id: number;
  src: { medium: string; large: string; original: string };
  photographer: string;
  alt?: string;
};

type LikedImagesContextType = {
  likedImages: Content[];
  toggleLike: (image: Content) => void;
};


type ProviderProps = {
  children: ReactNode;
};
const LikedImagesContext = createContext<LikedImagesContextType | undefined>(undefined);

export const LikedImagesProvider= ({ children }: ProviderProps) => {
  const [likedImages, setLikedImages] = useState<Content[]>([]);

  const toggleLike = (image: Content) => {
    setLikedImages((prev) => {
      const exists = prev.find((img) => img.id === image.id);
      if (exists) {
        // Remove from liked
        return prev.filter((img) => img.id !== image.id);
      } else {
        // Add to liked
        return [...prev, image];
      }
    });
    console.log("Liking image", image.id);
  };

  return (
    <LikedImagesContext.Provider value={{ likedImages, toggleLike }}>
      {children}
    </LikedImagesContext.Provider>
  );
};

export const useLikedImages = () => {
  const context = useContext(LikedImagesContext);
  if (!context) {
    throw new Error("useLikedImages must be used within a LikedImagesProvider");
  }
  return context;
};
