/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import * as emailjs from '@emailjs/browser';
import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';

// Note: html2pdf.js is often used via CDN or has tricky types in TS, 
// but we'll use jspdf + html-to-image as a robust alternative for this environment.

export default function Discover() {
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    emailjs.init('u8KCpT8ojxevCJYie');
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F9F9F9] pt-32 pb-20 font-['Raleway']"
    >
      <style>{`
        :root {
          --yellow: #FFCC00;
          --yellow-light: #FFCC0012;
          --yellow-hover: #E6B800;
          --charcoal: #3A3A3A;
          --charcoal-light: #4A4A4A;
          --off-white: #F9F9F9;
          --white: #FFFFFF;
          --black: #000000;
          --border: #E5E7EB;
          --border-light: #F0F0F0;
          --text-primary: #3A3A3A;
          --text-secondary: #6B7280;
          --text-muted: #9CA3AF;
          --success: #059669;
          --error: #DC2626;
          --user-bubble: #F0F0F0;
          --radius-sm: 12px;
          --radius-md: 16px;
          --radius-lg: 20px;
          --radius-xl: 24px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--yellow-hover);
          margin-bottom: 12px;
        }

        .btn-primary {
          background: var(--yellow);
          color: var(--charcoal);
          padding: 14px 28px;
          font-size: 15px;
          border: 2px solid var(--yellow);
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-primary:hover {
          background: var(--yellow-hover);
          border-color: var(--yellow-hover);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: var(--white);
          color: var(--charcoal);
          padding: 14px 28px;
          font-size: 15px;
          border: 2px solid var(--border);
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          border-color: var(--charcoal);
          background: var(--off-white);
        }

        .btn-dark {
          background: var(--black);
          color: var(--white);
          padding: 14px 28px;
          font-size: 15px;
          border: 2px solid var(--black);
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-dark:hover {
          background: var(--charcoal);
          border-color: var(--charcoal);
        }

        .stage-bubble {
          flex: 1;
          padding: 14px 8px;
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 13px;
          text-align: center;
          opacity: 0.5;
          transition: all 0.25s ease;
        }
        .stage-bubble.active {
          background: var(--charcoal);
          color: var(--white);
          opacity: 1;
          border-color: var(--charcoal);
        }
        .stage-bubble.active .stage-number { color: var(--yellow); }
        .stage-bubble.completed {
          opacity: 0.8;
          border-bottom: 3px solid var(--yellow);
        }
        .stage-number {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 2px;
          color: var(--text-muted);
        }
        .stage-title {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
        }
        .stage-subtitle {
          font-size: 10px;
          opacity: 0.7;
          font-weight: 500;
          line-height: 1.2;
          margin-top: 2px;
        }

        .phase-header {
          background: var(--charcoal);
          color: var(--white);
          padding: 32px;
          margin-bottom: 24px;
          border-radius: var(--radius-lg);
        }

        .industry-btn {
          padding: 10px 20px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          background: var(--white);
          color: var(--text-primary);
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .industry-btn:hover {
          border-color: var(--charcoal);
          background: var(--off-white);
          transform: translateY(-1px);
        }

        .message-bubble {
          max-width: 75%;
          padding: 12px 16px;
          font-size: 15px;
          line-height: 1.6;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .typing-dots {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px 18px 18px 4px;
          max-width: 60px;
        }
        .typing-dots .dot {
          width: 6px;
          height: 6px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: typingDots 1.4s infinite ease-in-out;
        }
        @keyframes typingDots {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        .prompt-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: all 0.2s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }
        .prompt-card:hover {
          border-color: var(--charcoal);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .archetype-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          min-height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .priority-item {
          background: var(--off-white);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          font-weight: 500;
          font-size: 13px;
          line-height: 1.3;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <div id="ai-discovery-container" className="max-w-[960px] mx-auto bg-white border border-[#E5E7EB] rounded-[24px] p-8 shadow-sm">
        
        {!isStarted ? (
          <div id="welcome-screen" className="text-center py-16 px-5">
            <img src="https://github.com/Conward24/flask-chatbot/blob/main/Henway%20Logo%20(600%20x%20150%20px)%20Black%20Transparent%20(1).png?raw=true" alt="Henway" className="w-[140px] mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 tracking-tight text-[#000000]">Discover Your AI Solution</h1>
            <p className="text-[17px] text-[#6B7280] max-w-[560px] mx-auto mb-11 leading-relaxed">
              Answer a few guided questions and walk away with a product discovery summary — a clear blueprint for the AI tool your business needs.
            </p>

            <div className="flex justify-center gap-8 mb-9 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5">⏱ ~10 minutes</span>
              <span className="flex items-center gap-1.5">✎ 6 guided steps</span>
              <span className="flex items-center gap-1.5">📄 Free summary at the end</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[680px] mx-auto mb-11 text-left">
              <div className="p-6 border border-[#E5E7EB] bg-white rounded-[20px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] mb-2.5">Step 1–3</div>
                <h3 className="text-base font-bold mb-1.5 text-black">Discover</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">Identify your pain points and define your vision</p>
              </div>
              <div className="p-6 border border-[#E5E7EB] bg-white rounded-[20px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] mb-2.5">Step 4</div>
                <h3 className="text-base font-bold mb-1.5 text-black">Prioritize</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">Rank what matters and choose your approach</p>
              </div>
              <div className="p-6 border border-[#E5E7EB] bg-white rounded-[20px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] mb-2.5">Step 5–6</div>
                <h3 className="text-base font-bold mb-1.5 text-black">Build</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">Explore AI solutions and get your summary</p>
              </div>
            </div>

            <button 
              className="btn-primary text-[17px] px-12 py-4"
              onClick={() => setIsStarted(true)}
            >
              Let's Go
            </button>
          </div>
        ) : (
          <DiscoveryTool />
        )}
      </div>
    </motion.div>
  );
}

function DiscoveryTool() {
  const [currentStage, setCurrentStage] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [industry, setIndustry] = useState('');
  const [prompts, setPrompts] = useState<any[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [vision, setVision] = useState({ who: '', what: '', how: '', outcome: '' });
  const [archetype, setArchetype] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [email, setEmail] = useState('');

  const chatLogRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const stages = ['choose_industry', 'user_needs', 'prd_drafting', 'prioritize', 'ai_exploration', 'review_export'];
  const stageTitles = [
    { title: 'Industry', sub: 'Choose yours' },
    { title: 'Needs', sub: 'Pain points' },
    { title: 'Vision', sub: 'Dream state' },
    { title: 'Prioritize', sub: 'Rank & choose' },
    { title: 'Solutions', sub: 'AI ideas' },
    { title: 'Summary', sub: 'Your results' }
  ];

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleIndustrySelect = (ind: string) => {
    if (ind === 'Other') return;
    setIndustry(ind);
    setCurrentStage(1);
    // Initial message from assistant
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const initialMsg = `Great! Let's explore AI for ${ind}. What is the biggest challenge you face daily?`;
      setMessages([{ role: 'assistant', text: initialMsg }]);
      setPrompts([
        { text: 'What part of making content takes you the most time?', hint: 'Think about daily work', suggestion: 'The part of my work that takes me the most time is...' },
        { text: 'What would help you know what your audience likes?', hint: 'Wish you had more info?', suggestion: 'I wish I had better insight into...' },
        { text: 'What would be great if AI could help me with?', hint: 'Dream helper', suggestion: 'It would be amazing if AI could help me...' }
      ]);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = "";
      if (currentStage === 1) {
        reply = "I see. That sounds like a significant bottleneck. How are you currently handling this, and what's the biggest frustration with that process?";
      } else if (currentStage === 2) {
        reply = "That's a clear vision. If you had a tool that solved this perfectly, how would your daily routine change?";
      } else {
        reply = "Got it. Let's keep moving forward with this discovery.";
      }
      setMessages([...newMessages, { role: 'assistant', text: reply }]);
    }, 1500);
  };

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
      if (currentStage + 1 === 5) {
        generateSummary();
      }
    }
  };

  const generateSummary = () => {
    setSummary({
      executive_summary: "A custom AI solution to streamline operations and enhance decision-making.",
      problem_narrative: "Manual processes are slowing down growth and causing data silos.",
      vision_statement: "A unified AI platform that automates routine tasks and provides real-time insights.",
      recommended_solution: {
        name: "Henway Intelligent Copilot",
        tagline: "Your AI-powered operational backbone",
        description: "A custom-built AI agent that integrates with your existing tools to automate workflows.",
        features: [
          { name: "Automated Data Entry", detail: "Reduces manual input by 80%" },
          { name: "Predictive Analytics", detail: "Forecasts trends based on historical data" }
        ],
        value_props: ["Saves 20+ hours/week", "Eliminates human error", "Scalable architecture"]
      }
    });
  };

  const downloadPDF = async () => {
    if (!summaryRef.current) return;
    const dataUrl = await htmlToImage.toPng(summaryRef.current);
    const pdf = new jsPDF('p', 'pt', 'a4');
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const width = pdf.internal.pageSize.getWidth();
      const height = (img.height * width) / img.width;
      pdf.addImage(img, 'PNG', 0, 0, width, height);
      pdf.save("HenwayAI_Discovery_Summary.pdf");
    };
  };

  return (
    <div className="fade-in">
      {/* Stage Tracker */}
      <div className="flex gap-1.5 mb-5 items-stretch overflow-x-auto pb-2">
        {stageTitles.map((s, i) => (
          <div key={i} className={`stage-bubble ${i === currentStage ? 'active' : ''} ${i < currentStage ? 'completed' : ''}`}>
            <div className="stage-number">Step {i + 1}</div>
            <div className="stage-title">{s.title}</div>
            <div className="stage-subtitle">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-[#E5E7EB] mb-7 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FFCC00] transition-all duration-500" 
          style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
        />
      </div>

      {/* Phase Content */}
      {currentStage === 0 && (
        <div className="text-center">
          <div className="phase-header">
            <h3 className="text-[22px] font-bold mb-2.5 text-white">Choose Your Industry</h3>
            <p className="text-[15px] text-[#B0B0B0] leading-relaxed">Pick the industry you want to explore. This helps us tailor the experience to your specific challenges.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {['Media & Content', 'Retail & E-commerce', 'Digital Health', 'Real Estate', 'Legal Services', 'Finance', 'Education', 'Technology', 'Other'].map(ind => (
              <button 
                key={ind} 
                className="industry-btn"
                onClick={() => handleIndustrySelect(ind)}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      )}

      {(currentStage === 1 || currentStage === 2 || currentStage === 4) && (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#6B7280] mb-1.5">
              <span>Discovery Progress</span>
              <span className="font-bold text-[#3A3A3A]">Question {messages.filter(m => m.role === 'assistant').length}/3</span>
            </div>
            <div className="flex gap-1 height-[4px]">
              {[1, 2, 3].map(i => (
                <div key={i} className={`flex-1 h-1 rounded-full ${messages.filter(m => m.role === 'assistant').length >= i ? 'bg-[#FFCC00]' : 'bg-[#F0F0F0]'}`} />
              ))}
            </div>
          </div>

          <div ref={chatLogRef} className="h-[400px] overflow-y-auto border border-[#E5E7EB] rounded-[16px] p-5 bg-[#F9F9F9] mb-4 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-2.5 mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-[30px] h-[30px] bg-[#3A3A3A] rounded-[10px] flex items-center justify-center text-[#FFCC00] font-bold text-[13px] shrink-0 mt-1">H</div>
                )}
                <div className={`message-bubble ${m.role === 'user' ? 'bg-[#F0F0F0] rounded-[18px_18px_4px_18px]' : 'bg-white border border-[#E5E7EB] rounded-[18px_18px_18px_4px]'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2.5 mb-4">
                <div className="w-[30px] h-[30px] bg-[#3A3A3A] rounded-[10px] flex items-center justify-center text-[#FFCC00] font-bold text-[13px] shrink-0 mt-1">H</div>
                <div className="typing-dots">
                  <div className="dot" /><div className="dot" /><div className="dot" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {prompts.map((p, i) => (
              <div key={i} className="prompt-card" onClick={() => handleSendMessage(p.suggestion)}>
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9CA3AF] mb-2">Option {i + 1}</div>
                <div className="text-[15px] font-bold text-[#3A3A3A] mb-2 leading-tight">{p.hint}</div>
                <div className="text-[13px] text-[#6B7280] leading-relaxed mb-3 italic">"{p.suggestion}"</div>
                <button className="mt-auto w-full py-2.5 bg-[#F9F9F9] border border-[#E5E7EB] rounded-[12px] text-[13px] font-bold hover:bg-[#FFCC00] hover:border-[#FFCC00] transition-all">Use This</button>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-5">
            <div className="flex gap-2 items-center">
              <textarea 
                className="flex-1 p-3 border border-[#E5E7EB] rounded-[12px] text-[15px] resize-none outline-none focus:border-[#3A3A3A] transition-all"
                placeholder="Type your message here..."
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage((e.target as HTMLTextAreaElement).value);
                    (e.target as HTMLTextAreaElement).value = '';
                  }
                }}
              />
              <button 
                className="btn-primary py-3 px-6"
                onClick={() => {
                  const el = document.querySelector('textarea') as HTMLTextAreaElement;
                  handleSendMessage(el.value);
                  el.value = '';
                }}
              >
                ➤
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button className="btn-secondary text-sm py-2 px-4" onClick={() => setCurrentStage(currentStage - 1)}>← Back</button>
              <button className="btn-primary text-sm py-2 px-4" onClick={handleNext}>Next Step →</button>
            </div>
          </div>
        </>
      )}

      {currentStage === 3 && (
        <div className="space-y-6">
          <div className="p-6 border border-[#E5E7EB] rounded-[20px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF] mb-3">A. Priorities</div>
            <h4 className="text-base font-bold mb-1 text-[#3A3A3A]">What matters most to you?</h4>
            <p className="text-[13px] text-[#6B7280] mb-4">Select all that apply — these shape your AI solution.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Automates work", "Personalized", "Secure", "Scalable", "Cost reduction", "Compliance", "Decision support", "Integration"].map(p => (
                <div 
                  key={p} 
                  className={`priority-item ${selectedPriorities.includes(p) ? 'border-[#FFCC00] bg-[#FFCC0012]' : ''}`}
                  onClick={() => {
                    if (selectedPriorities.includes(p)) setSelectedPriorities(selectedPriorities.filter(x => x !== p));
                    else setSelectedPriorities([...selectedPriorities, p]);
                  }}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border border-[#E5E7EB] rounded-[20px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF] mb-3">B. Vision Statement</div>
            <h4 className="text-base font-bold mb-1 text-[#3A3A3A]">Describe your dream solution</h4>
            <div className="bg-[#F9F9F9] p-5 rounded-[16px] text-center leading-[2]">
              My dream solution would help 
              <input type="text" className="mx-1 px-2 py-1 border border-[#3A3A3A] rounded-[8px] w-24 text-center" placeholder="[WHO]" value={vision.who} onChange={(e) => setVision({...vision, who: e.target.value})} />
              do 
              <input type="text" className="mx-1 px-2 py-1 border border-[#3A3A3A] rounded-[8px] w-24 text-center" placeholder="[WHAT]" value={vision.what} onChange={(e) => setVision({...vision, what: e.target.value})} />
              by 
              <input type="text" className="mx-1 px-2 py-1 border border-[#3A3A3A] rounded-[8px] w-24 text-center" placeholder="[HOW]" value={vision.how} onChange={(e) => setVision({...vision, how: e.target.value})} />
              , so they can 
              <input type="text" className="mx-1 px-2 py-1 border border-[#3A3A3A] rounded-[8px] w-24 text-center" placeholder="[OUTCOME]" value={vision.outcome} onChange={(e) => setVision({...vision, outcome: e.target.value})} />.
            </div>
          </div>

          <div className="p-6 border border-[#E5E7EB] rounded-[20px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9CA3AF] mb-3">C. Solution Approach</div>
            <h4 className="text-base font-bold mb-1 text-[#3A3A3A]">How should your AI tool work?</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {[
                { name: "Automation", icon: "⚙️", desc: "Task focused" },
                { name: "Assistant", icon: "💬", desc: "Chat focused" },
                { name: "Dashboard", icon: "📊", desc: "Data focused" },
                { name: "Integrator", icon: "🧩", desc: "System focused" }
              ].map(a => (
                <div 
                  key={a.name} 
                  className={`archetype-card ${archetype === a.name ? 'border-[#FFCC00] bg-[#FFCC0012]' : ''}`}
                  onClick={() => setArchetype(a.name)}
                >
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <div className="text-sm font-bold text-[#3A3A3A] mb-1.5">{a.name}</div>
                  <div className="text-[12px] text-[#6B7280] leading-tight">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button className="btn-secondary text-sm py-2 px-6" onClick={() => setCurrentStage(currentStage - 1)}>← Back</button>
            <button className="btn-primary text-sm py-2 px-6" onClick={handleNext}>Next Step →</button>
          </div>
        </div>
      )}

      {currentStage === 5 && summary && (
        <div className="fade-in">
          <div ref={summaryRef} className="bg-white border border-[#E5E7EB] rounded-[24px] p-9 mb-6 shadow-sm">
            <img src="https://github.com/Conward24/flask-chatbot/blob/main/Henway%20Logo%20(600%20x%20150%20px)%20Black%20Transparent%20(1).png?raw=true" alt="Henway" className="w-[120px] mb-5" />
            <h2 className="text-[28px] font-bold mb-6 tracking-tight text-[#3A3A3A]">Your Product Discovery Summary</h2>
            
            <div className="border-b-2 border-[#E5E7EB] pb-6 mb-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] mb-2">Executive Summary</div>
              <p className="text-[17px] font-medium text-[#3A3A3A] leading-relaxed">{summary.executive_summary}</p>
            </div>

            <div className="mb-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E6B800] mb-2">The Problem</div>
              <p className="text-[15px] text-[#6B7280] leading-relaxed">{summary.problem_narrative}</p>
            </div>

            <div className="bg-[#3A3A3A] text-white rounded-[20px] p-8 mb-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FFCC00] mb-3">Recommended Solution</div>
              <h2 className="text-2xl font-bold mb-1.5 text-white">{summary.recommended_solution.name}</h2>
              <p className="text-[15px] text-[#FFCC00] font-bold mb-4">{summary.recommended_solution.tagline}</p>
              <p className="text-[15px] text-[#B0B0B0] leading-relaxed mb-6">{summary.recommended_solution.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {summary.recommended_solution.features.map((f: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-[12px] p-3.5">
                    <div className="text-sm font-bold text-white mb-1">{f.name}</div>
                    <div className="text-[13px] text-[#999]">{f.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-[#E5E7EB] pt-7">
              <h3 className="text-[22px] font-bold mb-5 text-[#3A3A3A]">Ready to make this real?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="border border-[#E5E7EB] rounded-[16px] p-5 text-center">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="text-[15px] font-bold mb-1.5">Build It Yourself</div>
                  <p className="text-[13px] text-[#6B7280]">Download this summary as your product spec.</p>
                </div>
                <div className="border-2 border-[#FFCC00] bg-[#FFCC0012] rounded-[16px] p-5 text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="text-[15px] font-bold mb-1.5">We Build It</div>
                  <p className="text-[13px] text-[#6B7280] mb-3">Schedule a consultation to scope the build.</p>
                  <a href="mailto:letsconnect@henwayai.com" className="inline-block bg-[#FFCC00] px-4 py-2 rounded-[12px] text-[13px] font-bold">Book Now</a>
                </div>
                <div className="border border-[#E5E7EB] rounded-[16px] p-5 text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="text-[15px] font-bold mb-1.5">Tool Audit</div>
                  <p className="text-[13px] text-[#6B7280]">We'll find the best existing tools for you.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9F9F9] border border-[#E5E7EB] rounded-[24px] p-7 text-center">
            <h3 className="text-xl font-bold mb-2">Almost done!</h3>
            <p className="text-sm text-[#6B7280] mb-5">Enter your email to download your discovery summary.</p>
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                className="flex-1 p-3.5 border border-[#E5E7EB] rounded-[12px] outline-none" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                className="btn-primary"
                disabled={!email.includes('@')}
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
