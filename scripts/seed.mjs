import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const excelFilePath = process.env.EXCEL_FILE_PATH || path.join(process.cwd(), 'AI_Tools.xlsx');

// Seed initial data
async function seedDatabase() {
  try {
    // Create admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aetherinc.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await prisma.user.create({
        data: {
          email: adminEmail,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('Admin user created');
    }
    
    // Seed AI tools from Excel file or fallback to hardcoded list
    await seedAITools();
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Parse Excel file for tools
async function parseExcelFile() {
  try {
    console.log(`Checking if Excel file exists: ${excelFilePath}`);
    if (!fs.existsSync(excelFilePath)) {
      console.log(`Excel file not found at: ${excelFilePath}, will use default tools list`);
      return null;
    }

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    console.log(`Excel file read successfully, found ${data.length} rows`);
    
    const tools = [];
    
    for (const row of data) {
      // Check for required fields with capitalized column names
      if (!row.Name || !row.Category) {
        console.log(`Skipping row with missing required fields:`, row);
        continue;
      }
      
      const tool = {
        name: row.Name || '',
        category: row.Category || '',
        type: row.Type || 'Tool',
        license: row.License || null,
        description: row.Description || '',
        url: row.URL || '',
        pricing: row.Pricing || null,
        isActive: true
      };
      
      tools.push(tool);
    }
    
    console.log(`Parsed ${tools.length} tools from the Excel file`);
    return tools;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return null;
  }
}

// AI Tools seeding function
async function seedAITools() {
  // Try to get tools from Excel file first
  const excelTools = await parseExcelFile();
  
  // If Excel parsing failed or returned no tools, use the default hardcoded list
  const tools = excelTools || [
    {
      name: "n8n",
      category: "Workflow Automation",
      type: "Open Source (Paid Cloud)",
      license: "Fair-code",
      description: "AI-powered workflow automation with 350+ integrations",
      url: "https://n8n.io",
      pricing: "Free (self-hosted), Cloud from $20/month"
    },
    {
      name: "Ollama",
      category: "LLM Runtime",
      type: "Open Source",
      license: "MIT",
      description: "Run & manage open-source LLMs locally",
      url: "https://ollama.ai",
      pricing: "Free"
    },
    {
      name: "llama.cpp",
      category: "LLM Inference",
      type: "Open Source",
      license: "MIT",
      description: "C++ library for efficient LLM inference",
      url: "https://github.com/ggerganov/llama.cpp",
      pricing: "Free"
    },
    {
      name: "AnythingLLM",
      category: "LLM App Framework",
      type: "Open Source",
      license: "Elastic",
      description: "Full-stack private AI deployment suite",
      url: "https://github.com/Mintplex-Labs/anything-llm",
      pricing: "Free"
    },
    {
      name: "AutoGen",
      category: "Multi-Agent Framework",
      type: "Open Source",
      license: "Apache 2.0",
      description: "Microsoft's framework for building conversational AI systems",
      url: "https://github.com/microsoft/autogen",
      pricing: "Free"
    },
    {
      name: "LangChain",
      category: "LLM Framework",
      type: "Open Source",
      license: "MIT",
      description: "Framework for AI applications with RAG support",
      url: "https://langchain.ai",
      pricing: "Free"
    },
    {
      name: "Cursor",
      category: "Code Editor",
      type: "Paid",
      license: "Proprietary",
      description: "AI-powered code editor with GPT-4 integration",
      url: "https://cursor.sh",
      pricing: "$20/month (Pro)"
    },
    {
      name: "Claude",
      category: "AI Chatbot",
      type: "Paid",
      license: "Proprietary",
      description: "A family of large language models developed by Anthropic.",
      url: "https://claude.ai",
      pricing: "Free, Pro $20/month"
    },
    {
      name: "GitHub Copilot",
      category: "Code Assistant",
      type: "Paid",
      license: "Proprietary",
      description: "AI-powered code completion and suggestions directly in your IDE",
      url: "https://github.com/features/copilot",
      pricing: "$10/month (Individual), $19/month (Business)"
    },
    {
      name: "OpenAI GPT-4",
      category: "AI API",
      type: "Paid API",
      license: "Proprietary",
      description: "Advanced language model API for various AI applications",
      url: "https://openai.com/gpt-4",
      pricing: "$0.03/1K tokens (input), $0.06/1K tokens (output)"
    },
    {
      name: "Hugging Face Transformers",
      category: "ML Library",
      type: "Open Source",
      license: "Apache 2.0",
      description: "State-of-the-art machine learning library for NLP tasks",
      url: "https://huggingface.co/transformers",
      pricing: "Free"
    },
    {
      name: "Stable Diffusion",
      category: "Image Generation",
      type: "Open Source",
      license: "LAION",
      description: "Text-to-image generation model for creating digital art",
      url: "https://stability.ai/stable-diffusion",
      pricing: "Free (open source)"
    },
    {
      name: "RunPod",
      category: "Cloud GPU",
      type: "Paid Service",
      license: "Proprietary",
      description: "GPU cloud computing for AI workloads and machine learning",
      url: "https://runpod.io",
      pricing: "From $0.34/hour"
    },
    {
      name: "Weights & Biases",
      category: "ML Platform",
      type: "Freemium",
      license: "Proprietary",
      description: "Experiment tracking and collaboration for machine learning",
      url: "https://wandb.ai",
      pricing: "Free (personal), $50/month (teams)"
    },
    {
      name: "LocalAI",
      category: "LLM Runtime",
      type: "Open Source",
      license: "MIT",
      description: "OpenAI-compatible API for running LLMs locally",
      url: "https://github.com/go-skynet/LocalAI",
      pricing: "Free"
    },
    {
      name: "Qdrant",
      category: "Vector Database",
      type: "Open Source",
      license: "Apache 2.0",
      description: "Vector similarity search engine for AI applications",
      url: "https://qdrant.tech",
      pricing: "Free (self-hosted), Cloud from $25/month"
    },
    {
      name: "Chroma",
      category: "Vector Database",
      type: "Open Source",
      license: "Apache 2.0",
      description: "AI-native open-source embedding database",
      url: "https://www.trychroma.com",
      pricing: "Free"
    },
    {
      name: "Pinecone",
      category: "Vector Database",
      type: "Paid Service",
      license: "Proprietary",
      description: "Managed vector database for AI applications",
      url: "https://www.pinecone.io",
      pricing: "Free tier, Starter $70/month"
    },
    {
      name: "Zapier",
      category: "Workflow Automation",
      type: "Paid Service",
      license: "Proprietary",
      description: "Automation platform connecting 5000+ apps",
      url: "https://zapier.com",
      pricing: "Free tier, Starter $19.99/month"
    }
  ];
  
  console.log(`Seeding ${tools.length} AI tools to database...`);
  let created = 0;
  let updated = 0;
  
  for (const tool of tools) {
    // Check if the tool already exists
    const existingTool = await prisma.aITool.findFirst({
      where: { name: tool.name }
    });
    
    if (existingTool) {
      // Update existing tool
      await prisma.aITool.update({
        where: { id: existingTool.id },
        data: tool
      });
      updated++;
    } else {
      // Create new tool
      await prisma.aITool.create({
        data: tool
      });
      created++;
    }
  }
  
  console.log(`AI tools seeded: ${created} created, ${updated} updated`);
  return tools;
}

async function main() {
  console.log('Starting database seeding...');
  await seedDatabase();
  console.log('Database seeding completed.');
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((error) => {
  console.error('Error during database seeding:', error);
  prisma.$disconnect();
  process.exit(1);
}); 