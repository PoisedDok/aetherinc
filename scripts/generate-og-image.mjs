#!/usr/bin/env node

/**
 * Script to generate Open Graph images for AetherInc
 * This creates visually appealing OG images for social media sharing
 */

import { createRequire } from 'module';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const require = createRequire(import.meta.url);

async function generateOGImage() {
  console.log('🚀 Generating Open Graph image for AetherInc...');

  // For now, we'll create an HTML template that can be used with services like:
  // - Vercel OG Image API
  // - Puppeteer
  // - Playwright
  // - Or online tools like https://ogimage.vercel.app

  const ogImageTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AetherInc OG Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
      color: white;
      margin: 0;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 1200px;
      height: 630px;
      box-sizing: border-box;
    }

    .logo {
      font-size: 72px;
      font-weight: bold;
      background: linear-gradient(45deg, #00ff88, #0088ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
    }

    .tagline {
      font-size: 32px;
      color: #cccccc;
      text-align: center;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 24px;
      color: #888888;
      text-align: center;
    }

    .accent-bar {
      width: 200px;
      height: 4px;
      background: linear-gradient(90deg, #00ff88, #0088ff);
      margin: 20px 0;
      border-radius: 2px;
    }
  </style>
</head>
<body>
  <div class="logo">AetherInc</div>
  <div class="accent-bar"></div>
  <div class="tagline">Privacy-First AI Solutions</div>
  <div class="subtitle">GURU & AetherArena • Local AI • Iron Man Inspired</div>
</body>
</html>`;

  // Save the template
  const templatePath = join(process.cwd(), 'og-image-template.html');
  writeFileSync(templatePath, ogImageTemplate);

  console.log('✅ OG Image template created at:', templatePath);
  console.log('\n📋 To generate the actual image, you can:');
  console.log('1. Use Vercel OG Image API: https://vercel.com/docs/concepts/functions/edge-functions/og-image-api');
  console.log('2. Use online tools like: https://ogimage.vercel.app');
  console.log('3. Use Puppeteer to convert this HTML to PNG');
  console.log('4. Use design tools like Canva or Figma');

  console.log('\n🔧 Recommended dimensions: 1200x630px (1.91:1 aspect ratio)');
  console.log('🎨 Use your brand colors: Black background, green/blue gradient text');
  console.log('📝 Include: AetherInc logo, tagline, and key products');

  return templatePath;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateOGImage().catch(console.error);
}

export { generateOGImage };

