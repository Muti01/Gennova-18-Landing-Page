
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, User, ReportSummaryItem, BioSystem, FoodToAvoid, AdditiveToAvoid, RecommendedFood, PdfNote, Product, BioAgeResult, DayPlan, EmotionalProfileData } from '../types';
import { 
  LayoutDashboard, Activity, Utensils, FileText, ShoppingBag, 
  Menu, X, LogOut, Mail, Download, ChevronLeft, Globe, HelpCircle, Shield, CheckCircle2, Upload, Brain, Loader2, ScanFace, UserCircle, Clock, Flag, MapPin
} from 'lucide-react';
import AnimatedGLogo from './AnimatedGLogo';
import { ReportRepo } from '../services/dashboardRepo';
import { analyzeFullReport } from '../services/geminiAnalysis';
import ContactModal from './ContactModal';
import { SummaryView, SystemsView, FoodAdjustmentsView, NutritionView, PdfNotesView, ProductsView, ProfileView, BioAgeEstimationView, NutritionPlanView, EmotionalProfileView } from './DashboardViews';
import GennovaCoach from './GennovaCoach';
import FutureSelf from './FutureSelf';

interface DashboardProps {
  user: UserProfile;
  currentUser: User; 
  onLogout?: () => void;
  reports: any;
  biomarkers: any;
  onOrderKit?: () => void;
}

type ViewState = 'summary' | 'systems' | 'foods' | 'nutrition' | 'notes' | 'products' | 'coach' | 'future' | 'profile' | 'ebe' | 'mealplan' | 'emotional';

