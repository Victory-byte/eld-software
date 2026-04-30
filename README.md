# Exit Liquidity Detector

> "This AI doesn't analyze coins. It tells you if you're the victim."

## Deploy to Vercel (5 minutes)

### 1. Get your Anthropic API key
- Go to https://console.anthropic.com
- Sign up / log in
- Click **API Keys** → **Create Key**
- Copy it (starts with `sk-ant-…`)

### 2. Push to GitHub
- Create a new repo at github.com
- Upload all these files keeping the folder structure:
  ```
  exit-liquidity/
  ├── api/
  │   └── scan.js
  ├── public/
  │   └── index.html
  └── vercel.json
  ```

### 3. Deploy on Vercel
- Go to https://vercel.com → **New Project**
- Import your GitHub repo
- Click **Environment Variables** and add:
  - **Name:** `ANTHROPIC_API_KEY`
  - **Value:** your `sk-ant-…` key
- Click **Deploy**

That's it. Vercel gives you a public URL instantly.

### 4. Share it
Your tool is live at `https://your-project.vercel.app`
Nobody can see your API key — it only lives in Vercel's environment.

---

## Cost estimate
Using `claude-haiku` — the cheapest model.
Each scan costs ~$0.001. $5 = ~5,000 free scans.
