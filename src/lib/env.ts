/**
 * Environment variable validation utility
 * Ensures required environment variables are set
 */

// Define required environment variables for production
const REQUIRED_ENV_VARS = {
  production: [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ],
  development: [
    'DATABASE_URL',
  ],
};

// Define optional environment variables with validation
const OPTIONAL_ENV_VARS = {
  NEXTAUTH_DEBUG: {
    validate: (value: string) => ['true', 'false'].includes(value),
    message: 'NEXTAUTH_DEBUG must be "true" or "false"',
  },
};

/**
 * Validates environment variables
 * Throws error if required variables are missing in production
 * Logs warnings for missing variables in development
 */
export function validateEnv(): void {
  const environment = process.env.NODE_ENV || 'development';
  const isProduction = environment === 'production';
  const requiredVars = REQUIRED_ENV_VARS[isProduction ? 'production' : 'development'];
  
  // Check required environment variables
  const missingVars = requiredVars.filter(name => !process.env[name]);
  
  if (missingVars.length > 0) {
    if (isProduction) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    } else {
      console.warn(
        `Warning: Missing recommended environment variables: ${missingVars.join(', ')}`
      );
    }
  }
  
  // Validate optional environment variables if present
  Object.entries(OPTIONAL_ENV_VARS).forEach(([name, config]) => {
    const value = process.env[name];
    if (value && !config.validate(value)) {
      if (isProduction) {
        throw new Error(config.message);
      } else {
        console.warn(`Warning: ${config.message}`);
      }
    }
  });
}

/**
 * Gets an environment variable with fallback
 * @param key - Environment variable name
 * @param defaultValue - Default value if not set
 * @returns The environment variable value or default
 */
export function getEnv(key: string, defaultValue?: string): string {
  return process.env[key] || defaultValue || '';
}

/**
 * Gets a boolean environment variable
 * @param key - Environment variable name
 * @param defaultValue - Default value if not set
 * @returns Boolean interpretation of the environment variable
 */
export function getBoolEnv(key: string, defaultValue = false): boolean {
  const value = process.env[key]?.toLowerCase();
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1' || value === 'yes';
} 