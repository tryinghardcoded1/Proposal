import { useState, useEffect, useRef } from 'react';
import { slides } from './data/slides';
import Slide from './components/Slide';
import { ChevronLeft, ChevronRight, Maximize2, X, Presentation, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    
    setIsGeneratingPdf(true);
    
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1280, 720]
      });

      const slideElements = printRef.current.children;

      for (let i = 0; i < slideElements.length; i++) {
        const element = slideElements[i] as HTMLElement;
        
        const canvas = await html2canvas(element, {
          scale: 2, // Higher quality
          useCORS: true,
          backgroundColor: '#020617', // slate-950
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);

        if (i > 0) {
          pdf.addPage([1280, 720], 'landscape');
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, 1280, 720);
      }

      pdf.save('Vincent-Creation-Proposal.pdf');
    } catch (error) {
      console.error('PDF Generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
      {/* Hidden Print Area */}
      <div 
        ref={printRef} 
        className="fixed top-0 left-[-9999px] pointer-events-none"
      >
        {slides.map(slide => (
          <Slide key={slide.id} slide={slide} isActive={true} printMode={true} />
        ))}
      </div>

      {/* Header / Progress */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
            <Presentation size={18} strokeWidth={2.5} />
          </div>
          <span className="font-medium text-slate-400 text-sm hidden sm:block">
            Vincent Creation Proposal
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-mono text-slate-500">
            {currentSlide + 1} / {slides.length}
          </div>
          <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span className="hidden sm:inline">PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Area */}
      <main className="h-screen w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Slide slide={slides[currentSlide]} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Hint */}
      <div className="fixed bottom-6 right-6 text-xs text-slate-600 font-mono hidden md:block">
        Use Arrow Keys to Navigate
      </div>
    </div>
  );
}
