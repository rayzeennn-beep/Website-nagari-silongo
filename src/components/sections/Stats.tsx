import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, Map, Briefcase } from "lucide-react";
import gsap from "gsap";
import { useContent } from "@/hooks/useContent";

interface StatContent {
  penduduk: { value: string; unit: string };
  jorong:   { value: string; unit: string };
  luas:     { value: string; unit: string };
  umkm:     { value: string; unit: string };
}

const FALLBACK: StatContent = {
  penduduk: { value: "839",   unit: "Jiwa" },
  jorong:   { value: "3",     unit: "Jorong" },
  luas:     { value: "13,40", unit: "km²" },
  umkm:     { value: "25+",   unit: "UMKM" },
};

const STYLES = [
  { icon: Users,    color: "from-emerald-500 to-green-600",  label: "Jumlah Penduduk", key: "penduduk" as const },
  { icon: MapPin,   color: "from-yellow-500 to-amber-500",   label: "Jumlah Jorong",   key: "jorong"   as const },
  { icon: Map,      color: "from-blue-500 to-cyan-500",      label: "Luas Wilayah",    key: "luas"     as const },
  { icon: Briefcase,color: "from-purple-500 to-indigo-500",  label: "Pelaku UMKM",     key: "umkm"     as const },
];

function AnimatedValue({ raw, inView }: { raw: string; inView: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !spanRef.current) return;

    const num = parseFloat(raw.replace(",", ".").replace(/[^0-9.]/g, ""));
    if (isNaN(num)) {
      spanRef.current.textContent = raw;
      return;
    }

    const hasDecimal = raw.includes(",") || raw.includes(".");
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        if (spanRef.current) {
          spanRef.current.textContent = obj.val.toFixed(hasDecimal ? 2 : 0).replace(".", ",");
        }
      },
    });
  }, [raw, inView]);

  return <span ref={spanRef}>0</span>;
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const content = useContent<StatContent>("statistik", FALLBACK);

  return (
    <section className="py-12 md:py-20 bg-background relative z-20 -mt-12">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STYLES.map((s, index) => {
            const data = content[s.key];
            const suffix = data.unit;
            const numericSuffix = suffix.replace(/[0-9+]/g, "").trim();

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-border/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                data-testid={`card-stat-${index}`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] bg-gradient-to-br ${s.color} opacity-[0.06] group-hover:opacity-10 transition-opacity`} />

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex items-baseline gap-1 font-display font-bold text-3xl md:text-4xl text-foreground mb-1.5 leading-none">
                  <AnimatedValue raw={data.value} inView={isInView} />
                  <span className="text-lg md:text-xl text-muted-foreground font-semibold">
                    {numericSuffix || suffix}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm font-medium">{s.label}</p>

                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${s.color} transition-all duration-500`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
