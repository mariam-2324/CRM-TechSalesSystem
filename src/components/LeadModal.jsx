import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Building2, 
  MessageSquare, 
  Briefcase, 
  HeartHandshake, 
  Calendar,
  DollarSign,
  AlertCircle,
  Star
} from 'lucide-react';
import { 
  LEAD_SOURCES, 
  CONTACT_METHODS, 
  PROPOSAL_STATUSES, 
  DEAL_STATUSES, 
  SERVICES_PRODUCTS, 
  LOST_DEAL_REASONS, 
  RETENTION_STATUSES,
  CONVERSION_STATUSES,
  SUCCESS_STATUSES,
  initialLeadRecord 
} from '../constants/crmOptions';
import { StarRating } from './StatusBadge';

export default function LeadModal({
  isOpen,
  mode = 'create', // 'create' | 'edit'
  leadData = null,
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState(initialLeadRecord);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (leadData && mode === 'edit') {
      setFormData({ ...initialLeadRecord, ...leadData });
    } else {
      setFormData({
        ...initialLeadRecord,
        id: `lead-${Date.now()}`
      });
    }
    setErrors({});
  }, [leadData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Smart automations for sales reps:
      if (field === 'dealStatus' && value === 'Won') {
        updated.proposalStatus = 'Accepted';
        updated.proposalSent = 'Yes';
        updated.conversionStatus = 'Converted';
        updated.successStatus = 'Successful';
        updated.lostDealReason = 'Not Applicable (Deal Won/Open)';
      } else if (field === 'dealStatus' && value === 'Lost') {
        updated.conversionStatus = 'Not Converted';
        updated.successStatus = 'Unsuccessful';
        if (updated.lostDealReason.includes('Not Applicable')) {
          updated.lostDealReason = 'Pricing / Budget Constraints';
        }
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.companyName || !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {mode === 'create' ? 'Add New CRM Lead' : `Edit: ${formData.companyName || 'Lead'}`}
              </h2>
              <p className="text-xs text-slate-400">
                Configure all 19 lifecycle attributes, commercial terms, and retention data.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* SECTION 1: Company Profile & Acquisition */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 border-b border-slate-800/60 pb-2">
              <Building2 className="w-4 h-4" />
              <span>1. Company Profile & Acquisition</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Field 1: Company Name */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  1. Company Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Cloud Corp"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition ${
                    errors.companyName ? 'border-rose-500' : 'border-slate-700'
                  }`}
                />
                {errors.companyName && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Field 2: Lead Source */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  2. Lead Source
                </label>
                <select
                  value={formData.leadSource}
                  onChange={(e) => handleChange('leadSource', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {LEAD_SOURCES.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Outreach & Communication */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 border-b border-slate-800/60 pb-2">
              <MessageSquare className="w-4 h-4" />
              <span>2. Outreach & Communication Activities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Field 3: Contacted */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  3. Contacted
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Yes', 'No'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('contacted', val)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                        formData.contacted === val
                          ? val === 'Yes' 
                            ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                            : 'bg-slate-800 text-white border-slate-600'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 4: Contact Method */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  4. Contact Method
                </label>
                <select
                  value={formData.contactMethod}
                  onChange={(e) => handleChange('contactMethod', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {CONTACT_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              {/* Field 5: Email Sent */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  5. Email Sent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Yes', 'No'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('emailSent', val)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                        formData.emailSent === val
                          ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 6: Follow-up Required */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  6. Follow-up Required
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Yes', 'No'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('followUpRequired', val)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                        formData.followUpRequired === val
                          ? val === 'Yes' 
                            ? 'bg-amber-600/30 text-amber-300 border-amber-500/50 font-semibold'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800/60'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 7: Meeting Scheduled */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  7. Meeting Scheduled (Date & Time)
                </label>
                <div className="flex gap-2">
                  <input
                    type="datetime-local"
                    value={formData.meetingScheduled || ''}
                    onChange={(e) => handleChange('meetingScheduled', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {formData.meetingScheduled && (
                    <button
                      type="button"
                      onClick={() => handleChange('meetingScheduled', '')}
                      className="px-2.5 py-1 text-xs bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Proposal & Commercial Terms */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 border-b border-slate-800/60 pb-2">
              <Briefcase className="w-4 h-4" />
              <span>3. Commercial Proposals & Deal Financials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Field 8: Proposal Sent */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  8. Proposal Sent
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Yes', 'No'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleChange('proposalSent', val)}
                      className={`py-1.5 text-xs font-medium rounded-lg border transition ${
                        formData.proposalSent === val
                          ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 9: Proposal Status */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  9. Proposal Status
                </label>
                <select
                  value={formData.proposalStatus}
                  onChange={(e) => handleChange('proposalStatus', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {PROPOSAL_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Field 10: Deal Status */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  10. Deal Status
                </label>
                <select
                  value={formData.dealStatus}
                  onChange={(e) => handleChange('dealStatus', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    formData.dealStatus === 'Won' 
                      ? 'border-emerald-500/60 text-emerald-300' 
                      : formData.dealStatus === 'Lost'
                      ? 'border-rose-500/60 text-rose-300'
                      : 'border-blue-500/60 text-blue-300'
                  }`}
                >
                  {DEAL_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Field 11: Deal Closing Date */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  11. Deal Closing Date
                </label>
                <input
                  type="date"
                  value={formData.dealClosingDate || ''}
                  onChange={(e) => handleChange('dealClosingDate', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Field 12: Service / Product Sold */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  12. Service / Product Sold
                </label>
                <select
                  value={formData.serviceProductSold}
                  onChange={(e) => handleChange('serviceProductSold', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {SERVICES_PRODUCTS.map(prod => (
                    <option key={prod} value={prod}>{prod}</option>
                  ))}
                </select>
              </div>

              {/* Field 13: Revenue Generated */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  13. Revenue Generated ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    placeholder="0"
                    value={formData.revenueGenerated}
                    onChange={(e) => handleChange('revenueGenerated', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Customer Success, Retention & Feedback */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-purple-400 border-b border-slate-800/60 pb-2">
              <HeartHandshake className="w-4 h-4" />
              <span>4. Conversion, Retention & Customer Sentiment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Field 14: Conversion Status */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  14. Conversion Status
                </label>
                <select
                  value={formData.conversionStatus}
                  onChange={(e) => handleChange('conversionStatus', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {CONVERSION_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Field 15: Success Status */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  15. Success Status
                </label>
                <select
                  value={formData.successStatus}
                  onChange={(e) => handleChange('successStatus', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {SUCCESS_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Field 16: Lost Deal Reason */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  16. Lost Deal Reason {formData.dealStatus === 'Lost' && <span className="text-amber-400 font-bold">*</span>}
                </label>
                <select
                  value={formData.lostDealReason}
                  onChange={(e) => handleChange('lostDealReason', e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                    formData.dealStatus === 'Lost' ? 'border-amber-500/60 bg-amber-950/20' : 'border-slate-700'
                  }`}
                >
                  {LOST_DEAL_REASONS.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              {/* Field 18: Customer Satisfaction (1-5 Stars) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  18. Customer Satisfaction (CSAT)
                </label>
                <div className="py-2 px-3 rounded-lg bg-slate-900 border border-slate-700">
                  <StarRating 
                    rating={Number(formData.customerSatisfaction) || 5} 
                    interactive={true} 
                    onChange={(val) => handleChange('customerSatisfaction', val)} 
                  />
                </div>
              </div>

              {/* Field 19: Customer Retention Status */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  19. Customer Retention Status
                </label>
                <select
                  value={formData.customerRetentionStatus}
                  onChange={(e) => handleChange('customerRetentionStatus', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-semibold"
                >
                  {RETENTION_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Field 17: Customer Feedback */}
              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  17. Customer Feedback / Review Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter verbatim customer quotes, evaluation notes, post-implementation feedback..."
                  value={formData.customerFeedback}
                  onChange={(e) => handleChange('customerFeedback', e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'create' ? 'Create Lead' : 'Save Changes'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
