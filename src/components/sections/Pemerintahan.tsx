import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContent } from "@/hooks/useContent";

const COLORS = [
  { color: "from-emerald-600 to-green-700",  accent: "bg-emerald-50 text-emerald-700" },
  { color: "from-yellow-500 to-amber-600",   accent: "bg-yellow-50 text-yellow-700" },
  { color: "from-blue-500 to-blue-700",      accent: "bg-blue-50 text-blue-700" },
  { color: "from-purple-500 to-indigo-700",  accent: "bg-purple-50 text-purple-700" },
  { color: "from-cyan-500 to-teal-700",      accent: "bg-cyan-50 text-cyan-700" },
  { color: "from-rose-500 to-red-700",       accent: "bg-rose-50 text-rose-700" },
  { color: "from-fuchsia-500 to-pink-700",   accent: "bg-fuchsia-50 text-fuchsia-700" },
  { color: "from-orange-500 to-red-600",     accent: "bg-orange-50 text-orange-700" },
];

interface Official {
  name: string;
  title: string;
  initials: string;
  period: string;
  pendidikan?: string;
  isLeader?: boolean;
  foto?: string;
}

const FALLBACK = {
  officials: [
    { name: "H. Zulkifli",  title: "Wali Nagari Silongo",          initials: "HZ", period: "2021 – 2027", pendidikan: "S1 / Sarjana",     isLeader: true,  foto: "" },
    { name: "Ahmad Fauzi",  title: "Sekretaris Nagari",             initials: "AF", period: "2021 – 2027", pendidikan: "D3 / Sederajat",   isLeader: false, foto: "" },
    { name: "Rudi Hartono", title: "Kepala Jorong Silongo",         initials: "RH", period: "2021 – 2027", pendidikan: "SMA / Sederajat",  isLeader: false, foto: "" },
    { name: "Budi Santoso", title: "Kepala Jorong Kampung Tengah",  initials: "BS", period: "2021 – 2027", pendidikan: "SMA / Sederajat",  isLeader: false, foto: "" },
    { name: "Syafril",      title: "Kepala Jorong Sei Aro",         initials: "SY", period: "2021 – 2027", pendidikan: "SMA / Sederajat",  isLeader: false, foto: "" },
    { name: "Drs. Amrizal", title: "Ketua Bamus Nagari",            initials: "AM", period: "2021 – 2027", pendidikan: "S1 / Sarjana",     isLeader: false, foto: "" },
  ] as Official[],
};

export function Pemerintahan() {
  const { officials } = useContent("pemerintahan", FALLBACK);

  return (
    <section id="pemerintahan" className="py-16 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(26,71,49,0.04),_transparent_60%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="mb-3 inline-flex items-center gap-2 justify-center w-full">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-primary font-bold tracking-wider text-xs uppercase">Aparatur Desa</span>
            <span className="w-8 h-[2px] bg-yellow-500" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Struktur Pemerintahan
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base">
            Aparatur nagari yang berdedikasi melayani masyarakat Nagari Silongo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {officials.map((official: Official, index: number) => {
            const scheme = COLORS[index % COLORS.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="group relative bg-card rounded-2xl border border-border cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full"
                      data-testid={`card-official-${index}`}
                    >
                      <div className={`h-1.5 w-full bg-gradient-to-r ${scheme.color}`} />

                      <div className="p-6 flex flex-col items-center text-center">
                        <div className={`relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br ${scheme.color} flex items-center justify-center mb-4 shadow-lg`}>
                          {official.foto ? (
                            <img src={official.foto} alt={official.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-display text-xl font-bold text-white">{official.initials}</span>
                          )}
                          {official.isLeader && (
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm border-2 border-background">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#0d2b1a]" />
                            </div>
                          )}
                        </div>

                        <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                          {official.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-snug">{official.title}</p>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${scheme.accent}`}>
                          {official.period}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[420px] overflow-hidden p-0">
                    <div className={`h-32 bg-gradient-to-br ${scheme.color} flex items-center justify-center`}>
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center overflow-hidden">
                        {official.foto ? (
                          <img src={official.foto} alt={official.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-display text-2xl font-bold text-white">{official.initials}</span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <DialogHeader>
                        <DialogTitle className="text-center font-display text-2xl">{official.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-5 space-y-3">
                        {[
                          { label: "Jabatan",       value: official.title },
                          { label: "Pendidikan",    value: official.pendidikan ?? "S1 / Sederajat" },
                          { label: "Masa Jabatan",  value: official.period },
                          { label: "Status",        value: "Aktif" },
                        ].map((row) => (
                          <div key={row.label} className="flex items-start gap-4 pb-3 border-b border-border last:border-0">
                            <span className="text-muted-foreground text-sm w-28 shrink-0">{row.label}</span>
                            <span className="font-medium text-foreground text-sm">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
