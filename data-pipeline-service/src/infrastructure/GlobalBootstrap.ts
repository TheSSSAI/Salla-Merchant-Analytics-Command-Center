import { PrismaClient } from '@prisma/client';
import { createClient as createClickHouseClient, ClickHouseClient } from '@clickhouse/client';
import { Pinecone } from '@pinecone-database/pinecone';
import { Client as QStashClient } from '@upstash/qstash';
import OpenAI from 'openai';
import { ServiceConfig } from '../config/ServiceConfig';

// Define the shape of our global clients container
interface GlobalClients {
  prisma?: PrismaClient;
  clickhouse?: ClickHouseClient;
  pinecone?: Pinecone;
  qstash?: QStashClient;
  openai?: OpenAI;
}

// Augment the NodeJS global type to include our cached clients
declare global {
  var clients: GlobalClients | undefined;
}

/**
 * GlobalBootstrap - Singleton Factory for Infrastructure Clients
 * 
 * Implements the "Cold Start" optimization pattern for Serverless functions.
 * Initializes database and API clients once and reuses them across warm invocations
 * to prevent connection exhaustion and reduce latency.
 */
export class GlobalBootstrap {
  private static instance: GlobalBootstrap;
  private _prisma: PrismaClient;
  private _clickhouse: ClickHouseClient;
  private _pinecone: Pinecone;
  private _qstash: QStashClient;
  private _openai: OpenAI;

  private constructor() {
    // Ensure global object exists
    if (!global.clients) {
      global.clients = {};
    }

    // Initialize Prisma (PostgreSQL)
    if (!global.clients.prisma) {
      global.clients.prisma = new PrismaClient({
        datasources: {
          db: {
            url: ServiceConfig.postgresUrl,
          },
        },
        log: ServiceConfig.isProduction ? ['error'] : ['query', 'error', 'warn'],
      });
    }
    this._prisma = global.clients.prisma;

    // Initialize ClickHouse (OLAP)
    if (!global.clients.clickhouse) {
      global.clients.clickhouse = createClickHouseClient({
        url: ServiceConfig.clickhouseUrl,
        username: ServiceConfig.clickhouseUser,
        password: ServiceConfig.clickhousePassword,
        request_timeout: 30000,
        application: 'salla-data-pipeline',
      });
    }
    this._clickhouse = global.clients.clickhouse;

    // Initialize Pinecone (Vector DB)
    if (!global.clients.pinecone) {
      global.clients.pinecone = new Pinecone({
        apiKey: ServiceConfig.pineconeApiKey,
      });
    }
    this._pinecone = global.clients.pinecone;

    // Initialize QStash (Message Queue)
    if (!global.clients.qstash) {
      global.clients.qstash = new QStashClient({
        token: ServiceConfig.qstashToken,
      });
    }
    this._qstash = global.clients.qstash;

    // Initialize OpenAI (LLM)
    if (!global.clients.openai) {
      global.clients.openai = new OpenAI({
        apiKey: ServiceConfig.openaiApiKey,
      });
    }
    this._openai = global.clients.openai;
  }

  /**
   * Get the singleton instance of the Bootstrap factory
   */
  public static getInstance(): GlobalBootstrap {
    if (!GlobalBootstrap.instance) {
      GlobalBootstrap.instance = new GlobalBootstrap();
    }
    return GlobalBootstrap.instance;
  }

  public get prisma(): PrismaClient {
    return this._prisma;
  }

  public get clickhouse(): ClickHouseClient {
    return this._clickhouse;
  }

  public get pinecone(): Pinecone {
    return this._pinecone;
  }

  public get qstash(): QStashClient {
    return this._qstash;
  }

  public get openai(): OpenAI {
    return this._openai;
  }
}