const Dashboard: React.FC<DashboardProps> = ({ user, currentUser, onLogout }) => {
  // --- STATE ---
  const [activeView, setActiveView] = useState<ViewState>('profile');
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  // Data State
  const [reportId] = useState("WELLGNVESC105"); 
  const [summary, setSummary] = useState<ReportSummaryItem[]>([]);
  const [systems, setSystems] = useState<BioSystem[]>([]);
  const [foods, setFoods] = useState<FoodToAvoid[]>([]);
  const [additives, setAdditives] = useState<AdditiveToAvoid[]>([]);
  const [recFoods, setRecFoods] = useState<RecommendedFood[]>([]);
  const [notes, setNotes] = useState<PdfNote[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>(user);
  
  // New Lifted State for Reactivity
  const [bioAgeResult, setBioAgeResult] = useState<BioAgeResult & { storageStatus?: string } | null>(null);
  const [mealPlan, setMealPlan] = useState<DayPlan[]>([]);
  const [emotionalProfile, setEmotionalProfile] = useState<EmotionalProfileData | null>(null);
  
  // Fake Action States
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- INITIAL DATA FETCH ---
  const loadData = async (forceEBFRecalc: boolean = false) => {
        setLoading(true);
        try {
            const [
                sumData, sysData, foodData, addData, recData, 
                noteData, prodData, selProd, ageData, planData, emoData,
                extProfile
            ] = await Promise.all([
                ReportRepo.getSummary(reportId),
                ReportRepo.getSystems(reportId),
                ReportRepo.getFoodsToAvoid(reportId),
                ReportRepo.getAdditivesToAvoid(reportId),
                ReportRepo.getRecommendedFoods(reportId),
                ReportRepo.getPdfNotes(reportId),
                ReportRepo.getProducts(),
                ReportRepo.getSelectedProductIds(reportId),
                ReportRepo.calculateBioAge(reportId, forceEBFRecalc),
                ReportRepo.getMealPlan(),
                ReportRepo.getEmotionalProfile(),
                ReportRepo.getExtendedProfile()
            ]);
            
            setSummary(sumData);
            setSystems(sysData);
            setFoods(foodData);
            setAdditives(addData);
            setRecFoods(recData);
            setNotes(noteData);
            setProducts(prodData);
            setSelectedProductIds(selProd);
            setBioAgeResult(ageData);
            setMealPlan(planData);
            setEmotionalProfile(emoData);
            setProfileData(extProfile);
        } catch (e) {
            console.error("Dashboard Load Error", e);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    loadData();
  }, [reportId]);

  // --- ACTIONS ---

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setAnalyzing(true);
      try {
          const result = await analyzeFullReport(file, reportId, profileData as UserProfile);
          await ReportRepo.loadAnalysisResults(reportId, result);
          await loadData(true); 
          alert("Genn Coach ha analizado tu reporte y actualizado tu Plan Epi Nutricional.");
          setActiveView('mealplan');
      } catch (err: any) {
          console.error(err);
          alert(`Error al analizar: ${err.message || 'Intenta nuevamente'}`);
      } finally {
          setAnalyzing(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
      }
  };

  const handleRecalculateEBF = async () => {
      const res = await ReportRepo.calculateBioAge(reportId, true);
      setBioAgeResult(res);
  };

  const handleFakeEmail = async () => {
      setSendingEmail(true);
      await ReportRepo.logEmail({
          reportID: reportId, toEmail: currentUser.email || 'client@gennova.life', 
          subject: 'Resultados Epigenéticos', message: 'Reporte generado.'
      });
      setTimeout(() => {
          setSendingEmail(false);
          setEmailSent(true);
          setTimeout(() => setEmailSent(false), 3000);
      }, 1500);
  };

  const handleDownloadPdf = () => {
      const content = `GENNOVA REPORT ${reportId}\nClient: ${profileData.firstName} ${profileData.lastName}\nScore: ${systems[0]?.score || 0}\n\nGenerated via Gennova Labs.`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Report_${reportId}.txt`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  };

  const handleProductToggle = (id: string) => {
      if (selectedProductIds.includes(id)) {
          setSelectedProductIds(prev => prev.filter(p => p !== id));
      } else {
          if (selectedProductIds.length < 10) {
              setSelectedProductIds(prev => [...prev, id]);
          } else {
              alert("Máximo 10 productos permitidos.");
          }
      }
  };

  const handleSaveProducts = async (reportId: string, productIds: string[]) => {
      await ReportRepo.saveSelectedProducts(reportId, productIds);
      alert("Selección guardada correctamente.");
  };

  const handleCancelProducts = async () => {
      const saved = await ReportRepo.getSelectedProductIds(reportId);
      setSelectedProductIds(saved);
  };

  const handleAddNote = async (note: any) => {
      const newNote = await ReportRepo.addPdfNote({ ...note, reportID: reportId });
      setNotes(prev => [newNote, ...prev]);
  };

  const handleDeleteNote = async (id: string) => {
      await ReportRepo.deletePdfNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
  };

  // --- RENDER HELPERS ---
  
  const NavButton = ({ id, label, icon: Icon }: any) => (
      <button 
        onClick={() => { setActiveView(id); setSidebarOpen(false); }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${activeView === id ? 'bg-gennova-gold text-black font-bold shadow-[0_0_20px_rgba(229,199,122,0.2)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
          <Icon size={18} />
          <span className="text-xs uppercase tracking-wider">{label}</span>
      </button>
  );

  if (loading && !analyzing && !bioAgeResult) return <div className="h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-gennova-gold border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans">
        
        {analyzing && (
            <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in">
                <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-t-2 border-gennova-gold rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-b-2 border-gennova-cyan rounded-full animate-spin-slow"></div>
                    <Brain className="absolute inset-0 m-auto text-white opacity-50" size={32} />
                </div>
                <h2 className="text-2xl font-serif text-white mb-2 animate-pulse text-center">Genn Coach Analizando...</h2>
                <p className="text-gennova-gold font-mono text-xs uppercase tracking-widest">Decodificando reporte PDF</p>
            </div>
        )}

        {/* SIDEBAR */}
        <aside className={`fixed md:relative z-50 w-64 h-full bg-[#080808] border-r border-white/5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-8 pb-4 flex items-center gap-3">
                <AnimatedGLogo className="w-8 h-8" />
                <div>
                    <h1 className="text-white font-serif text-lg tracking-tight">Gennova<span className="text-gennova-gold"> Labs</span></h1>
                    <span className="text-[9px] text-gray-500 font-mono uppercase tracking-widest block">Pro Dashboard</span>
                </div>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                <p className="px-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-3">Tu Biología</p>
                <NavButton id="profile" label="Perfil" icon={UserCircle} />
                <NavButton id="ebe" label="Edad Biologica Funcional" icon={Clock} />
                <NavButton id="emotional" label="Perfil Emocional" icon={Brain} />
                
                <p className="px-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-3 mt-6">Análisis</p>
                <NavButton id="summary" label="Resumen Resultados" icon={LayoutDashboard} />
                <NavButton id="systems" label="Sistemas Biológicos" icon={Activity} />
                <NavButton id="coach" label="Genn Coach AI" icon={Brain} />
                <NavButton id="future" label="Simulación Bio-Facial" icon={ScanFace} />
                
                <p className="px-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-3 mt-6">Protocolo</p>
                <NavButton id="mealplan" label="Plan Epi Nutricional" icon={Flag} />
                <NavButton id="foods" label="Ajustes Alimentos" icon={Utensils} />
                <NavButton id="nutrition" label="Optimización Nutri." icon={Utensils} />
                
                <p className="px-4 text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-3 mt-6">Gestión</p>
                <NavButton id="notes" label="Comentarios PDF" icon={FileText} />
                <NavButton id="products" label="Productos" icon={ShoppingBag} />
                <button 
                  onClick={() => { setShowContact(true); setSidebarOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 text-gray-400 hover:text-white hover:bg-white/5"
                >
                    <MapPin size={18} />
                    <span className="text-xs uppercase tracking-wider">Contacto</span>
                </button>
            </nav>

            <div className="p-4 border-t border-white/5">
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl transition-all text-xs uppercase tracking-wider font-bold">
                    <LogOut size={18} /> Salir
                </button>
            </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col relative bg-[#05070A]">
            
            {/* Header */}
            <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-400"><Menu/></button>
                    <div className="hidden md:block">
                        <span className="text-xs text-gray-500 font-mono mr-2">CLIENTE:</span>
                        <span className="text-sm text-white font-bold uppercase tracking-wide">
                            {profileData.firstName || ''} {profileData.lastName || ''}
                        </span>
                        <span className="mx-2 text-gray-700">|</span>
                        <span className="text-[10px] text-gennova-gold bg-gennova-gold/10 px-2 py-0.5 rounded border border-gennova-gold/20 font-mono">{reportId}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-gennova-elevated border border-white/10 hover:border-gennova-gold transition-all text-gray-300 hover:text-white">
                        <Upload size={14} /> <span className="hidden md:inline">Subir Resultados</span>
                    </button>
                    <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

                    <button 
                        onClick={handleFakeEmail}
                        disabled={sendingEmail || emailSent}
                        className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-all ${emailSent ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                    >
                        {emailSent ? <CheckCircle2 size={14}/> : <Mail size={14} />}
                        {sendingEmail ? 'Enviando...' : emailSent ? 'Enviado' : 'Enviar Email'}
                    </button>
                    <button 
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition-all shadow-lg"
                    >
                        <Download size={14} /> PDF
                    </button>
                </div>
            </header>

            {/* Viewport */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 relative">
                {activeView === 'profile' && <ProfileView onUpdate={() => loadData(true)} />}
                {activeView === 'ebe' && <BioAgeEstimationView result={bioAgeResult} onRecalculate={handleRecalculateEBF} />}
                {activeView === 'mealplan' && <NutritionPlanView plan={mealPlan} />}
                {activeView === 'emotional' && <EmotionalProfileView profile={emotionalProfile} />}
                {activeView === 'summary' && <SummaryView items={summary} />}
                {activeView === 'systems' && <SystemsView systems={systems} />}
                {activeView === 'foods' && <FoodAdjustmentsView foods={foods} additives={additives} />}
                {activeView === 'nutrition' && <NutritionView foods={recFoods} />}
                {activeView === 'notes' && <PdfNotesView notes={notes} onAdd={handleAddNote} onDelete={handleDeleteNote} />}
                {activeView === 'products' && (
                    <ProductsView 
                        products={products} 
                        selectedIds={selectedProductIds} 
                        onToggle={handleProductToggle}
                        onSave={() => handleSaveProducts(reportId, selectedProductIds)}
                        onCancel={handleCancelProducts}
                    />
                )}
                {activeView === 'coach' && (
                    <div className="h-full flex flex-col">
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-white">Genn Coach AI</h2>
                            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Asistente Epigenético en Tiempo Real</p>
                        </div>
                        <div className="flex-1 bg-gennova-elevated border border-white/10 rounded-2xl overflow-hidden relative">
                            <GennovaCoach userName={profileData.firstName || 'Gennover'} isInline={true} />
                        </div>
                    </div>
                )}
                {activeView === 'future' && <FutureSelf currentUser={currentUser} />}
            </div>

            {/* Footer */}
            <footer className="h-10 border-t border-white/5 flex items-center justify-between px-6 bg-black text-[9px] text-gray-600 font-mono uppercase tracking-widest">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-white"><Globe size={10}/> ES</span>
                    <span className="flex items-center gap-1 cursor-pointer hover:text-white"><HelpCircle size={10}/> Ayuda</span>
                </div>
                <div className="flex gap-4">
                    <span className="cursor-pointer hover:text-white flex items-center gap-1"><Shield size={10}/> Privacidad</span>
                    <span>v2.5.0-BETA</span>
                </div>
            </footer>

        </main>

        <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default Dashboard;
