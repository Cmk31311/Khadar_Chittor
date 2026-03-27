import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: 'TaFlo',
    date: '2024',
    subtext: 'A modern, minimalistic task manager combining productivity tools—task lists, Kanban boards, calendars, and analytics—into a clean, responsive interface. (Next.js, Supabase, Tailwind, TypeScript)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/TaFlo' }, { text: 'Live', url: 'https://taflo.vercel.app/' }],
  },
  {
    title: 'EON - Earth Saga',
    date: '2024',
    subtext: 'An immersive app transforming real-time environmental data from 222+ global regions into Claude AI-generated narratives with multi-voice TTS. Features an interactive 3D globe and glassmorphic UI. (React, TypeScript, Claude AI, Three.js)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/EON---Earth-Saga' }, { text: 'Live', url: 'https://eon-earth-saga.vercel.app' }],
  },
  {
    title: 'GAIA PULSE',
    date: '2024',
    subtext: 'An interactive Earth monitoring platform built for the AWS AI Agent Global Hackathon. Transforms environmental data into AI-generated stories. Explore 22 regions through a 3D globe visualization. (Python, AWS Serverless, TypeScript, React)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/GAIA-PULSE' }, { text: 'Live', url: 'https://gaia-pulse.vercel.app' }],
  },
  {
    title: 'SCAI',
    date: 'Currently Working',
    subtext: 'An advanced AI-powered web automation platform that combines browser automation with LLM-based task planning. Execute tasks across any website using a Chrome extension and natural language. (Next.js 14, FastAPI, AWS Bedrock, Chrome Extension)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/SCAI' }, { text: 'Live', url: 'https://scai-eta.vercel.app' }],
    highlightColor: '#FFD700', // Gold
  },
  {
    title: 'Gen-Aistro',
    date: 'Currently Working',
    subtext: 'Built in 36 hours for the NASA Space Apps Challenge Hackathon. A production-ready RAG dashboard for exploring NASA Space Biology research using fast serverless retrieval. (React, RAG, Groq, Serverless APIs, PyPDF2)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/Gen-Aistro' }, { text: 'Live', url: 'https://gen-aistro.vercel.app' }],
    highlightColor: '#00D9FF',
  },
  {
    title: 'AI Baseline Map',
    date: '2024',
    subtext: 'A comprehensive monorepo built for the Baseline Tooling Hackathon by Google Chrome. It includes multiple tools for visualizing, analyzing, and working with Baseline web features. (Next.js 15, TypeScript, Tailwind, Groq SDK)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/AI-Baseline-Map' }, { text: 'Live', url: 'https://ai-baseline.vercel.app' }],
  },
  {
    title: 'AI Personal Motivator',
    date: '2024',
    subtext: 'A powerful, AI-driven application that provides personalized inspiration, curated quotes, and actionable guidance. Features multiple Gemini models, TTS audio, and advanced configuration. (LLMs, TTS, Web Audio)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/AI-Personal-Motivator' }, { text: 'Live', url: '#' }],
  },
  {
    title: 'AI Flashcard Maker',
    date: '2024',
    subtext: 'Turn study materials (PDF/DOCX/TXT) into exam-ready Q&A flashcards with Google Gemini. Features a built-in multiple-choice quiz mode and an interactive glassmorphic UI. (Python, Streamlit, Gemini API)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/AI_Flashcard_Maker' }, { text: 'Live', url: '#' }],
  },
  /*
  {
    title: 'Inventory (Skills)',
    date: 'Present',
    subtext: 'Languages: Python, TypeScript, C#, SQL | Backend: Django, Node.js | Frontend: React, Next.js | GenAI: RAG, LangChain, Embeddings | Cloud: AWS, Docker, CI/CD',
  }
  */
];
