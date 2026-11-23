import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Star, 
  Quote, 
  TrendingUp, 
  Building2, 
  CheckCircle2,
  Edit3,
  Eye,
  Filter
} from 'lucide-react';
import { RetentionStatusBadge, StarRating } from './StatusBadge';
import { formatCurrency, RETENTION_STATUSES } from '../constants/crmOptions';

export default function CustomerSuccessView({
  leads,
  onEditLead,
  onViewLead
}) {
  const [retentionFilter, setRetentionFilter] = useState('ALL');

  // Counts
  const activeCount = leads.filter(l => l.customerRetentionStatus === 'Active').length;
  const retainedCount = leads.filter(l => l.customerRetentionStatus === 'Retained').length;
  const upgradedCount = leads.filter(l => l.customerRetentionStatus === 'Upgraded / Expansion').length;
  const atRiskCount = leads.filter(l => l.customerRetentionStatus === 'At Risk').length;
  const churnedCount = leads.filter(l => l.customerRetentionStatus === 'Churned').length;

  const totalClients = leads.length;
  const healthScore = totalClients > 0
    ? Math.round(((activeCount + retainedCount + upgradedCount) / totalClients) * 100)
    : 100;

  // Filtered list
  const filteredClients = leads.filter(lead => {
    if (retentionFilter !== 'ALL' && lead.customerRetentionStatus !== retentionFilter) {
      return false;
    }
    return true;
  });

  const atRiskLeads = leads.filter(l => l.customerRetentionStatus === 'At Risk');

  return (
    <div className="space-y-6">
      
      {/* Retention Health Top Summary */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 mb-1">
            <HeartHandshake className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Customer Retention, CSAT & Feedback Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Monitor client health across accounts, prevent churn, and study customer testimonials.
          </p>
        </div>

        {/* Global Account Health Index */}
        <div className="flex items-center space-x-4 bg-slate-950/60 px-4 py-2.5 rounded-xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Portfolio Health</span>
            <div className="text-xl font-bold text-emerald-400">
              {healthScore}%
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">At-Risk Accounts</span>
            <div className={`text-xl font-bold ${atRiskCount > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`}>
              {atRiskCount}
            </div>
          </div>
        </div>
      </div>

      {/* Retention Status Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setRetentionFilter(retentionFilter === 'Active' ? 'ALL' : 'Active')}
          className={`p-3 rounded-xl border text-left transition ${
            retentionFilter === 'Active' ? 'bg-emerald-950/30 border-emerald-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] text-emerald-400 font-semibold block">Active Clients</span>
          <span className="text-xl font-bold text-white mt-1 block">{activeCount}</span>
        </button>

        <button
          onClick={() => setRetentionFilter(retentionFilter === 'Retained' ? 'ALL' : 'Retained')}
          className={`p-3 rounded-xl border text-left transition ${
            retentionFilter === 'Retained' ? 'bg-cyan-950/30 border-cyan-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] text-cyan-400 font-semibold block">Retained / Renewed</span>
          <span className="text-xl font-bold text-white mt-1 block">{retainedCount}</span>
        </button>

        <button
          onClick={() => setRetentionFilter(retentionFilter === 'Upgraded / Expansion' ? 'ALL' : 'Upgraded / Expansion')}
          className={`p-3 rounded-xl border text-left transition ${
            retentionFilter === 'Upgraded / Expansion' ? 'bg-purple-950/30 border-purple-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] text-purple-400 font-semibold block">Upgraded Accounts</span>
          <span className="text-xl font-bold text-white mt-1 block">{upgradedCount}</span>
        </button>

        <button
          onClick={() => setRetentionFilter(retentionFilter === 'At Risk' ? 'ALL' : 'At Risk')}
          className={`p-3 rounded-xl border text-left transition ${
            retentionFilter === 'At Risk' ? 'bg-amber-950/30 border-amber-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] text-amber-400 font-semibold block">At-Risk Clients</span>
          <span className="text-xl font-bold text-amber-300 mt-1 block">{atRiskCount}</span>
        </button>

        <button
          onClick={() => setRetentionFilter(retentionFilter === 'Churned' ? 'ALL' : 'Churned')}
          className={`p-3 rounded-xl border text-left transition ${
            retentionFilter === 'Churned' ? 'bg-rose-950/30 border-rose-500' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] text-rose-400 font-semibold block">Churned</span>
          <span className="text-xl font-bold text-white mt-1 block">{churnedCount}</span>
        </button>
      </div>

      {/* AT RISK URGENT WARNING BANNER (If any) */}
      {atRiskLeads.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Attention: {atRiskLeads.length} Account(s) Flagged "At Risk"</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {atRiskLeads.map(lead => (
              <div 
                key={lead.id}
                onClick={() => onViewLead(lead)}
                className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-amber-500/40 text-xs flex items-center space-x-2 cursor-pointer hover:bg-slate-800 transition"
              >
                <span className="font-bold text-white">{lead.companyName}</span>
                <span className="text-amber-400 text-[11px]">• CSAT: {lead.customerSatisfaction}★</span>
                <span className="text-slate-400 text-[10px]">({formatCurrency(lead.revenueGenerated)})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Feedback Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Quote className="w-3.5 h-3.5 text-indigo-400" />
            <span>Customer Testimonials & Sentiment Reviews ({filteredClients.length})</span>
          </h3>

          {retentionFilter !== 'ALL' && (
            <button
              onClick={() => setRetentionFilter('ALL')}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              Clear filter (Showing {retentionFilter})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map(lead => (
            <div
              key={lead.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 
                      onClick={() => onViewLead(lead)}
                      className="font-bold text-sm text-white hover:text-indigo-300 cursor-pointer transition"
                    >
                      {lead.companyName}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Product: {lead.serviceProductSold}
                    </span>
                  </div>
                  <RetentionStatusBadge status={lead.customerRetentionStatus} />
                </div>

                <div className="mb-2">
                  <StarRating rating={lead.customerSatisfaction} />
                </div>

                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200 italic leading-relaxed relative">
                  "{lead.customerFeedback || 'No qualitative feedback notes submitted yet.'}"
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Revenue: <strong className="text-slate-200">{formatCurrency(lead.revenueGenerated)}</strong>
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onViewLead(lead)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="View Full Profile"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onEditLead(lead)}
                    className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300"
                    title="Edit Review / Retention"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
