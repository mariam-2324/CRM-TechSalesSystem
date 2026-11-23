// Export all 19 CRM attributes cleanly into a CSV file

export const exportToCSV = (leads, filename = 'crm-leads-export.csv') => {
  if (!leads || leads.length === 0) {
    alert('No data available to export.');
    return;
  }

  const headers = [
    'Company Name',
    'Lead Source',
    'Contacted',
    'Contact Method',
    'Email Sent',
    'Follow-up Required',
    'Meeting Scheduled',
    'Proposal Sent',
    'Proposal Status',
    'Deal Status',
    'Deal Closing Date',
    'Service / Product Sold',
    'Revenue Generated',
    'Conversion Status',
    'Success Status',
    'Lost Deal Reason',
    'Customer Feedback',
    'Customer Satisfaction (1-5)',
    'Customer Retention Status'
  ];

  const rows = leads.map(lead => [
    lead.companyName || '',
    lead.leadSource || '',
    lead.contacted || 'No',
    lead.contactMethod || '',
    lead.emailSent || 'No',
    lead.followUpRequired || 'No',
    lead.meetingScheduled || '',
    lead.proposalSent || 'No',
    lead.proposalStatus || '',
    lead.dealStatus || '',
    lead.dealClosingDate || '',
    lead.serviceProductSold || '',
    lead.revenueGenerated || 0,
    lead.conversionStatus || '',
    lead.successStatus || '',
    lead.lostDealReason || '',
    (lead.customerFeedback || '').replace(/\r?\n/g, ' '),
    lead.customerSatisfaction || 5,
    lead.customerRetentionStatus || ''
  ]);

  const csvContent = [
    headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
    ...rows.map(row =>
      row
        .map(field => `"${String(field).replace(/"/g, '""')}"`)
        .join(',')
    )
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
