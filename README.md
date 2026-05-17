# GoalTrack - Enterprise Performance Management Portal

AtomQuest Hackathon 2026 | Built with React 18 + TypeScript + Vite

GoalTrack is a fully functional, role-based performance management portal built for the AtomQuest Hackathon 2026. It digitizes the complete employee goal lifecycle from creation and manager approval to quarterly check-ins and performance tracking, eliminating spreadsheets and fragmented email workflows.

---

## Live Demo

Live URL: https://goaltracking-diwl.vercel.app

GitHub Repository: https://github.com/sricharansamala023/goaltracking

---

## Demo Accounts

No password required. On the login screen, click any user card and press Continue to enter the portal as that user.

| Name | Role | Department | What You Can Do |
|------|------|------------|-----------------|
| Swapna | Employee | Engineering | Create goals, submit for approval, log actuals |
| Arjun Kumar | Employee | Engineering | Create goals, submit for approval, log actuals |
| Ananya Iyer | Employee | Sales | Create goals, submit for approval, log actuals |
| Sricharan S | Manager | Engineering | Approve team goals, run quarterly check-ins |
| Manohar Singh | Manager | Sales | Approve team goals, run quarterly check-ins |
| HR Admin | Admin | HR | View all employees, export reports, audit trail |

---

## What is GoalTrack

Organizations that rely on spreadsheets and emails for goal tracking face serious problems. Managers cannot monitor team progress in real time. Employees lack clarity on how their work connects to company priorities. HR teams spend hours piecing together data at appraisal time.

GoalTrack solves this by providing a structured digital portal that supports the full lifecycle of employee goals from creation and alignment to quarterly check-ins and performance visibility.

---

## Features

### Employee Features

- Create up to 8 goals per performance cycle
- Map each goal to one of 6 company Thrust Areas
- Define Goal Title, Description, Unit of Measurement, and Target
- Set weightage per goal with a live slider (minimum 10 percent per goal)
- System validates that total weightage equals exactly 100 percent before allowing submission
- Submit goal sheet to manager for approval with one click
- View approval status in real time: Draft, Pending Review, Approved, or Returned
- Log quarterly actuals once goals are approved
- Update goal status: Not Started, On Track, or Completed
- View auto-computed performance score as a visual ring chart

### Manager Features

- Team dashboard showing all direct reports and their goal sheets
- See approval status, total weightage, and goal count for each team member
- Expand any team member to review their individual goals in detail
- Approve goal sheets with one click (validates 100 percent weightage before approving)
- Return goal sheets to employee for rework with feedback
- Quarterly Check-in module to review planned vs actual achievements
- Add structured coaching comments per goal per quarter
- View performance score rings for each goal

### Admin Features

- Organisation-wide progress overview showing all employees
- Real-time view of approval statuses across the company
- Achievement Report table with all employees, goals, targets, actuals, and scores
- Export full achievement report as a CSV file with one click
- Performance Cycle Management showing the Q1 to Q4 schedule
- Audit Trail logging every action taken in the system with user and timestamp
- Validation rule configuration panel

---

## Thrust Areas

Every goal must be mapped to one of these six company-level strategic priorities:

| Thrust Area | Description |
|-------------|-------------|
| Product Quality | Bug reduction, release quality, test coverage improvements |
| Revenue Growth | Sales targets, new business acquisition, ARR growth |
| Customer Experience | CSAT scores, NPS, support ticket resolution quality |
| Operational Efficiency | Process improvement, cost reduction, TAT reduction |
| People and Culture | Training hours, engagement scores, team building |
| Innovation | New product ideas, R&D initiatives, patents filed |

---

## Unit of Measurement Types

The system supports four types of measurement for computing performance scores automatically:

| UoM Type | When to Use | Score Formula |
|----------|-------------|---------------|
| Numeric Min | Higher is better. Example: Sales Revenue, Features Shipped | Score = (Actual divided by Target) multiplied by 100 |
| Numeric Max | Lower is better. Example: Bug Count, Cost, TAT | Score = (Target divided by Actual) multiplied by 100 |
| Percent Min | Higher percentage is better | Same as Numeric Min |
| Percent Max | Lower percentage is better | Same as Numeric Max |
| Timeline | Date-based completion tracking | Manual entry |
| Zero-based | Zero means success. Example: Safety incidents, Critical bugs | Score = 100 if Actual equals 0, else 0 |

All scores are capped at 150 percent maximum.

---

## Approval Workflow

Goals follow a structured lifecycle to ensure accountability:

    Employee creates goals and sets weightage
           |
           v
    Employee submits goal sheet (only when weightage equals 100 percent)
           |
           v
    Manager reviews the submitted goal sheet
           |
        ----------
        |        |
        v        v
    Approved   Returned to employee for rework
        |
        v
    Goals are locked, employee can now log quarterly actuals

---

## Quarterly Check-in Schedule

| Period | Window Opens | Action |
|--------|-------------|--------|
| Phase 1 - Goal Setting | 1st May | Goal Creation, Submission and Approval |
| Q1 Check-in | July | Progress Update - Planned vs Actual |
| Q2 Check-in | October | Progress Update - Planned vs Actual |
| Q3 Check-in | January | Progress Update - Planned vs Actual |
| Q4 / Annual | March / April | Final Achievement Capture |

---

## Validation Rules

The system enforces these rules automatically and shows clear error messages:

- Maximum 8 goals per employee per cycle
- Minimum 10 percent weightage per individual goal
- Total weightage across all goals must equal exactly 100 percent before submission
- Goals cannot be edited after manager approval (locked state)
- Actuals can only be entered after goals reach Approved status
- Manager cannot approve a goal sheet where total weightage does not equal 100 percent

