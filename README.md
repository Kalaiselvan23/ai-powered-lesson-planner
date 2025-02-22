# AI-Powered Lesson Planner

A modern web application that helps teachers create comprehensive lesson plans using AI assistance. Built with Next.js, TypeScript, and shadcn/ui components.

## Features

- 🤖 AI-powered lesson plan generation
- 📝 Interactive form-based lesson plan creation
- 💾 Automatic saving of work in progress
- 📋 Comprehensive lesson plan components:
  - Basic information
  - Subtopics
  - Materials needed
  - Learning objectives
  - Lesson activities
  - Additional notes
- 📑 PDF export functionality
- 🔐 Authentication system
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **PDF Generation**: @react-pdf/renderer
- **Authentication**: Custom auth implementation
- **AI Integration**: Google's Gemini API
- **State Management**: React useState and useEffect

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kalaiselvan23/ai-powered-lesson-planner
cd lesson-planner
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── LessonPDF.tsx      # PDF generation component
│   └── LogoutBtn.tsx      # Logout button component
├── types/                 # TypeScript type definitions
│   └── lessonPlan.ts      # Lesson plan related types
├── utils/                 # Utility functions
│   ├── geminiApi.ts       # AI API integration
│   └── prompt.ts          # AI prompt templates
└── hooks/                 # Custom React hooks
    └── use-toast.ts       # Toast notification hook
```

## Usage

1. **Authentication**: Log in to access the lesson planner
2. **Create New Lesson Plan**: Fill in the basic information section
3. **Add Components**: Build your lesson plan with various sections
4. **Generate with AI**: Click "Generate Lesson Plan" for AI assistance
5. **Export**: Download your lesson plan as a PDF

## Features in Detail

### Basic Information

- Topic
- Grade Level
- Main Concept

### Lesson Components

- Subtopics list
- Required materials
- Learning objectives
- Detailed lesson activities with duration and guides
- Additional notes and considerations

### AI Generation

The system uses Google's Gemini API to generate:

- Suggested lesson structure
- Learning objectives
- Activity ideas
- Material recommendations

### PDF Export

Generate professional PDFs including:

- Lesson overview
- All components organized clearly
- Activity timeline
- Notes and materials
