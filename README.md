# mosne lorem ipsum

`mosne lorem ipsum` is a minimalist, developer-focused Manifest V3 Chrome Extension that allows you to quickly generate, copy, and automatically insert Lorem Ipsum placeholder text with a single click. 

The user interface follows the design language of [Mosne Meditation](https://meditation.mosne.it/), featuring a dark theme, `DM Mono` typography, and visually empty capsule buttons.

---

## Features

- **one-click copy & insert**: copies generated text to the clipboard and automatically inserts it at your active text cursor.
- **minimalist grid**: proposes a layout of pill buttons corresponding to different quantities of text:
  - **sentence length**: short, medium, or long sentence.
  - **paragraph length**: 1x, 2x, or 3x paragraphs across Short, Medium, and Long sizes.
- **smart element detection**: automatically inserts text into standard `<input>`, `<textarea>`, and rich-text `contenteditable` elements.
- **shadow dom support**: recursively finds and inserts text into inputs hidden inside nested Shadow DOMs.
- **framework friendly**: dispatches standard `input` and `change` events so changes are detected by React, Vue, and Angular frameworks.
- **privacy first**: does not collect, store, or transmit any user data. Uses secure `activeTab` permissions.

---

## How It Works

1. **Category Selection**: The buttons are laid out in rows. Hovering over a button highlights it and all preceding ones in orange — giving a cumulative visual feedback similar to a star-rating selector:
   - **Row 1 (Sentence)**: three pill buttons — `short sentence`, `medium sentence`, `long sentence` — each generating a single sentence of increasing length. Always starts with the classic *"Lorem ipsum dolor sit amet..."* opener.
   - **Row 2 (Paragraph - Short)**: generates 1, 2, or 3 short paragraphs (2–3 sentences each).
   - **Row 3 (Paragraph - Medium)**: generates 1, 2, or 3 medium paragraphs (4–6 sentences each).
   - **Row 4 (Paragraph - Long)**: generates 1, 2, or 3 long paragraphs (7–9 sentences each).
2. **Action Trigger**:
   - Hovering over a button highlights it and all preceding pills in orange.
   - Native browser tooltips (e.g. *"medium sentence"*, *"2 short paragraphs"*) describe each empty pill on hover.
   - Clicking a button copies the generated text to the clipboard and attempts to inject it at the active text cursor.
   - A toast notification confirms whether it was copied and inserted, or if the page type blocked injection (like the Chrome Web Store or `chrome://` system pages).

---

## Installation

To load the extension locally in Google Chrome:

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to the extensions page by typing **`chrome://extensions`** in the URL bar.
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the `mosne-lorem-ipsum` folder containing the extension files.
6. The extension is now installed! Pin it to your Chrome toolbar for quick access.

### Testing the Extension
An interactive sandbox page **`test_sandbox.html`** is included in the project. You can open it directly in Chrome to verify the copy-and-insert behavior across standard inputs, textareas, contenteditables, and Shadow DOM elements.

---

## License

This project is licensed under the **MIT License**.