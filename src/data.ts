import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Perfectly golden-brown artisanal croissant with flaky layers.",
    price: 4.50,
    category: "pastries",
    tag: "Classic",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPPOdy6SM6xIhH9X8fcrPLxW2_3KoVUlezZn1wJMP44lQwmYhXHteOUHesZT1dzHW3ortKMoM_CP9QRmnERs61yNVEdl2UgXMn9XPt4X4MVFNcS8G_QUKs_v4Zi8DNefzySS9-CkNFjZsKPTYqeZ6HzW6mgFI09jnvsfwA4FmL3GuWSDG79A6mRzLTZ3grTHpn2gD2DWsrASenye041L5HAwO_Y_zGOeLkZxgqwz8V6-psQgX3-qXp8vDUscthFNIC28DVG4vIfk",
    inStock: true
  },
  {
    id: "rose-macaron-box",
    name: "Rose Macaron Box",
    description: "Macarons in pastel shades of rose water, pistachio, and cream.",
    price: 12.00,
    category: "macarons",
    tag: "Bestseller",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmfuA1m3k5mPP0hO9JLp-71RyZj_P2PA2ncOkrI6zCHmCN5re-V1pEqaWBCRcQ4v8kAQnSeeQIb_lcXwghNnfQGhWYEPZW8CxDv47aGrPbUQnHC36KyYCFPGw9181C3ZYOdCCHLDy8D4GzinEB4EHJWr8e02eOiqkeVp4qk8YcqxGMJyvSz7VJ-ePTBtEfBRaYnG4QO1OVrtEPAPasViuIF5rHsFIO_y5gpBeT4XNA3OENTp3ZWxsCW96cSqBrgMkBG3wbsjFI-AA",
    inStock: true,
    isBestseller: true
  },
  {
    id: "strawberry-chiffon",
    name: "Strawberry Chiffon",
    description: "Decadent strawberry shortcake slice topped with a fresh strawberry.",
    price: 7.25,
    category: "cakes",
    tag: "Gourmet",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuCCBIEEVlJaI1R5j_houEra78EfZirRuMrPmQoz3tDO3D823-_ojgoeAPKjstIUTsHqIGS4HRo3r7Dkplioy1dXDWbMz2hppAXTORwItVEMpqddDzGW1nbgIF75kyaZ1f2C-WxpnoekvvOiOiOA2qdUS2SAYNSCmbjuLBfbePtmH2fOG-gLkibCWbbBfjiCDYW-hjndXFP8I4ohh0n1qYMvvqDIsPtwCBZiDAZLzus-vk0iv3i_vXkN5QoHylUVP4g1hRM-AQAlw",
    inStock: true
  },
  {
    id: "vanilla-blush",
    name: "Vanilla Blush",
    description: "Vanilla bean cupcake with a high-swirl blush pink frosting.",
    price: 5.00,
    category: "pastries",
    tag: "Classic",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCitDTYr6MoPH2UOA3sbImKwZQwej6BCXkiXmrxY0Sa05HrH20v0nf_lzb6xG6KofI_6Kz9xFuSEzdhxI2TjYuWq3ehHg0TDil7d1rzSPLFQCWVYmDWfERUtEKbkTH1aNoH_NYKaJvofZmros7y8qPlUqCV8PQE7jFAWxafghG5jFvZtCd6qCJl0fprcwZKaK69kzXcycl05nPxG2LHHreQVllJT8VLO83_rG6aiEYySOTEwWAMRX3Uwv8ZXkxNkcep3vKhqwuVsH8",
    inStock: true
  },
  {
    id: "chocolate-brioche",
    name: "Chocolate Brioche",
    description: "Rustic artisanal loaf of chocolate-swirled brioche bread with sea salt.",
    price: 8.50,
    category: "breads",
    tag: "New",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOkXBlF6uuhQAo0P8mN4BHc6btiG9Vu7fSDXAOtv60a1UcHaFe1QD-RyLXSipAYGcWYzb1DBfxrLZI4_Ht5_DmnXV-QWHuHYs6txnwN9zthA5-8ngXD1sv1yTlppr_2sgcok6mDx4TKtWGhNFsYAxmC-dAHrNLXfadMNpvP0b7vU8CpJ7C4Amg3QoC8zwcx_XzH6TZaZVOw7tnGVMybPgW9vRSzz9CcB4AjOQRbfwN1o62poS47FyyxTs_8he13NyFEALFnfRmQd4",
    inStock: true
  },
  {
    id: "citrus-tart",
    name: "Citrus Tart",
    description: "Lemon tart with smooth curd filling and crisp buttery shell.",
    price: 6.00,
    category: "pastries",
    tag: "Fresh",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUTtvJYjOzU0IERaIs6qvNkiRyMZi3qeBsxTbCzqFFG1S3aA98LFHOj4V7XbdQAZxes8LKm5L-Bs2qBhcyjpxcWZ8bi4nUsx0DhMawAc6fHZ4XWU96TGVnqoCxymb8lJFSP4p9Z91SNLrKtYpVkiGvsGmngGALgOPEoOIlqLWbwkv-4nmpEySa_oL53S8-IwcOWxxltD7tkLrXdYVe5M5en53EzkzThW_Ve0JLqZ7B_fO-f-i70xRO_kaMwS_MGXDvrHSHk5pbR9A",
    inStock: true
  },
  {
    id: "rosewater-croissant",
    name: "Rosewater Croissant",
    description: "Delicate raspberry-topped artisanal pastry with flaky golden crust.",
    price: 6.50,
    category: "pastries",
    tag: "Classic",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCn4OTfZMyM55jERz1xIrzCmgDMGvGMTFW4CrYQOuKyZ5cXzeQ3kDlwgVlWITvnhfEvjP8Z0rBnpFjEAowpfxZ2j6ubLjrNIeqDWToWkvbG_LoGJZfJgaesZNjh4fswRqix1KIPODBAClc52ZcncNXf_1p9ntqTjNgyyZ3X2WTALCp-EN6Qy316ZhWNrqKIYBiNK8Vx0Qq_CD7y23CC-tc5ef7UOnoWdiDnxZ-tK7HM3QHePQM-fKv5y6iRbhEnMy_69NmbuCIT48",
    inStock: true
  },
  {
    id: "lavender-macaron-box",
    name: "Lavender Macaron Box",
    description: "Stack of soft lavender-infused macarons arranged neatly.",
    price: 24.00,
    category: "macarons",
    tag: "Luxury",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD9iqcOQxQ-WYWIsrlIzY0szjDXbGnBPGl_kQTMSjwb80P5O0SWszDbFeiKgLdjXyWeGHMfzmela11tqTdwJV9pOXjTsQCpmX4iTbcrQiM-iNpmPU4bofrRr3uiYN9nwohz_VizJcBRvDSnAWspXWOX2zBAUH3jEScJD1G4xRYUinidYpBgztsjj0dzUZZcf-yIRaK0iI-VMz8iG-xQIJOa787Qkfw1hjoT3L1LbZ9etwAHkBrS-ivl00RhX1lLyiB6FQDfcoA_qI",
    inStock: true
  },
  {
    id: "gold-vanilla-cake",
    name: "Gold Vanilla Cake",
    description: "Gourmet vanilla bean cheesecake with gold leaf garnish.",
    price: 12.00,
    category: "cakes",
    tag: "Premium",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Bokk-aWt5EiGVZfmwVml9qmDeEhrogZdbxyz-I72Bh2v_ef4RGNclLCGGGEubkkB7ytgqqJ3RZEpahWGqf5KogyaZAFj1RBduosiAvAlBw2AM3mE4Wm9hrtZECtu0QrfH4JoMUHP68nQcMk6fUAmRhy8UiL4m-gR_TXMQWWK8SCkO_-rotHzf_8CSkBZvaCEIl_svw5JYr1tWUjguPyILyde0f1sXsX8IZJV-edFls1miZS83yl70qS27yTYN9TVahqXWrz6M20",
    inStock: true
  },
  {
    id: "country-sourdough",
    name: "Country Sourdough",
    description: "Artisanal sourdough bread with scored crust, dusting of flour.",
    price: 8.00,
    category: "breads",
    tag: "Sold Out",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2-YMyVTtJ9VI9CPa6OzH2sbtEEdOOFQ8ZymnwcXMnlKiw3JQfcmsSuBsAVk_ZU9S43W6gdU5_55st86E15FnifbxhtiNkxsl0IxuSwebSzX27A4SURMXEVtqEt1E2WzQfOFlHRWTv0HWBQEKq0xDAVKDcvih7eC_giUotMgLs8wNKl7w9oR_H00JFA-BoHI7sEKOOZ4O3PDRqwO3mRNCnRctAummi6sfmfy5OfATmRI3SxhE8cACdK7B0DuzYCNPdGdVO51EbhKI",
    inStock: false
  },
  {
    id: "rose-petal-cupcake",
    name: "Rose Petal Cupcake",
    description: "Vanilla base infused with premium rose water and gold dust.",
    price: 4.50,
    category: "pastries",
    tag: "Must Try",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEb3X3sQFYiJIzMBZCXQ8gi2X2wf_ecoOICTWKYX3aISCdc1UQoJwe3ItO8F54Dkj05mI4zLnwfifBuvZHunM8PwI2eD5dKXtXDKasDLW7oAKHN_usYqdQit62VWRNIshdOkrZ5vERSaYv_NyDZQfiFV0CldGI9XGvlAoqSPWlIPub_DFfTog5vBBwX5CKKPg9x3A6hNhblBNESVchJ3Gaja6BWHVCHc5OFgmHF2sYCycdslkS-6dussdxNDLiH6ryUyCLAKUsq0k",
    inStock: true,
    isBestseller: true
  },
  {
    id: "choco-melt-cookie",
    name: "Choco-Melt Cookie",
    description: "Cookies baked with 70% dark Belgian chocolate chunks.",
    price: 3.75,
    category: "pastries",
    tag: "Indulgent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWy3JmXcW-ZUci7D20SNPsjXUnCfJVjtEQdA9fxXRD0oJ6Yx-KG4P4d-_pITe6w1Uuzz8my6UgOHn9jqArkpTmfq4y91AR0haQa3cPpEZIXRgnk1CRCy9ijrPtsXAw8UBbiEotodzmJ1RUTSme1jbPdKLdVc9zEeNQZiGHrQ6fAqkJMN7BMUxK4VCzk0ZlMRj6voyP6p0ZIKAJVDgY-l5i0VoFXUb1vRzb0M8HaOBKvrccAnN8nRVjpdK40cCOndVtAP_7mJOf2xY",
    inStock: true,
    isBestseller: true
  },
  {
    id: "pistachio-rose-croissant",
    name: "Pistachio Rose Croissant",
    description: "Gourmet flaky croissant stuffed with cream of pistachio and rosewater.",
    price: 6.00,
    category: "pastries",
    tag: "Blush Selection",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDv-T3acFrrBfLMjnh0fEV0w8AG7PSohxiKRCsK6LUkOPJbOfk3gABSzLpSF5Bg83fH4UGHq5Yc7e_xXH4vCZxSteI7YSZHEC-7VbPdV9uUfRgPIwEJbxP82ixnfdK8q4wIsapZHM4vZ74liHIBXA3PYzysmz1QOuIT47j0C4P_XVAJpETKemuiSW0VG8dJJW1qqh0OHWrbwszhgIvaCOcH_Ggk5IkB7WfNHBKDycdXbPdP4n__m2ec2FjIDSx8aKKRvIqSA79U_lY",
    inStock: true
  },
  {
    id: "signature-macarons",
    name: "Signature Macarons (Box of 6)",
    description: "Luxury assortment of six macarons in soft lavender, rose, and cream.",
    price: 18.50,
    category: "macarons",
    tag: "Premium",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrDn9RmCgal6bBtL8lSxrkeeWMBXrXiDYmfRiYex4zOZDwsxY1Dn0YG3X0Qy1c7XtWU1wRvfqlglE7DZkMS0Sg8j-MSAFD89Uj0OalQvCwA5UgR-FkN9dDlTdA-Id-4xJFv06WK8NOMlFaC8tN8tqjRpBkc7bOIaX1MlBwY4rLnncRJckmQRs1z4X1kcxln6HC6fpXeTYjUlRl5OF7Erpc0jGc7DPZiA3DHKY4X13suGhT9VYyCGeJK6bIHfCo3KY3o7QSwmFU3KQ",
    inStock: true
  },
  {
    id: "almond-frangipane-croissant",
    name: "Almond Frangipane Croissant",
    description: "Double-baked buttery croissant filled with classic almond pastry cream and toasted slivers.",
    price: 5.75,
    category: "pastries",
    tag: "Nutty Bliss",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPPOdy6SM6xIhH9X8fcrPLxW2_3KoVUlezZn1wJMP44lQwmYhXHteOUHesZT1dzHW3ortKMoM_CP9QRmnERs61yNVEdl2UgXMn9XPt4X4MVFNcS8G_QUKs_v4Zi8DNefzySS9-CkNFjZsKPTYqeZ6HzW6mgFI09jnvsfwA4FmL3GuWSDG79A6mRzLTZ3grTHpn2gD2DWsrASenye041L5HAwO_Y_zGOeLkZxgqwz8V6-psQgX3-qXp8vDUscthFNIC28DVG4vIfk",
    inStock: true,
    isBestseller: true
  },
  {
    id: "raspberry-lychee-rose-tart",
    name: "Raspberry Lychee Rose Tart",
    description: "Crisp vanilla sugar shell filled with fragrant rose custard and layered with fresh organic raspberries & lychee juice.",
    price: 7.50,
    category: "tarts",
    tag: "Fragrant",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFI4gQc5LaV5umW1jN1YzdFy1WjNs_RqfwVzWrYHWde5MGbluO5PkhmrcOntBucd6D6N6Ic8OoFOdTXPBUKGF8VBqvfawkASNuY6ZPOMIKfwASyrnMy4-1hZVJJvQiWoZkrN8tq7PIKCgdLNeSEwcQu3BFl0GG0p4JRxfdjrarigYBPvHrwIP1MU8HVyuXsWc0x3Xru_afO5S96geE2XMAFTgHeaOCu07MK3XK_tpH3vmP5VwaRaarQzX249YSpTkdHC1um7iYVgc",
    inStock: true
  },
  {
    id: "matcha-macaron-box",
    name: "Uji Matcha Macarons (Box of 6)",
    description: "Delicate macarons crafted with authentic stoneground Japanese Uji matcha and white chocolate ganache.",
    price: 19.50,
    category: "macarons",
    tag: "Zen Ritual",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD9iqcOQxQ-WYWIsrlIzY0szjDXbGnBPGl_kQTMSjwb80P5O0SWszDbFeiKgLdjXyWeGHMfzmela11tqTdwJV9pOXjTsQCpmX4iTbcrQiM-iNpmPU4bofrRr3uiYN9nwohz_VizJcBRvDSnAWspXWOX2zBAUH3jEScJD1G4xRYUinidYpBgztsjj0dzUZZcf-yIRaK0iI-VMz8iG-xQIJOa787Qkfw1hjoT3L1LbZ9etwAHkBrS-ivl00RhX1lLyiB6FQDfcoA_qI",
    inStock: true
  },
  {
    id: "chocolate-fudge-layer-cake",
    name: "Double Chocolate Fudge Layer Cake",
    description: "Moist chocolate chiffon layers sandwiched with luxurious dark Belgian cocoa fudge frosting.",
    price: 8.95,
    category: "cakes",
    tag: "Decadent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuCCBIEEVlJaI1R5j_houEra78EfZirRuMrPmQoz3tDO3D823-_ojgoeAPKjstIUTsHqIGS4HRo3r7Dkplioy1dXDWbMz2hppAXTORwItVEMpqddDzGW1nbgIF75kyaZ1f2C-WxpnoekvvOiOiOA2qdUS2SAYNSCmbjuLBfbePtmH2fOG-gLkibCWbbBfjiCDYW-hjndXFP8I4ohh0n1qYMvvqDIsPtwCBZiDAZLzus-vk0iv3i_vXkN5QoHylUVP4g1hRM-AQAlw",
    inStock: true,
    isBestseller: true
  },
  {
    id: "fig-walnut-sourdough",
    name: "Fig and Walnut Sourdough",
    description: "Earthy, crusty signature sourdough loaded with sweet Turkish figs and toasted crunch walnuts.",
    price: 9.00,
    category: "breads",
    tag: "Artisanal",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2-YMyVTtJ9VI9CPa6OzH2sbtEEdOOFQ8ZymnwcXMnlKiw3JQfcmsSuBsAVk_ZU9S43W6gdU5_55st86E15FnifbxhtiNkxsl0IxuSwebSzX27A4SURMXEVtqEt1E2WzQfOFlHRWTv0HWBQEKq0xDAVKDcvih7eC_giUotMgLs8wNKl7w9oR_H00JFA-BoHI7sEKOOZ4O3PDRqwO3mRNCnRctAummi6sfmfy5OfATmRI3SxhE8cACdK7B0DuzYCNPdGdVO51EbhKI",
    inStock: true
  },
  {
    id: "cardamom-orange-cruffin",
    name: "Cardamom Orange Cruffin",
    description: "Croissant-muffin hybrid hand-rolled in orange zest sugar and lightly spiced with cardamom.",
    price: 5.50,
    category: "pastries",
    tag: "Spiced Sweet",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCitDTYr6MoPH2UOA3sbImKwZQwej6BCXkiXmrxY0Sa05HrH20v0nf_lzb6xG6KofI_6Kz9xFuSEzdhxI2TjYuWq3ehHg0TDil7d1rzSPLFQCWVYmDWfERUtEKbkTH1aNoH_NYKaJvofZmros7y8qPlUqCV8PQE7jFAWxafghG5jFvZtCd6qCJl0fprcwZKaK69kzXcycl05nPxG2LHHreQVllJT8VLO83_rG6aiEYySOTEwWAMRX3Uwv8ZXkxNkcep3vKhqwuVsH8",
    inStock: true
  }
];

