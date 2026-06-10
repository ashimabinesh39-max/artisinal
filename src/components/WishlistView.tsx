import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ShoppingCart, Check, HeartCrack } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS, RECOMMENDATIONS } from "../data";

interface WishlistViewProps {
  key?: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: (products: Product[]) => void;
}

export default function WishlistView({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onAddAllToCart,
}: WishlistViewProps) {
  const [addingId, setAddingId] = useState<string | null>(null);
  const [bulkSuccess, setBulkSuccess] = useState(false);

  // Retrieve full product schemas for currently favorited items
  const favoriteProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleAddWithFeedback = (product: Product) => {
    if (!product.inStock) return;
    setAddingId(product.id);
    onAddToCart(product);
    setTimeout(() => {
      setAddingId(null);
    }, 1200);
  };

  const handleBulkAdd = () => {
    // Collect all in-stock favorited items
    const inStockFavorites = favoriteProducts.filter((p) => p.inStock);
    if (inStockFavorites.length === 0) return;

    onAddAllToCart(inStockFavorites);
    setBulkSuccess(true);
    setTimeout(() => {
      setBulkSuccess(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pb-28"
    >
      {/* Header Section */}
      <header className="flex flex-col gap-2 mb-6">
        <h1 className="font-serif text-[32px] font-bold text-primary">My Favorites</h1>
        <p className="text-sm text-on-surface-variant">Your handpicked selection of artisanal treats.</p>
      </header>

      {/* Bulk Action */}
      {favoriteProducts.some((p) => p.inStock) && (
        <div className="mb-6">
          <button
            onClick={handleBulkAdd}
            className={`w-full py-4 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              bulkSuccess
                ? "bg-secondary text-white shadow-md scale-[0.99]"
                : "bg-primary text-on-primary shadow-[0px_10px_30px_rgba(123,84,85,0.2)] active:scale-[0.98] hover:brightness-[1.02]"
            }`}
          >
            {bulkSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                All Treats Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4.5 h-4.5" />
                Add All to Cart
              </>
            )}
          </button>
        </div>
      )}

      {/* Wishlist Items List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {favoriteProducts.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 px-6 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/35"
            >
              <HeartCrack className="w-10 h-10 text-primary-container mx-auto mb-3" />
              <p className="text-sm font-semibold text-on-surface">Your favorites tray is empty</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Browse our fresh hot shop catalog to fill your cravings.
              </p>
            </motion.div>
          ) : (
            favoriteProducts.map((product) => {
              const isAdding = addingId === product.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className={`bg-surface-container-lowest rounded-2xl p-4 shadow-[0px_8px_24px_rgba(244,194,194,0.08)] border border-outline-variant/25 flex gap-4 group transition-opacity ${
                    !product.inStock ? "opacity-75" : ""
                  }`}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-low relative">
                    <img
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={product.image}
                    />
                    {!product.inStock && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/40 py-0.5 text-center">
                        <span className="text-[8px] font-bold uppercase text-white tracking-widest">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif font-bold text-base text-on-surface leading-tight">
                          {product.name}
                        </h3>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="text-primary hover:scale-110 active:scale-90 transition-transform cursor-pointer p-0.5"
                        >
                          <Heart className="w-5 h-5 text-primary fill-primary stroke-[1.5]" />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-tertiary mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleAddWithFeedback(product)}
                        disabled={!product.inStock}
                        className={`px-4.5 py-1.5 border-[1.5px] rounded-full text-xs font-semibold transition-all uppercase cursor-pointer tracking-wider ${
                          !product.inStock
                            ? "border-outline-variant/50 text-outline/65 opacity-55 cursor-not-allowed"
                            : isAdding
                            ? "bg-secondary text-white border-secondary"
                            : "border-primary-container text-primary hover:bg-primary-container/20 active:scale-95"
                        }`}
                      >
                        {!product.inStock ? (
                          "Out of Stock"
                        ) : isAdding ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            Added
                          </span>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Empty State Recommendation Block (Subtle Carousel) */}
      <section className="mt-10 px-0 text-center">
        <h2 className="font-serif text-lg font-semibold text-primary mb-5">You might also like</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-5 px-5">
          {RECOMMENDATIONS.map((rec) => (
            <div key={rec.id} className="min-w-[145px] max-w-[145px] flex flex-col gap-2 text-left group">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm bg-surface-container relative">
                <img
                  alt={rec.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={rec.image}
                />
                <button
                  onClick={() => onAddToCart(rec)}
                  className="absolute right-2 bottom-2 w-7 h-7 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-md active:scale-90 hover:brightness-105 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface leading-tight group-hover:text-primary transition-colors line-clamp-1">
                  {rec.name}
                </p>
                <p className="text-[11px] text-tertiary mt-0.5">${rec.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
