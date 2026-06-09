import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContent } from "@/hooks/useContent";

const CAT_STYLES: Record<string, { color: string; dot: string }> = {
  Pemerintahan: { color: "bg-blue-100 text-blue-800",    dot: "bg-blue-500" },
  Ekonomi:      { color: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  Budaya:       { color: "bg-amber-100 text-amber-800",   dot: "bg-amber-500" },
  Sosial:       { color: "bg-pink-100 text-pink-800",     dot: "bg-pink-500" },
  Kesehatan:    { color: "bg-red-100 text-red-800",       dot: "bg-red-500" },
  Pendidikan:   { color: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-500" },
  Infrastruktur:{ color: "bg-orange-100 text-orange-800", dot: "bg-orange-500" },
};

interface NewsItem {
  title: string;
  date: string;
  category: string;
  img: string;
  excerpt: string;
  content: string;
}

const FALLBACK: { items: NewsItem[] } = {
  items: [
    {
      title: "Musyawarah Nagari Silongo 2024: Merancang Pembangunan Inklusif",
      date: "10 Juni 2024",
      category: "Pemerintahan",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      excerpt: "Pemerintahan Nagari Silongo sukses menggelar Musyawarah Nagari (Musnag) tahun 2024...",
      content: "Pemerintahan Nagari Silongo sukses menggelar Musyawarah Nagari (Musnag) tahun 2024 yang dihadiri oleh berbagai elemen masyarakat, niniak mamak, bundo kanduang, pemuda, dan tokoh agama.",
    },
    {
      title: "Program Pendampingan UMKM Nagari Silongo Berkembang Pesat",
      date: "28 Mei 2024",
      category: "Ekonomi",
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
      excerpt: "Sebanyak 25 pelaku UMKM di Nagari Silongo telah mendapatkan pelatihan digital marketing...",
      content: "Sebanyak 25 pelaku UMKM di Nagari Silongo telah mendapatkan pelatihan digital marketing dan pengemasan produk.",
    },
    {
      title: "Kemeriahan Festival Budaya Minangkabau di Silongo",
      date: "15 Mei 2024",
      category: "Budaya",
      img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop",
      excerpt: "Menjaga kelestarian tradisi, pemuda Nagari Silongo menggelar festival budaya...",
      content: "Menjaga kelestarian tradisi, pemuda Nagari Silongo menggelar festival budaya yang menampilkan pertunjukan randai, saluang, dan silek lanyah.",
    },
  ],
};

export function Berita() {
  const { items } = useContent("berita", FALLBACK);

  return (
    <section id="berita" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="w-8 h-[2px] bg-yellow-500" />
              <span className="text-primary font-bold tracking-wider text-xs uppercase">Kabar Nagari</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Berita Terkini</h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group text-primary font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all self-start md:self-auto text-sm"
          >
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => {
            const style = CAT_STYLES[item.category] ?? { color: "bg-gray-100 text-gray-800", dot: "bg-gray-500" };
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="group h-full bg-card rounded-2xl border border-border overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                      data-testid={`card-berita-${index}`}
                    >
                      <div className="relative h-52 overflow-hidden bg-muted">
                        {item.img && (
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm ${style.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <time>{item.date}</time>
                        </div>
                        <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-1.5 text-primary text-sm font-semibold -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden">
                    {item.img && (
                      <div className="relative h-56 overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${style.color}`}>
                            <Tag className="w-3 h-3" />
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        <time>{item.date}</time>
                      </div>
                      <DialogTitle className="font-display text-xl md:text-2xl mb-4 leading-tight">
                        {item.title}
                      </DialogTitle>
                      <div className="prose prose-sm text-foreground/75">
                        <p className="leading-relaxed whitespace-pre-line">{item.content}</p>
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
