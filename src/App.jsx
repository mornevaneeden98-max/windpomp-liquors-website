import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import Sales from './pages/Sales';
import Inquiry from './pages/Inquiry';
import Admin from './pages/Admin';

import { useEffect } from 'react';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  // --- Visual Engine Bridge ---
  useEffect(() => {
    // If we're inside the Admin IFrame, add interaction interceptor and live preview sync
    const isIframe = window.self !== window.top;
    if (isIframe) {
      // Inject focus styles for inline editing
      const style = document.createElement('style');
      style.innerHTML = `
        [data-editable] {
          cursor: text !important;
        }
        [data-editable].is-image {
          cursor: pointer !important;
        }
        [contenteditable="true"] {
          outline: none;
          min-width: 20px;
          min-height: 1em;
          transition: all 0.2s;
        }
        [contenteditable="true"]:focus {
          box-shadow: 0 0 0 3px var(--primary);
          border-radius: 4px;
          background: rgba(212, 175, 55, 0.1);
          z-index: 1000;
          position: relative;
        }
      `;
      document.head.appendChild(style);

      const handleInteraction = (e) => {
        const target = e.target.closest('[data-editable]');
        if (target) {
          const fieldId = target.getAttribute('data-editable');
          // Improved image detection: check if fieldId contains 'image' OR if the target/child is actually an IMG
          const isImage = fieldId.toLowerCase().includes('image') ||
            e.target.tagName === 'IMG' ||
            (target.tagName === 'IMG' && target.getAttribute('data-editable'));

          if (isImage) {
            if (e.type === 'click') {
              e.preventDefault();
              e.stopPropagation();
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onclick = (event) => event.stopPropagation();
              input.onchange = (ie) => {
                const file = ie.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (re) => {
                    window.parent.postMessage({
                      type: 'PREVIEW_IMAGE_UPLOAD',
                      fieldId,
                      base64: re.target.result
                    }, '*');
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }
          } else {
            // It's text, make it editable in-place on single click for faster response
            if (e.type === 'click' && target.getAttribute('contenteditable') !== 'true') {
              e.preventDefault();
              e.stopPropagation();
              target.setAttribute('contenteditable', 'true');
              target.focus();

              // Selection shortcut: select all text on first click
              const range = document.createRange();
              range.selectNodeContents(target);
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);

              // Handle live typing updates
              const handleInput = () => {
                window.parent.postMessage({
                  type: 'PREVIEW_TEXT_UPDATE',
                  fieldId,
                  value: target.innerText
                }, '*');
              };

              const handleBlur = () => {
                window.parent.postMessage({
                  type: 'PREVIEW_TEXT_BLUR',
                  fieldId,
                  value: target.innerText
                }, '*');

                target.removeAttribute('contenteditable');
                target.removeEventListener('input', handleInput);
                target.removeEventListener('blur', handleBlur);
                target.removeEventListener('keydown', handleKeydown);
              };

              const handleKeydown = (ke) => {
                if (ke.key === 'Enter' && !ke.shiftKey) {
                  ke.preventDefault();
                  target.blur();
                }
              };

              target.addEventListener('input', handleInput);
              target.addEventListener('blur', handleBlur);
              target.addEventListener('keydown', handleKeydown);
            }
          }

          window.parent.postMessage({ type: 'SELECT_FIELD', fieldId }, '*');
        }
      };

      // Handle live preview updates from Admin
      const handleMessage = (event) => {
        if (event.data?.type === 'LIVE_PREVIEW_UPDATE') {
          // IMPORTANT: If we are CURRENTLY editing something, DO NOT trigger a re-render
          // This prevents focus loss and cursor jumps.
          const activeEl = document.activeElement;
          const isEditing = activeEl && activeEl.getAttribute('contenteditable') === 'true';

          if (!isEditing) {
            window.dispatchEvent(new CustomEvent('site-content-update', {
              detail: event.data.content
            }));
          }
        }
      };

      window.addEventListener('click', handleInteraction, true);
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('click', handleInteraction, true);
        window.removeEventListener('message', handleMessage);
        if (document.head.contains(style)) document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <>
      {!isAdmin && <Navbar />}
      <main style={isAdmin ? { padding: 0 } : {}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
