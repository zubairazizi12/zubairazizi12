# Hospital Resident Management System

## Overview

This is a web-based Hospital Resident Management System designed to track and manage medical residents (specialist trainees) throughout their training period. The system handles comprehensive resident profiles, mandatory training forms, performance evaluations, disciplinary actions, and faculty supervision. It provides role-based access control with admin and viewer permissions, along with reporting capabilities for institutional oversight.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing
- **TailwindCSS** for utility-first styling with custom hospital theme colors
- **shadcn/ui** component library built on Radix UI primitives for accessible UI components
- **TanStack Query** (React Query) for server state management and caching
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **RESTful API design** with organized route handlers
- **Session-based authentication** using PostgreSQL session store
- **Replit Auth integration** for OAuth-based user authentication
- **Role-based access control** (admin/viewer permissions)
- **Middleware pattern** for request logging and error handling

### Data Layer
- **PostgreSQL** database with connection pooling via Neon serverless
- **Drizzle ORM** for type-safe database queries and schema management
- **Database schema** includes tables for users, residents, faculty, forms, disciplinary actions, rewards, and sessions
- **Schema validation** using Zod for runtime type checking
- **Relational data modeling** with foreign key constraints

### Key Features
- **Resident Management**: Complete CRUD operations for resident profiles with department assignment and status tracking
- **Training Forms System**: Nine mandatory forms (J, F, D, I, G, E, C, H, K) with completion tracking and form data storage
- **Faculty Management**: Comprehensive faculty profiles with supervision capabilities
- **Disciplinary Actions & Rewards**: Tracking system for resident performance incidents and achievements
- **Reports Module**: Detailed reporting capabilities for residents, forms, disciplinary actions, rewards, and faculty
- **Authentication**: Secure OAuth integration with Replit Auth system
- **Authorization**: Role-based permissions for admin (full access) and viewer (read-only) users

### Design Patterns
- **Repository Pattern**: Storage interface abstraction for data access operations
- **Component Composition**: Reusable UI components with consistent design system
- **Hooks Pattern**: Custom React hooks for authentication and mobile detection
- **Error Boundary**: Centralized error handling with user-friendly messaging
- **Loading States**: Skeleton components and loading indicators for better UX

## External Dependencies

### Database & ORM
- **PostgreSQL** via Neon serverless for cloud database hosting
- **Drizzle ORM** with Drizzle Kit for schema migrations and database introspection

### Authentication
- **Replit Auth** OAuth provider integration
- **OpenID Connect** client for authentication flow
- **Passport.js** strategy for session management
- **connect-pg-simple** for PostgreSQL session storage

### UI Framework
- **Radix UI** primitives for accessible component foundation
- **Lucide React** for consistent icon library
- **Class Variance Authority** for component variant management
- **TailwindCSS** with PostCSS for styling pipeline

### Development Tools
- **TypeScript** for static type checking across frontend and backend
- **ESBuild** for production backend bundling
- **Vite plugins** including runtime error overlay and Replit integration
- **TSX** for TypeScript execution in development

### Utilities
- **date-fns** for date manipulation and formatting
- **nanoid** for unique ID generation
- **memoizee** for function result caching
- **clsx** and **tailwind-merge** for conditional CSS class handling