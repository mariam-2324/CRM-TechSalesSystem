import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Star,
  Mail,
  Phone,
  Calendar,
  Share2
} from 'lucide-react';

export function StarRating({ rating = 5, max = 5, interactive = false, onChange = () => {} }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <Star
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]'
                : 'text-slate-600'
            }`}
          />
        </button>
      ))}
      <span className="text-[11px] font-semibold text-amber-300 ml-1">
        {rating > 0 ? `${rating}.0` : 'N/A'}
      </span>
    </div>
  );
}

export function DealStatusBadge({ status }) {
  switch (status) {
    case 'Won':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          Won
        </span>
      );
    case 'Lost':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <XCircle className="w-3 h-3 text-rose-400" />
          Lost
        </span>
      );
    case 'Open':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
          <Clock className="w-3 h-3 text-blue-400" />
          Open
        </span>
      );
  }
}

export function ProposalStatusBadge({ status }) {
  switch (status) {
    case 'Accepted':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          Accepted
        </span>
      );
    case 'Pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25">
          <Clock className="w-3 h-3 text-amber-400" />
          Pending
        </span>
      );
    case 'Rejected':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/25">
          <XCircle className="w-3 h-3 text-rose-400" />
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
          Not Sent
        </span>
      );
  }
}

export function RetentionStatusBadge({ status }) {
  switch (status) {
    case 'Active':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Active
        </span>
      );
    case 'Retained':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          Retained
        </span>
      );
    case 'Upgraded / Expansion':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30">
          <Sparkles className="w-3 h-3 text-purple-400" />
          Upgraded
        </span>
      );
    case 'At Risk':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          At Risk
        </span>
      );
    case 'Churned':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <XCircle className="w-3 h-3 text-rose-400" />
          Churned
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
          {status}
        </span>
      );
  }
}

export function BooleanBadge({ value, yesLabel = 'Yes', noLabel = 'No', positiveColor = 'emerald', negativeColor = 'slate' }) {
  const isYes = value === 'Yes';
  if (isYes) {
    const colorClasses = positiveColor === 'amber'
      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
      : positiveColor === 'indigo'
      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${colorClasses}`}>
        {yesLabel}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">
      {noLabel}
    </span>
  );
}

export function LeadSourceBadge({ source }) {
  let color = 'bg-slate-800 text-slate-300 border-slate-700';
  if (source === 'Google') color = 'bg-blue-500/10 text-blue-300 border-blue-500/25';
  if (source === 'LinkedIn') color = 'bg-sky-500/10 text-sky-300 border-sky-500/25';
  if (source === 'Referral') color = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25';
  if (source === 'Conference / Event') color = 'bg-purple-500/10 text-purple-300 border-purple-500/25';
  if (source === 'Website / Organic') color = 'bg-teal-500/10 text-teal-300 border-teal-500/25';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${color}`}>
      {source}
    </span>
  );
}
