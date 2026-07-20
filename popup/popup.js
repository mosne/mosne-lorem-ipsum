// Classic Lorem Ipsum vocabulary for generating text
const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", 
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", 
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud", 
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", 
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", 
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", 
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", 
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", 
  "est", "laborum"
];

// Generate a semi-random sentence that looks like natural Latin prose
function generateSentence() {
  const len = Math.floor(Math.random() * 9) + 6; // 6 to 14 words
  const words = [];
  
  for (let i = 0; i < len; i++) {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    words.push(word);
  }
  
  // 40% chance of adding a comma in the middle of longer sentences
  if (len > 8 && Math.random() < 0.4) {
    const commaIndex = Math.floor(Math.random() * (len - 4)) + 2;
    words[commaIndex] = words[commaIndex] + ",";
  }
  
  // Capitalize first word and add period
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

// Generate the placeholder text based on selected category and count
function generateText(type, count) {
  let sentencesCount = 0;
  let paragraphsCount = 0;
  let minSentencesPerPara = 0;
  let maxSentencesPerPara = 0;

  switch (type) {
    case 'sentence':
      sentencesCount = count;
      break;
    case 'paragraph-short':
      paragraphsCount = count;
      minSentencesPerPara = 2;
      maxSentencesPerPara = 3;
      break;
    case 'paragraph-medium':
      paragraphsCount = count;
      minSentencesPerPara = 4;
      maxSentencesPerPara = 6;
      break;
    case 'paragraph-long':
      paragraphsCount = count;
      minSentencesPerPara = 7;
      maxSentencesPerPara = 9;
      break;
    default:
      return "";
  }

  // Generate sentences
  if (sentencesCount > 0) {
    const sentences = [];
    for (let i = 0; i < sentencesCount; i++) {
      if (i === 0) {
        sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
      } else {
        sentences.push(generateSentence());
      }
    }
    return sentences.join(" ");
  }

  // Generate paragraphs
  if (paragraphsCount > 0) {
    const paragraphs = [];
    let isFirst = true;
    
    for (let p = 0; p < paragraphsCount; p++) {
      const numSentences = Math.floor(Math.random() * (maxSentencesPerPara - minSentencesPerPara + 1)) + minSentencesPerPara;
      const sentences = [];
      
      for (let s = 0; s < numSentences; s++) {
        if (isFirst && s === 0) {
          sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
          isFirst = false;
        } else {
          sentences.push(generateSentence());
        }
      }
      paragraphs.push(sentences.join(" "));
    }
    return paragraphs.join("\n\n");
  }

  return "";
}

// Display toast notifications (lowercase styled)
let toastTimeout;
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = toast.querySelector('.toast-icon');
  
  toastMsg.textContent = message.toLowerCase();
  toastIcon.textContent = isSuccess ? "✓" : "⚠";
  
  if (isSuccess) {
    toast.style.backgroundColor = "var(--accent-color)";
  } else {
    toast.style.backgroundColor = "#e07a00"; // Slightly lighter orange warning
  }
  
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Content script injection function. Runs in the active web page context.
function insertTextIntoFocusedElement(text) {
  const getDeepActiveElement = (root = document) => {
    const activeEl = root.activeElement;
    if (!activeEl) return null;
    if (activeEl.shadowRoot && activeEl.shadowRoot.activeElement) {
      return getDeepActiveElement(activeEl.shadowRoot);
    }
    return activeEl;
  };

  const activeEl = getDeepActiveElement();
  if (!activeEl) return false;

  const triggerEvents = (element) => {
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  // 1. Text Inputs and Textareas
  if (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
    const start = activeEl.selectionStart ?? activeEl.value.length;
    const end = activeEl.selectionEnd ?? activeEl.value.length;
    const val = activeEl.value;
    
    activeEl.value = val.substring(0, start) + text + val.substring(end);
    activeEl.selectionStart = activeEl.selectionEnd = start + text.length;
    
    triggerEvents(activeEl);
    return true;
  }
  
  // 2. Contenteditable Elements
  if (activeEl.isContentEditable) {
    activeEl.focus();
    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    
    const range = selection.getRangeAt(0);
    range.deleteContents();
    
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    activeEl.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  }

  return false;
}

// Setup popup event listeners
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    const type = btn.getAttribute('data-type');
    const count = parseInt(btn.getAttribute('data-count'), 10);
    
    // Click event: copy text and try to auto-insert
    btn.addEventListener('click', async () => {
      const textToCopy = generateText(type, count);
      
      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(textToCopy);
        
        // Attempt to auto-insert into active tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab || !tab.id) {
          showToast("copied to clipboard!");
          return;
        }
        
        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: insertTextIntoFocusedElement,
            args: [textToCopy]
          });
          
          // Verify if insertion succeeded
          if (results && results[0] && results[0].result) {
            showToast("copied and inserted!");
          } else {
            showToast("copied! place cursor in a text field.");
          }
        } catch (injectionError) {
          console.warn("Script injection blocked on this page type:", injectionError);
          showToast("copied! auto-insert blocked on this page", false);
        }
      } catch (clipError) {
        console.error("Clipboard copy failed:", clipError);
        showToast("error copying text", false);
      }
    });
  });
});
