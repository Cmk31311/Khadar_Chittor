import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    title: 'GAIA PULSE',
    date: '2024',
    subtext: 'An interactive Earth monitoring platform built for the AWS AI Agent Global Hackathon. Transforms environmental data into AI-generated stories. Explore 22 regions through a 3D globe visualization. (Python, AWS Serverless, TypeScript, React)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/GAIA-PULSE' }, { text: 'Live', url: 'https://gaia-pulse.vercel.app' }],
  },
  {
    title: 'TaFlo',
    date: '2024',
    subtext: 'A modern, minimalistic task manager combining productivity tools—task lists, Kanban boards, calendars, and analytics—into a clean, responsive interface. (Next.js, Supabase, Tailwind, TypeScript)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/TaFlo' }, { text: 'Live', url: 'https://taflo.vercel.app/' }],
  },
  {
    title: 'Gen-Aistro',
    date: '2025',
    subtext: 'NLP/RAG pipeline over 600+ NASA space-biology papers, indexed into 12K+ searchable chunks for semantic retrieval, summarization, and question answering. Reduced research discovery time from 20 minutes to under 2 minutes across 150+ evaluation queries. (RAG, NLP, React, FastAPI)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/Gen-Aistro' }, { text: 'Live', url: 'https://gen-aistro.vercel.app' }],
    highlightColor: '#00D9FF',
  },
  {
    title: 'AgentGate',
    date: '2026',
    subtext: 'Policy-governed runtime enabling AI agents to execute scoped actions across 10+ external systems without persistent credentials. Seven-stage pipeline with session validation, approval gates, connector execution, and audit logging. (FastAPI, Next.js, PostgreSQL, Railway, Vercel, MCP)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/agentgate-demo' }, { text: 'Live', url: 'https://www.khadar.tech/' }],
    highlightColor: '#FFD700',
  },
  {
    title: 'SCAI',
    date: '2025',
    subtext: 'Agentic browser-automation platform with FastAPI, Next.js, and a Chrome extension exposing 12 APIs for task creation, agent execution, and workflow state. Redis-backed orchestration with WebSocket streaming supports 10 concurrent sessions and improved multi-step task reliability from 72% to 89%. (FastAPI, Next.js, Redis, Chrome Extension)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/SCAI' }, { text: 'Live', url: 'https://sc-ai.app/' }],
    highlightColor: '#FFD700',
  },
  {
    title: 'EON - Earth Saga',
    date: '2024',
    subtext: 'An immersive app transforming real-time environmental data from 222+ global regions into Claude AI-generated narratives with multi-voice TTS. Features an interactive 3D globe and glassmorphic UI. (React, TypeScript, Claude AI, Three.js)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/EON---Earth-Saga' }, { text: 'Live', url: 'https://eon-earth-saga.vercel.app' }],
  },
  {
    title: 'AI Baseline Map',
    date: '2024',
    subtext: 'A comprehensive monorepo built for the Baseline Tooling Hackathon by Google Chrome. It includes multiple tools for visualizing, analyzing, and working with Baseline web features. (Next.js 15, TypeScript, Tailwind, Groq SDK)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/AI_Baseline_Map' }, { text: 'Live', url: 'https://ai-baseline-map.vercel.app' }],
  },
  {
    title: 'AI Personal Motivator',
    date: '2024',
    subtext: 'A powerful, AI-driven application that provides personalized inspiration, curated quotes, and actionable guidance. Features multiple Gemini models, TTS audio, and advanced configuration. (LLMs, TTS, Web Audio)',
    urls: [{ text: 'GitHub', url: 'https://github.com/Cmk31311/AI-personal-motivator-and-quote-generator' }, { text: 'Live', url: '#' }],
  },
];
