import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  ClockAlert, 
  Star,
  Users2,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '../constants/crmOptions';

export default function StatsOverview({ leads }) {
  const totalLeads = leads.length;

  // Won Deals
  const wonDeals = leads.filter(l => l.dealStatus === 'Won');
  const wonRevenue = wonDeals.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);

  // Total Pipeline Value (all open + won)
  const pipelineValue = leads.reduce((sum, l) => sum + (Number(l.revenueGenerated) || 0), 0);

  // Closed deals (Won or Lost)
  const closedDeals = leads.filter(l => l.dealStatus === 'Won' || l.dealStatus === 'Lost');
  const winRate = closedDeals.length > 0 
    ? Math.round((wonDeals.length / closedDeals.length) * 100) 
    : 0;

  // Converted Leads
  const convertedLeads = leads.filter(l => l.conversionStatus === 'Converted');
  const conversionRate = totalLeads > 0 
    ? Math.round((convertedLeads.length / totalLeads) * 100) 
    : 0;

  // Follow-ups & Meetings
  const pendingFollowups = leads.filter(l => l.followUpRequired === 'Yes').length;
  const scheduledMeetings = leads.filter(l => Boolean(l.meetingScheduled)).length;

  // Average CSAT (Customer Satisfaction)
  const ratedLeads = leads.filter(l => Number(l.customerSatisfaction) > 0);
  const avgSatisfaction = ratedLeads.length > 0
    ? (ratedLeads.reduce((sum, l) => sum + Number(l.customerSatisfaction), 0) / ratedLeads.length).toFixed(1)
    : '5.0';

  const stats = [
    {
      title: 'Won Revenue',
      value: formatCurrency(wonRevenue),
      subtitle: `${wonDeals.length} deals closed won`,
      icon: DollarSign,
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Win Rate',
      value: `${winRate}%`,
      subtitle: `${wonDeals.length} won / ${closedDeals.length} resolved`,
      icon: TrendingUp,
      color: 'from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      subtitle: `${convertedLeads.length} of ${totalLeads} converted`,
      icon: Target,
      color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30'
    },
    {
      title: 'Urgent Actions',
      value: `${pendingFollowups} Follow-ups`,
      subtitle: `${scheduledMeetings} upcoming meetings`,
      icon: ClockAlert,
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Customer Satisfaction',
      value: `${avgSatisfaction} / 5`,
      subtitle: 'Average CSAT rating',
      icon: Star,
      color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl bg-gradient-to-b ${stat.color} bg-slate-900/60 border backdrop-blur-sm transition-all hover:translate-y-[-2px]`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">{stat.title}</span>
              <div className="p-1.5 rounded-lg bg-slate-800/80">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl font-bold tracking-tight text-white mb-1">
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-400">
              {stat.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
