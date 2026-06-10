import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, Check, Sparkles } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ShopViewProps {
  key?: string;
  categoryFilter: string;
  onSelectCategory: (category: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function ShopView({
  categoryFilter,
  onSelectCategory,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
}: ShopViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  const categories = [
    { label: "All Pastries", value: "all" },
    { label: "Croissants", value: "croissants" },
    { label: "Macarons", value: "macarons" },
    { label: "Cakes", value: "cakes" },
    { label: "Tarts", value: "tarts" },
    { label: "Breads", value: "breads" },
  ];

  // Memoized filtered products for maximum rendering performance
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Text Search query filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Category selection filter
      if (categoryFilter === "all") return true;

      if (categoryFilter === "croissants") {
        return product.name.toLowerCase().includes("croissant");
      }

      if (categoryFilter === "tarts") {
        return product.name.toLowerCase().includes("tart");
      }

      return product.category === categoryFilter;
    });
  }, [categoryFilter, searchTerm]);

  const handleAddWithFeedback = (product: Product) => {
    if (!product.inStock) return;
    setAddingId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAddingId(null);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pb-28 pt-4"
    >
      {/* Search Input & Horizontal Category Filters */}
      <section className="px-5 mb-6">
        <div className="relative w-full mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 w-5 h-5 stroke-[1.8]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for pastries..."
            className="w-full pl-12 pr-5 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm placeholder:text-on-surface-variant/70 transition-all outline-none"
          />
        </div>

        {/* Categories Pills bar */}
        <div className="flex overflow-x-auto gap-2.5 hide-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                categoryFilter === cat.value
                  ? "bg-primary-container text-on-primary-container shadow-sm font-bold"
                  : "bg-surface-container-highest/60 text-on-surface-variant hover:bg-primary-container/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="px-5">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/40">
            <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-3" />
            <p className="text-sm font-semibold text-on-surface">No pastries found</p>
            <p className="text-xs text-on-surface-variant mt-1.5">
              Try adjusting your spelling or browsing different categories!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => {
                const isFavorited = wishlistIds.includes(product.id);
                const isAdding = addingId === product.id;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className={`group relative flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-[0px_6px_18px_rgba(244,194,194,0.08)] hover:-translate-y-1 transition-all duration-300 ${
                      !product.inStock ? "opacity-75" : ""
                    }`}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-surface-container-low">
                      <img
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={product.image}
                      />

                      {/* Sold Out Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center">
                          <span className="bg-surface-container-lowest/95 text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded shadow-sm">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="absolute top-2 w-8 h-8 flex items-center justify-center bg-white/85 backdrop-blur-md rounded-full text-tertiary active:scale-90 hover:bg-white transition-transform cursor-pointer shadow-sm right-2 z-10"
                      >
                        <Heart
                          className={`w-4.5 h-4.5 stroke-[2] ${
                            isFavorited
                              ? "text-primary fill-primary"
                              : "text-tertiary"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Metadata & CTAs */}
                    <div className="p-3.5 flex flex-col flex-grow justify-between">
                      <div>
                        {product.tag && (
                          <span className="text-[9px] font-bold text-tertiary-fixed-dim uppercase tracking-widest block mb-1">
                            {product.tag}
                          </span>
                        )}
                        <h3 className="font-serif font-bold text-[15px] leading-tight text-primary">
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-3">
                        <p className="text-on-surface-variant text-sm font-bold">
                          ${product.price.toFixed(2)}
                        </p>

                        <button
                          disabled={!product.inStock}
                          onClick={() => handleAddWithFeedback(product)}
                          className={`mt-2.5 w-full py-2.5 rounded-xl font-semibold text-[11px] uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${
                            !product.inStock
                              ? "bg-outline-variant/30 text-outline leading-tight cursor-not-allowed opacity-60"
                              : isAdding
                              ? "bg-secondary text-white shadow-sm"
                              : "bg-primary-container text-on-primary-container hover:brightness-[1.02] active:scale-95 shadow-sm font-bold"
                          }`}
                        >
                          {!product.inStock ? (
                            "Out of Stock"
                          ) : isAdding ? (
                            <span className="flex items-center justify-center gap-1.5 font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              Added!
                            </span>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>
    </motion.div>
  );
}