export const RECOMMENDATIONS: Product[] = [
  {
    id: "dark-truffles",
    name: "Dark Truffles",
    description: "Gourmet dark chocolate truffles with a velvet cocoa powder coating.",
    price: 18.00,
    category: "pastries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnGriwBJ-gy1IbTs1t1M_QfOSaFlfbndzQWn0dQmNWiuBsoYpoIs3Ms3wpbd3c72vCk5ydprvZhQDOyqTgJDh8RCLsGlc7bpU4WWoHJ6K2vX4061QWpJ7fvkys0ZlTH4Wzx2dQt53H_bnRoUcEhav8J0aLAQlOpA5ltNlnBDIFPes3-Hz14aNJvJF28NbCaCQC-Rh0z5jeGNIlK9AHh6Z-Icp3-juA_PctXuApUOcF6J7DQ3DzVaWzzTeFUNWUo2NKqwzyKInIc88",
    inStock: true
  },
  {
    id: "seasonal-fruit-tart",
    name: "Seasonal Fruit Tart",
    description: "Artistic luxury fruit tarts with shiny pieces of kiwi and berries.",
    price: 7.50,
    category: "pastries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFI4gQc5LaV5umW1jN1YzdFy1WjNs_RqfwVzWrYHWde5MGbluO5PkhmrcOntBucd6D6N6Ic8OoFOdTXPBUKGF8VBqvfawkASNuY6ZPOMIKfwASyrnMy4-1hZVJJvQiWoZkrN8tq7PIKCgdLNeSEwcQu3BFl0GG0p4JRxfdjrarigYBPvHrwIP1MU8HVyuXsWc0x3Xru_afO5S96geE2XMAFTgHeaOCu07MK3XK_tpH3vmP5VwaRaarQzX249YSpTkdHC1um7iYVgc",
    inStock: true
  },
  {
    id: "hibiscus-iced-tea",
    name: "Hibiscus Iced Tea",
    description: "Iced tea made from organic sweet hibiscus with beautiful real flower petals.",
    price: 5.00,
    category: "pastries",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSxsMkjRCFhK42Cpb3say4Ak-QS233nZl_lwsgYFiKgMayeYm0DrEoZ59oOm3U2puqqhDf1bwPmV4wDmNgZaGMhGwA6kNNg5sUyODhhhWGVqHLVvZlPDB7HM43nY9TVK_aFVwN-VvqwAZdUcUqMCsI3-z1A4gFGgx9xxhxIroeA9At5c0WT9ej6ledf2RCyiLb5ExKJ1P03cKGceBD-ds2QBXSO1cU5uM2c_kSRmCCaP3P9iuEIuhLEyfccLmGwWwhpNdbxoLITII",
    inStock: true
  }
];
