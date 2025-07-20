import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    features: ['Noise Cancellation', '30-hour Battery', 'Premium Sound', 'Comfortable Fit'],
    inStock: true,
    rating: 4.8,
    reviews: 1247
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS capabilities.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
    inStock: true,
    rating: 4.6,
    reviews: 892
  },
  {
    id: '3',
    name: 'Minimalist Laptop Stand',
    price: 79.99,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    description: 'Elegant aluminum laptop stand for improved ergonomics and workspace aesthetics.',
    features: ['Aluminum Build', 'Adjustable Height', 'Universal Fit', 'Cable Management'],
    inStock: true,
    rating: 4.9,
    reviews: 456
  },
  {
    id: '4',
    name: 'Professional Camera',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    description: 'Professional-grade camera with advanced features for photography enthusiasts.',
    features: ['4K Video', '24MP Sensor', 'Weather Sealed', 'Image Stabilization'],
    inStock: true,
    rating: 4.7,
    reviews: 623
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    price: 159.99,
    image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    description: 'Stylish sunglasses with UV protection and premium materials.',
    features: ['UV Protection', 'Polarized Lenses', 'Lightweight Frame', 'Premium Materials'],
    inStock: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: '6',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Furniture',
    description: 'Premium office chair with lumbar support and adjustable features.',
    features: ['Lumbar Support', 'Adjustable Height', 'Memory Foam', '5-Year Warranty'],
    inStock: true,
    rating: 4.8,
    reviews: 789
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    price: 49.99,
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Slim Design'],
    inStock: true,
    rating: 4.4,
    reviews: 567
  },
  {
    id: '8',
    name: 'Premium Coffee Mug',
    price: 24.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Home',
    description: 'Beautifully crafted ceramic mug for your daily coffee ritual.',
    features: ['Ceramic Construction', 'Heat Retention', 'Dishwasher Safe', 'Elegant Design'],
    inStock: true,
    rating: 4.6,
    reviews: 123
  }
];