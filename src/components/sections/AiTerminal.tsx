"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Bot, Terminal, Zap, RotateCcw } from "lucide-react";
import Groq from "groq-sdk";

const SURYA_SYSTEM_PROMPT = `You represent Surya Janardhan Chintala on his portfolio website. Answer questions about him professionally but casually.

Speak casually, be technical when needed, use emojis naturally 🚀, and be direct. Keep responses concise (2-5 sentences). You are running inside a terminal UI, so feel like a terminal AI.

═══════════════════════════════════════
ABOUT SURYA
═══════════════════════════════════════
Full Name: Surya Janardhan Chintala
Role: AI Engineer & Full Stack Developer
College: B.Tech in AI & ML — Aditya College of Engineering, CGPA 8.5/10
Status: Open to challenging roles 🟢
Email: chintalajanardhan2004@gmail.com
GitHub: https://github.com/SuryaJanardhan
LinkedIn: https://www.linkedin.com/in/surya-janardhan/

═══════════════════════════════════════
EXPERIENCE
═══════════════════════════════════════
Company: GrowStack.ai
Role: AI Intern
Duration: May 2025 — Feb 2026 (10 months)

Key Achievements:
• Engineered robust data pipelines ingesting 100GB+ real-time telemetry from heterogeneous sources using Kafka and PostgreSQL, cutting latency by 30%.
• Built highly available, auto-scaling RAG architectures utilizing LangChain, LangGraph, and Vector Databases to power context-aware chatbots capable of parsing 1M+ internal documents.
• Containerized microservices using Docker and deployed orchestrated clusters reducing deployment time from hours to minutes.
• Trained and fine-tuned domain-specific LLMs (Llama 3, Mistral) reducing token costs by 45% while maintaining 94% reasoning accuracy.
• Integrated LLMs natively with custom tools, databases, and APIs to create autonomous agents.

═══════════════════════════════════════
PROJECTS
═══════════════════════════════════════
1. Dreams
   - Tech: Node.js, Python, React, Gemini 2.0, FFmpeg
   - Details: Autonomous system producing 60+ monthly lip-synced videos across YouTube/Instagram. Zero manual effort with 95% accuracy.

2. Aditya Foods
   - Tech: React Native, Node.js, SQL, Redis, Expo
   - Details: Food ordering app for college canteens. Reduced order processing time by 40% with Redis caching.

3. AI Sensei
   - Tech: React.js, Node.js, MongoDB, Groq API, Socket.IO
   - Details: Instant context-aware Japanese tutoring with vector search and real-time exchange.

4. Redis Leaderboard
   - Tech: TypeScript, Redis, Express
   - Details: Production-style real-time game leaderboard service with atomic operations.

5. Chunked Transfer
   - Tech: TypeScript, API Design, Streaming
   - Details: High-performance 1GB+ file transfer service with chunked uploads and resumability.

6. Emotion Analyzer
   - Tech: Python, CNN, LSTM, RAVDESS
   - Details: Cognitive emotion detection from audio and video signals using CNN + LSTM.

7. IoT Analytics
   - Tech: TypeScript, TimescaleDB, IoT, Docker
   - Details: Containerized time-series sensor analytics platform.

═══════════════════════════════════════
SKILLS
═══════════════════════════════════════
Languages: Python, JavaScript, TypeScript, SQL, Java, C, R
AI/ML: LangChain, LLMs, LangGraph, RAG, AI Agents, Vector DBs (Qdrant, Pinecone), Deep Learning, Machine Learning
Backend: Node.js, Express.js, RESTful APIs, FastAPI, Flask
Frontend: React.js, Next.js, Tailwind CSS
DevOps & Databases: Docker, PostgreSQL, MongoDB, Redis, Git, GitHub Actions, Kafka

═══════════════════════════════════════
CONVERSATION RULES
═══════════════════════════════════════
- Answer as if you are Surya or his personal representative. Do not repeat "I am an AI Twin" in every message.
- If asked about salary, say Surya is negotiable depending on the impact of the role.
- If asked something inappropriate, deflect with dry humor.
- Never make up facts about Surya beyond what's provided.
- If asked about your own nature, say you're Surya's AI twin running in his portfolio.
- Use emojis naturally at max 2 in a response, not excessively.`;

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}



