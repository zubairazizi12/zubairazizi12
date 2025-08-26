# Hospital Resident Management System

## Overview

This is a web-based Hospital Resident Management System designed to track and manage medical residents (specialist trainees) throughout their training period. The system handles comprehensive resident profiles, mandatory training forms, performance evaluations, disciplinary actions, and faculty supervision. It provides role-based access control with admin and viewer permissions, along with reporting capabilities for institutional oversight.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 26, 2025)

**Migration and Restructuring:**
- ✅ Successfully migrated project from Replit Agent to Replit environment
- ✅ Restructured server architecture with better organization:
  - Created `/server/models/` folder with separate model files (User.ts, Resident.ts, Teacher.ts)
  - Organized `/server/routes/` with dedicated route handlers
  - Removed faculty functionality as requested by user
  - Replaced faculty system with comprehensive teacher management
- ✅ Enhanced teacher form system with full validation and database persistence
- ✅ Updated shared schema to remove circular dependencies and faculty references
- ✅ Server now running successfully on port 5000 with MongoDB fallback to in-memory storage

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
- **Session-based authentication** using MongoDB session store
- **Replit Auth integration** for OAuth-based user authentication
- **Role-based access control** (admin/viewer permissions)
- **Middleware pattern** for request logging and error handling

### Data Layer
- **MongoDB** database for flexible document-based storage with fallback to in-memory storage
- **Mongoose ODM** for schema modeling and database operations
- **Database collections** include users, residents, faculty, forms, disciplinary actions, rewards, and sessions
- **Schema validation** using Zod for runtime type checking
- **Document-based data modeling** with embedded and referenced relationships
- **Comprehensive seeding system** with 36 faculty members across 12 departments and 14 residents
- **Department-based organization** for Internal Medicine, Surgery, Cardiology, Emergency Medicine, Pediatrics, Psychiatry, Radiology, Anesthesiology, OB/GYN, Orthopedic Surgery, Neurology, and Dermatology

### Key Features
- **Resident Management**: Complete CRUD operations for resident profiles with department assignment and status tracking
- **Training Forms System**: Nine mandatory forms (J, F, D, I, G, E, C, H, K) with completion tracking and form data storage
- **Teacher Management**: Comprehensive teacher profiles with detailed information including academic rank, appointment dates, contact details, and department assignment (replaces faculty system)
- **Disciplinary Actions & Rewards**: Tracking system for resident performance incidents and achievements
- **Reports Module**: Detailed reporting capabilities for residents, forms, disciplinary actions, rewards, and teachers
- **Authentication**: Secure OAuth integration with Replit Auth system with demo authentication fallback
- **Authorization**: Role-based permissions for admin (full access) and viewer (read-only) users
- **Teacher Form Submission**: Full validation and database persistence for teacher registration forms

### Design Patterns
- **Repository Pattern**: Storage interface abstraction for data access operations
- **Component Composition**: Reusable UI components with consistent design system
- **Hooks Pattern**: Custom React hooks for authentication and mobile detection
- **Error Boundary**: Centralized error handling with user-friendly messaging
- **Loading States**: Skeleton components and loading indicators for better UX

## External Dependencies

### Database & ODM
- **MongoDB** for document-based database storage
- **Mongoose** ODM for schema modeling and database operations

### Authentication
- **Replit Auth** OAuth provider integration
- **OpenID Connect** client for authentication flow
- **Passport.js** strategy for session management
- **connect-mongo** for MongoDB session storage

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