import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GlareCardDemo } from './GlareCardDemo';
import { Link as ScrollLink } from 'react-scroll';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-black rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 lg:p-16 md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get inspired?
              </h2>
              <p className="text-white text-lg opacity-90 mb-8 max-w-lg">
                Join our community of creators and discover new ideas every day. Save and organize your favorite inspirations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">

                 <ScrollLink
                          
                                to= 'startbtn' 
                                smooth={true}
                                duration={500}
                                offset={-60}>
               
                <button className="px-6 py-3 hover:cursor-pointer bg-transparent border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center">
                 Get started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                </ScrollLink>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-full w-full">
                <img 
                  src="https://images.unsplash.com/photo-1506434304575-afbb92660c28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Get inspired" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </div>
        
        
        <div className='flex flex-col gap-20 justify-center pt-20'>
         
         <h1 className='text-white text-center text-6xl font-medium'>#Get Inspired</h1>
           <GlareCardDemo/>
        </div>
       
      </div>
    </section>
  );
};

export default CallToAction;