import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";

interface Photo {
  id?: number;
  category: string;
  title: string;
  img: string;
}

const FALLBACK = {
  photos: [
    { category: "Alam",      title: "Hutan Tropis Nagari",    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop" },
    { category: "Budaya",    title: "Kesenian Tradisional",    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop" },
    { category: "Pertanian", title: "Sawah Terasering",        img: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=800&auto=format&fit=crop" },
    { category: "Pertanian", title: "Ladang Padi",             img: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=800&auto=format&fit=crop" },
    { category: "Wisata",    title: "Sungai Aro",              img: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=800&auto=format&fit=crop" },
    { category: "Sosial",    title: "Gotong Royong",           img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { category: "Budaya",    title: "Rumah Gadang",            img: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=800&auto=format&fit=crop" },
    { category: "Alam",      title: "Panorama Pegunungan",     img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
    { category: "UMKM",      title: "Produk Lokal",            img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop" },
  ] as Photo[],
};

const categoryColors: Record<string, string> = {
  Alam:          "bg-emerald-500",
  Budaya:        "bg-amber-500",
  Pertanian:     "bg-lime-600",
  Wisata:        "bg-blue-500",
  Sosial:        "bg-rose-500",
  UMKM:          "bg-orange-500",
  Infrastruktur: "bg-slate-500",
};

export function Galeri() {
  const { photos } = useContent("galeri", FALLBACK);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
  };

  const currentPhoto = selectedIdx !== null ? photos[selectedIdx] : null;

  return (
    <section id="galeri" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 justify-center w-full">
            <span className="w-8 h-[2px] bg-primary-foreground" />
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Dokumentasi</span>
            <span className="w-8 h-[2px] bg-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Galeri Nagari</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Potret kehidupan, alam, dan budaya Nagari Silongo yang memesona.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((photo, index) => {
            const isLarge = index === 0 || index === 4 || index === 8;
            const catColor = categoryColors[photo.category] ?? "bg-primary";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${isLarge ? "row-span-2" : ""}`}
                style={{ minHeight: isLarge ? 340 : 180 }}
                onClick={() => setSelectedIdx(index)}
                data-testid={`gallery-item-${index}`}
              >
                <img
                  src={imgErrors.has(index) ? `https://placehold.co/800x600/1a4731/ffffff?text=${encodeURIComponent(photo.category)}` : photo.img}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgErrors((prev) => new Set(prev).add(index))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className={`self-start text-[10px] font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded-full mb-1.5 ${catColor}`}>
                    {photo.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-sm truncate pr-2">{photo.title}</span>
                    <Maximize2 className="w-5 h-5 text-white/80 shrink-0" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 opacity-100 group-hover:opacity-0 transition-opacity">
                  <span className={`w-2 h-2 rounded-full block ${catColor}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedIdx !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              onClick={() => setSelectedIdx(null)}
              data-testid="button-gallery-close"
            >
              <X className="w-7 h-7" />
            </button>
            <button
              className="absolute left-4 md:left-8 text-white/50 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition-colors z-10"
              onClick={handlePrev}
              data-testid="button-gallery-prev"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              className="absolute right-4 md:right-8 text-white/50 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/15 transition-colors z-10"
              onClick={handleNext}
              data-testid="button-gallery-next"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative max-w-4xl w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imgErrors.has(selectedIdx) ? `https://placehold.co/1200x800/1a4731/ffffff?text=${encodeURIComponent(currentPhoto.category)}` : currentPhoto.img}
                alt={currentPhoto.title}
                className="w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
                onError={() => setImgErrors((prev) => new Set(prev).add(selectedIdx))}
              />
              <div className="text-center">
                <span className={`text-[10px] font-bold uppercase tracking-widest text-white px-3 py-1 rounded-full ${categoryColors[currentPhoto.category] ?? "bg-primary"}`}>
                  {currentPhoto.category}
                </span>
                <p className="text-white/80 font-medium mt-2">{currentPhoto.title}</p>
                <p className="text-white/40 text-xs mt-1">{selectedIdx + 1} / {photos.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
