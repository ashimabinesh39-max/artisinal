import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, MapPin, Sparkles, BookOpen, Clock } from "lucide-react";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import HomeView from "./components/HomeView";
import ShopView from "./components/ShopView";
import WishlistView from "./components/WishlistView";
import CheckoutView from "./components/CheckoutView";
import TrackingView from "./components/TrackingView";

import { Screen, Product, CartItem } from "./types";
import { PRODUCTS } from "./data";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | undefined>("#CR-92841");

  // --- Seed Initial Cart State matches Checkout Mock ---
  // Pistachio Rose Croissant 2x, Signature Macarons Box 1x
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const seedCroissant = PRODUCTS.find((p) => p.id === "pistachio-rose-croissant");
    const seedMacarons = PRODUCTS.find((p) => p.id === "signature-macarons");
    
    const initialItems: CartItem[] = [];
    if (seedCroissant) {
      initialItems.push({ product: seedCroissant, quantity: 2 });
    }
    if (seedMacarons) {
      initialItems.push({ product: seedMacarons, quantity: 1 });
    }
    return initialItems;
  });

  // --- Seed Initial Wishlist State matches Favorites Mock ---
  // Rosewater Sourdough, Lavender Macaron Box, Gold Vanilla Cake, Country Sourdough
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => [
    "rosewater-croissant",
    "lavender-macaron-box",
    "gold-vanilla-cake",
    "country-sourdough",
  ]);

  // Total items in cart representation
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // --- Actions ---

  // Toggles item in the favorites tray
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add individual product to the shopping basket
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  // Bulk execution adding multi products simultaneously (used in Wishlist)
  const handleAddAllToCart = (productsArray: Product[]) => {
    setCartItems((prev) => {
      const copy = [...prev];
      productsArray.forEach((p) => {
        const existingIdx = copy.findIndex((item) => item.product.id === p.id);
        if (existingIdx > -1) {
          copy[existingIdx].quantity += 1;
        } else {
          copy.push({ product: p, quantity: 1 });
        }
      });
      return copy;
    });
  };

  // Alter exact quantities in Checkout page
  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Splices a product fully out of the basket
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Clear current cart session upon successful purchase confirmation
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Helper inside left drawer categories clicking
  const handleMenuCategoryClick = (category: string) => {
    setCategoryFilter(category);
    setIsMenuOpen(false);
    setCurrentScreen("shop");
  };

  // Automatically scroll to the top when navigating screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Universal header top bar */}
      <Header
        currentScreen={currentScreen}
        cartCount={cartCount}
        onNavigate={setCurrentScreen}
        onToggleMenu={() => setIsMenuOpen(true)}
      />

      {/* Main viewport frame */}
      <main className="container max-w-lg mx-auto pt-20 pb-32 px-5 min-h-screen">
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <HomeView
              key="home"
              onNavigate={setCurrentScreen}
              onSelectCategory={setCategoryFilter}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentScreen === "shop" && (
            <ShopView
              key="shop"
              categoryFilter={categoryFilter}
              onSelectCategory={setCategoryFilter}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
            />
          )}

          {currentScreen === "wishlist" && (
            <WishlistView
              key="wishlist"
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onAddAllToCart={handleAddAllToCart}
            />
          )}

          {currentScreen === "checkout" && (
            <CheckoutView
              key="checkout"
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              onNavigate={setCurrentScreen}
            />
          )}

          {currentScreen === "tracking" && (
            <TrackingView
              key="tracking"
              onNavigate={setCurrentScreen}
              activeOrderId={activeOrderId}
              setActiveOrderId={setActiveOrderId}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Universal Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        cartCount={cartCount}
      />

      {/* Premium Side Menu drawer back panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop cover filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-inverse-surface/80 z-50 backdrop-blur-[2px]"
            />

            {/* Left drawer menu */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
              className="fixed inset-y-0 left-0 max-w-xs w-5/6 bg-background rounded-r-[32px] shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                {/* Drawer close line */}
                <div className="flex justify-between items-center">
                  <h2 className="font-serif text-[32px] font-bold text-primary tracking-tight">
                    Crave
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-1 rounded-full text-outline-variant hover:bg-surface-container-low active:scale-90 transition-all cursor-pointer"
                  >
                    <X className="w-6 h-6 text-primary" />
                  </button>
                </div>

                {/* Categories anchors links */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest border-b border-outline-variant/15 pb-2">
                    Boutique Menu
                  </p>
                  <div className="flex flex-col gap-3 font-semibold text-sm">
                    <button
                      onClick={() => handleMenuCategoryClick("all")}
                      className="text-left py-1 text-on-surface hover:text-primary transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span>Explore All Pastries</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                    <button
                      onClick={() => handleMenuCategoryClick("croissants")}
                      className="text-left py-1 text-on-surface hover:text-primary transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span>Signature Croissants</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                    <button
                      onClick={() => handleMenuCategoryClick("macarons")}
                      className="text-left py-1 text-on-surface hover:text-primary transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span>Scented Macarons</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                    <button
                      onClick={() => handleMenuCategoryClick("cakes")}
                      className="text-left py-1 text-on-surface hover:text-primary transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span>Layers & Cakes</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                    <button
                      onClick={() => handleMenuCategoryClick("breads")}
                      className="text-left py-1 text-on-surface hover:text-primary transition-colors flex justify-between items-center group cursor-pointer"
                    >
                      <span>Earthy Sourdoughs</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setCurrentScreen("tracking");
                      }}
                      className="text-left py-1 text-primary hover:text-primary-dim transition-colors flex justify-between items-center group cursor-pointer font-bold border-t border-outline-variant/15 pt-3 mt-1"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        Track Your Order
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    </button>
                  </div>
                </div>

                {/* Additional boutique mock information */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest border-b border-outline-variant/15 pb-2">
                    Our House
                  </p>
                  <div className="flex flex-col gap-3.5 text-xs text-on-surface-variant font-medium">
                    <div className="flex gap-2.5 items-start">
                      <BookOpen className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-on-surface font-semibold">The Patisserie Philosophy</p>
                        <p className="text-[11px] opacity-80 mt-0.5">
                          Every pastry is single-batch baked with butter imported from Normandy and local organic wildflower honey.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <Clock className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-on-surface font-semibold">Boutique Hours</p>
                        <p className="text-[11px] opacity-80 mt-0.5">Daily 07:00 AM – 06:00 PM</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 items-start">
                      <MapPin className="text-primary w-4.5 h-4.5 flex-shrink-0" />
                      <div>
                        <p className="text-on-surface font-semibold">Boutique Location</p>
                        <p className="text-[11px] opacity-80 mt-0.5 mt-0.5">
                          124 Artisanal Way, Pastry District, NY 10012
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom house statement */}
              <div className="pt-4 border-t border-outline-variant/10 text-center flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-serif font-bold text-[13px] tracking-wide">
                    Crave Club Gold Member
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant opacity-75">
                  Handcrafted Pastries, Delivered Daily
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
