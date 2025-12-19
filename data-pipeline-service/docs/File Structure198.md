# 1 Dependency Levels

## 1.1 Level

### 1.1.1 Level

🔹 0

### 1.1.2 Files

- src/domain/interfaces/IAnalyticsRepository.ts
- src/domain/interfaces/IVectorRepository.ts
- src/domain/interfaces/IRepository.ts
- src/domain/interfaces/IMessaging.ts
- src/domain/interfaces/ISignatureValidator.ts
- src/domain/models/InternalEvent.ts
- src/domain/models/SalesFactDTO.ts
- src/domain/enums/ProcessingStatus.ts
- src/domain/enums/SyncStatus.ts
- src/domain/EventModels.ts
- src/config/ServiceConfig.ts
- package.json
- tsconfig.json
- vercel.json
- turbo.json
- jest.config.js
- .eslintrc.js
- .prettierrc
- .gitignore
- .github/workflows/ci.yml
- .vscode/extensions.json
- .vscode/settings.json
- infra/versions.tf
- apps/data-pipeline-service/package.json
- apps/data-pipeline-service/vercel.json
- apps/salla-analytics-pwa/next.config.js
- apps/salla-analytics-pwa/package.json
- apps/salla-analytics-pwa/playwright.config.ts
- packages/database-schema/package.json
- packages/ui-components/components.json
- packages/ui-components/package.json
- packages/ui-components/tailwind.config.ts

## 1.2.0 Level

### 1.2.1 Level

🔹 1

### 1.2.2 Files

- src/domain/TransformationService.ts
- src/domain/SallaEventMapper.ts

## 1.3.0 Level

### 1.3.1 Level

🔹 2

### 1.3.2 Files

- src/infrastructure/GlobalBootstrap.ts
- src/infrastructure/ClickHouseRepository.ts
- src/infrastructure/QStashService.ts
- src/infrastructure/PineconeRepository.ts
- src/infrastructure/OpenAIGateway.ts
- src/infrastructure/SallaGateway.ts
- src/infrastructure/PostgresSyncRepository.ts
- api/_middlewares/QStashSignatureValidator.ts
- api/_middlewares/SallaSignatureValidator.ts

## 1.4.0 Level

### 1.4.1 Level

🔹 3

### 1.4.2 Files

- src/application/IngestWebhookUseCase.ts
- src/application/ProcessCDCEventUseCase.ts
- src/application/HistoricalSyncUseCase.ts
- src/application/ReconciliationUseCase.ts

## 1.5.0 Level

### 1.5.1 Level

🔹 4

### 1.5.2 Files

- api/webhooks/salla-ingress.ts
- api/webhooks/cron-reconcile.ts
- api/queues/process-event.ts
- api/queues/sync-worker.ts
- api/queues/vector-worker.ts

# 2.0.0 Total Files

48

# 3.0.0 Generation Order

- 0
- 1
- 2
- 3
- 4

