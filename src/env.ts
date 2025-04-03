import { cleanEnv, str, port, url, email } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
  }),
  PORT: port(),
  DATABASE_URL: url(),
  ACCESS_TOKEN_SECRET: str(),
  KAFKA_BROKER: str(),
  GRAFANA_HOST: str(),
  LOKI_API_KEY: str(),
  LOKI_USER_ID: str(),
  EMAIL_USER: email(),
  EMAIL_PASS: str(),
  EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME: str(),
  FRONTEND_VERIFICATION_FAILURE_ROUTE: url(),
  FRONTEND_VERIFICATION_SUCCESS_ROUTE: url(),
  EMAIL_VERIFICATION_TOKEN_SECRET: str(),
  HOST_URL: url(),
  EMAIL_SERVICE_PUBLIC_API: url(),
});

export default env;
