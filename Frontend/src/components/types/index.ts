export interface Pin {
  id: number;
  title: string;
  imageUrl: string;
  user: {
    name: string;
    avatar: string;
  };
  likes: number;
  height: number;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  pinCount: number;
}

export interface Testimonial {
  id: number;
  content: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}