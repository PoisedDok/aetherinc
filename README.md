# AetherInc - Privacy-First AI Solutions

## 🚀 Company Overview

**AetherInc Limited** is a Scottish AI startup (Company SC851680) founded by Krish Dokania (CEO). Born from an Iron Man-inspired vision in December 2024, we're building the future of privacy-first AI interaction.

### Our Mission
Democratizing AI access through privacy-first, local AI solutions that eliminate cloud dependency and data exposure risks.

### Key Products
- **GURU**: Personal AI assistant that runs entirely on-device (NVIDIA Jetson Orin, 67 TOPS)
- **AetherArena**: Self-improving enterprise AI platform with brain-like architecture

---

## 🌟 Website Transformation

This website has been completely transformed from a simple product landing page to a comprehensive corporate presence showcasing:

### New Sections Added:
1. **Founder Story** - Iron Man inspiration and journey from Jamtara to Glasgow
2. **About Section** - Detailed founder profiles and company registration
3. **Services** - AI consulting and automation services (£2,500-£7,500+)
4. **Product Vision** - GURU and AetherArena roadmaps and specifications
5. **News & Insights** - Industry issues highlighting local AI advantages
6. **Admin Dashboard** - AI tools database and content management

### Enhanced Features:
- Professional company metadata and structured data
- Database-driven architecture with Prisma ORM
- AI tools database (57 tools categorized and tagged)
- Admin panel for content management
- Enhanced waitlist system with use case tracking
- Industry news integration highlighting AI outages/breaches

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.1** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Prisma ORM** - Database toolkit and query builder
- **SQLite** (development) / **PostgreSQL** (production ready)
- **NextAuth.js** - Authentication framework
- **bcryptjs** - Password hashing

### Tools & Utilities
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Magic UI** - Enhanced UI components

---

## 🏗️ Project Structure

```
aetherinc/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin API endpoints
│   │   │   └── waitlist/      # Waitlist API
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Main homepage
│   ├── components/
│   │   ├── sections/          # Major page sections
│   │   │   ├── FounderStory.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── ProductVision.tsx
│   │   │   ├── NewsInsights.tsx
│   │   │   └── [original sections]
│   │   ├── layout/            # Layout components
│   │   ├── magicui/           # Magic UI components
│   │   └── ui/                # Shadcn/ui components
│   ├── lib/
│   │   ├── database.ts        # Database utilities
│   │   └── utils.ts           # Helper functions
│   └── data/                  # Static data files
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── [config files]
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd aetherinc
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Admin Credentials
   ADMIN_EMAIL="admin@aetherinc.com"
   ADMIN_PASSWORD="your_secure_password"
   
   # NextAuth
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and seed database
   npx prisma db push
   npx prisma db seed
   ```

4. **Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Website: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

---

## 📊 Database Schema

### Core Models
- **Users** - Admin authentication
- **WaitlistEntry** - Visitor signups with use cases
- **AITool** - Comprehensive AI tools database (57 tools)
- **NewsArticle** - Industry news and insights
- **ContactForm** - Contact submissions
- **Analytics** - Usage tracking

### AI Tools Database
Pre-seeded with 57 AI tools including:
- **Workflow Automation**: n8n, Zapier alternatives
- **LLM Runtimes**: Ollama, llama.cpp
- **Frameworks**: LangChain, AutoGen
- **Development**: Cursor, GitHub Copilot
- **Privacy-focused**: AnythingLLM, LocalAI

---

## 🎨 Design Philosophy

### Visual Identity
- **Dark Theme**: Professional cyberpunk aesthetic
- **Gradient Accents**: Cyan to purple brand colors
- **Typography**: Clean, modern sans-serif
- **Animations**: Subtle Framer Motion interactions

### UX Principles
- **Privacy-First Messaging**: Every section reinforces data privacy
- **Technical Credibility**: Detailed specifications and roadmaps
- **Founder-Centric**: Personal story drives emotional connection
- **Industry Authority**: News insights position as thought leaders

---

## 🔧 Admin Dashboard Features

### AI Tools Management
- Add/edit/delete AI tools
- Categorization and tagging
- URL and GitHub integration
- Pricing information

### Analytics Overview
- Waitlist conversion tracking
- Content performance metrics
- User engagement insights

### Content Management
- News article publishing
- Waitlist entry management
- Contact form responses

---

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   NEXTAUTH_SECRET="production_secret"
   NEXTAUTH_URL="https://yourdomain.com"
   ```

2. **Database Migration**
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

### Recommended Platforms
- **Vercel** - Optimal for Next.js applications
- **Railway** - PostgreSQL database hosting
- **Supabase** - Alternative database solution

---

## 📈 Business Context

### Funding & Growth
- **£1,000 Grant** from Glasgow University Business Bloom program
- Selected from 50+ startup applications
- Currently building MVP with pre-launch marketing

### Market Positioning
- **Privacy-First Alternative** to cloud AI services
- **B2B Services** funding product development
- **Local AI Advocacy** addressing industry outages/breaches

### Revenue Streams
1. **AI Consulting** - £2,500-£7,500+ per project
2. **GURU Sales** - £2,999 one-time purchase
3. **AetherArena Licensing** - £15,000+/year enterprise

---

## 🤝 Contributing

### Development Guidelines
1. Follow existing code structure and patterns
2. Maintain TypeScript strict mode compliance
3. Use Tailwind CSS for consistent styling
4. Write meaningful commit messages

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import and integrate in `src/app/page.tsx`
3. Update navigation in `src/components/Navbar.tsx`
4. Add corresponding API routes if needed

---

## 📞 Contact & Support

### Company Information
- **Legal Name**: AetherInc Limited
- **Registration**: SC851680 (Scotland)
- **Founded**: June 10, 2025
- **Location**: Glasgow, Scotland

### Founders
- **Krish Dokania** - CEO & Founder
  - Electronics & Software Engineering, University of Glasgow
  - LinkedIn: [krish-dokania-56203b217](https://linkedin.com/in/krish-dokania-56203b217/)

---

## About AetherInc

**AetherInc Limited** is a Scottish AI startup (Company SC851680) founded by Krish Dokania (CEO). Born from an Iron Man-inspired vision in December 2024, we're building the future of privacy-first AI interaction.

## Team

- **Krish Dokania** - CEO & Founder

---

## 📄 License

This project represents AetherInc's proprietary website and brand identity. The codebase structure and components may be used for reference, but the brand assets, content, and specific implementations are proprietary to AetherInc Limited.

---

**Built with ❤️ in Glasgow, Scotland**  
*From Iron Man dreams to AI reality*
