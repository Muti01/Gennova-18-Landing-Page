
import React, { useState, useMemo, useEffect } from 'react';
import { 
  AlertTriangle, Shield, CheckCircle2, ChevronDown, ChevronUp, Search, 
  Plus, Trash2, ShoppingBag, Filter, FileText, AlertCircle, Info, Database, Activity, Zap, TrendingUp,
  User, MapPin, Calendar, Smartphone, Scale, Ruler, ScanFace, Clock, Save, Brain, Utensils, Flag, RefreshCw, Sparkles, Droplets, FlaskConical, Beaker
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import { ReportSummaryItem, BioSystem, FoodToAvoid, AdditiveToAvoid, RecommendedFood, PdfNote, Product, UserProfile, BioAgeResult, DayPlan, EmotionalProfileData, Meal } from '../types';
import { ReportRepo } from '../services/dashboardRepo';

// --- A) RESUMEN DE RESULTADOS (MODIFICADO PARA PÁGS 3-7) ---
export const SummaryView: React.FC<{ items: ReportSummaryItem[] }> = ({ items = [] }) => {
  const [showExtended, setShowExtended] = useState(false);
  
  const nutriCategories = ['Antioxidantes', 'Vitaminas', 'Minerales', 'Aminoácidos', 'Ácidos Grasos'];
  const envCategories = ['Expos. Tóxica', 'Microbioma', 'Interferencias', 'Radiación', 'Retos Amb.'];

  const calculateChartScore = (targetCat: string) => {
      const catItems = (items || []).filter(i => {
          if (!i || !i.category) return false;
          const cat = i.category.toLowerCase();
          const target = targetCat.toLowerCase();
          return cat.includes(target) || target.includes(cat);
      });
      if (catItems.length === 0) return 95; 
      const avg = catItems.reduce((acc, curr) => acc + (curr.score || 0), 0) / catItems.length;
      return Math.round(avg);
  };

  const nutriData = nutriCategories.map(cat => ({ name: cat, score: calculateChartScore(cat) }));
  const envData = envCategories.map(cat => ({ name: cat, score: calculateChartScore(cat) }));

  const priorities = {
    high: (items || []).filter(i => i.level === 'high'),
    medium: (items || []).filter(i => i.level === 'medium'),
    low: (items || []).filter(i => i.level === 'low'),
  };

  const groupByCategory = (list: ReportSummaryItem[]) => {
      const groups: Record<string, string[]> = {};
      list.forEach(item => {
          if (!item || !item.category) return;
          if (!groups[item.category]) groups[item.category] = [];
          groups[item.category].push(item.itemName || 'Indicador');
      });
      return Object.entries(groups);
  };

  // Filtrado específico para páginas 4-7
  const extendedCategories = ['Vitaminas', 'Minerales', 'Ácidos Grasos', 'Antioxidantes'];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end mb-6">
         <div>
            <h2 className="text-3xl font-serif text-white mb-2">Resumen de resultados</h2>
            <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">Análisis Multidimensional // Págs 3-7</p>
         </div>
         <button 
            onClick={() => setShowExtended(!showExtended)}
            className="flex items-center gap-2 bg-gennova-gold/10 border border-gennova-gold/30 px-4 py-2 rounded-xl text-[10px] font-bold text-gennova-gold uppercase tracking-widest hover:bg-gennova-gold/20 transition-all"
         >
            {showExtended ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            {showExtended ? 'Ocultar Desglose' : 'Ver Desglose Molecular'}
         </button>
      </div>

      {/* Charts Section (Page 3 Data) */}
      <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
              <h3 className="text-black font-serif text-lg mb-6 text-center">Indicadores nutricionales</h3>
              <div className="h-56 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={nutriData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{ fill: '#4B5563', fontSize: 9, fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" height={50} />
                          <YAxis hide domain={[0, 100]} />
                          <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }} />
                          <Bar dataKey="score" radius={[3, 3, 0, 0]} barSize={18}>
                            {nutriData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.score < 40 ? '#EF4444' : entry.score < 75 ? '#F59E0B' : '#FCD34D'} />
                            ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-200">
              <h3 className="text-black font-serif text-lg mb-6 text-center">Indicadores ambientales</h3>
              <div className="h-56 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={envData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                          <XAxis dataKey="name" tick={{ fill: '#4B5563', fontSize: 9, fontWeight: 600 }} axisLine={false} tickLine={false} interval={0} angle={-35} textAnchor="end" height={50} />
                          <YAxis hide domain={[0, 100]} />
                          <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }} />
                          <Bar dataKey="score" radius={[3, 3, 0, 0]} barSize={18}>
                            {envData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.score < 40 ? '#EF4444' : entry.score < 75 ? '#F59E0B' : '#FCD34D'} />
                            ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
      </div>

      {/* Extended Breakdown (Pages 4-7 Data) */}
      {showExtended && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up">
              {extendedCategories.map(cat => {
                  const catItems = items.filter(i => i.category.toLowerCase().includes(cat.toLowerCase().replace('á', 'a')));
                  return (
                      <div key={cat} className="bg-gennova-elevated border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                              {cat === 'Vitaminas' ? <FlaskConical size={40}/> : cat === 'Minerales' ? <Beaker size={40}/> : <Zap size={40}/>}
                          </div>
                          <h4 className="text-gennova-gold font-mono text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-gennova-gold"></div>
                             Detalle: {cat}
                          </h4>
                          <div className="space-y-3">
                              {catItems.length > 0 ? catItems.map(item => (
                                  <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                                      <span className="text-xs text-white font-medium">{item.itemName}</span>
                                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded border uppercase font-mono ${item.level === 'high' ? 'border-red-500/30 text-red-400' : item.level === 'medium' ? 'border-yellow-500/30 text-yellow-400' : 'border-green-500/30 text-green-400'}`}>
                                          {item.level}
                                      </span>
                                  </div>
                              )) : (
                                  <p className="text-[10px] text-gray-600 italic">No se detectaron prioridades en esta categoría.</p>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
      )}

      {/* Priorities Grid */}
      <div className="grid md:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl mt-8">
          <div className="bg-[#FFEBEE] min-h-[400px] flex flex-col">
              <div className="bg-[#FF5252] py-3 text-center"><h4 className="text-white font-bold text-xs uppercase tracking-wider">Prioridad Alta</h4></div>
              <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar">
                  {groupByCategory(priorities.high).map(([cat, items]) => (
                      <div key={cat} className="text-center"><h5 className="text-[#D32F2F] font-bold mb-2 text-sm uppercase font-mono tracking-tighter">{cat}</h5><ul className="text-gray-700 text-sm font-medium">{items.map((i, idx) => <li key={idx} className="mb-1">{i}</li>)}</ul></div>
                  ))}
              </div>
          </div>
          <div className="bg-[#FFF3E0] min-h-[400px] flex flex-col border-l border-r border-white/50">
              <div className="bg-[#FF9800] py-3 text-center"><h4 className="text-white font-bold text-xs uppercase tracking-wider">Prioridad Media</h4></div>
              <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar">
                  {groupByCategory(priorities.medium).map(([cat, items]) => (
                      <div key={cat} className="text-center"><h5 className="text-[#EF6C00] font-bold mb-2 text-sm uppercase font-mono tracking-tighter">{cat}</h5><ul className="text-gray-700 text-sm font-medium">{items.map((i, idx) => <li key={idx} className="mb-1">{i}</li>)}</ul></div>
                  ))}
              </div>
          </div>
          <div className="bg-[#FFFDE7] min-h-[400px] flex flex-col">
              <div className="bg-[#FDD835] py-3 text-center"><h4 className="text-white font-bold text-xs uppercase tracking-wider">Prioridad Baja</h4></div>
              <div className="p-6 space-y-6 flex-1 overflow-y-auto max-h-[500px] custom-scrollbar">
                  {groupByCategory(priorities.low).map(([cat, items]) => (
                      <div key={cat} className="text-center"><h5 className="text-[#F9A825] font-bold mb-2 text-sm uppercase font-mono tracking-tighter">{cat}</h5><ul className="text-gray-700 text-sm font-medium">{items.map((i, idx) => <li key={idx} className="mb-1">{i}</li>)}</ul></div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

// --- B) SISTEMAS BIOLÓGICOS ---
export const SystemsView: React.FC<{ systems: BioSystem[] }> = ({ systems = [] }) => {
  const [activeSys, setActiveSys] = useState('');
  
  useEffect(() => {
    if (systems.length > 0 && !activeSys) {
      setActiveSys(systems[0].id);
    }
  }, [systems]);

  const sys = systems.find(s => s.id === activeSys);

  return (
    <div className="animate-fade-in">
      <div className="flex gap-4 border-b border-white/10 pb-1 mb-8 overflow-x-auto no-scrollbar">
        {systems.map(s => (<button key={s.id} onClick={() => setActiveSys(s.id)} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeSys === s.id ? 'text-gennova-gold border-b-2 border-gennova-gold' : 'text-gray-500 hover:text-white'}`}>{s.systemName}</button>))}
      </div>
      {sys && (
        <div className="space-y-8">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center">
            <div><h3 className="text-xl font-bold text-white mb-1">{sys.systemName}</h3><p className="text-sm text-gray-400">{sys.statusText}</p></div>
            <div className="text-right"><span className="text-3xl font-serif font-bold text-gennova-gold">{sys.score}%</span><span className="text-[9px] block text-gray-500 font-mono uppercase">Score</span></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black border border-white/10 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2"><Database size={14}/> Nutrientes Clave</h4>
                <div className="space-y-3">{sys.keyNutrients?.map((n, i) => (<div key={i} className="flex justify-between border-b border-white/5 pb-2"><div><span className="text-sm text-white font-bold block">{n.name}</span><span className="text-[10px] text-gray-500">{n.rationale}</span></div><span className={`text-[9px] px-2 py-1 rounded border uppercase font-mono h-max ${n.priority === 'high' ? 'border-red-500/30 text-red-400' : 'border-yellow-500/30 text-yellow-400'}`}>{n.priority}</span></div>))}</div>
            </div>
            <div className="bg-black border border-white/10 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2"><AlertTriangle size={14}/> Estresores</h4>
                <div className="space-y-3">{sys.factors?.map((f, i) => (<div key={i} className="flex justify-between border-b border-white/5 pb-2"><span className="text-sm text-white">{f.name}</span><span className="text-[10px] text-gray-500 font-mono uppercase">{f.type}</span></div>))}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- C) AJUSTES ALIMENTOS ---
export const FoodAdjustmentsView: React.FC<{ foods: FoodToAvoid[], additives: AdditiveToAvoid[] }> = ({ foods = [], additives = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFoods = (foods || []).filter(f => f.foodName?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAdditives = (additives || []).filter(a => a.additiveName?.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="space-y-10 animate-fade-in">
      <div><h2 className="text-3xl font-serif text-white mb-2">Ajustes Alimentos</h2><p className="text-gray-400 text-xs font-mono uppercase">Página 18 // Restricciones de 90 Días</p></div>
      <div className="relative"><Search className="absolute left-4 top-3.5 text-gray-500" size={18} /><input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black border border-white/20 text-white rounded-xl py-3 pl-12 focus:border-gennova-gold outline-none" /></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div><h3 className="text-white font-serif text-xl mb-4 flex items-center gap-2"><Shield size={20} className="text-red-500"/> Evitar</h3><div className="space-y-3">{filteredFoods.map(f => (<div key={f.id} className="bg-white/5 p-4 rounded-xl border border-white/5"><div className="flex justify-between mb-2"><span className="text-white font-bold">{f.foodName}</span><span className="text-[10px] text-red-400 font-mono">{f.durationDays} Días</span></div><p className="text-xs text-gray-400">{f.reason}</p></div>))}</div></div>
        <div><h3 className="text-white font-serif text-xl mb-4 flex items-center gap-2"><AlertCircle size={20} className="text-yellow-500"/> Aditivos</h3><div className="space-y-3">{filteredAdditives.map(a => (<div key={a.id} className="bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-white font-bold block mb-1">{a.additiveName}</span><p className="text-xs text-gray-400">{a.description}</p></div>))}</div></div>
      </div>
    </div>
  );
};

// --- D) OPTIMIZACIÓN NUTRICIONAL ---
export const NutritionView: React.FC<{ foods: RecommendedFood[] }> = ({ foods = [] }) => {
  const categories = Array.from(new Set((foods || []).map(f => f.category).filter(Boolean)));
  return (
    <div className="space-y-8 animate-fade-in">
      <div><h2 className="text-3xl font-serif text-white mb-2">Optimización Nutricional</h2><p className="text-gray-400 text-xs font-mono uppercase">Despensa Epigenética (Págs 20-22)</p></div>
      {categories.map(cat => (<div key={cat}><h4 className="text-gennova-gold font-mono text-xs uppercase mb-4 border-b border-white/10 pb-2">{cat}</h4><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{foods.filter(f => f.category === cat).map(f => (<div key={f.id} className={`p-4 rounded-xl border ${f.priority === 'high' ? 'bg-gennova-success/5 border-gennova-success/20' : 'bg-white/5 border-white/5'}`}><span className="text-white font-bold text-sm">{f.foodName}</span></div>))}</div></div>))}
    </div>
  );
};

// --- E) PLAN EPI NUTRICIONAL ---
export const NutritionPlanView: React.FC<{ plan: DayPlan[] }> = ({ plan = [] }) => {
    const [activeDay, setActiveDay] = useState(1);
    const currentDay = plan.find(d => d.day === activeDay);

    if (!plan || plan.length === 0) return <div className="text-center py-20"><Utensils className="mx-auto text-gray-600 mb-4" /><p className="text-gray-500">Analiza un reporte para generar tu plan.</p></div>;

    const MealCard = ({ meal, color }: { meal: Meal, color: string }) => (!meal ? null : (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col h-full">
            <span className={`${color} font-mono text-[10px] uppercase mb-4 block`}>{meal.type}</span>
            <h3 className="text-xl font-serif text-white mb-2">{meal.name}</h3>
            <p className="text-gray-400 text-xs mb-4 flex-1">{meal.description}</p>
            <div className="text-[10px] text-gray-300 font-bold mb-4 bg-black/20 p-2 rounded">Porción: {meal.portion}</div>
            <div className="pt-4 border-t border-white/5"><h4 className="text-[9px] text-gray-500 uppercase mb-2">Aporte Molecular</h4><div className="flex flex-wrap gap-1">{meal.contributions?.vitamins?.map(v => <span key={v} className="text-[7px] bg-white/10 px-1.5 rounded uppercase">Vit {v}</span>)}</div></div>
            <div className="mt-4 bg-gennova-success/5 p-3 rounded-xl"><p className="text-[9px] italic text-gray-400">"{meal.biohack}"</p></div>
        </div>
    ));

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif text-white mb-6">Plan Epi Nutricional</h2>
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8">{plan.map(d => (<button key={d.day} onClick={() => setActiveDay(d.day)} className={`px-6 py-3 rounded-xl border ${activeDay === d.day ? 'bg-gennova-gold text-black' : 'bg-white/5 text-gray-400'}`}>{d.label}</button>))}</div>
            {currentDay && (<div className="grid lg:grid-cols-3 gap-6"><MealCard meal={currentDay.meals.breakfast} color="text-gennova-gold" /><MealCard meal={currentDay.meals.lunch} color="text-gennova-cyan" /><MealCard meal={currentDay.meals.dinner} color="text-white" /></div>)}
        </div>
    );
};

// --- F) PERFIL ---
export const ProfileView: React.FC<{ onUpdate?: () => void }> = ({ onUpdate }) => {
    const [profile, setProfile] = useState<Partial<UserProfile>>({});
    const [saving, setSaving] = useState(false);
    
    useEffect(() => { 
        const load = async () => setProfile(await ReportRepo.getExtendedProfile()); 
        load(); 
    }, []);

    const handleSave = async () => { 
        setSaving(true); 
        await ReportRepo.updateProfile(profile); 
        if (onUpdate) onUpdate();
        setTimeout(() => setSaving(false), 1000); 
    };

    return (
        <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-serif text-white mb-1">Perfil Biológico</h2>
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Base de Datos de Optimización</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="flex items-center gap-2 bg-gennova-gold text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-gennova-gold/20"
                >
                    {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                    {saving ? 'Guardando...' : 'Guardar Perfil'}
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 bg-gennova-elevated p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><User size={120} /></div>
                
                <div className="space-y-6 relative z-10">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">Identidad</h3>
                    <div>
                        <label className="text-[10px] uppercase text-gray-500 font-mono block mb-2">Nombres</label>
                        <input value={profile.firstName || ''} onChange={e => setProfile({...profile, firstName: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gennova-gold transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase text-gray-500 font-mono block mb-2">Apellidos</label>
                        <input value={profile.lastName || ''} onChange={e => setProfile({...profile, lastName: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gennova-gold transition-colors" />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase text-gray-500 font-mono block mb-2">Sexo Biológico</label>
                        <select value={profile.gender || ''} onChange={e => setProfile({...profile, gender: e.target.value as any})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white outline-none focus:border-gennova-gold transition-colors">
                            <option value="">Seleccionar</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <h3 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/5 pb-2">Cronología & Métricas</h3>
                    <div>
                        <label className="text-[10px] uppercase text-gennova-gold font-mono block mb-2 flex items-center gap-2"><Calendar size={12}/> Fecha de Nacimiento</label>
                        <input 
                            type="date" 
                            value={profile.birthDate || ''} 
                            onChange={e => setProfile({...profile, birthDate: e.target.value})} 
                            className="w-full bg-black border border-gennova-gold/30 rounded-xl p-3 text-white outline-none focus:border-gennova-gold transition-colors" 
                        />
                        <p className="text-[9px] text-gray-600 mt-2 font-mono uppercase tracking-wider">Crucial para cálculo de edad biológica</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-mono block mb-2">Peso (kg)</label>
                            <input type="number" value={profile.weight || ''} onChange={e => setProfile({...profile, weight: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase text-gray-500 font-mono block mb-2">Talla (cm)</label>
                            <input type="number" value={profile.height || ''} onChange={e => setProfile({...profile, height: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-gennova-gold/5 border border-gennova-gold/10 p-6 rounded-3xl flex items-start gap-4">
                <Info size={20} className="text-gennova-gold shrink-0 mt-1" />
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                    <strong>Nota Biotecnológica:</strong> Estos datos permiten a <span className="text-white font-bold">Genn Coach AI</span> establecer tu línea base metabólica. Al analizar tu reporte PDF, el sistema cruzará tu fecha de nacimiento con tus marcadores de metilación para entregarte una estimación precisa de tu envejecimiento celular.
                </p>
            </div>
        </div>
    );
};

// --- G) EDAD BIOLÓGICA ---
export const BioAgeEstimationView: React.FC<{ result: BioAgeResult | null, onRecalculate: () => void }> = ({ result }) => (!result ? null : (
    <div className="max-w-4xl mx-auto text-center pb-20">
        <h2 className="text-3xl font-serif text-white mb-10">Edad Biológica Funcional</h2>
        <div className="bg-gradient-to-br from-white/10 to-black p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,232,248,0.05),transparent_70%)]"></div>
            <span className="text-[10px] uppercase text-gray-500 tracking-[0.4em] block mb-4 font-mono font-bold">Estimación Actual</span>
            <div className="text-9xl font-serif text-white font-bold mb-4 tracking-tighter drop-shadow-lg">{result.estimatedBioAge}</div>
            <div className={`inline-flex gap-2 ${result.ageDifference < 0 ? 'bg-gennova-success/10 text-gennova-success' : 'bg-red-500/10 text-red-400'} px-6 py-2 rounded-full font-bold font-mono border border-current/20`}>
                {result.ageDifference < 0 ? <TrendingUp size={16} className="rotate-180" /> : <TrendingUp size={16} />}
                {result.ageDifference < 0 ? '-' : '+'}{Math.abs(result.ageDifference)} Años
            </div>
            <p className="text-gray-400 mt-12 max-w-lg mx-auto italic font-light text-lg">"{result.interpretation}"</p>
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-12 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                <span>Cronológica: {result.chronologicalAge}</span>
                <span>Último Análisis: {result.lastUpdated}</span>
            </div>
        </div>
    </div>
));

// --- H) PERFIL EMOCIONAL ---
export const EmotionalProfileView: React.FC<{ profile: EmotionalProfileData | null }> = ({ profile }) => (!profile ? null : (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-gennova-cyan/10 border border-gennova-cyan/20 text-gennova-cyan"><Brain size={24}/></div>
            <h2 className="text-3xl font-serif text-white">Perfil Bio-Emocional</h2>
        </div>
        <div className="bg-gennova-elevated border border-white/10 p-10 rounded-[3rem] mb-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5"><Activity size={100} /></div>
            <span className="text-gennova-cyan text-[10px] font-mono font-bold uppercase block mb-4 tracking-[0.3em]">Estado Primario Detectado</span>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-none tracking-tight">{profile.primaryState}</h3>
            <p className="text-gray-400 leading-relaxed mb-10 text-lg font-light border-l-2 border-gennova-cyan/30 pl-8">{profile.description}</p>
            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
                {Object.entries(profile.neurotransmitters || {}).map(([key, val]) => (
                    <div key={key} className="text-center group">
                        <span className="text-[9px] uppercase text-gray-500 block mb-2 font-mono tracking-widest group-hover:text-gennova-gold transition-colors">{key}</span>
                        <span className={`text-sm font-bold uppercase tracking-wide ${val === 'Bajo' ? 'text-red-400' : 'text-gennova-success'}`}>{val}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            {profile.traits?.map((trait, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between mb-4">
                        <h4 className="text-white font-bold">{trait.trait}</h4>
                        <span className="text-[10px] text-gennova-gold font-mono">{trait.score}/10</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light mb-4 leading-relaxed">"{trait.implication}"</p>
                    <div className="pt-4 border-t border-white/5 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                        Origen: {trait.bioOrigin}
                    </div>
                </div>
            ))}
        </div>
    </div>
));

// --- I) COMENTARIOS ---
export const PdfNotesView: React.FC<{ notes: PdfNote[], onAdd: (n: any) => void, onDelete: (id: string) => void }> = ({ notes = [], onAdd, onDelete }) => (
    <div className="grid md:grid-cols-2 gap-8 pb-20">
        <div><h3 className="text-2xl font-serif text-white mb-6">Comentarios del Especialista</h3><div className="space-y-4">{notes.map(n => <div key={n.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group hover:border-white/20 transition-all"><button onClick={() => onDelete(n.id)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button><h4 className="text-white font-bold mb-2">{n.title}</h4><p className="text-gray-400 text-xs leading-relaxed font-light">{n.body}</p><span className="block mt-4 text-[9px] font-mono text-gray-600">{new Date(n.createdAt).toLocaleDateString()}</span></div>)}</div></div>
    </div>
);

// --- J) PRODUCTOS ---
export const ProductsView: React.FC<{ products: Product[], selectedIds: string[], onToggle: (id: string) => void, onSave: () => void, onCancel: () => void }> = ({ products = [], selectedIds = [], onToggle, onSave }) => (
    <div className="pb-20">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-3xl font-serif text-white mb-1">Catálogo de Optimización</h2>
                <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest">Suplementación Basada en Biomarcadores</p>
            </div>
            <button onClick={onSave} className="bg-white text-black px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gennova-gold transition-all shadow-xl">Guardar Selección</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
            {products.map(p => (<div key={p.id} onClick={() => onToggle(p.id)} className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all relative group ${selectedIds.includes(p.id) ? 'bg-gennova-gold/10 border-gennova-gold' : 'bg-gennova-elevated border-white/5 hover:border-white/20'}`}>
                <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border flex items-center justify-center ${selectedIds.includes(p.id) ? 'bg-gennova-gold border-gennova-gold' : 'border-gray-700'}`}>{selectedIds.includes(p.id) && <CheckCircle2 size={14} className="text-black" />}</div>
                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-gennova-gold transition-colors">{p.name}</h4>
                <p className="text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em] mb-6">{p.category}</p>
                <p className="text-xs text-gray-400 font-light mb-6 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-white font-mono font-bold text-lg">S/ {p.price}</span>
                    <span className="text-[10px] font-bold text-gennova-cyan uppercase tracking-widest">{p.matchScore}% Match</span>
                </div>
            </div>))}
        </div>
    </div>
);
