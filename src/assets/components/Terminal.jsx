// src/components/Terminal.jsx
import React, { useRef, useEffect } from 'react';

export default function Terminal() {
  const terminalRef = useRef(null);
  const typingRef   = useRef(null);
  const hasTyped    = useRef(false);

  const staticText = 
`Microsoft Windows [Version 10.0.22631.4037]
(c) Microsoft Corporation. All rights reserved.

C:\\Users\\S4LB7>`;
  const dynamicText =
`Who Is Khaled OURIEMMI? 
Hello! I'm Khaled OURIEMMI, a passionate Computer Science student at Sorbonne Université. I am From Tunisia 
I have started my journey in programming at the age of 14 in 2021, and I have been in love with it ever since.
I started with Scratch and then I moved to Python and C with SA-MP (San Andreas Multiplayer) scripting, I was Known As S4LB7.
I have a strong interest in web apps development, and I am currently working with React.js and Node.js. and Not only that , 
I am proficient in LUA , PHP , Javascript ,Python , C , SQL Databases and in Cloud services like AWS and Azure. 
I am always looking to learn new technologies and improve my skills. 
`;
  const finalStaticText = 
`

[process exited with code 1 (0x+21604180)]
You can now close this terminal with Ctrl+D, or press Enter to restart.`;

  useEffect(() => {
    const typingEl = typingRef.current;
    const speed = 50; // Define typing speed in milliseconds
    typingEl.innerText = staticText;

    const typeText = () => {
      if (hasTyped.current) return;
      hasTyped.current = true;
      let idx = 0;
      const type = () => {
        if (idx < dynamicText.length) {
          typingEl.innerText = staticText + dynamicText.slice(0, idx + 1);
          idx++;
          setTimeout(type, speed);
        } else {
          typingEl.innerText += finalStaticText;
        }
      };
      type();
    };

    const termEl = terminalRef.current;
    if (termEl) {
      termEl.addEventListener('mouseover', typeText);
      return () => termEl.removeEventListener('mouseover', typeText);
    }
  }, [staticText, dynamicText, finalStaticText]);

  return (
    <section className="terminal-section" id="about-me">
      <div ref={terminalRef} className="terminal">
        <div className="terminal-header"></div>
        <div className="terminal-body">
          <div ref={typingRef} className="typing-effect"></div>
        </div>
      </div>

      <style>{`
        .terminal-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          scroll-margin-top: 80px;
        }
        .terminal {
          background: #0C0C0C;
          color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0,0,0,0.8);
          margin: 0 auto;
          width: 90%;
          max-width: 1200px;
          min-height: 500px;
          position: relative;
          padding: 79px 20px 20px;
          overflow: auto;
        }
        .terminal-header {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 79px;
          background-image: url('/images/header-terminal.png');
          background-size: 100%;
          background-repeat: no-repeat;
        }
        .terminal-body {
          font-family: 'Cascadia Mono', monospace;
          white-space: normal;
          word-wrap: break-word;
          color: #cccccc;
          margin-top: -27px;
          margin-left: -12px;
        }
        .typing-effect {
          display: inline;
          white-space: pre;
          overflow: hidden;
          border-right: .15em solid #cccccc;
          animation: typing 4s steps(30,end), blink-caret .75s step-end infinite;
          line-height: 0.61;
          font-size: 1em;
        }
        @keyframes typing {
          from { width: 0; } to { width: 100%; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #cccccc; }
        }

        /* Responsive tweaks */
        @media screen and (max-width: 1212px) {
          .terminal-body {
              font-size: 0.8em;
              margin-top: -27px;
              margin-left: -12px;
          }
          .terminal {
              width: 90%;
              height: 270px;
              min-height: 270px;
          }
        }
        @media screen and (max-width: 810px) {
          .terminal-body {
              font-size: 0.7em;
              margin-top: -55px;
              margin-left: -12px;
          }
          .terminal {
              width: 90%;
              height: 250px;
              min-height: 250px;
          }
        }
        @media screen and (max-width: 715px) {
          .terminal-body {
              font-size: 0.65em;
          }
          .terminal {
              width: 85%;
              height: 200px;
              min-height: 200px;
          }
        }
        @media screen and (max-width: 600px) {
          .terminal-body {
              font-size: 0.5em;
              margin-top: -55px;
              margin-left: -12px;
              overflow-wrap: break-word;
          }
          .terminal {
              width: 100%;
              height: auto;
              min-height: 150px;
              padding: 79px 10px 20px;
          }
        }
        @media screen and (max-width: 433px) {
          .terminal-body {
              font-size: 0.35em;
              margin-top: -55px;
              margin-left: -12px;
          }
          .terminal {
              width: 85%;
              height: 100px;
              min-height: 100px;
          }
              @media screen and (max-width: 600px) {
        .terminal-body {
            font-size: 0.5em;
            margin-top: -55px;
            margin-left: -12px;
            overflow-wrap: break-word;
            line-height: 1.2; /* Added line height for better readability */
        }
        .terminal {
            width: 95%;
            height: 400px; /* Fixed height */
            min-height: 400px;
            padding: 79px 10px 20px;
            overflow-y: auto; /* Enable vertical scrolling */
        }
        .typing-effect {
            white-space: pre-wrap; /* Allow text to wrap */
            line-height: 1.2;
        }
      }
        }
      `}</style>
    </section>
  );
}
