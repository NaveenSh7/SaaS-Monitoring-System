#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates that all required environment variables are set before starting Docker containers
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Required environment variables
const REQUIRED_VARS = [
  {
    name: 'GOOGLE_CLIENT_ID',
    description: 'Google OAuth Client ID',
    link: 'https://console.cloud.google.com/',
  },
  {
    name: 'GOOGLE_CLIENT_SECRET',
    description: 'Google OAuth Client Secret',
    link: 'https://console.cloud.google.com/',
  },
  {
    name: 'NEXTAUTH_SECRET',
    description: 'NextAuth encryption secret',
    link: 'Generate with: openssl rand -base64 32',
  },
  {
    name: 'POSTGRES_PASSWORD',
    description: 'PostgreSQL database password',
    link: 'Set a strong password',
  },
  {
    name: 'RAZORPAY_KEY_ID',
    description: 'Razorpay API Key ID',
    link: 'https://dashboard.razorpay.com/app/keys',
  },
  {
    name: 'RAZORPAY_KEY_SECRET',
    description: 'Razorpay API Key Secret',
    link: 'https://dashboard.razorpay.com/app/keys',
  },
];

// Optional but recommended variables
const OPTIONAL_VARS = [
  {
    name: 'POSTGRES_USER',
    description: 'PostgreSQL username (default: postgres)',
    default: 'postgres',
  },
  {
    name: 'POSTGRES_DB',
    description: 'PostgreSQL database name (default: saas_monitoring)',
    default: 'saas_monitoring',
  },
  {
    name: 'ALLOWED_ORIGINS',
    description: 'CORS allowed origins (default: http://localhost:3000)',
    default: 'http://localhost:3000',
  },
];

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const env = {};

  content.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) {
      return;
    }

    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      env[key] = value;
    }
  });

  return env;
}

function isPlaceholder(value) {
  if (!value) return true;
  
  const placeholders = [
    'your_',
    'XXXXX',
    'rzp_test_XXXXX',
    'Abba@12345678bnn', // Default password - should be changed
  ];

  return placeholders.some(placeholder => value.includes(placeholder));
}

function validateEnvironment() {
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  log('           Environment Variable Validation', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'cyan');

  const envPath = path.join(__dirname, '.env');
  
  // Check if .env file exists
  if (!fs.existsSync(envPath)) {
    log('❌ ERROR: .env file not found!', 'red');
    log('\n💡 Solution:', 'yellow');
    log('   Copy .env.docker to .env:', 'yellow');
    log('   Windows: copy .env.docker .env', 'yellow');
    log('   Linux/Mac: cp .env.docker .env\n', 'yellow');
    return false;
  }

  const env = parseEnvFile(envPath);
  let hasErrors = false;
  let hasWarnings = false;

  // Validate required variables
  log('📋 Checking Required Variables:\n', 'blue');
  
  REQUIRED_VARS.forEach(({ name, description, link }) => {
    const value = env[name];
    
    if (!value || isPlaceholder(value)) {
      hasErrors = true;
      log(`  ❌ ${name}`, 'red');
      log(`     Description: ${description}`, 'reset');
      log(`     Get it from: ${link}\n`, 'yellow');
    } else {
      log(`  ✅ ${name}`, 'green');
    }
  });

  // Check optional variables
  log('\n📋 Checking Optional Variables:\n', 'blue');
  
  OPTIONAL_VARS.forEach(({ name, description, default: defaultValue }) => {
    const value = env[name];
    
    if (!value) {
      hasWarnings = true;
      log(`  ⚠️  ${name} (using default: ${defaultValue})`, 'yellow');
    } else {
      log(`  ✅ ${name}`, 'green');
    }
  });

  // Security checks
  log('\n🔒 Security Checks:\n', 'blue');

  // Check if default password is used
  if (env.POSTGRES_PASSWORD === 'Abba@12345678bnn') {
    hasWarnings = true;
    log('  ⚠️  Using default database password!', 'yellow');
    log('     Consider changing it for production\n', 'yellow');
  } else {
    log('  ✅ Custom database password set', 'green');
  }

  // Check NEXTAUTH_SECRET strength
  if (env.NEXTAUTH_SECRET && env.NEXTAUTH_SECRET.length < 32) {
    hasWarnings = true;
    log('  ⚠️  NEXTAUTH_SECRET might be too short', 'yellow');
    log('     Recommended: 32+ characters\n', 'yellow');
  }

  // Final summary
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  if (hasErrors) {
    log('❌ VALIDATION FAILED', 'red');
    log('\nPlease fix the errors above before starting Docker containers.', 'red');
    log('\nEdit the .env file and add the required values.\n', 'yellow');
    return false;
  }

  if (hasWarnings) {
    log('⚠️  VALIDATION PASSED WITH WARNINGS', 'yellow');
    log('\nYour configuration works but has some warnings.', 'yellow');
    log('Consider addressing them for better security.\n', 'yellow');
  } else {
    log('✅ VALIDATION PASSED', 'green');
    log('\nAll environment variables are properly configured!\n', 'green');
  }

  return true;
}

// Run validation
const isValid = validateEnvironment();
process.exit(isValid ? 0 : 1);
