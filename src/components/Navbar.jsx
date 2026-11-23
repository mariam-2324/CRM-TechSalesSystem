import React from 'react';
import { 
  LayoutDashboard, 
  Table2, 
  Kanban, 
  CalendarCheck2, 
  HeartHandshake, 
  BarChart3, 
  Plus, 
  Download, 
  RotateCcw,
  Search,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  totalLeads,
  followUpsCount,
  onOpenCreateModal,
  onExportCsv,
  onResetData
}) {
  const navTabs = [
    { id: 'table', label: 'All Leads & Deals', icon: Table2, badge: totalLeads },
    { id: 'pipeline', label: 'Pipeline Board', icon: Kanban },
    { id: 'followups', label: 'Follow-ups & Meetings', icon: CalendarCheck2, badge: followUpsCount, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'retention', label: 'Customer Retention & CSAT', icon: HeartHandshake },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner & Quick Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  PulseDesk
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full tracking-wide uppercase">
                  Pro Suite
                </span>
              </div>
              <p className="text-xs text-slate-400">
                19-Point Lifecycle & Retention Management
              </p>
            </div>
          </div>

          {/* Search Bar & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Global Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company, product, source..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950/80 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Reset Demo Data */}
            <button
              onClick={onResetData}
              title="Reset to default demo data"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={onExportCsv}
              title="Export all 19 columns to CSV"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Create New Lead Button */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/25 transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs (Portions) */}
        <nav className="flex space-x-1 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/60 pt-2">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-semibold border ${
                      tab.badgeColor || (isActive ? 'bg-indigo-500/30 text-indigo-200 border-indigo-500/40' : 'bg-slate-800 text-slate-400 border-slate-700')
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
