# TaskPro Frontend

TaskPro is a modern web application designed for task and project management.
This repository contains the frontend portion of the application.

## 🌐 Live Site

[Visit TaskPro Live](https://task-pro-frontend-alpha.vercel.app/)

## 📋 Project Features

- ✅ Kanban board with task and column-based organization
- ✅ Move tasks between different columns
- ✅ Create, edit, and delete tasks
- ✅ User profile and theme customization
- ✅ Real-time updates
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Light/Dark/Violet theme options
- ✅ Form validation
- ✅ Authentication and Authorization

---

## 🛠️ Technologies Used

### Core Framework & Build

- **React** - Modern JavaScript library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing

### State Management

- **Redux Toolkit** - State management
- **React Redux** - React integration with Redux
- **Redux Persist** - State persistence
- **Reselect** - Selector memoization

### UI & Styling

- **Material-UI (MUI)** - Component library
- **Emotion (React & Styled)** - CSS-in-JS styling
- **React Icons** - Icon library
- **CLSX** - Conditional className utility

### Forms & Validation

- **Formik** - Form management
- **Yup** - Schema validation
- **MUI X Date Pickers** - Date picker component

### HTTP & Communication

- **Axios** - HTTP client with interceptors

### Utilities

- **Dayjs** - Date manipulation
- **React Toastify** - Toast notifications
- **React Modal** - Modal dialogs
- **React Responsive** - Responsive utilities
- **Modern Normalize** - CSS reset
- **Prop Types** - Runtime type checking

### Development Tools

- **ESLint** - Code linting
- **Vite React Plugin** - Vite React support

---

## 📁 Component Structure

```
src/
├── components/
│   ├── PrivateRoute.jsx              # Protected route component
│   ├── PublicRoute.jsx               # Public route component
│   ├── AddCard/                      # Add new task
│   │   ├── AddCard.jsx
│   │   └── AddCard.module.css
│   ├── AddColumn/                    # Add new column
│   │   └── AddColumn.jsx
│   ├── App/                          # Main application wrapper
│   │   └── App.jsx
│   ├── BoardForm/                    # Board form
│   │   ├── BoardForm.jsx
│   │   └── BoardForm.module.css
│   ├── BoardsItem/                   # Board list item
│   │   ├── BoardsItem.jsx
│   │   └── BoardsItem.module.css
│   ├── BoardsList/                   # Board list
│   │   ├── BoardsList.jsx
│   │   └── BoardsList.module.css
│   ├── Button/                       # General button
│   │   ├── Button.jsx
│   │   └── Button.module.css
│   ├── Column/                       # Kanban column
│   │   ├── Column.jsx
│   │   ├── Column.module.css
│   │   └── HeaderColumn/             # Column header
│   ├── CustomDatePicker/             # Custom date picker
│   │   ├── CustomDatePicker.jsx
│   │   └── CustomDatePicker.css
│   ├── EditBoard/                    # Edit board
│   │   └── EditBoard.jsx
│   ├── EditCard/                     # Edit task
│   │   └── EditCard.jsx
│   ├── EditColumn/                   # Edit column
│   │   └── EditColumn.jsx
│   ├── EditProfile/                  # Edit profile
│   │   ├── EditProfile.jsx
│   │   └── EditProfile.module.css
│   ├── Filter/                       # Task filter
│   │   ├── Filter.jsx
│   │   ├── Filter.module.css
│   │   └── radioButtons.js
│   ├── Header/                       # General header
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── HeaderDashboard/              # Dashboard header
│   │   ├── HeaderDashboard.jsx
│   │   └── HeaderDashboard.module.css
│   ├── HeaderTheme/                  # Theme selector
│   │   ├── HeaderTheme.jsx
│   │   └── HeaderTheme.module.css
│   ├── Icon/                         # Icon component
│   │   └── Icon.jsx
│   ├── IconButton/                   # Icon button
│   │   ├── IconButton.jsx
│   │   └── IconButton.module.css
│   ├── Layout/                       # Main layout
│   │   ├── Layout.jsx
│   │   └── Layout.module.css
│   ├── Loader/                       # Loading indicator
│   │   ├── Loader.jsx
│   │   └── Loader.module.css
│   ├── LoginForm/                    # Login form
│   │   ├── LoginForm.jsx
│   │   └── LoginForm.module.css
│   ├── MainDashboard/                # Main dashboard
│   │   ├── MainDashboard.jsx
│   │   └── MainDashboard.module.css
│   ├── ModalWrapper/                 # Modal wrapper
│   │   ├── ModalWrapper.jsx
│   │   └── ModalWrapper.module.css
│   ├── MoveTaskMenu/                 # Move task menu
│   │   └── MoveTaskMenu.jsx
│   ├── NeedHelp/                     # Help page
│   ├── NewBoard/                     # Create new board
│   ├── PriorityPicker/               # Priority selector
│   ├── RegisterForm/                 # Registration form
│   ├── Sidebar/                      # Side menu
│   ├── TaskItem/                     # Task item
│   ├── TasksList/                    # Task list
│   └── Welcome/                      # Welcome page
│
├── pages/
│   ├── AuthPage/                     # Authentication page
│   ├── HomePage/                     # Home page
│   ├── ScreensPage/                  # Screens page
│   └── WelcomePage/                  # Welcome page
│
├── redux/
│   ├── handlers.js                   # Redux action handlers
│   ├── store.js                      # Redux store configuration
│   ├── toastHelper.js                # Toast notification helper
│   ├── auth/                         # Authentication state
│   ├── board/                        # Board state
│   ├── columns/                      # Column state
│   ├── emails/                       # Email state
│   ├── filter/                       # Filter state
│   └── tasks/                        # Task state
│
├── hooks/
│   ├── useScreenWidth.js             # Screen width hook
│   └── useToggle.js                  # Toggle state hook
│
├── helpers/
│   ├── addCardSchema.js              # Task add validation
│   ├── editUserSchema.js             # User update validation
│   ├── emailSchema.js                # Email validation
│   ├── logInSchema.js                # Login validation
│   └── registrationSchema.js         # Registration validation
│
├── utils/
│   ├── cateString.js                 # String categorize
│   └── devHelper.jsx                 # Developer helper
│
├── images/
│   └── Image.js                      # Manage icons and images
│
├── styles/
│   ├── common.css                    # Common styles
│   ├── fonts.css                     # Font definitions
│   ├── Forms.module.css              # Form styles
│   ├── index.css                     # Main stylesheet
│   ├── menuList.css                  # Menu styles
│   ├── reset.css                     # CSS reset
│   └── variables.css                 # CSS variables
│
├── fonts/
│   └── Poppins/                      # Poppins font files
│
├── main.jsx                          # Application entry point
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint configuration
└── vercel.json                       # Vercel deployment configuration
```

---

## 🚀 Installation & Getting Started

### Prerequisites

- Node.js (14.0.0 or higher)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/canbazahmet/TaskPro-frontend.git
   cd TaskPro-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`.

4. **Create production build:**

   ```bash
   npm run build
   ```

   Build output will be in `dist/` folder.

5. **Preview the build:**
   ```bash
   npm run preview
   ```

---

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create production build
- `npm run lint` - Check code with ESLint
- `npm run preview` - Preview the build

---

## 🎨 Redux State Structure

### Auth Slice

```javascript
{
  token: string,
  isLoggedIn: boolean,
  isRefreshing: boolean,
  user: {
    id: string,
    email: string,
    name: string,
    theme: 'light' | 'dark' | 'violet'
  }
}
```

### Board Slice

```javascript
{
  board: {
    id: string,
    name: string,
    background: string
  },
  columns: string[]
}
```

### Tasks Slice

```javascript
{
  tasks: [
    {
      _id: string,
      title: string,
      description: string,
      priority: 'Without' | 'Low' | 'Medium' | 'High',
      deadline: string,
      columnId: string,
    },
  ];
}
```

---

## 🔐 Authentication

- JWT-based authentication
- Token stored in localStorage (redux-persist)
- Automatic header injection via Axios interceptor
- Protected routes using PrivateRoute component

---

## 📱 Responsive Design

- **Mobile First** approach
- CSS Media Queries
- React Responsive library
- MUI Grid system

---

## 🎭 Theme System

Three theme options are available:

- **Light** - Light theme
- **Dark** - Dark theme
- **Violet** - Violet theme

Theme preference is saved with user profile on the backend.

---

## 📦 Deployment

The application is deployed on **Vercel**.

- Build command: `vite build`
- Output directory: `dist`

---

## 🤝 Contributing

This project is based on a learning project prepared by GoIT.

---

## 📄 License

This project is prepared for educational purposes.

---

## 📧 Contact

Please feel free to reach out with any questions or suggestions.
