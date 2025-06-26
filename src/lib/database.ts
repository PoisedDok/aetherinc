import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Prevent multiple instances of Prisma Client in development mode
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient()

// In development, attach Prisma to global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export const db = prisma

// Seed initial data
export async function seedDatabase() {
  try {
    // Create admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aetherinc.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    })
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      await prisma.user.create({
        data: {
          email: adminEmail,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      })
      console.log('Admin user created')
    }
    
    // Seed AI tools from the provided list
    await seedAITools()
    
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

// AI Tools seeding function
export async function seedAITools() {
  const tools = [
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
  ]
  
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
    } else {
      // Create new tool
      await prisma.aITool.create({
        data: tool
      });
    }
  }
  
  return tools;
}

// The database is exported above 