
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle, MapPin, Phone, Mail, 
  Facebook, Twitter, Instagram, Youtube, Calendar, 
  Award, TrendingUp, BookOpen, Edit3, LogOut, ShieldCheck,
  LayoutDashboard, Users, Image as ImageIcon, Newspaper, Info, Lock, Eye, Trash2, UserPlus, Map
} from 'lucide-react';
import { INITIAL_CONTENT } from './constants';
import { SiteContent, VolunteerRegistration } from './types';
import Navbar from './components/Navbar';
import CountdownTimer from './components/CountdownTimer';
import EditModal from './components/EditModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editPart, setEditPart] = useState<{ title: string; key: keyof SiteContent } | null>(null);
  const [selectedEventForApplication, setSelectedEventForApplication] = useState<string>('');
  const [content, setContent] = useState<SiteContent>(() => {
    // Bump version to v10 to force refresh and ensure storage consistency
    const saved = localStorage.getItem('site_content_v10');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  // Persistent storage
  useEffect(() => {
    localStorage.setItem('site_content_v10', JSON.stringify(content));
  }, [content]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const email = target.email.value;
    const password = target.password.value;

    if (email === 'admin@arjunvardhan.org' && password === 'admin') {
      setIsAdmin(true);
      setCurrentView('admin_dashboard');
    } else {
      alert("Invalid credentials. Try admin@arjunvardhan.org / admin");
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setCurrentView('home');
  };

  const handleSave = (newData: any) => {
    if (editPart) {
      setContent(prev => ({ ...prev, [editPart.key]: newData }));
      setEditPart(null);
    }
  };

  const applyToEvent = (eventTitle: string) => {
    setSelectedEventForApplication(eventTitle);
    setCurrentView('volunteer');
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;
    const newVolunteer: VolunteerRegistration = {
      id: Date.now().toString(),
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      role: target.role?.value || 'General Supporter',
      appliedEvent: target.appliedEvent?.value || '',
      date: new Date().toLocaleDateString()
    };
    
    setContent(prev => ({
      ...prev,
      volunteers: [newVolunteer, ...prev.volunteers]
    }));
    
    alert("Thank you for joining our movement!");
    setSelectedEventForApplication('');
    target.reset();
    setCurrentView('home');
  };

  const deleteVolunteer = (id: string) => {
    if (confirm("Remove this volunteer record?")) {
      setContent(prev => ({
        ...prev,
        volunteers: prev.volunteers.filter(v => v.id !== id)
      }));
    }
  };

  const renderEditBtn = (title: string, partKey: keyof SiteContent) => {
    if (!isAdmin) return null;
    return (
      <button 
        onClick={(e) => { e.stopPropagation(); setEditPart({ title, key: partKey }); }}
        className="absolute top-4 right-4 z-[40] bg-blue-600 text-white px-4 py-2 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 text-xs font-bold"
      >
        <Edit3 size={14} /> Edit {title}
      </button>
    );
  };

  const { leaderInfo, visionMission, coreValues, achievements, stats, news, gallery, volunteers } = content;

  const renderContent = () => {
    if (currentView === 'admin_login') {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="text-center mb-10">
               <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-white text-3xl font-black shadow-xl shadow-blue-900/40">AV</div>
               <h1 className="text-3xl font-serif font-black text-slate-900">Admin Portal</h1>
               <p className="text-slate-400 font-medium mt-2">Sign in to manage official content</p>
            </div>
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Email Address</label>
                <input name="email" type="email" defaultValue="admin@arjunvardhan.org" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" required />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Password</label>
                <div className="relative">
                  <input name="password" type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-100 transition-all" required />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-black shadow-xl shadow-slate-200 transition-all active:scale-95">
                Login System
              </button>
              <button type="button" onClick={() => setCurrentView('home')} className="w-full text-slate-400 font-bold hover:text-slate-600">Back to Website</button>
            </form>
          </div>
        </div>
      );
    }

    if (currentView === 'admin_dashboard') {
      return (
        <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
               <div>
                  <h1 className="text-5xl font-serif font-black text-slate-900">Dashboard</h1>
                  <p className="text-slate-500 text-lg">Central control for Dr. Arjun Vardhan's digital presence.</p>
               </div>
               <button onClick={logout} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-full font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all">
                 <LogOut size={18} /> Sign Out
               </button>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
               {[
                 { title: 'Leader Profile', icon: <Users />, key: 'leaderInfo', desc: 'Hero, bio, contacts, backgrounds' },
                 { title: 'Vision & Mission', icon: <TrendingUp />, key: 'visionMission', desc: 'Campaign promises, focus areas' },
                 { title: 'Achievements', icon: <Award />, key: 'achievements', desc: 'Milestones and projects' },
                 { title: 'News & Events', icon: <Newspaper />, key: 'news', desc: 'Upcoming public appearances' },
                 { title: 'Gallery', icon: <ImageIcon />, key: 'gallery', desc: 'Photo and video updates' },
                 { title: 'Regional Stats', icon: <Info />, key: 'stats', desc: 'Constituency data' },
                 { title: 'Values', icon: <ShieldCheck />, key: 'coreValues', desc: 'Guiding principles' },
               ].map((mod) => (
                 <button 
                   key={mod.key} 
                   onClick={() => setEditPart({ title: mod.title, key: mod.key as any })}
                   className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all text-left group relative"
                 >
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                     {mod.icon}
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-2">{mod.title}</h4>
                   <p className="text-slate-400 text-sm">{mod.desc}</p>
                 </button>
               ))}
            </div>

            <div className="mt-20 bg-white rounded-[3.5rem] shadow-xl border border-slate-100 overflow-hidden">
               <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Users size={24} /></div>
                    <h3 className="text-3xl font-serif font-black text-slate-900">Volunteer & Event Applications</h3>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{volunteers.length} Total</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-[0.2em] border-b border-slate-100">
                        <th className="px-10 py-6">Name</th>
                        <th className="px-10 py-6">Email</th>
                        <th className="px-10 py-6">Interest / Event</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {volunteers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-10 py-20 text-center text-slate-400 italic">No registrations found yet.</td>
                        </tr>
                      ) : (
                        volunteers.map((v) => (
                          <tr key={v.id} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-10 py-6 font-bold text-slate-900">
                              <div>{v.firstName} {v.lastName}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{v.date}</div>
                            </td>
                            <td className="px-10 py-6 text-slate-600 font-medium">{v.email}</td>
                            <td className="px-10 py-6">
                               <div className="flex flex-col gap-1">
                                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block w-fit">{v.role}</span>
                                  {v.appliedEvent && (
                                    <span className="text-blue-600 text-xs font-bold mt-1">Event: {v.appliedEvent}</span>
                                  )}
                               </div>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <button onClick={() => deleteVolunteer(v.id)} className="text-slate-300 hover:text-red-600 transition-colors p-2">
                                 <Trash2 size={20} />
                               </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <>
            {/* HERO MODULE - Centered Layout */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 py-20">
              {renderEditBtn("Hero Section", "leaderInfo")}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-900/80 to-blue-900/95 z-10"></div>
              {leaderInfo.heroImageUrl && (
                <img 
                  src={leaderInfo.heroImageUrl} 
                  alt="Leader Background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-md px-5 py-2 rounded-full border border-blue-400/30 mb-8">
                    <img src={leaderInfo.partySymbol} className="w-6 h-6 rounded-full" alt="Party" />
                    <span className="text-sm font-bold uppercase tracking-widest">{leaderInfo.partyName}</span>
                  </div>
                  <h1 className="text-6xl md:text-9xl font-serif font-black mb-8 leading-tight tracking-tighter">
                    {leaderInfo.name}
                  </h1>
                  <p className="text-2xl md:text-4xl font-light text-blue-100 mb-12 italic opacity-90 max-w-3xl mx-auto">
                    "{leaderInfo.visionTagline}"
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={() => setCurrentView('vision')} className="bg-white text-blue-900 px-12 py-6 rounded-full font-bold shadow-2xl hover:bg-blue-50 hover:scale-105 transition-all flex items-center gap-3 group text-lg">
                      Know My Vision <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button onClick={() => setCurrentView('contact')} className="bg-transparent border-2 border-white/30 hover:border-white hover:bg-white/5 text-white px-12 py-6 rounded-full font-bold transition-all text-lg">
                      Connect with Me
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT SNIPPET */}
            <section className="py-24 bg-white relative">
              {renderEditBtn("Home Mission", "visionMission")}
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                  <div>
                    <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Core Mission</h2>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-slate-900">Governance with Integrity</h3>
                    <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                      Every project we undertake is a step towards a more equitable and prosperous constituency. We believe in direct action and clear results.
                    </p>
                    <button onClick={() => setCurrentView('about')} className="flex items-center gap-3 text-blue-600 font-black text-lg hover:gap-5 transition-all">
                      Read full biography <ArrowRight size={24} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    {visionMission.map((item, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1">
                        <div className="mb-6 text-blue-600"><BookOpen size={32} /></div>
                        <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CONSTITUENCY BACKGROUND SECTION */}
            <section className="relative py-48 overflow-hidden bg-slate-900">
              {renderEditBtn("Constituency View", "leaderInfo")}
              <div className="absolute inset-0 bg-blue-900/70 z-10"></div>
              {leaderInfo.constituencyImageUrl && (
                <img 
                  src={leaderInfo.constituencyImageUrl} 
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm" 
                  alt="Constituency Background"
                />
              )}
              <div className="relative z-20 max-w-7xl mx-auto px-4 text-center text-white">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8">
                  <Map size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">Our Constituency Focus</span>
                </div>
                <h3 className="text-5xl md:text-7xl font-serif font-black mb-12">The Heart of Our District</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                   {stats.map((stat, i) => (
                     <div key={i} className="p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
                        <div className="text-5xl font-black mb-2">{stat.prefix}{stat.value}{stat.suffix}</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-blue-300">{stat.label}</div>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            {/* NEWS & UPDATES MODULE */}
            <section className="py-24 bg-slate-50 border-t border-slate-100 relative">
              {renderEditBtn("Live Updates", "news")}
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-end justify-between mb-16">
                   <div>
                      <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Live Stream</h2>
                      <h3 className="text-4xl font-serif font-bold text-slate-900">Upcoming Public Events</h3>
                   </div>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                   {news.map((n) => (
                      <div key={n.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group relative border border-slate-100">
                         <div className="h-64 overflow-hidden relative">
                            <img src={n.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={n.title} />
                            {n.eventDate && (
                              <div className="absolute top-6 left-6 z-10">
                                <CountdownTimer targetDate={n.eventDate} />
                              </div>
                            )}
                         </div>
                         <div className="p-10">
                            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase mb-4 tracking-widest">
                               <Calendar size={14} className="text-blue-600" /> {n.date}
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-8 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{n.title}</h4>
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{n.source}</span>
                                <a href={n.link} className="w-12 h-12 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <ArrowRight size={24} />
                                </a>
                              </div>
                              {n.eventDate && (
                                <button 
                                  onClick={() => applyToEvent(n.title)}
                                  className="w-full py-4 bg-blue-50 text-blue-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all group/btn"
                                >
                                  <UserPlus size={18} className="group-hover/btn:scale-110 transition-transform" /> Register to Attend
                                </button>
                              )}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            </section>
          </>
        );

      case 'about':
        return (
          <div className="pt-24 pb-24 relative">
            {renderEditBtn("Biography", "leaderInfo")}
            <div className="bg-blue-900 py-24 text-white mb-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <h1 className="text-6xl font-serif font-bold mb-6">About {leaderInfo.name}</h1>
                <p className="text-blue-100 text-2xl max-w-2xl font-light">{leaderInfo.designation} & Community Advocate.</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-12 gap-20 items-start">
                <div className="lg:col-span-5 relative">
                  {renderEditBtn("Values", "coreValues")}
                  <img src={leaderInfo.aboutImageUrl} alt="Leader" className="rounded-[3rem] shadow-3xl mb-12 w-full object-cover h-[600px] bg-slate-200" />
                  <div className="grid grid-cols-3 gap-6">
                    {coreValues.map((val, i) => (
                      <div key={i} className="bg-white p-6 rounded-3xl text-center shadow-lg border border-slate-50">
                        <div className="flex justify-center mb-4 text-blue-600"><CheckCircle size={32} /></div>
                        <h4 className="font-black text-xs uppercase tracking-tighter text-slate-900">{val.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-10">
                  <h3 className="text-4xl font-serif font-bold text-slate-900 italic leading-relaxed">"Public service is a commitment to the growth of every single household."</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-xl leading-relaxed space-y-8">
                    <p>{leaderInfo.bio}</p>
                    <p>{leaderInfo.fullBio}</p>
                    <div className="bg-blue-50 p-12 rounded-[2.5rem] border-l-8 border-blue-600 shadow-inner">
                      <h4 className="text-blue-900 font-bold text-2xl mb-4">Legislative Presence</h4>
                      <p className="text-slate-600 italic">Operating from {leaderInfo.officeAddress}, focused on bringing large-scale development projects to our district.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="pt-24 pb-24 relative">
            {renderEditBtn("Mission Points", "visionMission")}
            <div className="bg-slate-900 py-24 text-white mb-20 relative">
              <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-6xl font-serif font-bold mb-6">Our Vision 2030</h1>
                <p className="text-slate-400 text-2xl max-w-2xl font-light italic">A comprehensive strategy for the next decade of growth.</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
                {visionMission.map((item, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group">
                    <div className="mb-10 p-6 bg-slate-50 rounded-3xl inline-block text-blue-600 group-hover:scale-110 transition-transform"><TrendingUp size={40} /></div>
                    <h4 className="text-2xl font-bold mb-6 text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-600 rounded-[4rem] p-16 lg:p-24 text-white flex flex-col md:flex-row items-center gap-20 relative shadow-3xl shadow-blue-200">
                {renderEditBtn("Statistics", "stats")}
                <div className="md:w-1/2">
                   <h3 className="text-5xl font-serif font-bold mb-8">Data Driven Accountability</h3>
                   <p className="text-2xl text-blue-100 opacity-90 leading-relaxed font-light italic">"We don't just promise progress, we measure it."</p>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-8">
                   {stats.map((stat, i) => (
                     <div key={i} className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 transition-all">
                        <div className="text-4xl font-black mb-2">{stat.prefix}{stat.value}{stat.suffix}</div>
                        <div className="text-sm font-bold uppercase tracking-widest text-blue-200">{stat.label}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="pt-24 pb-24 bg-slate-50 relative">
            {renderEditBtn("Achievements", "achievements")}
            <div className="bg-white py-24 text-slate-900 mb-20 border-b border-slate-100 shadow-sm">
              <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-6xl font-serif font-bold mb-6">Historical Milestones</h1>
                <p className="text-slate-500 text-2xl font-light max-w-2xl italic">Projects that changed lives.</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4">
              <div className="space-y-20">
                {achievements.map((ach, i) => (
                  <div key={ach.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-20 items-center bg-white p-12 lg:p-20 rounded-[4rem] shadow-sm border border-slate-50`}>
                    <div className="lg:w-1/2">
                      <div className="text-blue-600 font-black text-8xl opacity-5 mb-8 italic">{ach.year}</div>
                      <h4 className="text-4xl font-bold mb-6 text-slate-900">{ach.title}</h4>
                      <p className="text-xl text-slate-500 leading-relaxed mb-10">{ach.description}</p>
                      <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                        <Award size={20} /> {ach.category}
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <img src={`https://picsum.photos/seed/${ach.id}/1200/800`} alt={ach.title} className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="pt-24 pb-24 relative">
            {renderEditBtn("Media Gallery", "gallery")}
            <div className="bg-blue-50 py-24 text-blue-900 mb-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-6xl font-serif font-bold mb-6 italic">Visual Highlights</h1>
                <p className="text-blue-700 text-2xl font-light max-w-2xl mx-auto">Spirit of service.</p>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-24">
                {gallery.map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-lg bg-slate-200">
                    <img src={img} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'volunteer':
        return (
          <div className="pt-24 pb-24 bg-slate-900 text-white min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="animate-in slide-in-from-left duration-700">
                  <h2 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-6">Support The Movement</h2>
                  <h1 className="text-7xl font-serif font-bold mb-10 leading-tight">Your Voice,<br />Our Action.</h1>
                  <p className="text-xl text-slate-400 font-light italic">Help us build the constituency of the future. Every pair of hands makes a difference.</p>
                </div>
                <div className="bg-white rounded-[4rem] p-16 text-slate-900 shadow-3xl">
                   <h3 className="text-4xl font-black mb-10 text-center text-slate-900">Registration Form</h3>
                   <form className="space-y-8" onSubmit={handleVolunteerSubmit}>
                      <div className="grid grid-cols-2 gap-6">
                        <input name="firstName" type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-900" required />
                        <input name="lastName" type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-900" required />
                      </div>
                      <input name="email" type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-900" required />
                      
                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest">How would you like to help?</label>
                        <select name="role" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-900">
                          <option>General Supporter</option>
                          <option>Event Volunteer</option>
                          <option>Community Organizer</option>
                          <option>Digital Advocate</option>
                        </select>
                      </div>

                      <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Applying for Specific Event (Optional)</label>
                        <select 
                          name="appliedEvent" 
                          defaultValue={selectedEventForApplication}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-medium text-slate-900"
                        >
                          <option value="">General Registration</option>
                          {news.filter(n => n.eventDate).map(n => (
                            <option key={n.id} value={n.title}>{n.title}</option>
                          ))}
                        </select>
                      </div>

                      <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
                        Join The Movement
                      </button>
                   </form>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="pt-24 pb-24 relative">
            {renderEditBtn("Contact Info", "leaderInfo")}
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-24">
                <h1 className="text-7xl font-serif font-bold mb-8 text-slate-900">Connect With Us</h1>
                <p className="text-2xl text-slate-400 max-w-2xl mx-auto font-light italic">Accessible governance.</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-10 mb-24">
                <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 text-center hover:shadow-xl transition-all">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8"><MapPin size={40} /></div>
                  <h4 className="text-2xl font-bold mb-4">Official HQ</h4>
                  <p className="text-slate-500 text-lg leading-relaxed">{leaderInfo.officeAddress}</p>
                </div>
                <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 text-center hover:shadow-xl transition-all">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8"><Phone size={40} /></div>
                  <h4 className="text-2xl font-bold mb-4">Hotline</h4>
                  <p className="text-slate-900 text-2xl font-black">{leaderInfo.phone}</p>
                </div>
                <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 text-center hover:shadow-xl transition-all">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8"><Mail size={40} /></div>
                  <h4 className="text-2xl font-bold mb-4">Email Channel</h4>
                  <p className="text-slate-900 text-lg font-bold underline">{leaderInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {currentView !== 'admin_login' && <Navbar currentView={currentView} onNavigate={setCurrentView} />}
      
      <main className="transition-all duration-300">
        {renderContent()}
      </main>

      {/* Floating Admin Control - Only visible when logged in */}
      {currentView !== 'admin_login' && isAdmin && (
        <div className="fixed bottom-10 left-10 z-[100] flex flex-col items-start gap-4">
             <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-blue-100 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
                <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Live Dashboard Active</span>
                <button onClick={() => setCurrentView('admin_dashboard')} className="text-[10px] font-black text-blue-600 uppercase hover:underline ml-2">Dashboard</button>
             </div>
          <button 
            onClick={logout}
            className="group px-6 py-5 rounded-[2rem] shadow-3xl transition-all flex items-center gap-4 hover:scale-110 active:scale-95 bg-red-600 text-white"
          >
            <LogOut size={28} />
            <span className="font-black text-xs uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
              System Logout
            </span>
          </button>
        </div>
      )}

      {editPart && (
        <EditModal 
          title={`Edit ${editPart.title}`}
          initialData={content[editPart.key]}
          onSave={handleSave}
          onClose={() => setEditPart(null)}
        />
      )}

      {currentView !== 'admin_login' && (
        <footer className="bg-slate-900 py-32 text-slate-500 text-sm">
           <div className="max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-20 pb-20 border-b border-white/5">
                 <div className="col-span-1">
                    <div className="flex items-center gap-4 text-white mb-10">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/40">AV</div>
                      <span className="font-serif font-black text-2xl tracking-tight">{content.leaderInfo.name}</span>
                    </div>
                    <p className="leading-relaxed text-lg font-light italic">{content.leaderInfo.designation}</p>
                 </div>
                 <div>
                    <h6 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Official Portal</h6>
                    <ul className="space-y-5 text-lg font-medium">
                       <li><button onClick={() => setCurrentView('about')} className="hover:text-blue-400 transition-colors">The Biography</button></li>
                       <li><button onClick={() => setCurrentView('vision')} className="hover:text-blue-400 transition-colors">Our Vision 2030</button></li>
                       <li><button onClick={() => setCurrentView('gallery')} className="hover:text-blue-400 transition-colors">Media Gallery</button></li>
                    </ul>
                 </div>
                 <div>
                    <h6 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Legal & Privacy</h6>
                    <ul className="space-y-5 text-lg font-medium">
                       <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                       <li><a href="#" className="hover:text-blue-400 transition-colors">Campaign Disclaimer</a></li>
                    </ul>
                 </div>
                 <div>
                    <h6 className="text-white font-black mb-8 uppercase tracking-widest text-xs">Campaign Feed</h6>
                    <div className="flex gap-6">
                      <Facebook size={24} className="hover:text-white cursor-pointer hover:scale-125 transition-transform" />
                      <Twitter size={24} className="hover:text-white cursor-pointer hover:scale-125 transition-transform" />
                      <Instagram size={24} className="hover:text-white cursor-pointer hover:scale-125 transition-transform" />
                    </div>
                 </div>
              </div>
              <div className="pt-16 flex flex-col md:flex-row items-center justify-between gap-10 opacity-50">
                 <p>© 2024 Dr. Arjun Vardhan. Official Campaign Portfolio.</p>
                 <button 
                  onClick={() => setCurrentView('admin_login')} 
                  className="flex items-center gap-2 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10"
                >
                  <Lock size={12} /> Staff Admin Login
                </button>
              </div>
           </div>
        </footer>
      )}
      <style>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
        .scale-in-center {
          animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
        @keyframes scale-in-center {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
