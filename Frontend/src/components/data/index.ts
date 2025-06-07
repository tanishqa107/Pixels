import { Pin, Category, Testimonial } from '../types';

export const pins: Pin[] = [
  {
    id: 1,
    title: "Modern living room with natural light",
    imageUrl: "https://images.unsplash.com/photo-1713283365745-a727fb26c52f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    user: {
      name: "Interior Design",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 245,
    height: 300
  },
  {
    id: 2,
    title: "Minimalist workspace setup",
    imageUrl: "https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Workspace Ideas",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 189,
    height: 400
  },
  {
    id: 3,
    title: "Homemade avocado toast recipe",
    imageUrl: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Food Inspiration",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 312,
    height: 350
  },
  {
    id: 4,
    title: "DIY hanging plant display",
    imageUrl: "https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Plant Lovers",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 178,
    height: 280
  },
  {
    id: 5,
    title: "Creative wall art inspiration",
    imageUrl: "https://images.pexels.com/photos/3255245/pexels-photo-3255245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Art & Design",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 203,
    height: 360
  },
  {
    id: 6,
    title: "Summer fashion lookbook",
    imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Fashion Trends",
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 267,
    height: 420
  },
  {
    id: 7,
    title: "Cozy reading nook ideas",
    imageUrl: "https://images.pexels.com/photos/3098619/pexels-photo-3098619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Home Decor",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 198,
    height: 300
  },
  {
    id: 8,
    title: "Healthy breakfast bowl",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    user: {
      name: "Healthy Recipes",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    likes: 221,
    height: 340
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Home Decor",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pinCount: 25432
  },
  {
    id: 2,
    name: "Food & Recipes",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pinCount: 18745
  },
  {
    id: 3,
    name: "Fashion",
    imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pinCount: 31289
  },
  {
    id: 4,
    name: "DIY & Crafts",
    imageUrl: "https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    pinCount: 14567
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "I found so many creative ideas for my wedding on this platform. It made planning so much easier and more fun!",
    user: {
      name: "Sarah Johnson",
      role: "Graphic Designer",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  },
  {
    id: 2,
    content: "As a photographer, I use this platform to showcase my work and connect with potential clients. It's been amazing for my business.",
    user: {
      name: "Michael Chen",
      role: "Professional Photographer",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  },
  {
    id: 3,
    content: "I renovated my entire apartment using inspiration from pins I saved. The visual search feature helped me find exactly what I was looking for.",
    user: {
      name: "Emma Rodriguez",
      role: "Interior Enthusiast",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  }
];