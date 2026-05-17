# 🎯 GoalTrack — Enterprise Performance Management Platform

> **AtomQuest Hackathon 1.0** · Built with React + TypeScript

GoalTrack is a role-based performance management portal that lets employees set SMART goals, managers review and approve them, and admins monitor org-wide progress — all in one dark-themed, animated UI.

---

## ✨ Features

| Role | Capabilities |
|------|-------------|
| **Employee** | Create/edit goals (max 8), set weightage (must total 100%), submit for approval, log quarterly actuals |
| **Manager** | Review team goal sheets, approve/return submissions, add quarterly coaching notes via check-ins |
| **Admin** | Org-wide progress overview, performance cycle management, CSV report export, audit trail |

### Core Modules
- **Goal Setting** — SMART goals mapped to 6 thrust areas with UoM-based targets
- **Approval Workflow** — Draft → Pending → Approved / Returned lifecycle
- **Achievement Tracking** — Quarterly actuals with auto-computed performance scores
- **Check-ins** — Manager coaching notes per goal per quarter
- **Analytics** — Score rings, progress bars, stat cards per employee
- **Audit Log** — Timestamped trail of all system actions
- **CSV Export** — Full achievement report downloadable from Admin panel

---

## 🏗️ Project Structure

```
goaltrack/
├── src/
│   └── App.tsx          # Main application (single-file architecture)
├── public/
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

> **Note:** The current codebase is a single-file React component (`App.tsx`). For production, it's recommended to split into the module structure described in the [Refactoring Guide](#-recommended-refactor-structure) below.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ or **yarn** v1.22+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/goaltrack.git
cd goaltrack

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📦 Required Dependencies

### Core

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

### Build Tool (Vite — recommended)

```bash
npm install -D vite @vitejs/plugin-react
```

### Optional but Recommended

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D prettier
```

### Full `package.json` scaffold

```json
{
  "name": "goaltrack",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
```

---

## ⚙️ Configuration Files Needed

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### `tsconfig.json`

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

### `index.html` (in project root)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GoalTrack — AtomQuest</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/main.tsx`

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

## 👤 Demo Accounts

| Name | Role | Department |
|------|------|------------|
| Swapna | Employee | Engineering |
| Arjun Kumar | Employee | Engineering |
| Ananya Iyer | Employee | Sales |
| Sricharan S | Manager | Engineering |
| Manohar Singh | Manager | Sales |
| HR Admin | Admin | HR |

> No passwords required — select any account on the login screen to explore that role's view.

---

## 📐 Data Model

### Goal Object

```typescript
interface Goal {
  id: string;
  thrustArea: ThrustArea;
  title: string;
  description: string;
  uom: UoMType;           // Unit of Measurement
  target: string;
  weightage: number;      // 10–100, all goals must sum to 100
  status: GoalStatus;
  actuals: Record<Quarter, string>;   // { "Q1 (July)": "85" }
  comments: Record<Quarter, string>;  // Manager coaching notes
}
```

### Approval States

```
draft → pending → approved
                ↘ rejected (returned to employee)
```

### Performance Score Formula

| UoM Type | Formula |
|----------|---------|
| Numeric (Min) | `min((actual / target) × 100, 150)` |
| Numeric (Max) | `min((target / actual) × 100, 150)` |
| % (Min/Max) | Same as Numeric equivalents |
| Zero-based | `100` if actual = 0, else `0` |
| Timeline | Manual entry |

---

## 🎨 Thrust Areas

| Icon | Area |
|------|------|
| 🏆 | Product Quality |
| 📈 | Revenue Growth |
| ⭐ | Customer Experience |
| ⚡ | Operational Efficiency |
| 🤝 | People & Culture |
| 💡 | Innovation |

---

##  Recommended Refactor Structure

For maintainability beyond the hackathon, split the single file into:

```
src/
├── main.tsx
├── App.tsx
├── constants/
│   └── index.ts          # USERS, THRUST_AREAS, QUARTERS, etc.
├── types/
│   └── index.ts          # Goal, User, Approval interfaces
├── utils/
│   └── scoring.ts        # computeScore(), genId()
├── components/
│   ├── ui/
│   │   ├── Avatar.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Chip.tsx
│   │   ├── Ring.tsx
│   │   ├── Bar.tsx
│   │   ├── StatCard.tsx
│   │   └── Empty.tsx
│   ├── GoalCard.tsx
│   └── GoalModal.tsx
├── views/
│   ├── Login.tsx
│   ├── employee/
│   │   ├── EmpGoals.tsx
│   │   └── EmpActuals.tsx
│   ├── manager/
│   │   ├── MgrTeam.tsx
│   │   └── MgrCheckin.tsx
│   └── admin/
│       ├── AdminOverview.tsx
│       ├── AdminReports.tsx
│       ├── AdminCycle.tsx
│       └── AuditLog.tsx
└── styles/
    └── global.css
```

---

## Future Enhancements

- [ ] **Backend integration** — REST API or Firebase for persistent data
- [ ] **Authentication** — Real login with JWT / SSO
- [ ] **Notifications** — Email alerts on approval/rejection
- [ ] **Charts** — Recharts/Chart.js for org-wide analytics dashboard
- [ ] **PDF export** — Individual goal sheets as downloadable PDFs
- [ ] **Multi-cycle support** — Archive previous performance years
- [ ] **Mobile responsiveness** — Responsive layout for tablet/phone

---

## Validation Rules

- Maximum **8 goals** per employee
- Minimum **10% weightage** per goal
- Total weightage must equal **100%** before submission
- Goals are **locked** once approved — no edits allowed
- Actuals can only be entered after goals are **Approved**

---

##  License

MIT © AtomQuest Hackathon 1.0 Team

---

> Built with for AtomQuest Hackathon 1.0 · React 18 · TypeScript · Vite