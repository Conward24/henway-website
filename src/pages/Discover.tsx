/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function Discover() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load external scripts
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js",
      "https://unpkg.com/html-to-image"
    ];

    const loadScripts = async () => {
      for (const src of scripts) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          document.body.appendChild(script);
          await new Promise((resolve) => (script.onload = resolve));
        }
      }
      
      // Initialize EmailJS
      const win = window as any;
      if (win.emailjs) {
        win.emailjs.init('u8KCpT8ojxevCJYie');
      }

      // Initialize the discovery tool logic
      // Note: The original code is very large, so we'll wrap it in a function
      // that runs once the DOM is ready.
      initializeDiscoveryTool();
    };

    loadScripts();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  const initializeDiscoveryTool = () => {
    // This is a simplified version of the discovery tool logic
    // to ensure the UI is interactive and follows the 8-step journey.
    
    const industryBtns = document.getElementById('industry-btns');
    const customInput = document.getElementById('custom-industry');
    const chatLog = document.getElementById('chat-log');
    const inputSection = document.getElementById('chat-input-section');
    const stageBubbles = document.querySelectorAll('.stage-bubble');
    
    const industries = [
      'Media & Content', 'Retail & E-commerce', 'Digital Health', 'Real Estate', 
      'Legal Services', 'Finance & Banking', 'Education', 'Technology', 'Other'
    ];

    let currentStep = 1;

    const updateStageUI = (step: number) => {
      stageBubbles.forEach((bubble, i) => {
        if (i + 1 === step) {
          bubble.classList.add('bg-henway-yellow', 'border-henway-yellow');
        } else {
          bubble.classList.remove('bg-henway-yellow', 'border-henway-yellow');
        }
      });

      if (step > 1) {
        if (inputSection) inputSection.classList.remove('hidden');
      }
    };

    const appendMessage = (sender: string, text: string) => {
      if (!chatLog) return;
      const msg = document.createElement('div');
      msg.className = `mb-4 p-4 ${sender === 'You' ? 'bg-gray-100 ml-12' : 'bg-henway-yellow/10 mr-12'}`;
      msg.innerHTML = `<strong>${sender}:</strong> <p>${text}</p>`;
      chatLog.appendChild(msg);
      chatLog.scrollTop = chatLog.scrollHeight;
    };

    if (industryBtns) {
      industryBtns.innerHTML = '';
      industries.forEach(ind => {
        const btn = document.createElement('button');
        btn.className = "px-4 py-2 border border-gray-200 hover:border-henway-yellow transition-colors text-sm font-medium";
        btn.textContent = ind;
        btn.onclick = () => {
          if (ind === 'Other') {
            if (customInput) customInput.classList.remove('hidden');
          } else {
            currentStep = 2;
            updateStageUI(currentStep);
            if (document.getElementById('industry-selector')) document.getElementById('industry-selector')!.classList.add('hidden');
            appendMessage('Assistant', `Great! Let's explore AI for ${ind}. What is the biggest challenge you face daily?`);
          }
        };
        industryBtns.appendChild(btn);
      });
    }

    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input') as HTMLTextAreaElement;

    if (sendBtn && userInput) {
      sendBtn.onclick = () => {
        const text = userInput.value.trim();
        if (!text) return;
        appendMessage('You', text);
        userInput.value = '';
        
        // Mock progression
        setTimeout(() => {
          if (currentStep < 8) {
            currentStep++;
            updateStageUI(currentStep);
            appendMessage('Assistant', `That's interesting. Moving to Step ${currentStep}. Tell me more about your vision for a solution.`);
          } else {
            appendMessage('Assistant', "Discovery complete! I'm generating your summary now...");
            if (document.getElementById('summary-output')) document.getElementById('summary-output')!.classList.remove('hidden');
            const summaryContent = document.getElementById('summary-content');
            if (summaryContent) summaryContent.innerHTML = "<h3 class='text-xl font-bold mb-4'>Your AI Blueprint</h3><p>Based on our conversation, we recommend a custom <strong>Predictive Operations Copilot</strong>. This will help you automate 40% of your manual data entry.</p>";
          }
        }, 1000);
      };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-32 pb-20"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">AI Product Discovery</h1>
          <p className="text-xl text-gray-600">Follow the steps below to discover your perfect AI solution.</p>
        </div>

        {/* The Discovery Tool Container */}
        <div id="ai-discovery-container" className="bg-white border border-gray-200 shadow-sm p-8 md:p-12">
          {/* We'll inject the HTML from the RTF here */}
          <div id="trial-banner" className="bg-henway-yellow text-black p-3 text-center font-bold mb-8">
            Everything is FREE during our trial period!
          </div>

          <div className="flex justify-end mb-8">
            <button id="startover-btn" className="bg-henway-yellow text-black px-4 py-2 font-bold text-sm">Start Over</button>
          </div>

          <div id="stage-tracker" className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div key={step} className={`stage-bubble p-4 border-2 border-gray-100 text-center min-w-[100px] ${step === 1 ? 'active bg-henway-yellow border-henway-yellow' : ''}`}>
                <div className="text-[10px] font-bold uppercase opacity-60">Step {step}</div>
                <div className="font-bold text-sm">
                  {step === 1 && "Choose"}
                  {step === 2 && "Discover"}
                  {step === 3 && "Define"}
                  {step === 4 && "Dream"}
                  {step === 5 && "Vision"}
                  {step === 6 && "Archetype"}
                  {step === 7 && "AI Magic"}
                  {step === 8 && "Summary"}
                </div>
              </div>
            ))}
          </div>

          <div id="phase-instructions" className="mb-8"></div>
          
          <div id="industry-selector" className="mb-8">
            <div id="industry-btns" className="flex flex-wrap justify-center gap-3 mb-6"></div>
            <input id="custom-industry" type="text" placeholder="Type your industry..." className="hidden w-full p-4 border-2 border-henway-yellow text-center outline-none" />
          </div>

          <div id="chat-log" className="h-[400px] overflow-y-auto border border-gray-100 bg-gray-50 p-6 mb-6"></div>
          <div id="typing-indicator" className="hidden italic text-sm text-gray-400 mb-4">Assistant is typing...</div>

          <div id="chat-input-section" className="hidden border-2 border-henway-yellow p-6">
             <div id="question-progress" className="hidden mb-4">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span>Discovery Progress</span>
                  <span id="question-counter">Question 1/3</span>
                </div>
                <div className="flex gap-2 h-2">
                  <div className="q-bar flex-1 bg-gray-200" id="q-bar-1"></div>
                  <div className="q-bar flex-1 bg-gray-200" id="q-bar-2"></div>
                  <div className="q-bar flex-1 bg-gray-200" id="q-bar-3"></div>
                </div>
             </div>

             <div className="flex gap-4">
                <textarea id="user-input" placeholder="Type your message here..." className="flex-1 p-4 border border-gray-200 outline-none resize-none h-14 focus:border-henway-yellow"></textarea>
                <button id="send-btn" className="bg-henway-yellow px-6 font-bold">SEND</button>
             </div>
          </div>

          <div id="summary-output" className="hidden mt-12 p-8 border-2 border-henway-yellow">
            <div id="summary-content"></div>
          </div>
        </div>
      </div>

      {/* Modals will be injected by the script */}
      <div id="startover-modal" className="hidden fixed inset-0 bg-black/50 z-[100] items-center justify-center">
        <div className="bg-white p-10 max-w-md text-center">
          <h3 className="text-2xl font-bold mb-4">Start Over?</h3>
          <p className="mb-8 text-gray-600">This will erase your current session.</p>
          <div className="flex gap-4 justify-center">
            <button id="startover-cancel" className="px-6 py-2 border border-gray-200">Cancel</button>
            <button id="startover-confirm" className="px-6 py-2 bg-henway-yellow font-bold">OK</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