---

## Tech Stack

| Layer | Technology | Reason for Choice |
|-------|-----------|-------------------|
| Frontend Framework | React 18 + TypeScript | Component-based UI with full type safety |
| Build Tool | Vite 5 | Extremely fast dev server and optimised production builds |
| Styling | Inline CSS with CSS-in-JS patterns | Zero external dependencies, full dark theme control |
| State Management | React useState hooks | Sufficient for client-side hackathon scope, no backend needed |
| Font | Inter from Google Fonts | Clean, professional, highly readable |
| Source Control | GitHub | Version control with Vercel auto-deploy integration |
| Hosting | Vercel free tier | Instant deployment from GitHub, global CDN, zero cost |
| Database | None - in-memory React state | All data lives in component state during the browser session |

---

## Architecture

GoalTrack is a fully client-side Single Page Application. There is no backend server, no database, and no API calls. All business logic runs in the browser.

    Developer pushes code to GitHub (main branch)
           |
           v
    Vercel detects the push and auto-builds using Vite
           |
           v
    Vercel deploys static files to global CDN
           |
           v
    User opens the live URL in any web browser
           |
           v
    React app loads, all data managed in useState
           |
           v
    Role switching, goal creation, approvals all happen in memory

Infrastructure cost: 0 dollars per month (Vercel free tier + GitHub free tier)

---

## Project Structure

```
goaltrack/
├── src/
│   ├── App.tsx          # Entire application - all components in one file
│   ├── main.tsx         # React DOM entry point
│   └── App.css          # Global base styles
├── public/
│   └── vite.svg
├── index.html           # HTML entry point for Vite
├── package.json         # Dependencies and npm scripts
├── vite.config.ts       # Vite configuration with React plugin
├── tsconfig.json        # TypeScript compiler configuration
├── tsconfig.app.json    # App-specific TypeScript settings
├── tsconfig.node.json   # Node-specific TypeScript settings
└── README.md            # This file
```

---

## Getting Started Locally

### Prerequisites

Make sure you have these installed before starting:

- Node.js version 18 or higher (download from nodejs.org)
- npm version 9 or higher (comes with Node.js)
- Git (download from git-scm.com)

Check your versions:

    node --version
    npm --version
    git --version

### Installation Steps

Step 1 - Clone the repository:

    git clone https://github.com/sricharansamala023/goaltracking.git

Step 2 - Navigate into the project folder:

    cd goaltracking

Step 3 - Install all dependencies:

    npm install

Step 4 - Start the development server:

    npm run dev

Step 5 - Open your browser and go to:

    http://localhost:5173

### Build for Production

To create an optimised production build:

    npm run build

To preview the production build locally before deploying:

    npm run preview

The built files will be in the dist folder.

---

## Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### package.json scripts

| Script | Command | What it does |
|--------|---------|-------------|
| dev | npm run dev | Starts local dev server at localhost:5173 |
| build | npm run build | Creates optimised production build in dist folder |
| preview | npm run preview | Serves the production build locally for testing |
| lint | npm run lint | Runs ESLint to check for code issues |

---

## Deployment on Vercel

This project is deployed on Vercel with automatic deployments on every push to main.

To deploy your own copy:

Step 1 - Push your code to GitHub

Step 2 - Go to vercel.com and sign in with your GitHub account

Step 3 - Click Add New Project

Step 4 - Select your GitHub repository from the list

Step 5 - Vercel auto-detects Vite. Do not change any settings.

Step 6 - Click Deploy

Step 7 - Your live URL is ready in about 60 seconds

Every time you push a new commit to GitHub, Vercel automatically rebuilds and redeploys. No manual steps needed.

---

## Data Model

### Goal Object

Each goal has these properties:

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| thrustArea | string | One of the 6 company thrust areas |
| title | string | Short goal name |
| description | string | Detailed description of success criteria |
| uom | string | Unit of measurement type |
| target | string | Numeric target value |
| weightage | number | Percentage weight, minimum 10 |
| status | string | Not Started, On Track, or Completed |
| actuals | object | Quarter to actual value mapping |
| comments | object | Quarter to manager comment mapping |

### Approval States

| State | Meaning |
|-------|---------|
| draft | Employee is still creating or editing goals |
| pending | Employee has submitted, waiting for manager review |
| approved | Manager has approved, goals are now locked |
| rejected | Manager has returned for rework, employee can edit again |

---

## Known Limitations

These are honest gaps noted for transparency:

- Data resets on page refresh because there is no database (in-memory only)
- No real authentication system, role switching uses demo account selection
- Shared Goals feature from BRD Section 2.1 is not yet implemented
- Timeline UoM uses placeholder scoring, date comparison not wired
- Manager inline editing during approval not implemented (approve or return only)
- No Microsoft Entra ID SSO integration
- No Microsoft Teams bot or email notifications
- No escalation engine for overdue submissions

---

## Evaluation Criteria Coverage

| Criteria | How GoalTrack addresses it |
|----------|---------------------------|
| Functionality | Full end-to-end flow works: employee creates goals, manager approves, check-ins logged |
| Adherence to BRD | Phase 1 and Phase 2 requirements implemented with all validation rules enforced |
| User Friendliness | Dark themed UI, clear error messages, role-specific navigation, toast notifications |
| Presence of Bugs | Validation on all forms, locked states enforced, no broken flows |
| Good-to-Have Features | Analytics via score rings, completion dashboard, CSV export |
| Cost Optimisation | Zero infrastructure cost using Vercel and GitHub free tiers |

---

## License

MIT - AtomQuest Hackathon 2026 - sricharansamala023
