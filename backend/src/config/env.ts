export interface EnvConfig {
  readonly databaseUrl: string;
  readonly port: number;
}

const REQUIRED_ENV_VARS = ['DATABASE_URL'] as const;

export function loadEnv(): EnvConfig {
  for (const key of REQUIRED_ENV_VARS) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }

  const port = Number(process.env.PORT ?? 3001);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid integer between 1 and 65535');
  }

  return {
    databaseUrl: process.env.DATABASE_URL as string,
    port,
  };
}
