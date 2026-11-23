// Predefined options and constants for the 19 CRM attributes

export const LEAD_SOURCES = [
  'Google',
  'LinkedIn',
  'Referral',
  'Website / Organic',
  'Conference / Event',
  'Partner Network',
  'Cold Email / Outreach'
];

export const CONTACT_METHODS = [
  'Email',
  'Call',
  'LinkedIn',
  'In-Person Meeting',
  'Video Conference'
];

export const PROPOSAL_STATUSES = [
  'Pending',
  'Accepted',
  'Rejected',
  'Draft / Not Sent'
];

export const DEAL_STATUSES = [
  'Open',
  'Won',
  'Lost'
];

export const SERVICES_PRODUCTS = [
  'Enterprise SaaS Suite',
  'Cloud Infrastructure Consulting',
  'Custom AI Integration',
  'Cybersecurity & Compliance Audit',
  'Dedicated Support & SLA',
  'API Gateway & Microservices Platform',
  'Data Analytics Dashboard Setup'
];

export const LOST_DEAL_REASONS = [
  'Pricing / Budget Constraints',
  'Competitor Chosen',
  'Missing Key Feature',
  'Project Postponed / Timing',
  'Internal Realignment / Ghosted',
  'Vendor Policy / Compliance',
  'Not Applicable (Deal Won/Open)'
];

export const RETENTION_STATUSES = [
  'Active',
  'Retained',
  'At Risk',
  'Churned',
  'Upgraded / Expansion'
];

export const CONVERSION_STATUSES = [
  'Converted',
  'Not Converted'
];

export const SUCCESS_STATUSES = [
  'Successful',
  'Unsuccessful'
];

// Helper to format currency
export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
};

// Initial template for a brand new CRM record
export const initialLeadRecord = {
  companyName: '',
  leadSource: 'LinkedIn',
  contacted: 'No',
  contactMethod: 'Email',
  emailSent: 'No',
  followUpRequired: 'Yes',
  meetingScheduled: '',
  proposalSent: 'No',
  proposalStatus: 'Draft / Not Sent',
  dealStatus: 'Open',
  dealClosingDate: new Date().toISOString().split('T')[0],
  serviceProductSold: 'Enterprise SaaS Suite',
  revenueGenerated: 0,
  conversionStatus: 'Not Converted',
  successStatus: 'Unsuccessful',
  lostDealReason: 'Not Applicable (Deal Won/Open)',
  customerFeedback: '',
  customerSatisfaction: 4,
  customerRetentionStatus: 'Active'
};
