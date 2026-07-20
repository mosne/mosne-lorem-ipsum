# Chrome Web Store Listing — mosne lorem ipsum

> Last Updated: 2026-07-20

## Store Listing

**Extension Name** [REQUIRED]
mosne lorem ipsum

**Short Description** [REQUIRED]
Quickly copy Lorem Ipsum text and automatically insert it into the active input field or editable area.

**Detailed Description** [REQUIRED]
mosne lorem ipsum is a developer and designer utility that lets you quickly generate, copy, and insert placeholder text with a single click.

Proposes a clean grid of buttons to choose different quantities of text:
- Sentence length: 1x, 2x, 3x sentences
- Paragraph length: 1x, 2x, 3x paragraphs across Short, Medium, and Long lengths

How to use it:
1. Focus on any input field, textarea, or contenteditable element on a webpage.
2. Click the extension icon in the toolbar.
3. Hover over the buttons to see a real-time preview of the placeholder text.
4. Click a button: the text is copied to your clipboard and immediately injected at your cursor.

Privacy & Permissions:
This extension respects your privacy. It does not collect, store, or transmit any user data. It uses the `activeTab` permission, meaning it only interacts with the page when you explicitly open and click a button in the popup.

Support & feedback:
For bugs or feature requests, contact us at our support address.

**Category** [REQUIRED]
Developer Tools

**Single Purpose** [REQUIRED]
Generates Lorem Ipsum text, copies it to the clipboard, and inserts it into active web page input fields.

**Primary Language** [REQUIRED]
English

## Graphics & Assets

| Asset | Dimensions | Status | Filename |
|-------|-----------|--------|----------|
| Store Icon [REQUIRED] | 128×128 PNG | ✅ Ready | `icons/icon-128.png` |
| Screenshot 1 [REQUIRED] | 1280×800 | ⬜ Not created | |
| Screenshot 2 [RECOMMENDED] | 1280×800 | ⬜ Not created | |
| Screenshot 3 [RECOMMENDED] | 1280×800 | ⬜ Not created | |
| Small Promo Tile [RECOMMENDED] | 440×280 | ⬜ Not created | |

### Screenshot Notes
- Screenshot 1: Shows the extension popup interface open on top of a web form, illustrating the minimalist button layout.
- Screenshot 2: Shows the extension inserting text into a rich-text contenteditable area.
- Screenshot 3: Illustrates the clipboard copy toast feedback.

## Permissions Justification

| Permission | Type | Justification |
|------------|------|---------------|
| `activeTab` | permissions | Grants the extension temporary access to the active tab to allow text injection into the focused element when the user clicks a generation button. |
| `scripting` | permissions | Used to programmatically execute the text-insertion script in the active tab context. |

## Privacy & Data Use

### Data Collection

**Does the extension collect user data?** No

### Data Use Certification
- [x] Data is NOT sold to third parties
- [x] Data is NOT used for purposes unrelated to the extension's core functionality
- [x] Data is NOT used for creditworthiness or lending purposes

## Privacy Policy

**Privacy Policy URL** [RECOMMENDED]
https://github.com/paolo/mosne-lorem-ipsum/blob/main/PRIVACY.md

## Distribution

**Visibility**: Public
**Regions**: All regions
**Pricing**: Free

## Developer Info

**Publisher Name** [REQUIRED]
Paolo

**Contact Email** [REQUIRED]
paolo@example.com

**Support URL / Email** [RECOMMENDED]
paolo@example.com

**Homepage URL** [RECOMMENDED]
https://github.com/paolo/mosne-lorem-ipsum

## Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 1.0.0 | 2026-07-20 | Initial release with sentence and short/medium/long paragraph grids, clipboard copying, and auto-insertion functionality. | Draft |

## Review Notes

### Known Issues / Limitations
- Cannot auto-insert text on browser-restricted pages (such as `chrome://` URLs, the Chrome Web Store, or empty New Tab pages) due to Chrome's extension security sandbox. In these scenarios, the text is still copied to the clipboard and a toast notifies the user of the block.
