import React, { useState } from 'react';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  Check, 
  X, 
  Filter, 
  ArrowUpDown, 
  Clock, 
  Sparkles,
  Building2,
  DollarSign
} from 'lucide-react';
import { 
  DealStatusBadge, 
  ProposalStatusBadge, 
  RetentionStatusBadge, 
  BooleanBadge, 
  LeadSourceBadge, 
  StarRating 
} from './StatusBadge';
import { 
  formatCurrency, 
  LEAD_SOURCES, 
  DEAL_STATUSES, 
  RETENTION_STATUSES 
} from '../constants/crmOptions';

export default function LeadsTable({
  leads,
  searchQuery,
  onViewLead,
  onEditLead,
  onDeleteLead,
  onToggleFollowUp,
  onQuickStatusChange
}) {
  // Local Filter States
  const [dealStatusFilter, setDealStatusFilter] = useState('ALL');
  const [leadSourceFilter, setLeadSourceFilter] = useState('ALL');
  const [retentionFilter, setRetentionFilter] = useState('ALL');
  const [followUpOnly, setFollowUpOnly] = useState(false);
  const [sortField, setSortField] = useState('companyName');
  const [sortAsc, setSortAsc] = useState(true);

  // Apply Search & Filters
  const filteredLeads = leads.filter(lead => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = (lead.companyName || '').toLowerCase().includes(q);
      const matchProduct = (lead.serviceProductSold || '').toLowerCase().includes(q);
      const matchSource = (lead.leadSource || '').toLowerCase().includes(q);
      const matchFeedback = (lead.customerFeedback || '').toLowerCase().includes(q);
      if (!matchName && !matchProduct && !matchSource && !matchFeedback) return false;
    }

    // Filter by Deal Status
    if (dealStatusFilter !== 'ALL' && lead.dealStatus !== dealStatusFilter) {
      return false;
    }

    // Filter by Lead Source
    if (leadSourceFilter !== 'ALL' && lead.leadSource !== leadSourceFilter) {
      return false;
    }

    // Filter by Retention Status
    if (retentionFilter !== 'ALL' && lead.customerRetentionStatus !== retentionFilter) {
      return false;
    }

    // Filter by Follow-up required
    if (followUpOnly && lead.followUpRequired !== 'Yes') {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'revenueGenerated' || sortField === 'customerSatisfaction') {
      aVal = Number(aVal) || 0;
      bVal = Number(bVal) || 0;
    } else {
      aVal = String(aVal || '').toLowerCase();
      bVal = String(bVal || '').toLowerCase();
    }

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const clearAllFilters = () => {
    setDealStatusFilter('ALL');
    setLeadSourceFilter('ALL');
    setRetentionFilter('ALL');
    setFollowUpOnly(false);
  };

  const hasActiveFilters = dealStatusFilter !== 'ALL' || leadSourceFilter !== 'ALL' || retentionFilter !== 'ALL' || followUpOnly;

  return (
    <div className="space-y-4">
      {/* Table Filter Controls Header */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium mr-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Filters:</span>
          </div>

          {/* Deal Status Filter */}
          <select
            value={dealStatusFilter}
            onChange={(e) => setDealStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Deal Statuses</option>
            {DEAL_STATUSES.map(s => (
              <option key={s} value={s}>{s} Deals</option>
            ))}
          </select>

          {/* Lead Source Filter */}
          <select
            value={leadSourceFilter}
            onChange={(e) => setLeadSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Lead Sources</option>
            {LEAD_SOURCES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Retention Filter */}
          <select
            value={retentionFilter}
            onChange={(e) => setRetentionFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-700 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Retention States</option>
            {RETENTION_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Follow-up Only Toggle Chip */}
          <button
            onClick={() => setFollowUpOnly(!followUpOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              followUpOnly 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
            }`}
          >
            Follow-up Required Only
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-white">{sortedLeads.length}</span> of {leads.length} records
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm">
        <table className="w-full text-left text-xs text-slate-300 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 select-none">
              <th 
                onClick={() => handleSort('companyName')}
                className="py-3 px-4 font-semibold cursor-pointer hover:text-white transition"
              >
                <div className="flex items-center space-x-1">
                  <span>Company / Product</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3 px-3 font-semibold">Lead Source</th>

              <th className="py-3 px-3 font-semibold">Outreach Status</th>

              <th className="py-3 px-3 font-semibold">Follow-up / Meeting</th>

              <th 
                onClick={() => handleSort('dealStatus')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white transition"
              >
                <div className="flex items-center space-x-1">
                  <span>Deal / Proposal</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('revenueGenerated')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white transition text-right"
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Revenue</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th 
                onClick={() => handleSort('customerSatisfaction')}
                className="py-3 px-3 font-semibold cursor-pointer hover:text-white transition"
              >
                <div className="flex items-center space-x-1">
                  <span>Retention / CSAT</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {sortedLeads.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Building2 className="w-8 h-8 text-slate-600 mb-1" />
                    <p className="text-sm font-medium text-slate-300">No leads match your search criteria</p>
                    <p className="text-xs text-slate-500">Try adjusting your filters or search keywords</p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="mt-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead) => {
                const isFollowUp = lead.followUpRequired === 'Yes';
                return (
                  <tr 
                    key={lead.id}
                    className="hover:bg-slate-800/40 transition duration-150 group"
                  >
                    {/* Company & Product */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white group-hover:text-indigo-300 transition text-sm">
                        {lead.companyName}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[220px]">
                        {lead.serviceProductSold || 'No product assigned'}
                      </div>
                    </td>

                    {/* Lead Source */}
                    <td className="py-3.5 px-3">
                      <LeadSourceBadge source={lead.leadSource} />
                    </td>

                    {/* Outreach Status: Contacted, Method, Email Sent */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-1 text-[11px]">
                          <span className="text-slate-400">Contacted:</span>
                          <BooleanBadge value={lead.contacted} />
                        </div>
                        <div className="text-[10px] text-slate-400">
                          via <span className="text-slate-300 font-medium">{lead.contactMethod}</span>
                          {lead.emailSent === 'Yes' && ' • Email sent'}
                        </div>
                      </div>
                    </td>

                    {/* Follow-up Required & Meeting Scheduled */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => onToggleFollowUp(lead.id)}
                            title="Click to toggle follow-up state"
                            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                              isFollowUp
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span>Follow-up: {lead.followUpRequired}</span>
                          </button>
                        </div>
                        {lead.meetingScheduled ? (
                          <div className="inline-flex items-center space-x-1 text-[10px] text-cyan-300">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            <span>{new Date(lead.meetingScheduled).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500">No meeting booked</span>
                        )}
                      </div>
                    </td>

                    {/* Deal & Proposal Status */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-1.5">
                          <DealStatusBadge status={lead.dealStatus} />
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                          <span>Proposal:</span>
                          <ProposalStatusBadge status={lead.proposalStatus} />
                        </div>
                      </div>
                    </td>

                    {/* Revenue Generated */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="font-semibold text-white">
                        {formatCurrency(lead.revenueGenerated)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Close: {lead.dealClosingDate || 'TBD'}
                      </div>
                    </td>

                    {/* Customer Retention & CSAT */}
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col space-y-1">
                        <RetentionStatusBadge status={lead.customerRetentionStatus} />
                        <StarRating rating={lead.customerSatisfaction} />
                      </div>
                    </td>

                    {/* Row Action Buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => onViewLead(lead)}
                          title="View 360° Profile"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 hover:text-indigo-300 text-slate-300 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditLead(lead)}
                          title="Edit Lead"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 hover:text-emerald-300 text-slate-300 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteLead(lead)}
                          title="Delete Lead"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 hover:text-rose-300 text-slate-300 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
