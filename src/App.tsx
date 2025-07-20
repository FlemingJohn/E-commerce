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
    <div className="min-h-screen bg-background">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Discover our carefully curated collection of premium products</p>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
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