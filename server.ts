import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolvePort(): number {
  // Check CLI arguments (--port 3000 or -p 3000)
  const portIndex = process.argv.findIndex((arg) => arg === '--port' || arg === '-p');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    const parsed = parseInt(process.argv[portIndex + 1], 10);
    if (!isNaN(parsed)) return parsed;
  }

  // In Cloud Run production containers, listen to process.env.PORT (typically 8080)
  if (process.env.NODE_ENV === 'production' && process.env.PORT) {
    const parsed = parseInt(process.env.PORT, 10);
    if (!isNaN(parsed)) return parsed;
  }

  // Default dev server port as required by AI Studio runtime
  return 3000;
}

async function startServer() {
  const app = express();
  const PORT = resolvePort();

  app.use(express.json());

  // Chinese Standard TTS Proxy endpoint
  app.get('/api/tts', async (req, res) => {
    try {
      const text = (req.query.text as string) || '';
      if (!text.trim()) {
        res.status(400).json({ error: 'Text query parameter is required' });
        return;
      }

      // Fetch from Google Translate TTS with proper User-Agent
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&client=tw-ob&q=${encodeURIComponent(text.trim())}`;
      const response = await fetch(ttsUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'audio/mpeg, audio/*;q=0.9, */*;q=0.8',
        },
      });

      if (!response.ok) {
        res.status(response.status).json({ error: 'Failed to fetch audio stream' });
        return;
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // Cache 7 days
      res.setHeader('Content-Length', buffer.length.toString());
      res.send(buffer);
    } catch (err: any) {
      console.error('TTS Proxy Error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  // Health check endpoint for Cloud Run container probes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  const distPath = path.resolve(__dirname, 'dist');
  const distIndex = path.resolve(distPath, 'index.html');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(distIndex);

  if (isProduction) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(distIndex);
    });
  } else {
    // Dynamic import so vite is not bundled in pure production execution
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
