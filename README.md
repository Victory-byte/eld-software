# Exit Liquidity Detector

> "market sentiment analysis."

## Deploy to Vercel (5 minutes)

### 1. Prerequisites 
- Anthropic API key:Obtain your API key from the anthropic console.
- Environment Configuration:During your vercel deployment,navigate
to the project settings and add the following environmental variable:
- ANTHROPIC_API_KEY:Paste your key (starts with `sk-ant-…`) to authorize analysis engine.

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

### 3. research prototype
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
