import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { GoogleGenAI, ThinkingLevel, Modality, LiveServerMessage } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Blaze Kana Engine',
    version: '1.1.0',
    timestamp: new Date().toISOString()
  });
});

// Text-to-Speech API using gemini-3.8-flash-lite-tts for natural Japanese pronunciation
app.post('/api/tts', async (req, res) => {
  try {
    const { text, speed } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Signal client to use local Web Speech API synthesis
      res.json({ fallback: true });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const isSlow = speed && Number(speed) < 0.9;
    const styleInstruction = isSlow
      ? "Clear, slow-tempo pedagogical pronunciation in native Japanese with distinct mora timing."
      : "Natural Tokyo-dialect Japanese speech, clear pitch accent, polite and articulate.";

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: text,
              speechMetadata: {
                style: styleInstruction,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audio: `data:audio/wav;base64,${base64Audio}` });
    } else {
      res.json({ fallback: true });
    }
  } catch (error: any) {
    console.warn('TTS API error, falling back to client synthesis:', error.message);
    res.json({ fallback: true, error: error.message });
  }
});

// Sensei Grammar & Nuance Explainer using gemini-4-argon with ThinkingLevel.HIGH
app.post('/api/sensei/explain', async (req, res) => {
  try {
    const { question, context, lessonNumber, targetScript, userLanguage } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return a structured offline fallback explanation
      res.json({
        explanation: `Sensei Note (Local offline guide):\n\nQuestion: "${question}"\n\nIn standard Japanese grammar, understanding particle usage and sentence hierarchy is key:\n1. Topic vs Subject: 「は」 (pronounced wa) sets the frame/context of the conversation ("As for X..."), while 「が」 (ga) marks specific actors, newly introduced information, or existence with います/あります.\n2. Verbs always arrive at the predicate end (SOV order).\n3. Keep practicing with the lesson drills and vocabulary cards!`,
        source: 'local_fallback',
        model: 'local-rule-engine'
      });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const langInstruction = userLanguage === 'bn' 
      ? 'The learner requested Bangla explanations. Provide the core concepts clearly in Bangla, with Japanese script and Romaji.'
      : userLanguage === 'ja'
      ? 'The learner requested Japanese explanations. Provide gentle simple Japanese explanations.'
      : 'Provide clear English explanations with Japanese script, Kana, Romaji, and brief Bangla meaning notes where helpful.';

    const systemInstruction = `You are Blaze Sensei, the premier Japanese language pedagogue in the Blaze Kana learning app.
You provide deep, crystal-clear, structured explanations of Japanese grammar, sentence construction, particles (は vs が, に vs で, へ vs に, を, も, と, から, まで, より, など), verb groups (Group I U-verbs, Group II Ru-verbs, Group III Irregular 来る/する), and polite vs plain speech.
${langInstruction}
Format your output with:
1. Quick Summary (1-2 sentences)
2. Grammar Breakdown & Core Rule
3. Authentic Example Sentences (Japanese + Kana + Romaji + Meaning)
4. Common Mistakes & Sensei Tips
Keep it pedagogical, encouraging, and visually scannable.`;

    const userPrompt = `Context / Current Lesson: Lesson ${lessonNumber ?? 'General'} ${context ? `("${context}")` : ''}
Learner Query: ${question}
Target: ${targetScript || 'Japanese Language Mastery'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: userPrompt,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    res.json({
      explanation: response.text,
      source: 'gemini-4-argon',
      model: 'gemini-4-argon'
    });
  } catch (error: any) {
    console.error('Sensei API error:', error);
    res.status(500).json({
      error: 'Failed to generate Sensei explanation',
      details: error.message || String(error),
      fallback: 'Please review the lesson grammar summary in the Grammar Lab.'
    });
  }
});

async function startServer() {
  const server = http.createServer(app);

  // WebSocket Server for Gemini 3.8 Live API real-time voice conversations
  const wss = new WebSocketServer({ server, path: '/live' });

  wss.on('connection', async (clientWs) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      clientWs.send(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server.' }));
      clientWs.close();
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' },
        },
      });

      const session = await ai.live.connect({
        model: 'gemini-3.8-live',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: 'You are Blaze Sensei, an interactive spoken Japanese tutor in the Blaze Kana platform. Speak in polite, encouraging Japanese (with English or Bengali glosses when the user is confused). Help the user practice greetings, vocabulary, and grammar from Lessons 1 to 25. Keep spoken turns concise, natural, and friendly.',
        },
        callbacks: {
          onmessage: (message: LiveServerMessage) => {
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
          onclose: () => {
            try { clientWs.close(); } catch {}
          },
        },
      });

      clientWs.on('message', (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
            });
          }
          if (parsed.text) {
            session.sendRealtimeInput({
              text: parsed.text,
            });
          }
        } catch (err) {
          console.error('Error handling client WS payload:', err);
        }
      });

      clientWs.on('close', () => {
        try { session.close(); } catch {}
      });
    } catch (err: any) {
      console.error('Live connect error:', err);
      clientWs.send(JSON.stringify({ error: err.message || 'Failed to initialize Live voice conversation' }));
      clientWs.close();
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Blaze Kana server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
