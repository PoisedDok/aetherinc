import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * Verifies connection to Resend API
 * Use this script to test your Resend API key
 * 
 * Run with: node scripts/verify-resend.js
 */
async function verifyResendConnection() {
  console.log('Verifying connection to Resend API...');
  console.log('----------------------------------------');
  
  // Check for required environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Error: Missing RESEND_API_KEY environment variable');
    console.error('Please add RESEND_API_KEY to your .env.local file');
    process.exit(1);
  }
  
  console.log('API Key: [hidden]');
  
  // Create client
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  // Verify API key
  try {
    console.log('Attempting to verify API key...');
    
    // Get domains list (light API call to verify key is working)
    const domains = await resend.domains.list();
    
    console.log('✅ Success! API key is valid');
    console.log(`Domains available: ${domains.data.length}`);
    domains.data.forEach(domain => {
      console.log(`- ${domain.name} (${domain.status})`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Verification failed!');
    console.error('Error details:', error);
    
    // Provide helpful troubleshooting tips
    console.log('\nTroubleshooting tips:');
    console.log('1. Check that your RESEND_API_KEY is correct');
    console.log('2. Verify your Resend account is active');
    console.log('3. Check your network connection');
    console.log('4. Try creating a new API key in the Resend dashboard');
    
    return false;
  }
}

// Run the verification
verifyResendConnection().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 