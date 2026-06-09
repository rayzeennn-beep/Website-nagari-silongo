import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Floating particle */
function Particle({ x, y, size, delay, dur }: { x: string; y: string; size: number; delay: number; dur: number }) {
  return (
    <div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity: 0.08 + Math.random() * 0.12,
        animation: `floatUp ${dur}s ${delay}s infinite ease-in-out alternate`,
      }}
    />
  );
}

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: `${(i * 4.7 + 2) % 100}%`,
  y: `${(i * 7.3 + 5) % 100}%`,
  size: 2 + (i % 5),
  delay: (i * 0.4) % 6,
  dur: 5 + (i % 5),
}));

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="beranda"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND: layered gradient + topographic pattern ── */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 will-change-transform">
        {/* Base green gradient */}
        <div className="absolute inset-0 bg-[conic-gradient(from_220deg_at_60%_40%,_#0b2e1a_0deg,_#1a5c38_90deg,_#0d3d22_200deg,_#071a0e_320deg,_#0b2e1a_360deg)]" />
        {/* Radial highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,_rgba(44,130,72,0.35),_transparent)]" />
        {/* Diagonal light sweep */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.04)_0%,_transparent_50%,_rgba(0,0,0,0.15)_100%)]" />
        {/* Topographic / contour lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="blur"><feGaussianBlur stdDeviation="1" /></filter>
          </defs>
          {[80, 160, 240, 300, 360, 420, 480, 540, 600, 660].map((r, i) => (
            <ellipse key={i} cx="50%" cy="48%" rx={r * 2.2} ry={r * 0.9} fill="none" stroke="white" strokeWidth="1" filter="url(#blur)" />
          ))}
          {[50, 120, 190, 260, 330, 390, 450, 510, 570].map((r, i) => (
            <ellipse key={`b${i}`} cx="72%" cy="65%" rx={r * 1.8} ry={r * 0.7} fill="none" stroke="white" strokeWidth="0.6" filter="url(#blur)" />
          ))}
        </svg>
        {/* Mountain silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.12]"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,300 L0,240 L80,180 L180,240 L280,140 L400,220 L520,80 L640,200 L760,120 L880,200 L1000,60 L1120,180 L1240,100 L1360,200 L1440,150 L1440,300 Z" fill="white" />
          <path d="M0,300 L0,260 L100,200 L200,260 L320,170 L440,240 L560,160 L680,220 L800,160 L900,220 L1040,140 L1160,210 L1280,170 L1380,220 L1440,190 L1440,300 Z" fill="white" opacity="0.4" />
        </svg>
        {/* Rice terrace lines */}
        <svg className="absolute bottom-0 left-0 w-full opacity-[0.06]" viewBox="0 0 1440 200" preserveAspectRatio="none">
          {[10, 30, 55, 80, 110, 140, 165, 185].map((y, i) => (
            <path key={i} d={`M${-50 + i * 8},${y} Q${360 + i * 10},${y - 12} ${720 + i * 8},${y + 8} Q${1080 - i * 5},${y + 15} ${1490 - i * 8},${y - 5}`} fill="none" stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.55)_100%)] z-[1]" />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-[1]" />

      {/* Particles */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: contentY }}
        className="container relative z-10 mx-auto px-4 md:px-6 pt-28 pb-16 flex flex-col items-center text-center"
      >
        {/* Official badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-yellow-300 backdrop-blur-sm uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          Website Resmi Pemerintahan Nagari
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-white leading-[1.04] mb-5"
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            textShadow: "0 8px 50px rgba(0,0,0,0.6), 0 2px 10px rgba(201,168,76,0.2)",
          }}
        >
          Nagari Silongo
        </motion.h1>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/80 mb-4 text-sm md:text-lg font-medium"
        >
          <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>Kecamatan Lubuk Tarok</span>
          <span className="text-yellow-400/50 hidden md:inline">·</span>
          <span>Kabupaten Sijunjung</span>
          <span className="text-yellow-400/50 hidden md:inline">·</span>
          <span>Sumatera Barat</span>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="w-20 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-7 rounded-full"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="text-white/65 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Sebuah nagari yang kaya budaya, alam, dan potensi — membangun masa depan bersama
          dengan semangat kebersamaan dan kearifan lokal Minangkabau.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button
            size="lg"
            onClick={() => handleScrollTo("#profil")}
            data-testid="button-hero-explore"
            className="bg-yellow-400 text-[#0d2b1a] hover:bg-yellow-300 font-bold px-9 rounded-full shadow-[0_0_32px_rgba(212,168,67,0.4)] text-base transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,168,67,0.6)] hover:-translate-y-0.5"
          >
            Jelajahi Nagari
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScrollTo("#pemerintahan")}
            data-testid="button-hero-info"
            className="bg-white/5 border-white/25 text-white hover:bg-white/12 px-9 rounded-full backdrop-blur-sm text-base transition-all duration-300 hover:-translate-y-0.5"
          >
            Informasi Desa
          </Button>
        </motion.div>

        {/* Quick stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 sm:gap-x-12"
        >
          {[
            { val: "839", unit: "Jiwa", label: "Penduduk" },
            { val: "3", unit: "Jorong", label: "Wilayah" },
            { val: "13,40", unit: "km²", label: "Luas Area" },
            { val: "25+", unit: "UMKM", label: "Usaha Aktif" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="font-display font-bold text-yellow-400 leading-none" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
                {s.val}<span className="text-base ml-0.5">{s.unit}</span>
              </div>
              <span className="text-white/40 text-[10px] tracking-[0.18em] uppercase mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
        onClick={() => handleScrollTo("#profil")}
        aria-label="Scroll ke bawah"
      >
        <span className="text-white/35 text-[9px] uppercase tracking-[0.25em]">Gulir</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ChevronDown className="text-yellow-400/50 w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden z-10 translate-y-[1px]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-14 md:h-20 block">
          <path d="M0,60 C240,110 480,20 720,70 C960,120 1200,30 1440,65 L1440,100 L0,100 Z" className="fill-background" />
        </svg>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-18px) translateX(8px); }
        }
      `}</style>
    </section>
  );
}
