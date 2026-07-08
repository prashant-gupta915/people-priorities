"use client";

import React, { useState, useRef, useEffect } from "react";
import { SparklesIcon, CpuChipIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SYSTEM_CONTEXT = `You are an AI Copilot for PeoplePriority — an AI Constituency Intelligence OS for elected representatives.
Context: You are assisting Secretary Verma, MLA of Rampur West. 
The platform tracks citizen complaints, infrastructure projects, ward performance, and public service analytics.
Key data points:
- Total complaints this month: 1,520 (up 10% MoM)
- Resolution rate: 83% (best in 6 months)
- Top issue: Water supply failures in Sector 7B (563 unresolved)
- Road complaints: up 23% pre-monsoon
- AI confidence in priority scoring: 91%
- Active projects: LED lighting (65% complete), Sanitation scheme (Ward 3)
- Avg resolution time: 4.2 days

Answer questions concisely and helpfully. Focus on constituency intelligence, complaint management, and governance insights.`;

const liveInsights = [
  { dot: "bg-red-500", text: "Water supply crisis escalating in Sector 7B" },
  { dot: "bg-amber-400", text: "Road accident risk — NH-48 pre-monsoon" },
  { dot: "bg-emerald-500", text: "Vaccination coverage +12% this month" },
];

const suggestedPrompts = [
  "Which sectors need immediate attention?",
  "Predict monsoon infrastructure risks",
  "How to reduce water complaint resolution time?",
  "Summarise this month's performance",
];

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function CopilotPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      if (!apiKey) throw new Error("NEXT_PUBLIC_GROQ_API_KEY not set");

      const history = [...messages, userMsg].map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_CONTEXT },
            ...history,
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message ?? `API error ${res.status}`);
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `⚠️ ${err.message === "NEXT_PUBLIC_GROQ_API_KEY not set"
            ? "Add NEXT_PUBLIC_GROQ_API_KEY to your .env.local to enable AI responses."
            : `Error: ${err.message}`}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-[300px] flex-shrink-0 h-screen bg-[#F9FAFB] border-l border-[#E5E7EB]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#4F46E5] text-white">
            <CpuChipIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111827]">AI Copilot</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-600">Reasoning active</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold">Groq</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Live Insights — shown when no messages */}
        {messages.length === 0 && (
          <>
            <div>
              <h3 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Live Insights</h3>
              <ul className="space-y-3">
                {liveInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${insight.dot}`} />
                    <span className="text-[12px] font-medium text-[#374151]">{insight.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E7EB] p-3.5 shadow-sm flex gap-2.5 items-start">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex-shrink-0 mt-0.5">
                <SparklesIcon className="h-3.5 w-3.5" />
              </div>
              <p className="text-[12px] text-[#4B5563] leading-relaxed">
                Good morning! I&apos;ve analysed 12,482 complaints across Rampur West. Water supply issues in Sector 7B need immediate attention.
              </p>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Ask me anything</h3>
              <ul className="space-y-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => sendMessage(prompt)}
                      className="w-full text-left px-3 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[12px] font-medium text-[#64748B] hover:bg-[#EFF6FF] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all shadow-sm"
                    >
                      {prompt}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Chat messages */}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="h-6 w-6 rounded-full bg-[#4F46E5] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <SparklesIcon className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-[12px] leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#4F46E5] text-white rounded-tr-sm"
                  : "bg-white border border-[#E5E7EB] text-[#374151] rounded-tl-sm shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="h-6 w-6 rounded-full bg-[#4F46E5] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
              <SparklesIcon className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Clear chat button */}
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="w-full text-[11px] text-[#9CA3AF] hover:text-[#EF4444] flex items-center justify-center gap-1 py-1 transition-colors"
          >
            <XMarkIcon className="h-3 w-3" /> Clear conversation
          </button>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-[#E5E7EB] p-3">
        <div className="flex items-end gap-2 bg-white border border-[#E5E7EB] rounded-2xl px-3 py-2 shadow-sm focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20 transition-all">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-[13px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none leading-relaxed max-h-24 overflow-y-auto"
            style={{ minHeight: "24px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="h-8 w-8 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#4338CA] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="text-[10px] text-[#9CA3AF] text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </aside>
  );
}
