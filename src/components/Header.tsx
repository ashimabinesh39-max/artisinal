import { Menu, ShoppingBag, ArrowLeft, HelpCircle } from "lucide-react";
import { Screen } from "../types";

interface HeaderProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onToggleMenu: () => void;
  cartCount: number;
}

export default function Header({
  currentScreen,
  onNavigate,
  onToggleMenu,
  cartCount,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background/85 backdrop-blur-md z-50 px-5 flex items-center justify-between border-b border-outline-variant/10">
      <div className="flex items-center gap-3">
        {currentScreen === "checkout" ? (
          <button
            onClick={() => onNavigate("shop")}
            aria-label="Back to Shop"
            className="text-primary hover:opacity-80 active:scale-95 transition-all p-1 rounded-full hover:bg-surface-container-low"
          >
            <ArrowLeft className="w-6 h-6 stroke-[1.8]" />
          </button>
        ) : (
          <button
            onClick={onToggleMenu}
            aria-label="Toggle Menu"
            className="text-primary hover:opacity-80 active:scale-95 transition-all p-1 rounded-full hover:bg-surface-container-low"
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>
        )}
      </div>

      <button
        onClick={() => onNavigate("home")}
        className="font-serif text-[30px] font-bold text-primary tracking-tight select-none cursor-pointer"
      >
        Crave
      </button>

      <div className="flex items-center">
        {currentScreen === "checkout" ? (
          <button
            aria-label="Help"
            className="text-primary hover:opacity-80 active:scale-95 transition-all p-1 rounded-full hover:bg-surface-container-low"
          >
            <HelpCircle className="w-6 h-6 stroke-[1.8]" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate("checkout")}
            aria-label="View Cart"
            className="text-primary hover:opacity-80 active:scale-95 transition-all p-1 rounded-full hover:bg-surface-container-low relative"
          >
            <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center border border-background animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
