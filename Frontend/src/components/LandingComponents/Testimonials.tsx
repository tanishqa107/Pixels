import React from 'react';

import { AnimatedTestimonials } from '../ui/animated-testimonials';

const Testimonials: React.FC = () => {

   const testimonials = [
  {
    quote:
      "Sharing my photography on this platform has been a game-changer. The exposure and appreciation I've received is truly motivating.",
    name: "Aarav Patel",
    designation: "Freelance Photographer",
    src: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "As an artist, finding a place that values creative expression is rare. This gallery gave my work a home and a global audience.",
    name: "Maya Fernandes",
    designation: "Visual Artist",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "I’ve connected with so many other creators and art lovers through this platform. The community here is incredible.",
    name: "Liam Roy",
    designation: "Concept Illustrator",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "The layout and presentation are perfect for showcasing my portfolio. I’ve already received client inquiries from my gallery posts.",
    name: "Sofia Khan",
    designation: "Digital Designer",
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote:
      "From photographers to painters, this platform brings creatives together like no other. It’s where passion meets visibility.",
    name: "Noah Verma",
    designation: "Fine Arts Graduate",
    src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];




  return (
    <section id='testimonials' className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            What our community says
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto ">
            Join millions of people discovering and sharing ideas on our platform.
          </p>
        </div>
        
        <AnimatedTestimonials testimonials={testimonials} />;
      </div>
    </section>
  );
};

export default Testimonials;