# React + TypeScript + Vite Project - Complete Study Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Development Tools](#development-tools)
6. [Code Quality Tools](#code-quality-tools)
7. [Key Concepts](#key-concepts)
8. [Component Architecture](#component-architecture)
9. [Scripts Explained](#scripts-explained)
10. [Configuration Files](#configuration-files)
11. [Best Practices](#best-practices)
12. [Learning Resources](#learning-resources)

## 🎯 Project Overview

This is a modern React application built with TypeScript and Vite. It demonstrates a complete development setup with:
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite (fast development and build)
- **UI Components**: Radix UI + Tailwind CSS
- **Data Management**: TanStack Table for data tables
- **Code Quality**: ESLint, Prettier, Husky for git hooks
- **Package Manager**: Yarn v4

### What This Project Does
- Displays user and product data in interactive tables
- Provides a dashboard interface with navigation
- Implements modern UI components with accessibility
- Demonstrates API integration patterns

## 🛠 Technology Stack

### Core Technologies
- **React 19**: Latest React version with improved performance
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Next-generation frontend build tool (faster than Webpack)
- **Tailwind CSS**: Utility-first CSS framework

### UI Libraries
- **Radix UI**: Unstyled, accessible UI components
- **Lucide React**: Beautiful icon library
- **TanStack Table**: Powerful table library for React

### Development Tools
- **ESLint**: Code linting and error detection
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **Commitlint**: Conventional commit message format

## 📁 Project Structure

```
src/
├── apis/                    # API integration files
│   ├── productApi.tsx      # Product data fetching
│   └── userApi.tsx         # User data fetching
├── assets/                 # Static assets (images, icons)
├── components/             # Reusable UI components
│   ├── customUi/          # Custom business components
│   │   ├── data-table.tsx # Reusable data table
│   │   └── pagination.tsx # Pagination component
│   ├── ui/                # Base UI components (Radix + Tailwind)
│   └── Layout.tsx         # Main layout wrapper
├── constants/             # Application constants
├── data/                  # Static data and routes
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── libs/                  # External library configurations
├── pages/                 # Page components
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

### Key Directories Explained

#### `/apis`
Contains components that handle API calls and data fetching. Each file represents a different data source.

#### `/components/ui`
Base UI components built with Radix UI and styled with Tailwind CSS. These are reusable across the application.

#### `/components/customUi`
Business-specific components that combine base UI components for specific use cases.

#### `/hooks`
Custom React hooks for reusable logic (e.g., mobile detection, user management).

#### `/lib` vs `/libs`
- `/lib`: Internal utility functions
- `/libs`: External library configurations (like Axios setup)

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Installation Steps
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd "Task 01"

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Available Scripts
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Check code quality
yarn format       # Check code formatting
yarn validate     # Run all quality checks
```

## 🔧 Development Tools

### Vite Configuration
**File**: `vite.config.ts`

```typescript
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Allows @/ imports
    },
  },
});
```

**Key Features**:
- **Fast HMR**: Hot Module Replacement for instant updates
- **Path Aliases**: Use `@/` instead of `../../../src/`
- **Tailwind Integration**: Built-in Tailwind CSS support

### TypeScript Configuration
**Files**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`

**Project References**: Uses TypeScript project references for better performance
- `tsconfig.app.json`: Application code configuration
- `tsconfig.node.json`: Node.js/build tools configuration

## 🎨 Code Quality Tools

### ESLint Configuration
**File**: `eslint.config.js`

**Rules Enforced**:
- React Hooks rules (proper hook usage)
- TypeScript best practices
- Unused imports removal
- Prettier integration
- React Refresh compatibility

### Prettier Configuration
**File**: `.prettierrc`

Ensures consistent code formatting across the team.

### Husky Git Hooks
**Directory**: `.husky/`

**Hooks**:
- **pre-commit**: Runs linting and type checking before commits
- **commit-msg**: Validates commit message format
- **pre-push**: Runs full build before pushing

### Commit Message Format
Uses conventional commits:
```
feat: add new user table component
fix: resolve pagination bug
docs: update README
```

## 🧩 Key Concepts

### 1. Component Composition
The project uses composition over inheritance:
```typescript
// Layout wraps content with navigation
<Layout activeTab={activeTab} onTabChange={setActiveTab}>
  {renderContent()}
</Layout>
```

### 2. Custom Hooks
Reusable logic extracted into hooks:
```typescript
// hooks/use-mobile.ts
export function useMobile() {
  // Logic to detect mobile devices
}
```

### 3. Type Safety
Everything is typed with TypeScript:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

### 4. Utility Functions
Common operations centralized:
```typescript
// lib/utils.ts
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
```

## 🏗 Component Architecture

### Base UI Components (`/components/ui`)
Built with Radix UI primitives:
- **Accessible**: ARIA compliant
- **Unstyled**: Styled with Tailwind CSS
- **Composable**: Can be combined easily

### Custom Components (`/components/customUi`)
Business logic components:
- **DataTable**: Handles sorting, filtering, pagination
- **Pagination**: Reusable pagination logic

### Page Components (`/pages`)
Top-level route components that combine multiple components.

## 📜 Scripts Explained

### Development Scripts
- `yarn dev`: Starts Vite dev server with HMR
- `yarn preview`: Serves production build locally

### Build Scripts
- `yarn build`: TypeScript compilation + Vite build
- `yarn build:check`: Production build with validation
- `yarn build:ts`: TypeScript compilation only

### Quality Scripts
- `yarn lint`: ESLint checking
- `yarn lint:fix`: ESLint with auto-fix
- `yarn format`: Prettier checking
- `yarn format:write`: Prettier with auto-format

### Validation Scripts
- `yarn validate`: Run all checks (format + lint + build)
- `yarn validate:fix`: Fix all issues automatically

## ⚙️ Configuration Files

### Package Management
- **package.json**: Dependencies and scripts
- **yarn.lock**: Exact dependency versions
- **.yarnrc.yml**: Yarn configuration

### TypeScript
- **tsconfig.json**: Root TypeScript config
- **tsconfig.app.json**: App-specific config
- **tsconfig.node.json**: Build tools config

### Build Tools
- **vite.config.ts**: Vite configuration
- **components.json**: UI components config

### Code Quality
- **eslint.config.js**: ESLint rules
- **.prettierrc**: Prettier formatting rules
- **commitlint.config.js**: Commit message rules

## 🎯 Best Practices Demonstrated

### 1. Separation of Concerns
- API logic in `/apis`
- UI components in `/components`
- Business logic in `/hooks`
- Utilities in `/utils`

### 2. Type Safety
- All components are typed
- API responses are typed
- Props interfaces defined

### 3. Code Quality
- Automated linting and formatting
- Git hooks prevent bad commits
- Consistent code style

### 4. Performance
- Vite for fast builds
- React 19 optimizations
- Lazy loading where appropriate

### 5. Accessibility
- Radix UI components are accessible
- Proper ARIA attributes
- Keyboard navigation support

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Build Tools
- [Vite Guide](https://vitejs.dev/guide/)
- [Vite vs Webpack](https://vitejs.dev/guide/why.html)

### UI Libraries
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Table](https://tanstack.com/table/latest)

### Code Quality
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🔍 Study Exercises

### Beginner
1. Modify the dashboard to show different content
2. Add a new navigation item
3. Change the color scheme using Tailwind classes

### Intermediate
1. Create a new API endpoint component
2. Add form validation to existing forms
3. Implement a new custom hook

### Advanced
1. Add unit tests with Vitest
2. Implement error boundaries
3. Add internationalization (i18n)
4. Optimize bundle size

## 🚀 Next Steps

1. **Run the project**: `yarn dev` and explore the interface
2. **Read the code**: Start with `App.tsx` and follow the component tree
3. **Modify components**: Make small changes to understand the flow
4. **Add features**: Try implementing new functionality
5. **Study configurations**: Understand how each tool is configured

## 📝 Notes for Self-Study

- **Start Simple**: Begin by understanding the basic React concepts
- **Follow the Data**: Trace how data flows from APIs to components
- **Experiment**: Make changes and see what happens
- **Read Documentation**: Each tool has excellent documentation
- **Practice**: The best way to learn is by building

This project demonstrates modern React development practices and serves as an excellent foundation for learning full-stack development with TypeScript.