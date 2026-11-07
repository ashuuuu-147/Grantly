# GRANTLY — Rethinking the Scholarship Experience

> A premium education-fintech platform prototype designed for higher education scholars worldwide.
> Built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Recharts**.

---

## 🌟 Executive Summary

Traditional scholarship search is fragmented, spam-ridden, and opaque. **GRANTLY** replaces guesswork with intelligence:

- **100% Frontend Only**: Zero external databases or backend server dependencies required.
- **Smart Local Eligibility Engine**: Client-side criteria scoring that compares student credentials against 18 multi-attribute scholarship rubrics.
- **Unified Application Pipeline**: Interactive Kanban tracking, dynamic per-scholarship document checklists, and personal milestone notes.
- **Peach + Coral Visual Identity**: A warm, trustworthy, and student-focused aesthetic with instant light/dark theme switching and LocalStorage persistence.

---

## 🚀 Key Features by Phase

### 1. Landing Experience (Phase 3)
- **Dynamic Navbar**: Transparent-to-glass scroll transition, animated tab indicators, theme toggle, and demo sign-in trigger.
- **Interactive Hero**: Word-by-word headline reveal (*"Your Future Deserves Funding."*), layered SVG/card composition with floating grant awards and notification badges.
- **Live Statistics**: Animated counters showcasing scholarships cataloged, student explorers, and tracked milestones.
- **How It Works**: 4-step connected journey from profile to award.
- **Curated Grants Showcase**: Real-time category filtering (`STEM & Research`, `Merit-Based`, `Women in Tech`, `Need-Based`) with live bookmarking.
- **Interactive FAQ & Benefits**: Accordion answers and value propositions.

### 2. Student Dashboard (Phase 4)
- **Scholar Welcome Widget**: Personalized greeting, profile completion meter, and quick-action navigation.
- **Live Metric Cards**: Interactive counters derived from real state (Saved Grants, Active Workflows, Upcoming Deadlines, Potential Award Value).
- **Application Analytics**: Interactive **Recharts** visualizations (Donut by Status, Bar by Category, Area for Milestone Progress).
- **Recommended Grants**: Tailored suggestions based on current major and GPA with explicit matching explanations.
- **Upcoming Deadlines List**: Chronological submission dates with urgency badges.

### 3. Scholarship Discovery Engine (Phase 5)
- **18 Realistic Sample Programs**: High-value opportunities across undergraduate, graduate, and doctoral tracks.
- **Multi-Faceted Sidebar Filters**:
  - Keyword search across titles, descriptions, courses, and tags.
  - Scholarship Category.
  - Target Education Level.
  - Minimum Academic Percentage Slider (65% – 95%+).
  - Maximum Household Income Cap Slider ($50k – $200k+).
  - Multi-attribute sorting (Highest Award, Nearest Deadline, Relevance).
- **Interactive Cards**: Bookmark toggle, eligibility summary, and animated hover lift.
- **Zero-Data State**: Intelligent empty state with 1-click filter reset.

### 4. Comprehensive Grant Details (Phase 6)
- **Dynamic Routing**: Accessible at `/scholarship/:id`.
- **Award Overview**: Grant value, application cutoff, education level, and income limits.
- **Structured Sections**: Program Overview, Benefits Coverage, Mandatory Requirements, Required Documents List, and Step-by-Step Submission Roadmap.
- **Quick Actions Panel**: Direct bookmarking, 1-click addition to application tracker, and official provider external links.
- **Official Disclaimer**: Clear demonstration notice.

### 5. Smart Eligibility Checker (Phase 7)
- **4-Step Wizard**:
  - *Step 1*: Personal & Demographic Details (Name, State, Household Income).
  - *Step 2*: Educational Level & Course of Study.
  - *Step 3*: Academic Standing, GPA, and Percentage.
  - *Step 4*: Review & Algorithmic Execution.
- **Matching Categories**:
  - **Direct Matches**: 100% baseline criteria satisfied.
  - **Possible Matches**: Minor prerequisites or verification needed.
  - **Not Matching**: Clear explanation of missing criteria thresholds.

### 6. Application Tracker & Saved Grants (Phase 8)
- **Status Workflow**: Filter by `Saved`, `In Progress`, `Submitted`, `Approved`, `Rejected`.
- **Dynamic Document Checklist**: Check off transcripts, faculty references, and IDs with real-time percentage recalculation.
- **Personal Notes Editor**: Record submission IDs and interview dates.
- **Removal Safeguard**: Confirmation dialog before clearing an application.
- **Saved Scholarships View**: Searchable bookmarks with 1-click addition to tracker.

### 7. Deadline Planner, Profile & Settings (Phase 9)
- **Chronological & Calendar Views**: Switch between sequential list and monthly grid with month-by-month navigation.
- **Editable Student Profile**: Live modification of GPA, course, state, and income with instant LocalStorage sync.
- **Platform Settings**: Theme toggle, LocalStorage key transparency, and Reset Demo Data confirmation modal.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI framework with concurrent rendering |
| **Vite 6** | Ultra-fast development server & production bundler |
| **Tailwind CSS v4** | Utility-first styling with `@theme` token bindings |
| **Framer Motion 12** | Hardware-accelerated transitions & floating micro-motion |
| **Recharts 2.15** | Interactive SVG charts for student pipeline analytics |
| **Lucide React** | Clean, accessible iconography |
| **HTML5 LocalStorage** | Zero-latency, client-side state persistence |

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone or navigate to the repository
cd Grantly

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start on **`http://localhost:3000/`**.

### Production Build
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🏆 Hackathon Demonstration Script (3-Minute Tour)

1. **The Problem & First Impression**:
   - Open **`http://localhost:3000/`**.
   - Point out the headline reveal: *"Your Future Deserves Funding."*
   - Scroll through the 4-step visual journey, sample metrics, and interactive FAQ.
2. **Explore Scholarships**:
   - Click **Explore Scholarships** in the navbar.
   - Adjust the **Min Academic Score** slider to `85%` and select `STEM & Research`.
   - Notice the instant, zero-lag local filter results.
3. **Inspect a Detailed Grant**:
   - Click **View Details** on the *Global Turing Fellowship*.
   - Review the required document checklist, award breakdown, and eligibility rubrics.
   - Click **Bookmark** (notice the live toast confirmation!).
   - Click **Add to My Applications** (automatically routes into your pipeline).
4. **Smart Eligibility Matching**:
   - Navigate to **Eligibility** in the top bar.
   - Complete Steps 1 through 3 (Personal, Course, GPA).
   - Click **Calculate Grant Matches Now**.
   - Show the categorized breakdown (**Direct Matches**, **Possible Matches**, **Not Matching**) with exact matching reasons.
5. **Application Management & Document Checklist**:
   - Go to **Applications**.
   - Check off a document item (e.g. *Official Academic Transcript*). Notice the progress bar immediately advance!
   - Update an application status from *In Progress* to *Submitted*.
6. **Student Dashboard & Analytics**:
   - Go to **Dashboard**.
   - Observe the updated financial stats and interactive Recharts visualizations (toggle between *By Status*, *Categories*, and *Progress %*).
7. **Theme Switcher & LocalStorage**:
   - Click the **Sun/Moon** icon in the navbar.
   - Refresh the page to prove instant theme and data persistence without any backend!

---

## 📄 License & Disclaimer

*GRANTLY is an educational software demonstration prototype. All grant figures, provider names, and dates are realistic demonstration records for evaluation purposes.*

