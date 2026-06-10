import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  RotateCw,
  Clock,
  Phone,
  MessageSquare,
  Check,
  ChevronRight,
  Sparkles,
  Package,
  Flame,
  Truck,
  ArrowLeft,
  X,
  Send,
  User,
} from "lucide-react";
import { Screen, Product } from "../types";
import { PRODUCTS } from "../data";

interface TrackingViewProps {
  key?: string;
  onNavigate: (screen: Screen) => void;
  activeOrderId?: string;
  setActiveOrderId?: (id: string | undefined) => void;
}

interface OrderDetails {
  id: string;
  date: string;
  items: { product: Product; quantity: number }[];
  deliveryName: string;
  deliveryAddress: string;
  currentStage: number; // 0 to 4
  courierName: string;
  courierPhoto: string;
  estTime: string;
}

export default function TrackingView({
  onNavigate,
  activeOrderId,
  setActiveOrderId,
}: TrackingViewProps) {
  const currentOrderId = activeOrderId || "#CR-92841";

  // Mock list of orders for persistent simulation
  const [orders, setOrders] = useState<OrderDetails[]>([
    {
      id: "#CR-92841",
      date: "Today, 10:45 AM",
      items: [
        {
          product: PRODUCTS.find((p) => p.id === "pistachio-rose-croissant") || PRODUCTS[0],
          quantity: 2,
        },
        {
          product: PRODUCTS.find((p) => p.id === "signature-macarons") || PRODUCTS[1],
          quantity: 1,
        },
      ],
      deliveryName: "Sophie Laurent",
      deliveryAddress: "124 Artisanal Way, Suite 4B, Pastry District, NY 10012",
      currentStage: 1, // Baking in progress by default
      courierName: "Antoine Laurent",
      courierPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCitDTYr6MoPH2UOA3sbImKwZQwej6BCXkiXmrxY0Sa05HrH20v0nf_lzb6xG6KofI_6Kz9xFuSEzdhxI2TjYuWq3ehHg0TDil7d1rzSPLFQCWVYmDWfERUtEKbkTH1aNoH_NYKaJvofZmros7y8qPlUqCV8PQE7jFAWxafghG5jFvZtCd6qCJl0fprcwZKaK69kzXcycl05nPxG2LHHreQVllJT8VLO83_rG6aiEYySOTEwWAMRX3Uwv8ZXkxNkcep3vKhqwuVsH8",
      estTime: "11:15 AM",
    },
    {
      id: "#CR-88310",
      date: "Yesterday, 3:20 PM",
      items: [
        {
          product: PRODUCTS.find((p) => p.id === "rose-macaron-box") || PRODUCTS[1],
          quantity: 1,
        },
        {
          product: PRODUCTS.find((p) => p.id === "strawberry-chiffon") || PRODUCTS[2],
          quantity: 1,
        },
      ],
      deliveryName: "Sophie Laurent",
      deliveryAddress: "124 Artisanal Way, Suite 4B, NY 10012",
      currentStage: 4, // Completed / Delivered
      courierName: "Marcus Vance",
      courierPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPPOdy6SM6xIhH9X8fcrPLxW2_3KoVUlezZn1wJMP44lQwmYhXHteOUHesZT1dzHW3ortKMoM_CP9QRmnERs61yNVEdl2UgXMn9XPt4X4MVFNcS8G_QUKs_v4Zi8DNefzySS9-CkNFjZsKPTYqeZ6HzW6mgFI09jnvsfwA4FmL3GuWSDG79A6mRzLTZ3grTHpn2gD2DWsrASenye041L5HAwO_Y_zGOeLkZxgqwz8V6-psQgX3-qXp8vDUscthFNIC28DVG4vIfk",
      estTime: "Delivered",
    },
    {
      id: "#CR-77290",
      date: "June 8, 2026",
      items: [
        {
          product: PRODUCTS.find((p) => p.id === "butter-croissant") || PRODUCTS[0],
          quantity: 4,
        },
      ],
      deliveryName: "Sophie Laurent",
      deliveryAddress: "124 Artisanal Way, Suite 4B, NY 10012",
      currentStage: 4,
      courierName: "Clara Dupont",
      courierPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuCCBIEEVlJaI1R5j_houEra78EfZirRuMrPmQoz3tDO3D823-_ojgoeAPKjstIUTsHqIGS4HRo3r7Dkplioy1dXDWbMz2hppAXTORwItVEMpqddDzGW1nbgIF75kyaZ1f2C-WxpnoekvvOiOiOA2qdUS2SAYNSCmbjuLBfbePtmH2fOG-gLkibCWbbBfjiCDYW-hjndXFP8I4ohh0n1qYMvvqDIsPtwCBZiDAZLzus-vk0iv3i_vXkN5QoHylUVP4g1hRM-AQAlw",
      estTime: "Delivered",
    },
  ]);

  const [searchId, setSearchId] = useState("");
  const [typedMessage, setTypedMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "courier"; text: string; time: string }[]
  >([
    {
      sender: "courier",
      text: "Bonjour! I'm hand-packing your warm selection. Be there soon!",
      time: "10:48 AM",
    },
  ]);

  // Find targeted active order
  const order = orders.find((o) => o.id === currentOrderId) || orders[0];

  // Steps definition
  const TRACKING_STAGES = [
    {
      title: "Order Received",
      desc: "Our patisserie confirmed your premium selection",
      icon: Check,
      color: "bg-primary text-white",
    },
    {
      title: "Baking Fresh Extra-Flaky",
      desc: "Master artisans are hand-shaping with Normandy butter",
      icon: Flame,
      color: "bg-amber-600 text-white animate-pulse",
    },
    {
      title: "Quality Signature Boxing",
      desc: "Packaged carefully into our signature pastel dust box",
      icon: Package,
      color: "bg-pink-600 text-white",
    },
    {
      title: "Boutique Carrier En Route",
      desc: "Courier is traversing Pastry District directly to you",
      icon: Truck,
      color: "bg-blue-600 text-white",
    },
    {
      title: "Delivered Joy",
      desc: "Arrived at your doorstep. Indulge & enjoy your Crave!",
      icon: Sparkles,
      color: "bg-green-600 text-white",
    },
  ];

  // Order Search Submit
  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = searchId.trim();
    if (!normalized) return;

    const formatted = normalized.startsWith("#") ? normalized : `#${normalized}`;
    const found = orders.find((o) => o.id.toLowerCase() === formatted.toLowerCase());

    if (found) {
      if (setActiveOrderId) {
        setActiveOrderId(found.id);
      }
    } else {
      // Mock-generate a new customized order to make any entered code valid and fun!
      const randomId = formatted.toUpperCase();
      const newCustomOrder: OrderDetails = {
        id: randomId,
        date: "Just now",
        items: [
          {
            product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
            quantity: Math.floor(Math.random() * 3) + 1,
          },
        ],
        deliveryName: "Sophie Laurent",
        deliveryAddress: "124 Artisanal Way, Suite 4B, Pastry District, NY 10012",
        currentStage: 0,
        courierName: "Pierre Gasly",
        courierPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuCitDTYr6MoPH2UOA3sbImKwZQwej6BCXkiXmrxY0Sa05HrH20v0nf_lzb6xG6KofI_6Kz9xFuSEzdhxI2TjYuWq3ehHg0TDil7d1rzSPLFQCWVYmDWfERUtEKbkTH1aNoH_NYKaJvofZmros7y8qPlUqCV8PQE7jFAWxafghG5jFvZtCd6qCJl0fprcwZKaK69kzXcycl05nPxG2LHHreQVllJT8VLO83_rG6aiEYySOTEwWAMRX3Uwv8ZXkxNkcep3vKhqwuVsH8",
        estTime: "25 mins",
      };

      setOrders((prev) => [newCustomOrder, ...prev]);
      if (setActiveOrderId) {
        setActiveOrderId(newCustomOrder.id);
      }
    }
    setSearchId("");
  };

  // Step Advancer to make the experience super gamified and fun!
  const advanceOrderStage = () => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === order.id) {
          const nextStage = Math.min(o.currentStage + 1, 4);
          let nextTime = o.estTime;
          if (nextStage === 4) nextTime = "Delivered";
          else if (nextStage === 3) nextTime = "8 mins";
          else if (nextStage === 2) nextTime = "15 mins";
          return {
            ...o,
            currentStage: nextStage,
            estTime: nextTime,
          };
        }
        return o;
      })
    );
  };

  // Auto advance stages for default demo-feel if at early stages (1 -> 2 -> 3)
  useEffect(() => {
    if (order.currentStage < 4 && order.id === "#CR-92841") {
      const interval = setInterval(() => {
        setOrders((prev) =>
          prev.map((o) => {
            if (o.id === "#CR-92841" && o.currentStage < 4) {
              const nextStage = o.currentStage + 1;
              let nextTime = "11:15 AM";
              if (nextStage === 3) nextTime = "11:05 AM";
              if (nextStage === 4) nextTime = "Delivered";
              return { ...o, currentStage: nextStage, estTime: nextTime };
            }
            return o;
          })
        );
      }, 25000); // Advances silently over time
      return () => clearInterval(interval);
    }
  }, [order.currentStage, order.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTypedMessage("");

    // Simulate smart sweet reply from Antoine
    setTimeout(() => {
      const responses = [
        "Perfect! I will make sure the pastry cream remains absolute-shiver cold.",
        "Understood! Navigating past artisanal flower beds now, see you in 4 minutes!",
        "Oui, I am ring-ringing the bell of Suite 4B as requested on arrival!",
        "Almost there! The crumb crust of your croissant is delightfully warm.",
      ];
      const randomResponse = {
        sender: "courier" as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, randomResponse]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pb-28"
    >
      {/* Header View */}
      <header className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-[32px] font-bold text-primary">Track Order</h1>
          <button
            onClick={advanceOrderStage}
            disabled={order.currentStage === 4}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
              order.currentStage === 4
                ? "bg-outline-variant/30 text-outline cursor-not-allowed"
                : "bg-primary-container text-on-primary-container hover:scale-105 active:scale-95"
            }`}
          >
            <RotateCw className="w-3 h-3" />
            Fast-Forward Stage
          </button>
        </div>
        <p className="text-sm text-on-surface-variant">Live boutique preparation & delivery radar.</p>
      </header>

      {/* Order Entry Search */}
      <form onSubmit={handleSearchOrder} className="flex gap-2.5 mb-6">
        <input
          required
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Order Code (e.g., #CR-92841)"
          className="flex-grow px-4.5 py-3.5 bg-surface-container-low border border-outline-variant/40 rounded-2xl text-xs font-semibold placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
        />
        <button
          type="submit"
          className="px-6 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all shadow-md hover:brightness-105 cursor-pointer"
        >
          Track
        </button>
      </form>

      {/* Active Order Card */}
      <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/20 shadow-md p-6 mb-6">
        <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-outline-variant/15">
          <div>
            <span className="text-[10px] font-extrabold text-tertiary-fixed-dim uppercase tracking-widest block">
              Active Delivery
            </span>
            <p className="font-serif text-lg font-bold text-primary mt-0.5">{order.id}</p>
            <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{order.date}</p>
          </div>
          <div className="bg-primary/5 px-4 py-2.5 rounded-2xl text-right">
            <span className="text-[9px] font-extrabold text-primary uppercase tracking-widest block">
              EST. DELIVERY
            </span>
            <p className="font-bold text-on-surface text-sm mt-0.5 flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5 text-primary stroke-[1.8]" />
              {order.estTime}
            </p>
          </div>
        </div>

        {/* Courier Section */}
        {order.currentStage < 4 && (
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl mb-6">
            <div className="flex items-center gap-3">
              <img
                src={order.courierPhoto}
                referrerPolicy="no-referrer"
                alt="Antoine"
                className="w-11 h-11 rounded-full object-cover border border-outline-variant shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-on-surface">{order.courierName}</p>
                <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold tracking-wider mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  Your Boutique Host
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="tel:5551234"
                className="w-9 h-9 bg-white text-primary flex items-center justify-center rounded-xl shadow-sm border border-outline-variant/30 active:scale-90 hover:bg-surface-container-high transition-transform cursor-pointer"
              >
                <Phone className="w-4 h-4 stroke-[1.8]" />
              </a>
              <button
                onClick={() => setChatOpen(true)}
                className="w-9 h-9 bg-primary text-white flex items-center justify-center rounded-xl shadow-md active:scale-90 hover:brightness-105 transition-transform cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>
          </div>
        )}

        {/* Live Map Representation */}
        {order.currentStage < 4 ? (
          <div className="h-44 rounded-2xl overflow-hidden bg-surface-container-low relative border border-outline-variant/30 mb-6 group">
            {/* Artistic Map Sketch Vector */}
            <div className="absolute inset-0 bg-[#FBF7F5] bg-[radial-gradient(#eedfdb_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-75" />
            
            {/* Draw Simulated Roads */}
            <svg className="absolute inset-0 w-full h-full text-outline-variant/20" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="currentColor" strokeWidth="8" strokeDasharray="6,4" />
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="currentColor" strokeWidth="6" />
              <line x1="90%" y1="0%" x2="90%" y2="100%" stroke="currentColor" strokeWidth="8" strokeDasharray="6,4" />
              <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="8" />
              <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="6" strokeDasharray="4,4" />
            </svg>

            {/* Path Connection */}
            <svg className="absolute inset-0 w-full h-full text-primary" xmlns="http://www.w3.org/2000/svg">
              <path
                d={
                  order.currentStage === 1
                    ? "M 50 145 C 50 145 100 130 110 90" 
                    : order.currentStage === 2
                    ? "M 50 145 C 75 145 110 120 160 110" 
                    : "M 50 145 C 100 145 180 110 240 60"
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="4,4"
                className="opacity-60"
              />
            </svg>

            {/* Destination Pin Flag */}
            <div className="absolute top-[34px] right-[60px] flex items-center justify-center flex-col z-10 animate-bounce">
              <div className="bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-md border border-background">
                My Suite
              </div>
              <MapPin className="text-primary w-6 h-6 fill-primary/10 drop-shadow-md" />
            </div>

            {/* Boutique Location Pin */}
            <div className="absolute bottom-[30px] left-[50px] flex items-center justify-center flex-col z-10">
              <MapPin className="text-tertiary w-6 h-6 fill-tertiary/10 drop-shadow-md" />
              <div className="bg-tertiary text-white text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm border border-background mt-0.5">
                Crave Hub
              </div>
            </div>

            {/* Courier Cursor */}
            <div
              className="absolute z-20 w-8 h-8 rounded-full bg-primary shadow-lg border-2 border-white flex items-center justify-center text-white transition-all duration-[2000ms] ease-out shadow-primary/20"
              style={{
                bottom:
                  order.currentStage === 1
                    ? "40px"
                    : order.currentStage === 2
                    ? "65px"
                    : "95px",
                left:
                  order.currentStage === 1
                    ? "80px"
                    : order.currentStage === 2
                    ? "160px"
                    : "210px",
              }}
            >
              <Truck className="w-4.5 h-4.5" />
            </div>

            {/* Compass Card Info */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-outline-variant/35 text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {order.currentStage === 3 ? "Antoine is 1 min away" : "Courier is gathering baked loafs"}
            </div>
          </div>
        ) : (
          /* Delivered Illustration state */
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 flex flex-col items-center justify-center text-center p-6 mb-6 shadow-inner">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white shadow-md animate-bounce mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-green-900">Arrived warm & fresh!</h4>
            <p className="text-xs text-green-700/80 max-w-xs mt-1.5 font-sans leading-relaxed">
              Your gourmet pastries were hand-delivered carefully. Enjoy the crisp layers of love.
            </p>
          </div>
        )}

        {/* Steps Timeline Track List */}
        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/15">
          {TRACKING_STAGES.map((stage, sIdx) => {
            const isCompleted = order.currentStage >= sIdx;
            const isActive = order.currentStage === sIdx;
            const StageIcon = stage.icon;

            return (
              <div key={sIdx} className="flex gap-4 items-start relative pl-1.5">
                {/* Visual Step Marker */}
                <div
                  className={`relative z-10 w-6.5 h-6.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-surface-container border-outline-variant text-on-surface-variant/40"
                  }`}
                >
                  <StageIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                {/* Info Metadata */}
                <div>
                  <h4
                    className={`text-xs font-bold transition-colors ${
                      isActive
                        ? "text-primary text-[13px]"
                        : isCompleted
                        ? "text-on-surface"
                        : "text-on-surface-variant/50"
                    }`}
                  >
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant/80 mt-0.5 leading-relaxed font-medium">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ordered Items Accordion summary container */}
      <div className="bg-surface-container-lowest rounded-[24px] border border-outline-variant/20 shadow-sm p-5 mb-6">
        <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-3.5 border-b border-outline-variant/15 pb-2">
          Receipt Summary
        </h3>
        <div className="flex flex-col gap-3">
          {order.items.map((item, itemIdx) => (
            <div key={itemIdx} className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
                  <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{item.product.name}</p>
                  <p className="text-[10px] text-on-surface-variant/80 mt-0.5">
                    Qty: {item.quantity} • ${item.product.price.toFixed(2)} each
                  </p>
                </div>
              </div>
              <p className="font-bold text-on-surface">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <hr className="border-outline-variant/15 my-1" />

          <div className="flex justify-between items-center text-[11px]">
            <p className="text-on-surface-variant font-medium">Delivery Address</p>
            <p className="text-on-surface font-semibold max-w-[170px] truncate text-right">
              {order.deliveryAddress}
            </p>
          </div>
        </div>
      </div>

      {/* My History Orders selecting board list */}
      <div className="mt-8 border-t border-outline-variant/20 pt-6">
        <h2 className="font-serif text-[20px] font-bold text-primary mb-4">My Orders History</h2>
        <div className="flex flex-col gap-2.5">
          {orders.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                if (setActiveOrderId) setActiveOrderId(o.id);
              }}
              className={`p-4 rounded-2xl flex items-center justify-between border cursor-pointer transition-all active:scale-[0.99] hover:bg-surface-container-low/50 ${
                o.id === order.id
                  ? "bg-primary-container/15 border-primary-container text-primary"
                  : "bg-surface-container-lowest border-outline-variant/30 text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8.5 h-8.5 rounded-full flex items-center justify-center ${
                    o.currentStage === 4
                      ? "bg-green-100 text-green-700 font-bold"
                      : "bg-primary-container/30 text-primary animate-pulse"
                  }`}
                >
                  {o.currentStage === 4 ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">{o.id}</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">{o.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                {o.currentStage === 4 ? "Delivered" : "In Progress"}
                <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/60" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Intercom Modal drawer overlay */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-[32px] shadow-2xl flex flex-col h-[520px] pb-safe"
            >
              {/* Chat Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-outline-variant/15">
                <div className="flex items-center gap-3">
                  <img
                    src={order.courierPhoto}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">{order.courierName}</h3>
                    <p className="text-[10.5px] text-green-600 font-bold tracking-wider flex items-center gap-1">
                      <span className="w-1 w-1 bg-green-500 rounded-full animate-ping" />
                      Courier • Active Radars
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1 rounded-full text-outline-variant hover:bg-surface-container-low transition-all cursor-pointer"
                >
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-grow overflow-y-auto px-6 py-4 flex flex-col gap-4 bg-surface-container-low/10">
                {messages.map((m, mIdx) => {
                  const isMe = m.sender === "user";
                  return (
                    <div
                      key={mIdx}
                      className={`flex flex-col max-w-[80%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                          isMe
                            ? "bg-primary text-white rounded-br-none"
                            : "bg-surface-container-lowest text-on-surface border border-outline-variant/25 rounded-bl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[9px] text-on-surface-variant/65 mt-1 px-1">{m.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Footer Form input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-outline-variant/15 flex gap-2.5">
                <input
                  required
                  type="text"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder="Ask driver about your hot pastries..."
                  className="flex-grow px-4 py-3 bg-surface-container rounded-xl text-xs outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
                />
                <button
                  type="submit"
                  className="w-11 h-11 bg-primary text-white flex items-center justify-center rounded-xl shadow-md active:scale-90 hover:brightness-105 transition-transform cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5 stroke-[2]" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
