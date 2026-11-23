import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import LeadsTable from './components/LeadsTable';
import PipelineBoard from './components/PipelineBoard';
import FollowUpManager from './components/FollowUpManager';
import CustomerSuccessView from './components/CustomerSuccessView';
import AnalyticsView from './components/AnalyticsView';
import LeadModal from './components/LeadModal';
import LeadDetailDrawer from './components/LeadDetailDrawer';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { DEFAULT_CRM_DATA } from './data/defaultData';
import { exportToCSV } from './utils/exportCsv';
import { CheckCircle2, Info, AlertTriangle, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'nexus_crm_leads_v1';

export default function App() {
  // --- Persistent State ---
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error('Failed to load leads from localStorage', err);
    }
    return DEFAULT_CRM_DATA;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  }, [leads]);

  // --- UI Navigation & Filter State ---
  const [activeTab, setActiveTab] = useState('table'); // 'table' | 'pipeline' | 'followups' | 'retention' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [selectedLead, setSelectedLead] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailLead, setDetailLead] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  // --- Toast Notification State ---
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // --- CRUD Handlers ---

  // CREATE
  const handleOpenCreateModal = () => {
    setSelectedLead(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  // EDIT
  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setModalMode('edit');
    setIsModalOpen(true);
    // If detail modal was open, close it or keep updated
    if (isDetailOpen && detailLead?.id === lead.id) {
      setIsDetailOpen(false);
    }
  };

  // SAVE (Create or Update)
  const handleSaveLead = (leadData) => {
    if (modalMode === 'create') {
      const newLead = {
        ...leadData,
        id: `lead-${Date.now()}`
      };
      setLeads(prev => [newLead, ...prev]);
      showToast(`Created lead "${newLead.companyName}" successfully!`);
    } else {
      setLeads(prev => prev.map(l => (l.id === leadData.id ? leadData : l)));
      showToast(`Updated "${leadData.companyName}" details.`);
      if (detailLead && detailLead.id === leadData.id) {
        setDetailLead(leadData);
      }
    }
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  // VIEW DETAILS
  const handleViewLead = (lead) => {
    setDetailLead(lead);
    setIsDetailOpen(true);
  };

  // DELETE
  const handlePromptDelete = (lead) => {
    setLeadToDelete(lead);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = (leadId) => {
    const target = leads.find(l => l.id === leadId);
    setLeads(prev => prev.filter(l => l.id !== leadId));
    setIsDeleteOpen(false);
    setLeadToDelete(null);
    if (detailLead && detailLead.id === leadId) {
      setIsDetailOpen(false);
    }
    showToast(`Deleted "${target?.companyName || 'Lead'}" from CRM.`, 'info');
  };

  // QUICK TOGGLE FOLLOW-UP
  const handleToggleFollowUp = (leadId) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const nextVal = l.followUpRequired === 'Yes' ? 'No' : 'Yes';
        showToast(`Follow-up marked "${nextVal}" for ${l.companyName}`);
        const updated = { ...l, followUpRequired: nextVal };
        if (detailLead && detailLead.id === leadId) {
          setDetailLead(updated);
        }
        return updated;
      }
      return l;
    }));
  };

  // QUICK STAGE ADVANCE (Used in Kanban)
  const handleMoveStage = (leadId, patch) => {
    setLeads(prev => prev.map(l => {
      if (l.id === leadId) {
        const updated = { ...l, ...patch };
        showToast(`Updated pipeline stage for ${l.companyName}`);
        return updated;
      }
      return l;
    }));
  };

  // EXPORT CSV
  const handleExportCsv = () => {
    exportToCSV(leads, `CRM-Leads-${new Date().toISOString().split('T')[0]}.csv`);
    showToast('Exported 19 CRM attributes to CSV file.');
  };

  // RESET DEMO DATA
  const handleResetData = () => {
    if (window.confirm('Reset CRM database back to default demonstration records? Any custom leads will be replaced.')) {
      setLeads(DEFAULT_CRM_DATA);
      showToast('Restored default demo records.', 'info');
    }
  };

  const followUpsCount = leads.filter(l => l.followUpRequired === 'Yes').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2.5 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md border animate-in slide-in-from-bottom-5 duration-200 bg-slate-900/95 border-indigo-500/40 text-white">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

      {/* Main App Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalLeads={leads.length}
        followUpsCount={followUpsCount}
        onOpenCreateModal={handleOpenCreateModal}
        onExportCsv={handleExportCsv}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Metric Cards */}
        <StatsOverview leads={leads} />

        {/* Dynamic Portions / Tabs */}
        {activeTab === 'table' && (
          <LeadsTable
            leads={leads}
            searchQuery={searchQuery}
            onViewLead={handleViewLead}
            onEditLead={handleOpenEditModal}
            onDeleteLead={handlePromptDelete}
            onToggleFollowUp={handleToggleFollowUp}
          />
        )}

        {activeTab === 'pipeline' && (
          <PipelineBoard
            leads={leads}
            onViewLead={handleViewLead}
            onEditLead={handleOpenEditModal}
            onMoveStage={handleMoveStage}
            onOpenCreateModal={handleOpenCreateModal}
          />
        )}

        {activeTab === 'followups' && (
          <FollowUpManager
            leads={leads}
            onToggleFollowUp={handleToggleFollowUp}
            onEditLead={handleOpenEditModal}
            onViewLead={handleViewLead}
          />
        )}

        {activeTab === 'retention' && (
          <CustomerSuccessView
            leads={leads}
            onEditLead={handleOpenEditModal}
            onViewLead={handleViewLead}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView leads={leads} />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>PulseDesk — Enterprise Lead Lifecycle & Customer Retention System • Built with React & Tailwind CSS</p>
      </footer>

      {/* Modals */}
      <LeadModal
        isOpen={isModalOpen}
        mode={modalMode}
        leadData={selectedLead}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveLead}
      />

      <LeadDetailDrawer
        isOpen={isDetailOpen}
        lead={detailLead}
        onClose={() => setIsDetailOpen(false)}
        onEdit={handleOpenEditModal}
        onToggleFollowUp={handleToggleFollowUp}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        lead={leadToDelete}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
