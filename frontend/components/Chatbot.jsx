import React, { useState, useRef, useEffect } from "react";

const BOT_NAME = "Jungle Bot";

// Knowledge base for the bot
const responses = [
  { keywords: ["hello", "hi", "hey", "hii", "hola"], reply: "Hey there! 🌿 Welcome to Urban Jungle Co. How can I help you today?" },
  { keywords: ["how are you", "how r u"], reply: "I'm doing great, thanks for asking! Ready to help you find your perfect plant. 🌱" },
  { keywords: ["your name", "who are you", "what are you"], reply: "I'm Jungle Bot, your friendly plant assistant at Urban Jungle Co.!" },
  { keywords: ["shipping", "delivery", "deliver", "ship"], reply: "We offer free shipping on orders above ₹999! Standard delivery takes 3-5 business days across India." },
  { keywords: ["return", "refund", "exchange"], reply: "We have a 7-day return policy. If your plant arrives damaged, we'll replace it for free! Contact us at support@urbanjungle.com." },
  { keywords: ["payment", "pay", "upi", "cod"], reply: "We accept UPI payments (GPay, PhonePe, Paytm). Cash on Delivery is also available on select orders." },
  { keywords: ["discount", "coupon", "offer", "sale"], reply: "Check our Shop page for the latest deals! Sign up for our newsletter to get 10% off your first order." },
  { keywords: ["contact", "support", "help", "reach"], reply: "You can reach us at support@urbanjungle.com or call +91 98765 43210. We're available Mon-Sat, 10 AM - 7 PM." },
  { keywords: ["location", "address", "where", "store"], reply: "We're based in Bhopal, Madhya Pradesh. Currently we operate online only with pan-India delivery!" },
  { keywords: ["plant care", "care", "water", "sunlight", "how to"], reply: "Most indoor plants need indirect sunlight and watering once a week. Check the product description for specific care tips!" },
  { keywords: ["indoor", "indoor plant"], reply: "We have a great collection of indoor plants like Jade, Money Plant, Snake Plant, and more. Check our Shop page!" },
  { keywords: ["outdoor", "outdoor plant", "garden"], reply: "We carry outdoor plants too! Browse our Shop for flowering plants, shrubs, and garden essentials." },
  { keywords: ["price", "cost", "expensive", "cheap", "affordable"], reply: "Our plants start from just ₹199! We have options for every budget. Visit the Shop page to explore." },
  { keywords: ["admin", "admin login", "admin panel"], reply: "Admin access is for store managers only. If you're an admin, click the Admin button in the navbar to login." },
  { keywords: ["order", "track", "status", "my order"], reply: "You can track your orders from your Profile page after logging in. Go to Profile → My Orders." },
  { keywords: ["register", "sign up", "account", "create account"], reply: "Click the Login button in the navbar, then select Register to create your account. It's quick and easy!" },
  { keywords: ["thank", "thanks", "thx"], reply: "You're welcome! Happy to help. Enjoy your green journey with Urban Jungle Co! 🌿" },
  { keywords: ["bye", "goodbye", "see you"], reply: "Goodbye! Come back anytime. Happy planting! 🪴" },
];

const fallbackReplies = [
  "I'm not sure about that. Try asking about shipping, payments, returns, or plant care!",
  "Hmm, I don't have an answer for that. You can contact our support at support@urbanjungle.com.",
  "I'm still learning! For detailed queries, please reach out to our support team.",
];

function getBotReply(message) {
  const lower = message.toLowerCase().trim();

  for (const item of responses) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return item.reply;
      }
    }
  }

  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Jungle Bot 🌱 Ask me anything about our plants, shipping, payments, or orders!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 rounded-full bg-[#00ff99] hover:bg-[#05e98c] text-black flex items-center justify-center shadow-[0_0_25px_#00ff9950] hover:shadow-[0_0_35px_#00ff9970] transition-all duration-300 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <i className="fa-solid fa-comment-dots text-xl"></i>
        )}
      </button>

      {/* CHAT WINDOW */}
      <div
        className={`fixed bottom-24 right-6 z-[998] w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-[0_0_40px_#00ff9930] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-75 opacity-0 pointer-events-none"
        }`}
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0a0a0a] to-[#111] border-b border-[#00ff99]/20 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00ff99]/15 border border-[#00ff99]/30 flex items-center justify-center">
            <i className="fa-solid fa-robot text-[#00ff99]"></i>
          </div>
          <div>
            <p className="font-bold text-white text-sm">{BOT_NAME}</p>
            <p className="text-[#00ff99] text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff99] inline-block animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="bg-[#0d0d0d] h-80 overflow-y-auto px-4 py-4 flex flex-col gap-3 custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-[#00ff99] text-black rounded-br-md font-medium"
                    : "bg-[#1a1a1a] text-gray-200 border border-[#00ff99]/10 rounded-bl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="bg-[#111] border-t border-[#00ff99]/15 px-4 py-3 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#1a1a1a] border border-[#00ff99]/20 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00ff99]/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-[#00ff99] hover:bg-[#05e98c] text-black flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <i className="fa-solid fa-paper-plane text-sm"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
