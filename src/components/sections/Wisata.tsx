import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const wisata = [
  {
    id: 1,
    title: "Rumah Gadang Silongo",
    desc: "Simbol arsitektur tradisional Minangkabau yang masih berdiri megah dan terawat di pusat nagari.",
    img: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Sawah Terasering",
    desc: "Hamparan sawah bertingkat yang menawarkan pemandangan hijau menyejukkan mata.",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Sungai Aro",
    desc: "Aliran sungai jernih dengan bebatuan alami, lokasi sempurna untuk bersantai bersama keluarga.",
    img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Budaya Randai",
    desc: "Kesenian teater tradisional Minangkabau yang menggabungkan seni bela diri silat, musik, tari, dan drama.",
    img: "https://images.unsplash.com/photo-1558500224-b155ec409d22?q=80&w=800&auto=format&fit=crop"
  }
];

export function Wisata() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) setWidth(ref.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % wisata.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + wisata.length) % wisata.length);
  };

  return (
    <section id="wisata" className="py-20 md:py-32 bg-primary relative overflow-hidden">
      {/* Decorative texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')]"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary-foreground"></span>
              <span className="text-primary-foreground font-semibold tracking-wider text-sm uppercase">Eksplorasi</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Wisata & Budaya
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-3"
          >
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-primary-foreground text-primary-foreground flex items-center justify-center hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>

        <div className="relative" ref={ref}>
          <div className="overflow-hidden rounded-2xl">
            <motion.div 
              className="flex"
              animate={{ 
                x: `-${currentIndex * (width >= 1024 ? 33.333 : width >= 768 ? 50 : 100)}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {wisata.map((item) => (
                <div 
                  key={item.id} 
                  className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-3"
                >
                  <div 
                    className="group relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer bg-black/20"
                    onClick={() => setSelectedImg(item.img)}
                    data-testid={`card-wisata-${item.id}`}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${item.img})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-display text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Fullscreen view" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}