import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Lock,
  Apple,
  CreditCard,
  Wallet,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Sparkles,
} from "lucide-react";
import { CartItem, Product, Screen } from "../types";

interface CheckoutViewProps {
  key?: string;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function CheckoutView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}: CheckoutViewProps) {
  const [paymentMethod, setPaymentMethod] = useState<"apple" | "card" | "paypal">("apple");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Address editor states
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [deliveryName, setDeliveryName] = useState("Sophie Laurent");
  const [deliveryAddress, setDeliveryAddress] = useState("124 Artisanal Way, Suite 4B");
  const [deliveryDistrict, setDeliveryDistrict] = useState("Pastry District, NY 10012");

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 4.99 : 0.0;
  const total = subtotal + deliveryFee;

  const handleCompletePurchase = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    // Simulate luxury processing pipeline
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1800);
  };

  const handleReturnHome = () => {
    onClearCart();
    setIsSuccess(false);
    onNavigate("home");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pb-32"
    >
      {/* Checkout Screen content container (hidden when order success is full-screened) */}
      {!isSuccess ? (
        <div className="flex flex-col gap-6">
          {/* Step Indicator */}
          <div className="flex justify-between items-center pt-2">
            <h2 className="font-serif text-2xl font-bold text-on-surface">Checkout</h2>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
              Step 1 of 2
            </span>
          </div>

          {/* Empty Cart Warning */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-6 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/35 flex flex-col items-center">
              <AlertCircle className="w-10 h-10 text-primary/40 mb-3" />
              <p className="text-sm font-semibold text-on-surface">Your selection is empty</p>
              <p className="text-xs text-on-surface-variant mt-1.5 mb-6 max-w-[240px]">
                You haven't added any treats to your basket yet.
              </p>
              <button
                onClick={() => onNavigate("shop")}
                className="px-6 py-2.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm hover:brightness-105 active:scale-95"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <>
              {/* Order Summary Layout */}
              <section className="flex flex-col gap-2">
                <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
                  Your Selection
                </h3>
                <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-[0px_8px_24px_rgba(244,194,194,0.06)] border border-outline-variant/20 flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                        <img
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          src={item.product.image}
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">
                          {item.product.name}
                        </p>
                        
                        {/* Interactive Quantity Controls */}
                        <div className="flex items-center gap-3 mt-1.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container/20 active:scale-90"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-semibold text-on-surface font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-container/20 active:scale-90"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-error/70 hover:text-error ml-2 active:scale-90 p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.8]" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-on-surface shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}

                  <hr className="border-outline-variant/25" />

                  <div className="flex justify-between items-center text-xs">
                    <p className="text-on-surface-variant">Subtotal</p>
                    <p className="font-bold text-on-surface">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <p className="text-on-surface-variant">Delivery Fee</p>
                    <p className="font-bold text-on-surface">${deliveryFee.toFixed(2)}</p>
                  </div>

                  <hr className="border-outline-variant/15" />

                  <div className="flex justify-between items-center pt-1">
                    <p className="font-serif font-bold text-primary text-lg">Total</p>
                    <p className="font-serif font-bold text-primary text-xl">${total.toFixed(2)}</p>
                  </div>
                </div>
              </section>

              {/* Shipping Address Section */}
              <section className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
                    Delivery To
                  </h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-primary hover:opacity-85 text-xs font-bold tracking-wide uppercase cursor-pointer"
                  >
                    {isEditingAddress ? "Done" : "Edit"}
                  </button>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0px_8px_24px_rgba(244,194,194,0.06)] border border-outline-variant/20 flex gap-4 items-start">
                  <MapPin className="text-primary mt-1 w-5 h-5 flex-shrink-0 stroke-[1.8]" />
                  <div className="flex-grow">
                    {isEditingAddress ? (
                      <div className="flex flex-col gap-2 w-full mt-1">
                        <input
                          type="text"
                          value={deliveryName}
                          onChange={(e) => setDeliveryName(e.target.value)}
                          placeholder="Recipient Name"
                          className="px-3 py-1 bg-surface-container rounded-lg text-xs leading-normal outline-none focus:ring-1 focus:ring-primary w-full border border-outline-variant/40"
                        />
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Delivery Address"
                          className="px-3 py-1 bg-surface-container rounded-lg text-xs leading-normal outline-none focus:ring-1 focus:ring-primary w-full border border-outline-variant/40"
                        />
                        <input
                          type="text"
                          value={deliveryDistrict}
                          onChange={(e) => setDeliveryDistrict(e.target.value)}
                          placeholder="District, NY Code"
                          className="px-3 py-1 bg-surface-container rounded-lg text-xs leading-normal outline-none focus:ring-1 focus:ring-primary w-full border border-outline-variant/40"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-sm text-on-surface">{deliveryName}</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                          {deliveryAddress}
                          <br />
                          {deliveryDistrict}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {/* Payment Option Selection */}
              <section className="flex flex-col gap-2">
                <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-widest">
                  Payment Method
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Apple Pay Active State selector */}
                  <label
                    onClick={() => setPaymentMethod("apple")}
                    className={`relative flex items-center p-4 bg-surface-container-lowest border rounded-2xl cursor-pointer transition-all active:scale-[0.99] group ${
                      paymentMethod === "apple"
                        ? "bg-primary-container/15 border-primary-container ring-1 ring-primary-container"
                        : "border-outline-variant/30 hover:bg-surface-variant/10"
                    }`}
                  >
                    <div className="flex-grow flex items-center gap-4">
                      <Apple className="text-primary w-5 h-5" />
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          paymentMethod === "apple" ? "text-on-primary-container" : "text-on-surface"
                        }`}
                      >
                        Apple Pay
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === "apple" ? "border-primary" : "border-outline-variant"
                      }`}
                    >
                      {paymentMethod === "apple" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </label>

                  {/* Credit Card selector */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`relative flex items-center p-4 bg-surface-container-lowest border rounded-2xl cursor-pointer transition-all active:scale-[0.99] group ${
                      paymentMethod === "card"
                        ? "bg-primary-container/15 border-primary-container ring-1 ring-primary-container"
                        : "border-outline-variant/30 hover:bg-surface-variant/10"
                    }`}
                  >
                    <div className="flex-grow flex items-center gap-4">
                      <CreditCard className="text-tertiary w-5 h-5" />
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          paymentMethod === "card" ? "text-on-primary-container" : "text-on-surface"
                        }`}
                      >
                        Credit Card
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === "card" ? "border-primary" : "border-outline-variant"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </label>

                  {/* PayPal selector */}
                  <label
                    onClick={() => setPaymentMethod("paypal")}
                    className={`relative flex items-center p-4 bg-surface-container-lowest border rounded-2xl cursor-pointer transition-all active:scale-[0.99] group ${
                      paymentMethod === "paypal"
                        ? "bg-primary-container/15 border-primary-container ring-1 ring-primary-container"
                        : "border-outline-variant/30 hover:bg-surface-variant/10"
                    }`}
                  >
                    <div className="flex-grow flex items-center gap-4">
                      <Wallet className="text-tertiary w-5 h-5" />
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          paymentMethod === "paypal" ? "text-on-primary-container" : "text-on-surface"
                        }`}
                      >
                        PayPal
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        paymentMethod === "paypal" ? "border-primary" : "border-outline-variant"
                      }`}
                    >
                      {paymentMethod === "paypal" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </label>
                </div>
              </section>

              {/* Sticky bottom CTA section */}
              <div className="fixed bottom-20 left-0 right-0 p-5 bg-background/80 backdrop-blur-md z-30 border-t border-outline-variant/10">
                <button
                  onClick={handleCompletePurchase}
                  disabled={isProcessing}
                  className="w-full bg-primary hover:brightness-[1.02] text-on-primary font-semibold text-xs uppercase tracking-wider py-4.5 rounded-full shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Security Checkout...
                    </>
                  ) : (
                    <>
                      Complete Purchase
                      <Lock className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Success Overlay Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-5 overflow-hidden"
        >
          <div className="flex flex-col items-center text-center gap-6 max-w-xs">
            <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mb-1 shadow-md">
              <CheckCircle className="text-primary w-14 h-14 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-[32px] font-bold text-primary tracking-tight">
                Sweet Success!
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Your artisanal treats are being prepared with love and will arrive shortly.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl w-full border border-primary-container/20 shadow-lg mt-2">
              <p className="text-[10px] font-extrabold text-tertiary uppercase tracking-widest mb-1.5">
                Order ID
              </p>
              <p className="font-serif text-lg font-bold text-on-surface">#CR-92841</p>
            </div>

            <div className="flex flex-col gap-3 w-full mt-4">
              <button
                onClick={() => {
                  onClearCart();
                  setIsSuccess(false);
                  onNavigate("tracking");
                }}
                className="w-full bg-primary text-[#FFFFFF] font-semibold text-xs uppercase tracking-wider py-4 rounded-full hover:brightness-[1.03] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-primary/25"
              >
                Track Your Order Live
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleReturnHome}
                className="w-full border border-primary text-primary font-semibold text-xs uppercase tracking-wider py-4 rounded-full hover:bg-primary/5 active:scale-95 transition-all cursor-pointer"
              >
                Return to Shop
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
