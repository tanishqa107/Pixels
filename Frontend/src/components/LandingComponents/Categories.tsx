import React from 'react';
import CardCarousel from '../ui/cards-carousel';

const Categories: React.FC = () => {
  return (
    <section id='category'
     className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Browse by category
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Find inspiration in our most popular categories or browse all.
          </p>
        </div>
        
      <CardCarousel/>
        
        <div className="flex text-white flex-wrap gap-4 justify-center mt-12">
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Travel
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Health & Fitness
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Technology
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Education
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Art
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Beauty
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            Quotes
          </button>
          <button className="px-5 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all text-sm font-medium">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;