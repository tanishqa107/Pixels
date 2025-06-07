import React from "react";
import { useLikedImages } from "./LikedImagesContext";

const Likes: React.FC = () => {
  const { likedImages } = useLikedImages();

  if (likedImages.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-20 text-lg">
        No liked images yet!
      </p>
    );
  }

  return (
    <div
      className="p-4"
      style={{
        columnCount: 4,
        columnGap: "1rem",
      }}
    >
      {likedImages.map((image) => (
        <div
          key={image.id}
          className="mb-4 break-inside-avoid rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={image.src.large}
            alt={image.alt || "Liked Image"}
            className="w-full object-cover rounded-lg"
            style={{ width: "100%", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Likes;
