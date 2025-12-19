# AI Assistant Service Library

This repository contains the core business logic, domain entities, and service definitions for the Salla Analytics AI Assistant. It implements a Retrieval-Augmented Generation (RAG) pattern to allow merchants to query their data using natural language.

## Architecture

This project follows Clean Architecture principles and Domain-Driven Design (DDD). It is structured as a monorepo using Turborepo.

### Structure

- `apps/`: Deployable applications (Web, Data Pipeline)
- `packages/`: Shared libraries (DB, UI)
- `src/ai-assistant/`: The core domain library for AI logic

### Core Components

- **AIAssistantService**: The main entry point/facade for the AI functionality.
- **RagOrchestrator**: Manages the flow of embedding, vector search, and LLM prompting.
- **InsightGenerator**: Proactively analyzes data for trends and anomalies.

## Prerequisites

- Node.js >= 20
- PostgreSQL (OLTP & Vector)
- ClickHouse (OLAP)
- OpenAI API Key

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Run development mode:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## Requirements Coverage

This library directly implements logic to satisfy:
- **REQ-FUNC-014**: Natural Language Querying
- **REQ-FUNC-015**: Proactive Insight Generation
- **REQ-INTG-004**: RAG Integration with OpenAI