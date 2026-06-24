# Authoring Guide — VYEPTI Components

## Component 1: Quote Block

**Purpose:** Display a patient testimonial with an image.

### How to create it in da.live:

1. Insert a table with 2 columns and 2 rows
2. In the first row, first cell write: Quote
3. Leave the first row second cell empty
4. In the second row, first cell add the content in this order:
   - Quote text (e.g. "With more migraine-free days...")
   - Author name with bold on the patient name (e.g. Sherly, VYEPTI patient)
   - Disclaimer text (e.g. Individual results may vary...)
5. In the second row, second cell insert the patient image

### Example table structure:

| Quote | |
|---|---|
| "Quote text here" Author name. Disclaimer text. | [image] |

### Notes:
- Each paragraph in the left cell should be separate (press Enter between them)
- The quote text, author, and disclaimer are styled differently automatically
- On mobile the layout stacks vertically with image at the bottom

---

## Component 2: Columns (Cards) Block

**Purpose:** Display two side-by-side informational cards with buttons.

### How to create it in da.live:

1. Insert a table with 2 columns and 2 rows
2. In the first row, first cell write: Columns (cards)
3. Leave the first row second cell empty
4. In the second row add one card per cell:
   - Label text (small, uppercase)
   - Heading (formatted as Heading 2)
   - Body paragraph text
   - A link for the button (highlight text, Cmd+K, paste URL)

### Example table structure:

| Columns (cards) | |
|---|---|
| Label text. Heading here. Body text. [Button text](url) | Label text. Heading here. Body text. [Button text](url) |

### Notes:
- The button link must be a real hyperlink, not just text
- The heading must be formatted as Heading 2 using the toolbar
- On mobile the cards stack vertically, one per row
- Both cards will automatically match the same height
