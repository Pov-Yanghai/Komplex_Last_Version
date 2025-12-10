# KOMPLEX E-Learning Platform

A comprehensive e-learning platform for Khmer, Chemistry, Physics, and Mathematics education in Cambodia.

## Features

- **Multi-Role System**: Admin, Educator, Student, and Analyst dashboards
- **Bilingual Support**: Full support for English and Khmer languages
- **Course Management**: Complete CRUD operations for courses, lessons, quizzes
- **Progress Tracking**: Detailed analytics and performance monitoring
- **User Management**: Admin controls for user approval and management
- **Real-time Updates**: Dynamic content updates and notifications

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: React Context API
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd komplex-elearning
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

### Admin
- Email: `admin@komplex.edu`
- Password: any

### Educator
- Email: `educator@komplex.edu`
- Password: any

### Student
- Email: `student@komplex.edu`
- Password: any

### Analyst
- Email: `analyst@komplex.edu`
- Password: any

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── educator/          # Educator dashboard pages
│   ├── dashboard/         # Role-based dashboards
│   ├── login/             # Authentication pages
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── educator/         # Educator components
│   ├── student/          # Student components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── auth-context.tsx  # Authentication context
│   ├── language-context.tsx # i18n context
│   └── mock-data.ts      # Mock data for demo
└── public/               # Static assets
\`\`\`

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Features by Role

### Admin
- User management (create, edit, delete, ban)
- Course management and approval
- Educator approval system
- System analytics and reporting
- Platform settings configuration
- Activity logs monitoring
- System announcements

### Educator
- Course creation and management
- Lesson content upload (video, PDF, text)
- Quiz and assignment creation
- Student progress tracking
- Grade management
- Student enrollment monitoring

### Student
- Course browsing and enrollment
- Video lesson viewing
- Assignment submission
- Quiz taking
- Progress tracking
- Grade viewing

### Analyst
- System performance analytics
- User engagement metrics
- Course completion statistics
- Custom report generation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, email support@komplex.edu or open an issue in the repository.
