# GoalTrack - Enterprise Performance Management Portal

AtomQuest Hackathon 2026 | Built with React + TypeScript + Vite

GoalTrack is a role-based performance management portal that lets employees set SMART goals, managers review and approve them, and admins monitor org-wide progress.

## Live Demo

Live URL: https://goaltracking-diwl.vercel.app

GitHub: https://github.com/sricharansamala023/goaltracking

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

## Features

| Role | Capabilities |
|------|-------------|
| Employee | Create goals, set weightage, submit for approval, log quarterly actuals |
| Manager | Review team goals, approve or return, add quarterly check-in comments |
| Admin | Org-wide overview, cycle management, CSV export, audit trail |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Inline CSS |
| State | React useState |
| Hosting | Vercel free tier |
| Source Control | GitHub |

## Getting Started

Install dependencies and run locally:

    git clone https://github.com/sricharansamala023/goaltracking.git
    cd goaltracking
    npm install
    npm run dev

Open http://localhost:5173 in your browser.

## Validation Rules

- Maximum 8 goals per employee
- Minimum 10 percent weightage per goal
- Total weightage must equal 100 percent before submission
- Goals are locked once approved
- Actuals can only be entered after goals are approved

## License

MIT - AtomQuest Hackathon 2026
