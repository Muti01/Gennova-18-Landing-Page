import React, { useState, useEffect } from 'react';
import { User } from './types';
import { 
  auth,
  onAuthStateChanged, 
  logoutUser, 
  getUserProfile, 
  getUserReports, 
  getUserBiomarkers 
} from './services/firebase';
import { UserProfile, EpigeneticReport, Biomarker } from './types';
import { 
  HeroSection, 
  SocialProofSection,
  WhatIsEpigeneticsSection, 
  WhatIsGennovaEvaluationSection, 
  WhatWeEvaluateSection, 
  AhaMomentSection,
  DailyLifeImpactSection, 
  OurProcessSection,
  NotJustAReportSection,
  WhatYouGetSection,
  OurSpecialistsSection,
  WhoIsItForAndTransparency,
  PricingSection,
  FAQSection,
  FinalCTASection,
  AppDownloadSection
} from './components/LandingRebrandComponents';
import Testimonials from './components/Testimonials';
import Dashboard from './components/Dashboard';
import AnimatedGLogo from './components/AnimatedGLogo';
import { Menu, Instagram, Linkedin, Facebook, Twitter, Phone } from 'lucide-react';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { LegalModals, ModalType } from './components/LegalModals';

const MainApp: React.FC = () => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<EpigeneticReport[]>([]);
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        setLoading(true);
        try {
            const [profile, userReports, userBiomarkers] = await Promise.all([
                getUserProfile(user.uid),
                getUserReports(user.uid),
                getUserBiomarkers(user.uid)
            ]);
            setUserProfile(profile);
            setReports(userReports);
            setBiomarkers(userBiomarkers);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
      } else {
        setUserProfile(null);
        setReports([]);
        setBiomarkers([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
      await logoutUser();
  };

  if (firebaseUser && userProfile) {
      return (
          <Dashboard 
            user={userProfile} 
            currentUser={firebaseUser} 
            reports={reports} 
            biomarkers={biomarkers} 
            onLogout={handleLogout}
            onOrderKit={() => {}}
          />
      );
  }

  const WHATSAPP_URL = "https://wa.me/51932818432?text=Hola%20Gennova,%20acabo%20de%20conocer%20la%20evaluaci%C3%B3n%20de%20bienestar%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20c%C3%B3mo%20funciona%20y%20c%C3%B3mo%20puedo%20agendar.";

  return (
    <div className="min-h-screen bg-stone-50 text-[#1e293b] font-sans selection:bg-[#009E9E]/20 selection:text-[#1e293b] overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100 transition-all duration-300">
        <div className="w-full px-6 md:px-12">
            <div className="flex justify-between items-center h-20">
                
                {/* Brand */}
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                    <AnimatedGLogo className="w-10 h-10" />
                    <span className="text-2xl font-serif font-bold text-[#1e293b] tracking-widest leading-none">GENNOVA</span>
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                    <a href="#que-evalua-test-bienestar" className="hover:text-[#009E9E] transition">¿Qué Evalúa?</a>
                    <a href="#proceso-evaluacion-gennova" className="hover:text-[#009E9E] transition">El Proceso</a>
                    <a href="#precio-test-epigenetico-lima" className="hover:text-[#009E9E] transition">Planes y Precios</a>
                    <a href="#faq" className="hover:text-[#009E9E] transition">FAQ</a>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <a 
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-[#1e293b] text-white font-bold text-[10px] uppercase font-mono tracking-wider hover:bg-[#009E9E] transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                      <Phone size={12} className="fill-current" />
                      Hablemos
                    </a>
                </div>
            </div>
        </div>
      </nav>

      {/* --- CONTENT --- */}
      <HeroSection />
      <SocialProofSection />
      <WhatIsEpigeneticsSection />
      <WhatIsGennovaEvaluationSection />
      <WhatWeEvaluateSection />
      <AhaMomentSection />
      <DailyLifeImpactSection />
      <OurProcessSection />
      <NotJustAReportSection />
      <WhatYouGetSection />
      <OurSpecialistsSection />
      <WhoIsItForAndTransparency />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <AppDownloadSection />

      {/* --- FOOTER --- */}
      <footer className="bg-white text-stone-600 pt-24 pb-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">
                <div className="space-y-6 max-w-sm">
                    <div className="flex items-center gap-4">
                        <AnimatedGLogo className="w-12 h-12 grayscale opacity-50" />
                        <span className="text-3xl font-serif font-bold text-[#1e293b] tracking-widest">GENNOVA</span>
                    </div>
                    <p className="text-stone-500 text-sm font-light leading-relaxed">
                        Conocer mejor tu biología puede ayudarte a tomar mejores decisiones sobre tu bienestar. Un enfoque preventivo, basado en la ciencia.
                    </p>
                    <div className="flex gap-6 pt-2">
                        <a href="https://www.instagram.com/gennova.pe/" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#009E9E] transition-colors"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/company/gennova-ia/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#009E9E] transition-colors"><Linkedin size={20} /></a>
                        <a href="https://www.facebook.com/profile.php?id=61575113528390" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#009E9E] transition-colors"><Facebook size={20} /></a>
                        <a href="https://www.tiktok.com/@gennovalabs" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#009E9E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2a3 3 0 0 0 3 3v4a7 7 0 0 1-7-7H7v14a4 4 0 1 1-4-4 4 4 0 0 1 4 4v-4a8 8 0 1 0 8 8V2h4z" /></svg>
                        </a>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 w-full lg:w-auto">
                    <div className="space-y-6">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#1e293b] font-bold">Plataforma</h4>
                        <ul className="space-y-3 text-stone-500 text-sm font-light">
                            <li><a href="#evaluacion" className="hover:text-[#009E9E] transition">La Evaluación</a></li>
                            <li><a href="#proceso" className="hover:text-[#009E9E] transition">Proceso</a></li>
                            <li><a href="#faq" className="hover:text-[#009E9E] transition">Preguntas</a></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#1e293b] font-bold">Legal</h4>
                        <ul className="space-y-3 text-stone-500 text-sm font-light">
                            <li><button onClick={(e) => { e.preventDefault(); setActiveModal('privacy'); }} className="hover:text-[#009E9E] transition">Privacidad</button></li>
                            <li><button onClick={(e) => { e.preventDefault(); setActiveModal('terms'); }} className="hover:text-[#009E9E] transition">Términos</button></li>
                            <li><button onClick={(e) => { e.preventDefault(); setActiveModal('disclaimer'); }} className="hover:text-[#009E9E] transition">Disclaimer Médico</button></li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#1e293b] font-bold">Contacto</h4>
                        <ul className="space-y-3 text-stone-500 text-sm font-light">
                            <li className="font-medium text-stone-700">Gennova Labs</li>
                            <li>Barranco, Lima, Perú</li>
                            <li>+51 932 818 432</li>
                            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#009E9E] transition text-[#009E9E] font-medium">Agendar vía WhatsApp</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} GENNOVA LABS PERÚ. ALL RIGHTS RESERVED.</p>
                <p>BIENESTAR PREVENTIVO</p>
            </div>
        </div>
      </footer>

      <FloatingWhatsAppButton />
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
};

export default MainApp;
