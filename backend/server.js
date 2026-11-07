import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import http from 'node:http';

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_BASE_URL = 'http://100.112.113.39:11434';
const OLLAMA_URL = `${OLLAMA_BASE_URL}/api/chat`;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gpt-oss-long';
const FORWARDED_CLIENT_IP = '100.112.113.39';

app.use('/chat', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const stripHopByHopHeaders = (headers) => {
  const forwardedHeaders = { ...headers };
  const connectionHeader = forwardedHeaders.connection;
  if (typeof connectionHeader === 'string') {
    connectionHeader.split(',').forEach((header) => {
      delete forwardedHeaders[header.trim().toLowerCase()];
    });
  }
  [
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'host'
  ].forEach((header) => delete forwardedHeaders[header]);
  return forwardedHeaders;
};

app.use((req, res, next) => {
  const clientIp = req.socket.remoteAddress?.replace(/^::ffff:/i, '');
  if (clientIp !== FORWARDED_CLIENT_IP || req.path === '/chat') {
    return next();
  }

  const target = new URL(req.originalUrl, OLLAMA_BASE_URL);
  const proxyReq = http.request(target, {
    method: req.method,
    headers: stripHopByHopHeaders(req.headers)
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 502, stripHopByHopHeaders(proxyRes.headers));
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('Error forwarding request:', err);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Failed to forward request' });
    } else {
      res.destroy(err);
    }
  });
  req.on('aborted', () => proxyReq.destroy());
  res.on('close', () => {
    if (!res.writableEnded) {
      proxyReq.destroy();
    }
  });
  req.pipe(proxyReq);
});

app.use(bodyParser.json());

// Health check
app.get('/', (_, res) => res.send('Social Vibes Backend is running'));

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          {
            role: 'system',
            content: 'You are a kind and uplifting best friend to the user. Reply with positive words and encouragement, however, avoid being cheesy or disingenuous.'
          },
          { role: 'user', content: message }
        ]
      })
    });
    if (!response.ok) {
      throw new Error(`Ollama returned HTTP ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    if (typeof data.message?.content !== 'string') {
      throw new Error('Ollama returned an invalid chat response');
    }
    res.json({ reply: data.message.content });
  } catch (err) {
    console.error('Error during chat:', err);
    res.status(502).json({ error: 'Failed to get a response from Ollama' });
  }
});

app.listen(PORT, () => console.log(`Social Vibes backend listening on port ${PORT}`));
