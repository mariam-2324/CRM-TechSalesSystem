import React from 'react';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Plus,
  Eye,
  Edit3
} from 'lucide-react';
import { formatCurrency } from '../constants/crmOptions';
import { LeadSourceBadge, StarRating } from './StatusBadge';

export default function PipelineBoard({
  leads,
  onViewLead,
  onEditLead,
  onMoveStage,
  onOpenCreateModal
}) {
  // Columns definition based on CRM pipeline states
  const columns = [
    {
      id: 'new',
      title: 'New Inbound',
      subtitle: 'Uncontacted leads',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      filter: (l) => l.contacted === 'No' && l.dealStatus === 'Open'
    },
    {
      id: 'contacted',
      title: 'Contacted & Discovery',
      subtitle: 'Engagement underway',
      badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      filter: (l) => l.contacted === 'Yes' && l.proposalSent !== 'Yes' && l.dealStatus === 'Open'
    },
    {
      id: 'proposal',
      title: 'Proposal In Review',
      subtitle: 'Quotes & SLA pending',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      filter: (l) => l.proposalSent === 'Yes' && l.dealStatus === 'Open'
    },
    {
      id: 'won',
      title: 'Closed Won 🎉',
      subtitle: 'Ready for retention & onboarding',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      filter: (l) => l.dealStatus === 'Won'
    },
    {
      id: 'lost',
      title: 'Closed Lost ❌',
      subtitle: 'Analyzed with lost reason',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      filter: (l) => l.dealStatus === 'Lost'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Visual Sales Pipeline & Progression Board</h2>
          <p className="text-xs text-slate-400">Track deal velocity from initial inquiry to closed-won retention.</p>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 items-start">
        {columns.map(col => {
          const colLeads = leads.filter(col.filter);
          const colTotalRevenue = colLeads.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);

          return (
            <div
              key={col.id}
              className="rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col max-h-[800px] overflow-hidden"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-800/80 bg-slate-900/90">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-white tracking-tight">
                    {col.title}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${col.badgeColor}`}>
                    {colLeads.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{col.subtitle}</span>
                  <span className="font-semibold text-slate-300">{formatCurrency(colTotalRevenue)}</span>
                </div>
              </div>

              {/* Cards List */}
              <div className="p-2.5 space-y-2.5 overflow-y-auto flex-1 max-h-[680px]">
                {colLeads.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
                    No deals in this stage
                  </div>
                ) : (
                  colLeads.map(lead => (
                    <div
                      key={lead.id}
                      className="p-3 rounded-lg bg-slate-950/90 border border-slate-800/90 hover:border-slate-700 shadow-sm transition group"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <span 
                          onClick={() => onViewLead(lead)}
                          className="font-semibold text-xs text-white hover:text-indigo-300 cursor-pointer transition line-clamp-1"
                        >
                          {lead.companyName}
                        </span>
                        <div className="flex items-center space-x-1 shrink-0">
                          <button
                            onClick={() => onViewLead(lead)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                            title="View"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onEditLead(lead)}
                            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                            title="Edit"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Product Name */}
                      <p className="text-[11px] text-slate-400 mb-2 truncate">
                        {lead.serviceProductSold || 'General Inbound'}
                      </p>

                      {/* Tags Bar */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        <LeadSourceBadge source={lead.leadSource} />
                        {lead.followUpRequired === 'Yes' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Follow-up
                          </span>
                        )}
                        {lead.meetingScheduled && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5" />
                            Meeting
                          </span>
                        )}
                      </div>

                      {/* Financial & Status Footer */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">
                          {formatCurrency(lead.revenueGenerated)}
                        </span>

                        {/* Quick Progression Controls */}
                        <div className="flex items-center space-x-1">
                          {col.id === 'new' && (
                            <button
                              onClick={() => onMoveStage(lead.id, { contacted: 'Yes' })}
                              className="px-2 py-0.5 rounded text-[10px] bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:bg-blue-600/50 flex items-center gap-1"
                              title="Mark Contacted"
                            >
                              <span>Contact</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}

                          {col.id === 'contacted' && (
                            <button
                              onClick={() => onMoveStage(lead.id, { proposalSent: 'Yes', proposalStatus: 'Pending' })}
                              className="px-2 py-0.5 rounded text-[10px] bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 flex items-center gap-1"
                              title="Send Proposal"
                            >
                              <span>Proposal</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}

                          {col.id === 'proposal' && (
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => onMoveStage(lead.id, { dealStatus: 'Won', proposalStatus: 'Accepted', conversionStatus: 'Converted', successStatus: 'Successful' })}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 flex items-center gap-0.5"
                                title="Mark Won"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                <span>Won</span>
                              </button>
                              <button
                                onClick={() => onMoveStage(lead.id, { dealStatus: 'Lost', proposalStatus: 'Rejected', conversionStatus: 'Not Converted', successStatus: 'Unsuccessful' })}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-rose-600/30 text-rose-300 border border-rose-500/40 hover:bg-rose-600/50 flex items-center gap-0.5"
                                title="Mark Lost"
                              >
                                <XCircle className="w-3 h-3 text-rose-400" />
                                <span>Lost</span>
                              </button>
                            </div>
                          )}

                          {col.id === 'won' && (
                            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Active Retained
                            </span>
                          )}

                          {col.id === 'lost' && (
                            <span className="text-[10px] text-rose-400 truncate max-w-[90px]" title={lead.lostDealReason}>
                              {lead.lostDealReason ? lead.lostDealReason.split(' ')[0] : 'Lost'}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
