export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return res.status(400).json({ error: 'Token is required' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured — API key missing' });
  }

  const prompt = `You are a brutal, cold crypto market intelligence AI called EXIT LIQUIDITY DETECTOR.
A user wants to trade: "${token.trim().slice(0, 100)}"

Analyze their POSITION as a trader. Return ONLY a raw JSON object — no markdown, no preamble, no explanation. Structure:

{"verdict":"EXIT LIQUIDITY","verdictFull":"YOU ARE THE EXIT LIQUIDITY.","confidence":87,"role":"Exit Liquidity","roleSub":"One sentence cold truth.","timing":"23 minutes too late","timingSub":"Brief context.","whaleIntent":"DISTRIBUTING","whaleSub":"Brief.","devHistory":"SERIAL RUGGER","devSub":"Brief.","simulation":"2-3 sentence brutal simulation with specific % drops, panic sell, whale buyback.","shareText":"Viral one-liner for sharing."}

Rules:
- verdict: one of EXIT LIQUIDITY / LATE RETAIL / SMART MONEY / EARLY / DEGEN
- verdictFull: dramatic sentence like "YOU ARE THE EXIT LIQUIDITY."
- confidence: integer 50-97
- Unknown contract addresses → EXIT LIQUIDITY
- Meme coins / unknown tickers → EXIT LIQUIDITY or LATE RETAIL
- BTC/ETH/SOL/major blue chips → DEGEN or EARLY
- Be creative, specific, and brutal
- Return ONLY the JSON object. Nothing before or after it.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 700,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(502).json({ error: err?.error?.message || 'Upstream API error' });
    }

    const data = await response.json();
    const raw = (data.content || []).map(b => b.type === 'text' ? b.text : '').join('').trim();

    // Robust JSON extraction
    let parsed = null;
    try { parsed = JSON.parse(raw); } catch (_) {}
    if (!parsed) {
      const clean = raw.replace(/^```(?:json)?[\r\n]*/i, '').replace(/[\r\n]*```\s*$/, '').trim();
      try { parsed = JSON.parse(clean); } catch (_) {}
    }
    if (!parsed) {
      const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
      if (a !== -1 && b > a) { try { parsed = JSON.parse(raw.slice(a, b + 1)); } catch (_) {} }
    }

    if (!parsed) {
      return res.status(502).json({ error: 'Could not parse AI response', raw: raw.slice(0, 200) });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
