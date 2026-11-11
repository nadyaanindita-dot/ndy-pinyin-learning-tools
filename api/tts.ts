export default async function handler(req: any, res: any) {
  try {
    const text = (req.query.text as string) || '';
    if (!text.trim()) {
      res.status(400).json({ error: 'Text query parameter is required' });
      return;
    }

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
    res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
    res.setHeader('Content-Length', buffer.length.toString());
    res.send(buffer);
  } catch (err: any) {
    console.error('Vercel Serverless TTS Error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
