import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../data/slides';
import { IconMap } from './Icons';

interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  printMode?: boolean;
}

export default function Slide({ slide, isActive, printMode = false }: SlideProps) {
  const [copied, setCopied] = useState(false);
  const Icon = IconMap[slide.iconName] || IconMap.Map;
  const CopyIcon = IconMap.Copy;
  const CheckIcon = IconMap.Check;

  // Custom Visuals
  const renderVisual = () => {
    // Slide 3: Digital Real Estate Diagram
    if (slide.id === 3) {
      const GlobeIcon = IconMap.Globe;
      const RankIcon = IconMap.TrendingUp;
      const LeadIcon = IconMap.User;
      const PartnerIcon = IconMap.Handshake;
      const ArrowIcon = IconMap.ArrowRight;

      const steps = [
        { icon: GlobeIcon, label: "Site" },
        { icon: RankIcon, label: "Rank" },
        { icon: LeadIcon, label: "Lead" },
        { icon: PartnerIcon, label: "Partner" }
      ];

      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
           {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={`https://picsum.photos/seed/${slide.imageSeed}/800/600?grayscale&blur=2`} 
              alt="Visual Blueprint Background" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 w-full justify-center">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center backdrop-blur-md shadow-lg">
                    <step.icon size={32} className="text-indigo-300" />
                  </div>
                  <span className="text-sm font-mono uppercase tracking-wider text-indigo-200 font-semibold">{step.label}</span>
                </div>
                
                {i < steps.length - 1 && (
                  <div className="text-slate-500/50">
                    <ArrowIcon size={24} className="hidden md:block" />
                    <ArrowIcon size={24} className="block md:hidden rotate-90 my-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Slide 7: Division of Labor
    if (slide.id === 7) {
      const TechIcon = IconMap.Code;
      const SearchIcon = IconMap.Search;
      const ServerIcon = IconMap.Server;
      const PhoneIcon = IconMap.Phone;
      const UsersIcon = IconMap.Users;
      const HandshakeIcon = IconMap.Handshake;

      return (
        <div className="relative w-full h-full flex gap-4 p-4 overflow-hidden">
           {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={`https://picsum.photos/seed/${slide.imageSeed}/800/600?grayscale&blur=2`} 
              alt="Visual Blueprint Background" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Left Lane: Tech */}
          <div className="flex-1 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-4 flex flex-col items-center gap-4 z-10 backdrop-blur-sm">
            <div className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2">Tech Lane</div>
            <div className="flex flex-col gap-4 w-full">
              {[
                { icon: TechIcon, label: "Code" },
                { icon: SearchIcon, label: "SEO" },
                { icon: ServerIcon, label: "Server" }
              ].map((item, i) => (
                <div key={i} className="bg-indigo-950/60 p-3 rounded-lg flex items-center gap-3 border border-indigo-500/20 shadow-lg">
                  <item.icon size={20} className="text-indigo-400" />
                  <span className="text-sm text-indigo-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Lane: Growth */}
          <div className="flex-1 bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-4 flex flex-col items-center gap-4 z-10 backdrop-blur-sm">
            <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">Growth Lane</div>
            <div className="flex flex-col gap-4 w-full">
              {[
                { icon: PhoneIcon, label: "Phone" },
                { icon: UsersIcon, label: "CRM" },
                { icon: HandshakeIcon, label: "Handshake" }
              ].map((item, i) => (
                <div key={i} className="bg-emerald-950/60 p-3 rounded-lg flex items-center gap-3 border border-emerald-500/20 shadow-lg">
                  <item.icon size={20} className="text-emerald-400" />
                  <span className="text-sm text-emerald-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Default Visual
    return (
      <div className="relative bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 aspect-[4/3] flex flex-col items-center justify-center text-center space-y-6 w-full h-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`https://picsum.photos/seed/${slide.imageSeed}/800/600?grayscale&blur=2`} 
            alt="Visual Blueprint Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-xl">
          <Icon size={80} className="text-indigo-400" strokeWidth={1.5} />
        </div>
      </div>
    );
  };

  const copyToClipboard = () => {
    const text = `
Slide ${slide.id}: ${slide.title}
Visual Blueprint: ${slide.visualBlueprint}
Key Bullets:
${slide.bullets.map(b => `- ${b}`).join('\n')}
Power Line: "${slide.powerLine}"
    `.trim();
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If printMode is true, we render a static version without motion/animations
  if (printMode) {
    return (
      <div className="w-[1280px] h-[720px] bg-slate-950 flex flex-col items-center justify-center p-16 relative overflow-hidden border-b border-slate-800">
         {/* Background Elements - Simplified for Print */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500 blur-3xl" />
           <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500 blur-3xl" />
        </div>

        <div className="max-w-5xl w-full z-10 grid grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-indigo-400 font-mono text-sm tracking-widest uppercase">
                Slide {slide.id.toString().padStart(2, '0')}
              </span>
              <h1 className="text-5xl font-bold text-white leading-tight">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-xl text-slate-400 font-light">{slide.subtitle}</p>
              )}
            </div>

            <div className="space-y-4">
              {slide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 shrink-0" />
                  <p className="text-lg text-slate-300 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-2xl font-serif italic text-white/90">
                "{slide.powerLine}"
              </p>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-full">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
             {renderVisual()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500 blur-3xl" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500 blur-3xl" />
      </div>

      <div className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full lg:h-auto overflow-y-auto lg:overflow-visible">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 md:space-y-8 order-2 lg:order-1 pb-20 lg:pb-0"
        >
          <div className="space-y-2">
            <span className="text-indigo-400 font-mono text-xs md:text-sm tracking-widest uppercase">
              Slide {slide.id.toString().padStart(2, '0')}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-slate-400 font-light">{slide.subtitle}</p>
            )}
          </div>

          <div className="space-y-3 md:space-y-4">
            {slide.bullets.map((bullet, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 shrink-0" />
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">{bullet}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="pt-6 border-t border-white/10"
          >
            <p className="text-xl md:text-2xl font-serif italic text-white/90">
              "{slide.powerLine}"
            </p>
          </motion.div>
        </motion.div>

        {/* Right Visual / Blueprint */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group w-full aspect-[4/3] lg:h-full order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          
          {/* Render Custom or Default Visual */}
          {renderVisual()}
            
          {/* Copy Button */}
          <button 
            onClick={copyToClipboard}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors z-20 bg-black/20 backdrop-blur-sm"
            title="Copy Slide Content"
          >
            {copied ? <CheckIcon size={20} className="text-emerald-400" /> : <CopyIcon size={20} />}
          </button>
        </motion.div>

      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-2 left-0 w-full text-center p-2 opacity-40 hover:opacity-100 transition-opacity hidden md:block">
        <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
          <IconMap.Info size={12} />
          <span>Note: Plastic Surgery is an example niche. This model applies to any high-ticket, lead-generation business.</span>
        </p>
      </div>
    </div>
  );
}
