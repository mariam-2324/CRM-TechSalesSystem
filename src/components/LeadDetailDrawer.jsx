import React from 'react';
import { 
  X, 
  Edit3, 
  Building2, 
  Calendar, 
  DollarSign, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  Star, 
  HeartHandshake, 
  Briefcase, 
  Quote,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  DealStatusBadge, 
  ProposalStatusBadge, 
  RetentionStatusBadge, 
  BooleanBadge, 
  LeadSourceBadge, 
  StarRating 
} from './StatusBadge';
import { formatCurrency } from '../constants/crmOptions';

export default function LeadDetailDrawer({
  isOpen,
  lead,
  onClose,
  onEdit,
  onToggleFollowUp
}) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header / Brand Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shadow-inner">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {lead.companyName}
                </h1>
                <DealStatusBadge status={lead.dealStatus} />
                <RetentionStatusBadge status={lead.customerRetentionStatus} />
              </div>
              <p className="text-xs text-indigo-300/80 mt-1 flex items-center gap-2">
                <span>Product: <strong className="text-white">{lead.serviceProductSold || 'Not Specified'}</strong></span>
                <span>•</span>
                <span>Lead Source: <strong className="text-white">{lead.leadSource}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(lead)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">13. Revenue Generated</span>
              <div className="text-lg font-bold text-white mt-0.5">
                {formatCurrency(lead.revenueGenerated)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">11. Closing Date</span>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {lead.dealClosingDate || 'Pending'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">14. Conversion Status</span>
              <div className="mt-1">
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  lead.conversionStatus === 'Converted'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {lead.conversionStatus}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">15. Success Status</span>
              <div className="mt-1">
                <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold border ${
                  lead.successStatus === 'Successful'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {lead.successStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Outreach & Communication */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Outreach & Communication History</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">3. Contacted</span>
                <div className="mt-1">
                  <BooleanBadge value={lead.contacted} />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">4. Contact Method</span>
                <span className="font-semibold text-white mt-1 block">{lead.contactMethod}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">5. Email Sent</span>
                <div className="mt-1">
                  <BooleanBadge value={lead.emailSent} positiveColor="indigo" />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">6. Follow-up Required</span>
                <div className="mt-1 flex items-center justify-between">
                  <BooleanBadge value={lead.followUpRequired} positiveColor="amber" />
                  <button
                    onClick={() => onToggleFollowUp(lead.id)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 underline"
                  >
                    Toggle
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 sm:col-span-2">
                <span className="text-slate-400 block text-[11px]">7. Meeting Scheduled</span>
                <div className="mt-1 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-cyan-200">
                    {lead.meetingScheduled 
                      ? new Date(lead.meetingScheduled).toLocaleString() 
                      : 'No scheduled meeting currently'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Proposal & Commercials */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Commercials, Proposal & Product Delivery</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">8. Proposal Sent</span>
                <div className="mt-1">
                  <BooleanBadge value={lead.proposalSent} />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">9. Proposal Status</span>
                <div className="mt-1">
                  <ProposalStatusBadge status={lead.proposalStatus} />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">10. Deal Status</span>
                <div className="mt-1">
                  <DealStatusBadge status={lead.dealStatus} />
                </div>
              </div>
            </div>

            {lead.dealStatus === 'Lost' && (
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 flex items-start space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-rose-300 block">16. Lost Deal Reason:</span>
                  <span className="text-slate-300">{lead.lostDealReason || 'Unspecified'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Section: Customer Feedback & Satisfaction */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4" />
              <span>Customer Satisfaction & Post-Sale Feedback</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px] mb-1">18. Customer Satisfaction (CSAT)</span>
                <StarRating rating={lead.customerSatisfaction} />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                <span className="text-slate-400 block text-[11px] mb-1">19. Customer Retention Status</span>
                <RetentionStatusBadge status={lead.customerRetentionStatus} />
              </div>
            </div>

            {/* Field 17: Feedback Quote */}
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 relative">
              <Quote className="w-5 h-5 text-indigo-400/30 absolute right-3 top-3" />
              <span className="text-[11px] font-semibold text-indigo-300 block mb-1">
                17. Customer Feedback
              </span>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{lead.customerFeedback || 'No feedback recorded yet. Follow up after product delivery.'}"
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white transition"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