const NETWORK_MSGS = [
  "💀 Lost signal to the AI dimension. Check your connection and try again.",
  "🌩️ Something broke on the server end — definitely not Surya's fault. Retry?",
  "📡 Connection dropped. Surya's Wi-Fi is probably fighting with his Docker containers again.",
];

const SUGGESTIONS = [
  "what projects has surya built?",
  "tell me about the Dreams project",
  "what's surya's AI/ML experience?",
  "what happened at GrowStack?",
  "what's surya's tech stack?",
  "is surya open to work?",
];

const BOOT = [
  "⚡ Booting Surya's AI Twin ...",
  "🧠 Loading personality matrix... ████████████ 100%",
  "🔗 Connecting to LLM ...",
];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function BlinkCursor() {
  return (
    <motion.span
      className="inline-block w-[7px] h-[13px] ml-0.5 align-middle rounded-sm"
      style={{ background: "hsl(var(--primary))" }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse" }}
    />
  );
}

export default function AiTerminal() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [booted, setBooted] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("");
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ease = [0.16, 1, 0.3, 1] as const;

  // Boot sequence
  useEffect(() => {
    if (booted) return;
    setBooted(true);
    let i = 0;
    const tick = () => {
      if (i >= BOOT.length) return;
      setBootLines(p => [...p, BOOT[i++]]);
      setTimeout(tick, 320 + Math.random() * 180);
    };
    setTimeout(tick, 500);
  }, [booted]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, streaming, bootLines]);

  // Auto-typing placeholder logic
  useEffect(() => {
    if (!booted || bootLines.length < BOOT.length) return;

    const currentText = SUGGESTIONS[suggestionIdx];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      setPlaceholderText((prev) => prev.slice(0, -1));
      if (placeholderText === "") {
        setIsDeleting(false);
        setSuggestionIdx((prev) => (prev + 1) % SUGGESTIONS.length);
        timeout = setTimeout(() => { }, 500); // Pause before typing new word
      } else {
        timeout = setTimeout(() => { }, 30); // Deleting speed
      }
    } else {
      setPlaceholderText(currentText.slice(0, placeholderText.length + 1));
      if (placeholderText === currentText) {
        timeout = setTimeout(() => setIsDeleting(true), 2000); // Pause at end of word
      } else {
        timeout = setTimeout(() => { }, 80); // Typing speed
      }
    }

    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, suggestionIdx, booted, bootLines.length]);

  const send = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: t, timestamp: new Date() };
    setMsgs(p => [...p, userMsg]);
    setHist(p => [t, ...p.slice(0, 49)]);
    setHistIdx(-1);
    setInput("");
    setLoading(true);
    setStreaming("");

    try {
      const apiMsgs = [...msgs, userMsg].map(m => ({
        role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.content,
      }));

      // Initialize Groq client securely for the browser using the public key
      const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "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",
        dangerouslyAllowBrowser: true,
      });

      const stream = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SURYA_SYSTEM_PROMPT },
          ...apiMsgs.slice(-12),
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      });

      let acc = "";
      for await (const chunk of stream) {
        acc += chunk.choices[0]?.delta?.content || "";
        setStreaming(acc);
      }

      setMsgs(p => [...p, { id: crypto.randomUUID(), role: "ai", content: acc || "🤔 Empty response — Groq might be napping.", timestamp: new Date() }]);
      setStreaming("");
    } catch (e) {
      console.error(e);
      setMsgs(p => [...p, { id: crypto.randomUUID(), role: "ai", content: rand(NETWORK_MSGS), timestamp: new Date() }]);
      setStreaming("");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [loading, msgs]);

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { send(input); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); const n = Math.min(histIdx + 1, hist.length - 1); setHistIdx(n); setInput(hist[n] ?? ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); const n = Math.max(histIdx - 1, -1); setHistIdx(n); setInput(n === -1 ? "" : (hist[n] ?? "")); }
  };

  const clearChat = () => { setMsgs([]); setStreaming(""); };

  return (
    <section
      ref={sectionRef}
      id="ai-terminal"
      className="py-20 md:py-32 relative z-10 overflow-hidden surface-1"
      aria-label="AI Terminal — Ask Surya's AI"
    >
      {/* ── Ambient upwards glow at the bottom ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at bottom center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Section header */}
      <motion.div
        className="layout-grid mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="grid-col-full flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-label mb-3 block">AI Twin</span>
            <h2 className="text-fluid-h2 heading-display">
              Ask{" "}
              <span style={{ color: "hsl(var(--primary))" }}>Surya&apos;s AI</span>
            </h2>
            <p className="text-sm mt-2 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>
              {/* Powered by Groq · llama3-8b · Full context about Surya loaded */}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono"
              style={{
                background: "hsl(var(--primary) / 0.08)",
                borderColor: "hsl(var(--primary) / 0.2)",
                color: "hsl(var(--primary))",
              }}
            >
              <Zap size={11} aria-hidden="true" />
              Streaming · live
            </div>
          </div>
        </div>
      </motion.div>

      {/* Terminal window */}
      <motion.div
        className="layout-grid"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0, ease }}
      >
        <div className="grid-col-full">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "hsl(222 35% 5%)",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px hsl(var(--border))",
            }}
          >
            {/* ── macOS chrome (amber-themed) ── */}
            <div
              className="flex items-center justify-between px-4 py-3 relative border-b"
              style={{
                background: "hsl(222 35% 7%)",
                borderColor: "hsl(var(--border))",
              }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full cursor-default" style={{ background: "#FF5F57" }} title="Close" />
                <span className="w-3 h-3 rounded-full cursor-default" style={{ background: "#FEBC2E" }} title="Minimize" />
                <span className="w-3 h-3 rounded-full cursor-default" style={{ background: "#28C840" }} title="Full Screen" />
              </div>
              {/* Title */}
              <span className="text-xs font-mono tracking-widest absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
                <Terminal size={14} aria-hidden="true" />
                surya@portfolio
              </span>
              {/* Right actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-all"
                  style={{
                    color: "hsl(var(--muted-foreground))",
                    borderColor: "hsl(var(--border))",
                    background: "transparent",
                  }}
                  aria-label="Clear chat history"
                  title="Clear"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                </button>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1"
                  style={{
                    color: "hsl(var(--primary) / 0.8)",
                    borderColor: "hsl(var(--primary) / 0.25)",
                    background: "hsl(var(--primary) / 0.06)",
                  }}
                >
                  <Bot size={16} aria-hidden="true" />
                  {/* llama3-8b */}
                </span>
              </div>
            </div>

            {/* ── Terminal body ── */}
            <div
              ref={scrollRef}
              className="h-[400px] md:h-[480px] overflow-y-auto p-5 md:p-6 font-mono text-sm leading-relaxed"
              style={{
                background: "hsl(222 35% 5%)",
                color: "hsl(var(--foreground) / 0.8)",
                scrollbarWidth: "thin",
                scrollbarColor: "hsl(var(--border)) transparent",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Boot lines */}
              <AnimatePresence>
                {bootLines.map((line, i) => (
                  <motion.div key={`b-${i}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-1 text-s"
                    style={{ color: "hsl(var(--muted-foreground) / 0.7)" }}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Suggestions (Initially shown) */}
              {bootLines.length === BOOT.length && msgs.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5">
                  <div className="text-[10px] mb-3 font-mono uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>
                    — try asking:
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              <div className="mt-5 space-y-4">
                <AnimatePresence>
                  {msgs.map(msg => (
                    <motion.div key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {msg.role === "user" ? (
                        <div className="flex gap-2">
                          <span style={{ color: "hsl(var(--primary))" }}>surya@portfolio:~$</span>
                          <span style={{ color: "hsl(var(--foreground) / 0.9)" }}>{msg.content}</span>
                        </div>
                      ) : (
                        <div className="pl-4 py-0.5 border-l-2" style={{ borderColor: "hsl(var(--primary) / 0.3)" }}>
                          <div className="text-[10px] font-mono mb-1 flex items-center gap-1.5"
                            style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
                            <Bot size={9} aria-hidden="true" />
                            ai-twin · {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                          <span className="whitespace-pre-wrap break-words" style={{ color: "hsl(var(--foreground) / 0.75)" }}>
                            {msg.content}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Streaming */}
                {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="pl-4 border-l-2" style={{ borderColor: "hsl(var(--primary) / 0.3)" }}>
                    <div className="text-[10px] font-mono mb-1 flex items-center gap-1.5"
                      style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                        <Bot size={9} aria-hidden="true" />
                      </motion.span>
                      ai-twin · thinking...
                    </div>
                    {streaming ? (
                      <span className="whitespace-pre-wrap break-words" style={{ color: "hsl(var(--foreground) / 0.75)" }}>
                        {streaming}<BlinkCursor />
                      </span>
                    ) : (
                      <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}
                        style={{ color: "hsl(var(--muted-foreground) / 0.5)" }}>
                        ▋ processing...
                      </motion.span>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* ── Always-visible Suggestion Chips ── */}
            {bootLines.length === BOOT.length && msgs.length === 0 && (
              <div className="px-5 py-3 border-t flex gap-2 overflow-x-auto scrollbar-hide" style={{ background: "hsl(222 35% 5%)", borderColor: "hsl(var(--border) / 0.5)" }}>
                {SUGGESTIONS.slice(0, 4).map(s => (
                  <motion.button key={s} onClick={() => send(s)}
                    className="shrink-0 text-[10px] px-3 py-1.5 rounded-full border font-mono transition-all whitespace-nowrap"
                    style={{ background: "hsl(var(--primary) / 0.05)", borderColor: "hsl(var(--primary) / 0.2)", color: "hsl(var(--primary) / 0.8)" }}
                    whileHover={{ background: "hsl(var(--primary) / 0.15)", scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Input bar ── */}
            <div className="flex items-center gap-3 px-5 py-4 border-t" style={{ background: "hsl(222 35% 6%)", borderColor: "hsl(var(--border))" }}>
              <span className="hidden sm:inline text-sm font-mono shrink-0 select-none" style={{ color: "hsl(var(--primary))" }}>
                surya@portfolio:~$
              </span>
              <span className="sm:hidden text-sm font-mono shrink-0 select-none" style={{ color: "hsl(var(--primary))" }}>
                ~$
              </span>
              <div className="flex-1 relative flex items-center group">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder={bootLines.length < BOOT.length ? "initializing..." : (placeholderText ? `ask: ${placeholderText}` : "ask me anything about surya...")}
                  disabled={loading || bootLines.length < BOOT.length}
                  className="w-full bg-black/20 focus:bg-black/40 font-mono text-sm placeholder:opacity-40 rounded-lg px-3 py-2 transition-all"
                  style={{
                    color: "hsl(var(--foreground) / 0.9)",
                    caretColor: "hsl(var(--primary))",
                    border: "none",
                    outline: "none",
                    boxShadow: "none"
                  }}
                  aria-label="Chat input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
              <AnimatePresence>
                {input.trim() && !loading && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => send(input)}
                    className="text-xs font-bold font-mono px-4 py-2 rounded-lg border shrink-0 transition-all shadow-md"
                    style={{ background: "hsl(var(--primary))", borderColor: "hsl(var(--primary) / 0.8)", color: "hsl(var(--primary-foreground))" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send"
                  >
                    SEND
                  </motion.button>
                )}
              </AnimatePresence>
              {loading && (
                <motion.span className="text-[10px] font-mono shrink-0 px-3 py-2 rounded-lg border" style={{ color: "hsl(var(--primary))", borderColor: "hsl(var(--primary) / 0.3)", background: "hsl(var(--primary)/0.1)" }}
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }}>
                  processing
                </motion.span>
              )}
            </div>

            {/* ── VS Code-style status bar (amber themed) ── */}
            <div className="flex items-center justify-between px-5 py-1.5 text-[10px] font-mono"
              style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary) / 0.7)", borderTop: "1px solid hsl(var(--primary) / 0.15)" }}>
              <span className="flex items-center gap-1.5">
                {/* <Terminal size={9} aria-hidden="true" /> Groq · llama3-8b-8192 */}
              </span>
              <span>{msgs.filter(m => m.role === "user").length} queries · ↑↓ history</span>
              <span className="flex items-center gap-1.5" style={{ color: loading ? "hsl(43 95% 52%)" : "hsl(142 60% 50%)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} />
                {loading ? "streaming" : "ready"}
              </span>
            </div>
          </div>

          <p className="text-center text-[11px] font-mono mt-4" style={{ color: "hsl(var(--muted-foreground) / 0.4)" }}>
            ↑↓ arrow keys for history · Enter to send · Clear to reset .
          </p>
        </div>
      </motion.div>
    </section>
  );
}
