# VEX AI Assistant

## Overview

This is a VEX Robotics AI chat application built with React frontend and Express backend. The application serves as an intelligent assistant for VEX robotics competitors, educators, and enthusiasts, providing information about VEX competition levels, programming, rules, and resources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom VEX brand colors
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **AI Integration**: OpenAI GPT-4o for chat responses
- **Session Management**: PostgreSQL-based session storage

### Database Strategy
- **Primary Database**: PostgreSQL via Neon Database
- **Development Fallback**: In-memory storage implementation
- **Schema Management**: Drizzle migrations in `/migrations` directory
- **Database Configuration**: Environment-based with `DATABASE_URL`

## Key Components

### Chat System
- **Session Management**: Unique session IDs for conversation tracking
- **Message Storage**: Persistent chat history in PostgreSQL
- **Real-time Interface**: React-based chat UI with message streaming
- **AI Integration**: OpenAI GPT-4o with VEX robotics knowledge base

### VEX Knowledge Base
- **Competition Levels**: VEX GO, IQ, V5, and VEX U information
- **Current Games**: 2025-26 season games (Mix & Match for IQ, Push Back for V5)
- **Resources**: Programming tools, documentation, and community links
- **Educational Content**: Age-appropriate guidance for different competition levels

### UI Components
- **Design System**: Consistent shadcn/ui components
- **Responsive Design**: Mobile-first approach with breakpoint-aware layouts
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Theme Support**: Light/dark mode capability with CSS custom properties

## Data Flow

### Chat Flow
1. User initiates chat session via POST `/api/chat/session`
2. Session created with unique ID and stored in database
3. User sends message via POST `/api/chat/message`
4. Message stored in database with session association
5. AI service processes message with VEX knowledge context
6. AI response generated and stored as assistant message
7. Frontend receives both user and assistant messages
8. UI updates with real-time message display

### Knowledge Integration
1. User query analyzed for VEX-related content
2. VEX knowledge base provides context and resources
3. OpenAI generates response using system prompt with VEX expertise
4. Response includes relevant sources and follow-up suggestions
5. Conversation history maintained for context continuity

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for natural language processing
- **Configuration**: API key via `OPENAI_API_KEY` environment variable
- **Usage**: Chat completions with VEX robotics system prompts

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Via `DATABASE_URL` environment variable
- **Features**: Auto-scaling, branching, and connection pooling

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Fast build tool with HMR and TypeScript support
- **Replit Integration**: Development environment optimization
- **ESBuild**: Fast JavaScript/TypeScript bundling for production

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized React application to `/dist/public`
- **Backend**: ESBuild bundles Express server to `/dist/index.js`
- **Assets**: Static files served from built frontend directory

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with compiled assets
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **AI**: OpenAI API access via `OPENAI_API_KEY`

### Scaling Considerations
- **Database**: Neon's serverless PostgreSQL scales automatically
- **Sessions**: Database-stored sessions support horizontal scaling
- **Static Assets**: Vite-optimized bundles for CDN deployment
- **API Rate Limits**: OpenAI usage monitoring and error handling

### Development Workflow
- **Hot Reloading**: Vite provides instant feedback during development
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Database Migrations**: Drizzle kit for schema version control
- **Code Quality**: ESLint and TypeScript strict mode enforcement