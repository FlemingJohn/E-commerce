import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { Cart } from './components/Cart';
import { CartProvider } from './hooks/useCart';
import { ThemeProvider } from './hooks/useTheme';
import { products } from './data/products';
import { Product } from './types';

function AppContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories;
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effect */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" 
           style={{ 
             background: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,255,255,0.1) 4px, rgba(0,255,255,0.1) 8px)' 
           }}>
      </div>
      
      <Header
        onCartClick={handleCartClick}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="mb-16 text-center relative">
          {/* Game-style title */}
          <div className="relative inline-block">
            <h2 className="text-6xl font-black neon-text mb-6 tracking-wider font-mono uppercase relative z-10">
              POWER-UPS
            </h2>
            <div className="absolute inset-0 text-6xl font-black text-cyan-400/20 font-mono uppercase transform translate-x-1 translate-y-1">
              POWER-UPS
            </div>
          </div>
          
          <div className="arcade-button inline-block px-8 py-4 mb-8">
            <p className="text-lg neon-cyan font-mono tracking-wider uppercase">
              SELECT YOUR EQUIPMENT
            </p>
          </div>
          
          {/* Status bar */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="arcade-button px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 arcade-blink"></div>
                <span className="font-mono text-sm neon-green">ONLINE</span>
              </div>
            </div>
            <div className="arcade-button px-4 py-2">
              <span className="font-mono text-sm neon-cyan">
                ITEMS: {filteredProducts.length}
              </span>
            </div>
            <div className="arcade-button px-4 py-2">
              <span className="font-mono text-sm neon-yellow">
                CREDITS: ∞
              </span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="w-32 h-1 arcade-gradient mx-auto rounded-full"></div>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 relative">
            <div className="max-w-md mx-auto arcade-card p-8">
              <div className="text-8xl mb-6 arcade-blink">❌</div>
              <h3 className="text-3xl font-black neon-text mb-4 font-mono uppercase">
                NO MATCH
              </h3>
              <p className="neon-cyan font-mono text-sm tracking-wider uppercase leading-relaxed">
                Recalibrate your search parameters<br />
                or adjust category filters
              </p>
              <div className="mt-6 arcade-button px-6 py-3">
                <span className="font-mono text-xs neon-yellow">RETRY SEARCH</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating particles effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 arcade-blink"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={closeProductModal}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;