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
    <div className="min-h-screen bg-background grid-bg relative scanlines">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-6xl font-arcade gradient-text mb-6 tracking-tight animate-glow-rotate">
            ARCADE STORE
          </h2>
          <p className="text-xl font-retro text-muted-foreground max-w-2xl mx-auto leading-relaxed neon-glow-blue">
            Power up with premium gear from the digital frontier
          </p>
          <div className="w-32 h-1 gradient-bg mx-auto mt-8 rounded-full neon-glow-pink"></div>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto neon-border-blue rounded-2xl p-8 bg-card/50 backdrop-blur-sm">
              <div className="text-6xl mb-4 animate-flicker">🕹️</div>
              <h3 className="text-2xl font-retro font-bold text-foreground mb-2 neon-glow-blue">Game Over</h3>
              <p className="text-muted-foreground font-retro">
                No items found in this sector. Try a different search pattern.
              </p>
            </div>
          </div>
        )}
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