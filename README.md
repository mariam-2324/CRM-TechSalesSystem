# NexusCRM — Modern Enterprise Sales & Customer Retention CRM

A modern, responsive CRM web application built with **React**, **Vite**, and **Tailwind CSS**. It incorporates comprehensive lifecycle tracking across all 19 required parameters, smooth CRUD operations, pipeline management, sales follow-ups, and customer retention analytics.

---

## 🌟 The 19 Core CRM Attributes Tracked

1. **Company Name**: Lead / Organization identification.
2. **Lead Source**: Channel attribution (Google, LinkedIn, Referral, Conference, Organic, Cold Outreach, Partner).
3. **Contacted**: Outreach completion status (`Yes` / `No`).
4. **Contact Method**: Preferred medium (`Email`, `Call`, `LinkedIn`, `In-Person Meeting`, `Video Conference`).
5. **Email Sent**: Specific confirmation if outreach materials/proposals were emailed (`Yes` / `No`).
6. **Follow-up Required**: Urgent status marker with 1-click toggling (`Yes` / `No`).
7. **Meeting Scheduled**: Scheduled calendar date & time for discovery/demo.
8. **Proposal Sent**: Contract / Quote dispatched status (`Yes` / `No`).
9. **Proposal Status**: State of the proposal (`Pending`, `Accepted`, `Rejected`, `Draft / Not Sent`).
10. **Deal Status**: Current commercial standing (`Open`, `Won`, `Lost`).
11. **Deal Closing Date**: Targeted or confirmed closing date (YYYY-MM-DD).
12. **Service / Product Sold**: The specific solution offering (e.g., *Enterprise SaaS Suite*, *Cloud Infrastructure Consulting*, *Custom AI Integration*, etc.).
13. **Revenue Generated**: Total contract value ($ USD).
14. **Conversion Status**: Commercial conversion standing (`Converted` / `Not Converted`).
15. **Success Status**: Outcome rating (`Successful` / `Unsuccessful`).
16. **Lost Deal Reason**: Post-mortem reason if deal lost (*Pricing / Budget*, *Competitor Chosen*, *Missing Feature*, *Project Postponed*, *Ghosted*).
17. **Customer Feedback**: Verbatim qualitative client reviews and feedback.
18. **Customer Satisfaction (CSAT)**: 1-to-5 star rating evaluation.
19. **Customer Retention Status**: Post-sale account health (`Active`, `Retained`, `At Risk`, `Churned`, `Upgraded / Expansion`).

---

## 🚀 Key Modules & Tabs (Portions)

1. **All Leads & Deals (Table View)**:
   - Full CRUD table view with sorting and instant search.
   - Granular multi-filter: by Deal Status, Lead Source, Retention Health, and Follow-up urgency.
   - Quick 1-click toggles for follow-up flags.
   - Row actions: **View 360° Profile**, **Edit**, and **Delete**.

2. **Sales Pipeline (Kanban Board)**:
   - 5 visual stages: *New Inbound* ➔ *Contacted & Discovery* ➔ *Proposal In Review* ➔ *Closed Won* ➔ *Closed Lost*.
   - Quick 1-click stage advancement buttons.

3. **Follow-ups & Meetings Hub**:
   - High-priority daily operational view for sales reps.
   - Highlights pending follow-ups with instant completion checkoffs.
   - Chronological schedule of upcoming discovery/demo meetings.

4. **Customer Retention & CSAT**:
   - Portfolio health index and real-time At-Risk account warnings.
   - Customer feedback wall showcasing verbatim testimonials with star ratings.
   - Filter by retention status (`Active`, `Retained`, `At Risk`, `Churned`).

5. **Analytics & Insights Dashboard**:
   - Revenue contribution breakdown by Service / Product Sold.
   - Lead Source channel efficiency and conversion rates.
   - Lost deal root-cause breakdown for sales retrospective.
   - CSAT 1–5 star rating distribution.

6. **Data Portability & Persistence**:
   - Built-in `localStorage` persistence saves all additions, edits, and deletions automatically.
   - **Export CSV**: One-click download of the complete 19-column dataset.
   - **Reset Demo Data**: Quick option to reset back to rich starter demonstration records.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation & Run

```bash
# Navigate to project directory
cd react-crm

# Install dependencies (already installed)
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Production Build

```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

---

## 📂 Project Structure

```text
react-crm/
├── src/
│   ├── components/
│   │   ├── AnalyticsView.jsx        # Revenue, source ROI & lost reasons
│   │   ├── CustomerSuccessView.jsx  # Retention metrics, CSAT & testimonials
│   │   ├── DeleteConfirmModal.jsx   # Safe deletion confirmation modal
│   │   ├── FollowUpManager.jsx      # Daily sales follow-ups & meeting schedule
│   │   ├── LeadDetailDrawer.jsx     # 360-degree company profile modal
│   │   ├── LeadModal.jsx            # Create & Edit modal (all 19 fields)
│   │   ├── LeadsTable.jsx           # Filterable CRUD table with badges
│   │   ├── Navbar.jsx               # Header, search, tabs & actions
│   │   ├── PipelineBoard.jsx        # Kanban pipeline board
│   │   ├── StatsOverview.jsx        # High-impact KPI stat cards
│   │   └── StatusBadge.jsx          # Reusable status badges & star ratings
│   ├── constants/
│   │   └── crmOptions.js            # Predefined options for all 19 fields
│   ├── data/
│   │   └── defaultData.js           # 12 diverse, realistic B2B sample leads
│   ├── utils/
│   │   └── exportCsv.js             # 19-column CSV exporter
│   ├── App.jsx                      # Main state management & CRUD orchestration
│   ├── index.css                    # Tailwind CSS imports & global styles
│   └── main.jsx                     # React entry point
├── package.json
└── vite.config.js
```
