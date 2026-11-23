import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  Award, 
  Target,
  Sparkles,
  Layers
} from 'lucide-react';
import { formatCurrency, LEAD_SOURCES, SERVICES_PRODUCTS, LOST_DEAL_REASONS } from '../constants/crmOptions';

export default function AnalyticsView({ leads }) {
  const totalLeads = leads.length;
  const wonLeads = leads.filter(l => l.dealStatus === 'Won');
  const lostLeads = leads.filter(l => l.dealStatus === 'Lost');
  const openLeads = leads.filter(l => l.dealStatus === 'Open');

  const totalWonRevenue = wonLeads.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);
  const totalPipelineRevenue = leads.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);

  // Revenue By Product / Service
  const productStats = SERVICES_PRODUCTS.map(prod => {
    const matching = leads.filter(l => l.serviceProductSold === prod);
    const revenue = matching.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);
    const wonCount = matching.filter(l => l.dealStatus === 'Won').length;
    return {
      name: prod,
      totalCount: matching.length,
      wonCount,
      revenue
    };
  }).filter(p => p.totalCount > 0).sort((a, b) => b.revenue - a.revenue);

  // Lead Source Performance
  const sourceStats = LEAD_SOURCES.map(source => {
    const matching = leads.filter(l => l.leadSource === source);
    const revenue = matching.filter(l => l.dealStatus === 'Won').reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);
    const wonCount = matching.filter(l => l.dealStatus === 'Won').length;
    const conversionRate = matching.length > 0 ? Math.round((wonCount / matching.length) * 100) : 0;
    return {
      name: source,
      count: matching.length,
      wonCount,
      revenue,
      conversionRate
    };
  }).filter(s => s.count > 0).sort((a, b) => b.revenue - a.revenue);

  // Lost Deal Reasons Breakdown
  const lostReasonsCount = {};
  lostLeads.forEach(l => {
    const reason = l.lostDealReason || 'Unspecified';
    lostReasonsCount[reason] = (lostReasonsCount[reason] || 0) + 1;
  });

  // CSAT Star breakdown
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  leads.forEach(l => {
    const rating = Math.min(5, Math.max(1, Math.round(Number(l.customerSatisfaction) || 5)));
    starCounts[rating] = (starCounts[rating] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <BarChart3 className="w-5 h-5" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Executive Analytics & Revenue Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time breakdown of product sales velocity, lead channels, win rates, and loss reasons.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Total Closed Won</span>
          <span className="text-xl font-bold text-emerald-400">{formatCurrency(totalWonRevenue)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue by Product / Service */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Revenue by Service / Product</span>
            </h3>
            <span className="text-xs text-slate-400">{productStats.length} Products</span>
          </div>

          <div className="space-y-3">
            {productStats.map(item => {
              const maxRev = productStats[0]?.revenue || 1;
              const percent = Math.round((item.revenue / maxRev) * 100);

              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200 truncate max-w-[240px]">{item.name}</span>
                    <span className="font-bold text-white">{formatCurrency(item.revenue)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{item.wonCount} won of {item.totalCount} leads</span>
                    <span>{item.totalCount > 0 ? Math.round((item.wonCount / item.totalCount) * 100) : 0}% win rate</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Source Performance */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Lead Source Channel Efficiency</span>
            </h3>
            <span className="text-xs text-slate-400">By Won Revenue</span>
          </div>

          <div className="space-y-3">
            {sourceStats.map(src => {
              const maxSrcRev = sourceStats[0]?.revenue || 1;
              const percent = Math.round((src.revenue / maxSrcRev) * 100);

              return (
                <div key={src.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{src.name}</span>
                    <span className="font-bold text-white">{formatCurrency(src.revenue)}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{src.count} total leads ({src.wonCount} won)</span>
                    <span className="text-emerald-400 font-semibold">{src.conversionRate}% conversion</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lost Deal Root-Cause Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Lost Deal Root Causes ({lostLeads.length} deals lost)</span>
            </h3>
            <span className="text-xs text-slate-400">Post-Mortem Analysis</span>
          </div>

          {lostLeads.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No lost deals recorded.</p>
          ) : (
            <div className="space-y-2.5">
              {Object.entries(lostReasonsCount).map(([reason, count]) => {
                const percent = Math.round((count / lostLeads.length) * 100);
                return (
                  <div key={reason} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-slate-300">{reason}</span>
                      <span className="text-rose-400 font-bold">{count} ({percent}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Customer Satisfaction (CSAT) Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Customer Satisfaction Rating Distribution</span>
            </h3>
            <span className="text-xs text-slate-400">1 to 5 Stars</span>
          </div>

          <div className="space-y-2.5">
            {[5, 4, 3, 2, 1].map(star => {
              const count = starCounts[star] || 0;
              const percent = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;

              return (
                <div key={star} className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1 w-16 text-amber-400 font-medium">
                    <span>{star} Stars</span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right text-slate-400 text-[11px]">
                    <span className="font-semibold text-white">{count}</span> ({percent}%)
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
