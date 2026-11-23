import React from 'react';
import { 
  CalendarCheck2, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Phone, 
  Video, 
  Share2,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../constants/crmOptions';
import { DealStatusBadge, LeadSourceBadge } from './StatusBadge';

export default function FollowUpManager({
  leads,
  onToggleFollowUp,
  onEditLead,
  onViewLead
}) {
  const followUpLeads = leads.filter(l => l.followUpRequired === 'Yes');
  const meetingLeads = leads.filter(l => Boolean(l.meetingScheduled)).sort((a, b) => {
    return new Date(a.meetingScheduled) - new Date(b.meetingScheduled);
  });

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 mb-1">
            <Clock className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Action Priority: Follow-ups & Scheduled Meetings
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Never let a prospect slip away. Complete pending follow-up tasks and review upcoming client calendar events.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/25 text-center">
            <span className="text-lg font-bold text-amber-300 block leading-tight">{followUpLeads.length}</span>
            <span className="text-[10px] text-amber-400/80 font-medium uppercase tracking-wider">Follow-ups Due</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-center">
            <span className="text-lg font-bold text-cyan-300 block leading-tight">{meetingLeads.length}</span>
            <span className="text-[10px] text-cyan-400/80 font-medium uppercase tracking-wider">Meetings Set</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Pending Follow-ups */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Pending Follow-ups Required ({followUpLeads.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500">Requires agent contact</span>
          </div>

          <div className="space-y-2.5">
            {followUpLeads.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-xs font-semibold text-slate-300">All caught up!</p>
                <p className="text-[11px] text-slate-500 mt-1">No pending follow-ups required at this moment.</p>
              </div>
            ) : (
              followUpLeads.map(lead => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/20 hover:border-amber-500/40 transition shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span 
                          onClick={() => onViewLead(lead)}
                          className="font-bold text-sm text-white hover:text-indigo-300 cursor-pointer transition"
                        >
                          {lead.companyName}
                        </span>
                        <DealStatusBadge status={lead.dealStatus} />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Product: {lead.serviceProductSold} • Potential: {formatCurrency(lead.revenueGenerated)}
                      </p>
                    </div>

                    <LeadSourceBadge source={lead.leadSource} />
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800 text-xs gap-2">
                    <div className="text-slate-400 text-[11px]">
                      Contact Method: <strong className="text-slate-200">{lead.contactMethod}</strong>
                      {lead.emailSent === 'Yes' && ' • Email Sent'}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEditLead(lead)}
                        className="px-2.5 py-1 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => onToggleFollowUp(lead.id)}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded text-xs font-semibold bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/50 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Followed-Up</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Scheduled Meetings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Upcoming Scheduled Meetings ({meetingLeads.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500">Chronological</span>
          </div>

          <div className="space-y-2.5">
            {meetingLeads.length === 0 ? (
              <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-300">No scheduled meetings</p>
                <p className="text-[11px] text-slate-500 mt-1">Book discovery or demo calls from the Lead modal.</p>
              </div>
            ) : (
              meetingLeads.map(lead => {
                const meetingDate = new Date(lead.meetingScheduled);
                const isPast = meetingDate < new Date();

                return (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-xl bg-slate-900/80 border transition shadow-sm space-y-3 ${
                      isPast ? 'border-slate-800 opacity-80' : 'border-cyan-500/25 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span 
                            onClick={() => onViewLead(lead)}
                            className="font-bold text-sm text-white hover:text-cyan-300 cursor-pointer transition"
                          >
                            {lead.companyName}
                          </span>
                          <DealStatusBadge status={lead.dealStatus} />
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lead.serviceProductSold}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{meetingDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <div className="text-slate-400 text-[11px]">
                        Proposal: <strong className="text-slate-200">{lead.proposalStatus}</strong>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onViewLead(lead)}
                          className="px-2.5 py-1 rounded text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                        >
                          View Lead
                        </button>
                        <button
                          onClick={() => onEditLead(lead)}
                          className="px-2.5 py-1 rounded text-xs font-medium text-cyan-300 hover:text-white bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 transition"
                        >
                          Reschedule / Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
