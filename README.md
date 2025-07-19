# 🧠 Voix’it – The AI Selling Assistant for Rural Sellers 🇮🇳

Check out the working prototype here:

👉 **[Voix’it - AI Selling Assistant (Hosted on Vercel)](https://voixe-it.vercel.app/)**

> Empowering farmers, artisans, and small store owners to **sell smarter**, **earn better**, and **operate independently** — all through **voice and AI**.

---

## 🪔 Problem We Solve

Millions of rural sellers in India struggle to bring their products online due to:
- Digital illiteracy & lack of tech skills
- Inability to write market-friendly product descriptions
- Language & voice-first comfort
- No access to marketplaces like Flipkart, ONDC, or WhatsApp Business
- No support for product updates, order handling, or delivery

**Voix’it** is built to solve **ALL** of this — in their own language, with zero tech knowledge.

---

## 🚀 Our Mission

> To become a **24/7 AI ally** for rural sellers — not just to list their products, but to handle their **entire selling journey**, from catalog to customer delivery.

---

## 🧩 Key Features

- 🎙️ **Voice-to-Catalog** in Tamil, Hindi, Kannada, Telugu
- 🧠 AI-generated **product names, prices, categories, descriptions**
- 🌐 Share listings directly to **WhatsApp Catalog**
- 🛒 Simulated Flipkart-style eCommerce listing experience
- 🧾 Real-time **catalog dashboard**
- 🔁 Smart **stock update reminders** & **edit/delete** features
- 🚚 **Transport agent** (future): Book delivery after order confirmation
- 🗣️ **Customer Support Agent** (future): Answer buyer queries, confirm orders

---

## 🧪 MVP Scope

✅ Voice/Text input →  
✅ Catalog creation →  
✅ Catalog preview & confirmation →  
✅ Share to WhatsApp Catalog →  
✅ Flipkart-style simulated listing →  
✅ FastAPI backend with Relevance AI agent →  
✅ Whisper speech-to-text (locally tested)  

---

## 🛠️ Tech Stack

| Layer        | Tools / Tech Used                        |
|--------------|-------------------------------------------|
| 🧠 LLM Agent | [Relevance AI](https://relevanceai.com) (via FastAPI) |
| 🦾 Backend   | Python, FastAPI, Uvicorn, Pydantic        |
| 🎤 Voice     | Whisper (local), Web Speech API (client)  |
| 💻 Frontend  | React + TypeScript + TailwindCSS (via Lovable) |
| 📦 Storage   | Firebase Firestore (optional)             |
| 📲 Integration | WhatsApp Catalog (Carousel JSON Simulated) |
| 🌍 Deployment| Render (API) + Firebase Hosting (Frontend) |

---

📊 System Architecture
[<img width="1026" alt="image" src="https://github.com/user-attachments/assets/eaaba49a-ba4d-4ddf-9898-10bbef8e5133" />](https://voix-it.onrender.com/)

---

## 🔁 Multi-Agent Architecture (Modular)

1. **🧾 Catalog Agent**  
   → Parses voice/text, extracts product info, generates listing

2. **📦 Maintenance Agent**  
   → Handles stock, editing, deletion, alerts, reminders

3. **💬 WhatsApp Agent**  
   → Converts listings into shareable WhatsApp formats

4. *(Future)* **📞 Customer Support Agent**  
   → Handles buyer queries, confirms orders

5. *(Future)* **🚚 Transport Booking Agent**  
   → Books delivery once order is placed, removes middleman

---

## 🗺️ User Journey

1. 👨‍🌾 Seller opens Voix’it
2. 🎙️ Speaks product info in local language
3. 🤖 AI detects language, transcribes, parses
4. 🛍️ Catalog created with auto description
5. 🧾 Seller confirms/edit listing
6. 📲 Share via WhatsApp / Simulated Flipkart
7. ⏳ Future: Buyer orders → AI confirms → Transport booked

---

## 🛠️ Work-in-Progress Wireframe
<img width="1026" height="578" alt="image" src="https://github.com/user-attachments/assets/01cedd82-06a8-4ce5-942f-aa61918f1733" />

---

## 🧠 Future Scope

- 💱 Integrate ONDC, Flipkart, Amazon APIs for real listing
- 🧠 Expand agents for delivery, finance & microloans
- 📞 Launch **Call-based agent** for non-smartphone sellers
- 🏪 Build "Voix’it Shops" in villages (AI Kiosk Model)
- 🧾 Printable QR-based price catalogs for offline buyers

---

## 📚 Documentation
- [API Documentation (FastAPI Swagger)](https://voix-it.onrender.com/)
- [PPT Presentation](https://gamma.app/docs/Voixit-The-Rural-Seller-Companion-System-d05f7wb2fyfn4e4?mode=doc)
- [Documentation](https://drive.google.com/file/d/1_1RxWv4z3O0U6hxo6Ncl6TuVSLSPy7hS/view?usp=sharing)
---

## ⚡ Team Tech Smiths

- **Riyaz** – Backend + LLM Agent Integrator  
- **Ajmal** – Prompt Engineer + System Architect  
- **Nihal** – Frontend Developer + UI Flow  
- **Umar** – Documentation + GitHub Manager + PPT Lead  

---

## 🤝 Acknowledgements

- Hackfinity 2025  
- Relevance AI, OpenRouter, Whisper  
- ChatGPT & Claude (for ideation)

---

## 🏁 Let’s make rural sellers unstoppable.

> Voix’it isn’t just a voice-to-catalog tool.  
> It’s an AI-powered movement to democratize selling — for everyone.

