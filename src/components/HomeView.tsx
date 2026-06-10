import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, Check, Mail } from "lucide-react";
import { Product, Screen } from "../types";
import { PRODUCTS } from "../data";

interface HomeViewProps {
  key?: string;
  onNavigate: (screen: Screen) => void;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function HomeView({
  onNavigate,
  onSelectCategory,
  onAddToCart,
}: HomeViewProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Filter our bestsellers for presentation
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  const handleAddWithFeedback = (product: Product) => {
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
      className="pb-28"
    >
      {/* Hero Section */}
      <section className="px-5 py-4">
        <div className="relative overflow-hidden rounded-[32px] bg-surface-container shadow-lg aspect-[4/5] flex flex-col justify-end p-8 border border-outline-variant/30">
          <img
            alt="Signature Croissant"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[6s] hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYJMaQj1RCs5q8txoYBGTDQORlFdVKkROFWGD_CkMQFw5FPeSParNHJHk43Kiklo-o-l0VOmiddEDYINqEl94OITU1XY7aIoY5i3-1CskgEkJcqibT0qW3j-VJ7LhW6x0uKfcAApVYTvVpUCk1mUktkbXokSPUr4E-jGG0h1CDACWQl9cd5PQF1GMDHYnFjD3SXROUI3DQdquM8WWAGLY5HT-egZoSEsREP19TkA_GWzwHyFUNSAXP9S3jvm6gUJan9d8Me809T8"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/20 to-transparent z-10" />
          <div className="relative z-20 space-y-2">
            <h2 className="font-serif text-[34px] font-bold text-white leading-tight">
              Artisanal <br />Morning Joy
            </h2>
            <p className="text-white/90 text-sm max-w-xs font-sans leading-relaxed">
              Experience the flakey perfection of our signature honey-glazed croissants.
            </p>
            <button
              onClick={() => {
                // Find Butter Croissant and lead user to shop
                onSelectCategory("croissants");
                onNavigate("shop");
              }}
              className="mt-4 bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-sans font-semibold text-sm active:scale-95 transition-all shadow-md uppercase tracking-wider hover:brightness-105"
            >
              Order Now
            </button>
          </div>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="py-4">
        <div className="px-5 mb-4 flex justify-between items-center">
          <h3 className="font-serif text-xl font-semibold text-on-surface">Categories</h3>
          <button
            onClick={() => {
              onSelectCategory("all");
              onNavigate("shop");
            }}
            className="text-primary font-semibold text-xs uppercase tracking-wide hover:opacity-80 active:scale-95"
          >
            View All
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 px-5 hide-scrollbar pb-1">
          {/* Macarons Category */}
          <button
            onClick={() => {
              onSelectCategory("macarons");
              onNavigate("shop");
            }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm overflow-hidden border border-outline-variant group-hover:scale-105 transition-transform">
              <img
                alt="Macarons"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADOvsceH4mAfJHZEDq7s36sdvw7NdIXKhMo24Uhcy5-yGb6jwFuBdlczqH6gWgSlZxuCBosjYP-gaOJmS3c0Am-yA8EWvCgufbvtMI0G5LpTjEcNfqdra1rBr2vhuOywSlDYnZAS1vmN-Ns2UF_MLv38dzr9ZuOAl1fjXsxEZ9S64rLyNFKZUmF8ebphldVDASMjlX50LuH04PK3ScKQUEPtF5SCf3X6dh-lBohDq8h2FAIX3k68bRizseCQnr2-paNZ5epQtMlS0"
              />
            </div>
            <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Macarons</span>
          </button>

          {/* Cakes Category */}
          <button
            onClick={() => {
              onSelectCategory("cakes");
              onNavigate("shop");
            }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm overflow-hidden border border-outline-variant group-hover:scale-105 transition-transform">
              <img
                alt="Cakes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoyc6327s6OORPK9MeSWmfAbphd9s6guPcAV7M-53OEVwByq4HjXY8iY6BYtsQV_a6lhBCKrPvIYQZ0Gp4zcJ8fjARYvR3dAglMT07rin2Mn3_JSQUT1MrvSqaUPTPGlLx09-4fVlsBVDq_lSsttPqeg8Nn6fcZV9EFbJgIXi7EBwRT6m32FTDeSnKu-JRAVwweNxS4ahFDdAZDzxLlyQf4grU48uq3VSj_9JGTQj9BJO72UarPo9VBTGwBm521mCtmlafu-7y7R4"
              />
            </div>
            <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Cakes</span>
          </button>

          {/* Bread Category */}
          <button
            onClick={() => {
              onSelectCategory("breads");
              onNavigate("shop");
            }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm overflow-hidden border border-outline-variant group-hover:scale-105 transition-transform">
              <img
                alt="Artisanal Bread"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiJfMglZmd5KDC-Xyp5zfVds1pvHcV2u1qya_vfoY_AeClI2Sw6R81_EivModito2UrzPHiQum7uNfwwqiEVwqk-aWzFufhbhmlA_T3h8Nu-61K80GM2ClmbwId99ftJTktiPD5vGagoAdE7bt001UH2q3jJgOheSE9-DmadIqYrxuhdx-67dFPXmspSFuxV80DkjbYQI4Aq2oSUDKrki3ECpKzyEaJyqn3lsVZDT5OKbWAMDuwX3jsGmS_HMDp1BWpyeVvY-N1tw"
              />
            </div>
            <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Breads</span>
          </button>

          {/* Pastries Category */}
          <button
            onClick={() => {
              onSelectCategory("pastries");
              onNavigate("shop");
            }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center shadow-sm overflow-hidden border border-outline-variant group-hover:scale-105 transition-transform">
              <img
                alt="Pastries"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUok0zzSkRo6guDfbZqUU7BGkpIoanX6elPAwIx5zV1VxzXEZqruxFS6xy7-PYy9REjSrU7crKZwYhJndRMer8zgJqzfI_u7nZtEFnakbYKNW1oMrFKJrDmD60Bgq1-5n0_Gx7oLo3CulB5WTVw3VlnRKUvpTi1OSINwfWlG7PHPQtCe1i1gi660vJwAjcEaI9x9jZJcw4EImqRqTFMynn8Vl7TgOMF00As9yKYdBjrRbr0779ZgkwU2HJDfNeb0UWKzj6Jb37ZwE"
              />
            </div>
            <span className="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">Pastries</span>
          </button>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="px-5 py-4">
        <h3 className="font-serif text-xl font-semibold text-on-surface mb-6">Our Bestsellers</h3>
        <div className="grid grid-cols-1 gap-5">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0px_8px_24px_rgba(123,84,85,0.06)] border border-outline-variant/30 active:scale-[0.99] transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface-container-low relative">
                <img
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={product.image}
                />
              </div>
              <div className="p-4 flex justify-between items-end">
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-on-surface">{product.name}</h4>
                  <p className="text-on-surface-variant text-xs">{product.description}</p>
                  <span className="inline-block px-2.5 py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded-full uppercase tracking-wider">
                    MUST TRY
                  </span>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-bold text-primary text-base">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddWithFeedback(product)}
                    disabled={addingId === product.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      addingId === product.id
                        ? "bg-secondary text-white"
                        : "bg-primary text-white shadow-md active:scale-90 hover:brightness-105 cursor-pointer"
                    }`}
                  >
                    {addingId === product.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-5 my-6 p-8 text-center bg-surface-container-low rounded-[24px] border border-outline-variant/20 shadow-inner">
        <h3 className="font-serif text-xl font-bold text-primary mb-2">Join the Crave Club</h3>
        <p className="text-on-surface-variant text-xs max-w-xs mx-auto mb-6 leading-relaxed">
          Receive sweet updates, exquisite recipes, and exclusive seasonal offers delivered to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 max-w-sm mx-auto">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribed}
              placeholder="Email Address"
              className="w-full pl-12 pr-6 py-3.5 rounded-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface text-sm transition-colors outline-none disabled:opacity-70"
            />
          </div>
          <button
            type="submit"
            disabled={subscribed}
            className={`w-full py-3.5 rounded-full font-semibold text-sm tracking-wide shadow-md active:scale-98 transition-all uppercase cursor-pointer ${
              subscribed
                ? "bg-secondary text-white"
                : "bg-primary text-white hover:brightness-105"
            }`}
          >
            {subscribed ? "Subscribed! Welcome ✨" : "Subscribe"}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center text-center py-8 px-5 gap-4 bg-surface-container border-t border-outline-variant/20 rounded-t-[32px]">
        <h2 className="font-serif text-2xl font-bold text-primary">Crave</h2>
        <div className="flex gap-6 text-on-secondary-fixed-variant text-xs font-semibold uppercase tracking-wider">
          <a className="hover:text-primary transition-colors cursor-pointer">Instagram</a>
          <a className="hover:text-primary transition-colors cursor-pointer">Facebook</a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs opacity-80 mt-1">
          <a className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a>
          <span className="text-outline/40">•</span>
          <a className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a>
        </div>
        <p className="text-[11px] text-on-secondary-fixed-variant mt-4 opacity-70">
          © {new Date().getFullYear()} Crave Artisanal Pastries. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
}
