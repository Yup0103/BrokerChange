# Digital Broker Change Request Platform

A modern, responsive frontend application for managing broker change requests in the financial services industry. Built with React, TypeScript, and Material-UI.

## 🚀 Features

### Core Functionality
- **Client Search & Management** - Advanced search with filters for KYC status, risk profile, and portfolio type
- **Broker Change Requests** - Streamlined workflow for initiating and managing broker changes
- **Request Tracking** - Comprehensive tracking with timeline visualization
- **Dashboard Analytics** - Real-time overview of request statistics and performance metrics

### UI/UX Enhancements
- **Responsive Design** - Optimized for desktop and mobile devices
- **Professional Styling** - Enhanced form controls with larger, more accessible interface elements
- **Loading States** - Skeleton screens and progress indicators for better user experience
- **Error Handling** - Comprehensive error boundaries and user-friendly error messages
- **Accessibility** - WCAG 2.1 AA compliant design

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Emotion (CSS-in-JS)
- **Development**: ESLint, TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd broker-change-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Project Structure

```
broker-change-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ErrorBoundary.tsx
│   │   ├── FormGenerator.tsx
│   │   ├── Layout.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── NotificationCenter.tsx
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.tsx
│   │   ├── ClientSearch.tsx
│   │   ├── BrokerChange.tsx
│   │   └── RequestTracking.tsx
│   ├── services/           # Data services and utilities
│   │   └── demoData.ts
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🎯 Key Features

### Dashboard
- Real-time statistics and metrics
- Recent activity overview
- Quick action buttons
- Performance indicators

### Client Search
- Advanced search with autocomplete
- Multiple filter options (KYC, Risk Profile, Portfolio Type)
- Portfolio management interface
- Direct broker change initiation

### Broker Change Workflow
- Multi-step form process
- Broker selection with ARN codes
- Reason code selection
- Form generation for compliance

### Request Tracking
- Comprehensive request listing
- Status filtering and search
- Detailed timeline visualization
- Expandable request details

## 🎨 UI/UX Improvements

### Enhanced Form Controls
- **Larger Input Fields** - 56px height for better accessibility
- **Wider Filter Buttons** - Minimum 160px width for professional appearance
- **Improved Typography** - 1rem font size for better readability
- **Consistent Spacing** - Professional padding and margins

### Professional Styling
- **Material Design** - Clean, modern interface
- **Responsive Grid** - Adaptive layouts for different screen sizes
- **Color Consistency** - Professional color scheme suitable for financial services
- **Interactive Elements** - Hover effects and smooth transitions

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture

### State Management
- React hooks for local state
- Context API for global state (if needed)
- Custom hooks for reusable logic

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ for the Digital Broker Change Request Platform**
