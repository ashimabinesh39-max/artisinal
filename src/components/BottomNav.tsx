import { Home, Heart, ShoppingCart, Cookie } from "lucide-react";
import { Screen } from "../types";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
}

export default function BottomNav({
  currentScreen,
  onNavigate,
  cartCount,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl bg-surface-container-lowest border-t border-outline-variant/10 shadow-[0px_-8px_24px_rgba(244,194,194,0.18)] flex justify-around items-center h-20 px-4 pb-safe">
      {/* Home */}
      <button
        onClick={() => onNavigate("home")}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
          currentScreen === "home"
            ? "bg-primary-container text-on-primary-container px-5 py-1.5 rounded-full font-semibold shadow-sm"
            : "text-on-secondary-container hover:text-primary"
        }`}
      >
        <Home className="w-5 h-5 stroke-[2]" />
        <span className="text-[12px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Shop */}
      <button
        onClick={() => onNavigate("shop")}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
          currentScreen === "shop"
            ? "bg-primary-container text-on-primary-container px-5 py-1.5 rounded-full font-semibold shadow-sm"
            : "text-on-secondary-container hover:text-primary"
        }`}
      >
        <Cookie className="w-5 h-5 stroke-[2]" />
        <span className="text-[12px] font-semibold mt-0.5">Shop</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => onNavigate("wishlist")}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative ${
          currentScreen === "wishlist"
            ? "bg-primary-container text-on-primary-container px-5 py-1.5 rounded-full font-semibold shadow-sm"
            : "text-on-secondary-container hover:text-primary"
        }`}
      >
        <Heart className="w-5 h-5 stroke-[2]" />
        <span className="text-[12px] font-semibold mt-0.5">Wishlist</span>
      </button>

      {/* Cart/Checkout */}
      <button
        onClick={() => onNavigate("checkout")}
        className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative ${
          currentScreen === "checkout"
            ? "bg-primary-container text-on-primary-container px-5 py-1.5 rounded-full font-semibold shadow-sm"
            : "text-on-secondary-container hover:text-primary"
        }`}
      >
        <ShoppingCart className="w-5 h-5 stroke-[2]" />
        <span className="text-[12px] font-semibold mt-0.5">Cart</span>
        {cartCount > 0 ? (
          <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-background ring-offset-0"></span>
        ) : null}
      </button>
    </nav>
  );
}
