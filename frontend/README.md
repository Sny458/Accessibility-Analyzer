
# 🧪 Accessibility Analyzer

A full-stack web application that audits any **URL** or **HTML code** for accessibility issues using **axe-core** and **Lighthouse**. Generates combined reports in HTML, JSON, and includes a full-page screenshot for visual context.

---

## 🔍 Features

- ✅ **URL & HTML Code Analysis**:
  - `axe-core`: WCAG-based accessibility checks
  - `Lighthouse`: Accessibility scoring via headless Chrome
- 📊 **Combined HTML Report** with:
  - Color-coded severity
  - Issue descriptions + selectors
  - Accessibility score (for URLs)
- 📸 **Screenshot** of scanned page or HTML
- 🌐 **Web Interface (React)**:
  - Toggle between URL or HTML analysis
  - Download all result types
- 💾 Exportable results:
  - `axe.json`
  - `lighthouse.json` (for URL scans)
  - `report.html`
  - `screenshot.png`

---

## 🏗️ Tech Stack

| Layer       | Tools Used                          |
|-------------|--------------------------------------|
| Frontend    | React, Vite, Tailwind CSS            |
| Backend     | Node.js, Express                     |
| Automation  | Puppeteer, axe-core, Lighthouse      |
| Output      | HTML, JSON, PNG                      |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/accessibility-analyzer.git
cd accessibility-analyzer
```

### 2. Install Backend

```bash
cd backend
npm install
```

### 3. Install Frontend

```bash
cd ../frontend
npm install
```

---

### 4. Run the App

#### 🖥️ Start Backend

```bash
cd backend
node index.js
```

Or with:

```bash
nodemon index.js
```

#### 🌐 Start Frontend

```bash
cd ../frontend
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## 📂 Reports

Each scan generates a folder in `/reports/{timestamp}`:

- `axe.json`
- `lighthouse.json` (for URL mode only)
- `report.html`
- `screenshot.png`

---

## 📄 License

MIT — free to use and modify.

---

## 🙌 Acknowledgements

- [axe-core](https://github.com/dequelabs/axe-core)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Puppeteer](https://github.com/puppeteer/puppeteer)
