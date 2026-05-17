# GoalTrack - Enterprise Performance Management Portal

> AtomQuest Hackathon 2026 | Built with React + TypeScript + Vite

GoalTrack is a role-based performance management portal that lets employees set SMART goals, managers review and approve them, and admins monitor org-wide progress.

---

## Live Demo

- **Live URL:**https://goaltracking-diwl.vercel.app/
- **GitHub:** https://github.com/sricharansamala023/goaltracking

---

## Demo Accounts

No password required. Select any account on the login screen.

| Name | Role | Department |
|------|------|------------|
| Swapna | Employee | Engineering |
| Arjun Kumar | Employee | Engineering |
| Ananya Iyer | Employee | Sales |
| Sricharan S | Manager | Engineering |
| Manohar Singh | Manager | Sales |
| HR Admin | Admin | HR |

---

## Features

| Role | Capabilities |
|------|-------------|
| Employee | Create goals, set weightage, submit for approval, log quarterly actuals |
| Manager | Review team goals, approve or return, add quarterly check-in comments |
| Admin | Org-wide overview, cycle management, CSV export, audit trail |

### What is built

- Goal Setting with 6 Thrust Areas and UoM-based targets
- Approval Workflow: Draft to Pending to Approved or Returned
- Achievement Tracking with quarterly actuals and auto-computed scores
- Manager Check-ins with coaching notes per goal per quarter
- Performance Score Rings with visual progress bars
- CSV Export for full achievement report
- Audit Log with timestamped trail of all actions
- Cycle Management with quarterly schedule view

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Inline CSS (no external library) |
| State | React useState (in-memory) |
| Hosting | Vercel (free tier) |
| Source Control | GitHub |

---

## Project Structure

```
goaltrack/
├── src/
│   ├── App.tsx          # Main application
│   ├── main.tsx         # React DOM entry point
│   └── App.css          # Global styles
├── public/
│   └── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Getting Started Locally

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sricharansamala023/goaltracking.git
cd goaltracking

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

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
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

---

## Validation Rules

- Maximum 8 goals per employee
- Minimum 10% weightage per goal
- Total weightage must equal 100% before submission
- Goals are locked once approved
- Actuals can only be entered after goals are approved

---

## Performance Score Formula

| UoM Type | Formula |
|----------|---------|
| Numeric (Min) | min((actual / target) x 100, 150) |
| Numeric (Max) | min((target / actual) x 100, 150) |
| Zero-based | 100 if actual = 0, else 0 |

---

## Thrust Areas

| Area | Description |
|------|-------------|
| Product Quality | Bug reduction, quality metrics |
| Revenue Growth | Sales targets, business growth |
| Customer Experience | CSAT, NPS, support quality |
| Operational Efficiency | Process improvement, cost reduction |
| People and Culture | Training, team engagement |
| Innovation | New ideas, R&D initiatives |

---

## Deployment

This project is deployed on Vercel. Every push to the main branch auto-deploys.

To deploy your own copy:

1. Fork this repository
2. Go to vercel.com and sign in with GitHub
3. Click Add New Project and import the forked repo
4. Click Deploy - Vercel auto-detects Vite settings
5. Your live URL is ready in about 60 seconds

---

## License

MIT - AtomQuest Hackathon 2026
