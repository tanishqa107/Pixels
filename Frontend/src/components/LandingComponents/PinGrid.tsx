import React from 'react';
import { Heart } from 'lucide-react';
import { pins } from '../data';
import { Link as ScrollLink } from 'react-scroll';


const PinGrid: React.FC = () => {
  return (
    <section id='trendings'
   className="py-12 md:py-16 bg-gray-50 ">
      <div className="container mx-auto px-4 rounded-5xl">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover what's trending
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of popular pins from creative minds around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {pins.map((pin) => (
            <div 
              key={pin.id} 
              className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
              style={{ height: `${pin.height}px` }}
            >
              <img 
                src={pin.imageUrl} 
                alt={pin.title} 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0  group-hover:bg-opacity-20 transition-all duration-300"></div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-2 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Heart className="w-4 h-4 text-[#E60023]" />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-medium text-sm line-clamp-2 mb-2">
                  {pin.title}
                </h3>
                <div className="flex items-center">
                  <img 
                    src={pin.user.avatar} 
                    alt={pin.user.name} 
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="ml-2 text-white text-xs">
                    {pin.user.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
                  
                  <ScrollLink
                          to= 'startbtn' 
                          smooth={true}
                          duration={500}
                          offset={-60}>
          <button className="px-8 py-3 rounded-full bg-black text-white hover:bg-gray-800 hover:cursor-pointer transition-all font-medium">
            Explore more ideas
          </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
};

export default PinGrid;