import { motion } from "framer-motion";
import { Wheat, Store, Mountain, Music, Leaf } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const potentials = [
  {
    title: "Pertanian",
    icon: Wheat,
    img: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=800&auto=format&fit=crop",
    desc: "Ladang, sawah, dan kebun menghampar luas. Hasil utama: padi, jagung, dan sayuran organik.",
    accent: "from-emerald-600 to-green-500",
    fullDesc:
      "Sektor pertanian merupakan tulang punggung perekonomian mayoritas masyarakat Nagari Silongo. Hamparan sawah yang subur dengan sistem pengairan yang baik menghasilkan padi berkualitas. Selain itu, masyarakat juga menanam komoditas jagung, sayur-sayuran, dan buah-buahan organik yang dipasarkan hingga ke luar daerah.",
  },
  {
    title: "UMKM Lokal",
    icon: Store,
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
    desc: "25+ pelaku UMKM aktif menggerakkan ekonomi lokal dengan berbagai produk unggulan.",
    accent: "from-amber-600 to-orange-500",
    fullDesc:
      "Produk UMKM Nagari Silongo terus berkembang, mulai dari kuliner tradisional Minang, kerajinan tangan, hingga pengolahan hasil pertanian. Beberapa produk unggulan telah mendapatkan sertifikasi dan mulai dipasarkan secara digital.",
  },
  {
    title: "Wisata Alam",
    icon: Mountain,
    img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop",
    desc: "Alam yang asri, udara sejuk, dan pemandangan indah menjadi daya tarik wisata.",
    accent: "from-cyan-600 to-blue-500",
    fullDesc:
      "Potensi wisata alam yang belum terekspos luas menjadi harta karun tersembunyi Nagari Silongo. Aliran sungai yang jernih, air terjun kecil, dan jalur pendakian ringan menawarkan pengalaman ekowisata yang menenangkan bagi pengunjung yang ingin lari dari hiruk-pikuk kota.",
  },
  {
    title: "Budaya Minang",
    icon: Music,
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop",
    desc: "Tradisi adat Minangkabau yang kaya: randai, saluang, dan upacara adat yang terjaga.",
    accent: "from-purple-600 to-indigo-500",
    fullDesc:
      "Masyarakat Nagari Silongo masih sangat kental dengan adat istiadatnya. Kesenian tradisional seperti randai, saluang, dan talempong masih sering dipertunjukkan dalam berbagai acara pernikahan dan pesta nagari. Rumah-rumah gadang tua juga masih berdiri kokoh sebagai simbol pelestarian budaya.",
  },
  {
    title: "Peternakan",
    icon: Leaf,
    img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop",
    desc: "Peternakan sapi, kambing, dan unggas sebagai sumber penghidupan masyarakat.",
    accent: "from-rose-600 to-red-500",
    fullDesc:
      "Didukung oleh ketersediaan pakan alami yang melimpah, sektor peternakan berkembang dengan baik. Masyarakat umumnya menernakkan sapi potong, kambing, dan berbagai jenis unggas yang memberikan nilai tambah ekonomi yang signifikan.",
  },
];

export function Potensi() {
  return (
    <section id="potensi" className="py-16 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-2 inline-flex items-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-primary font-bold tracking-wider text-xs uppercase">Kekayaan Desa</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">Potensi Nagari</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
            Keberagaman sumber daya alam dan budaya yang menjadi fondasi kemajuan ekonomi dan
            kesejahteraan masyarakat Nagari Silongo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {potentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="group h-full bg-card rounded-2xl overflow-hidden border border-border cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 flex flex-col"
                    data-testid={`card-potensi-${index}`}
                  >
                    {/* Image header */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Icon badge */}
                      <div className={`absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center shadow-lg`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm flex-1 leading-relaxed">{item.desc}</p>
                      <div className="mt-4 text-primary text-sm font-semibold flex items-center gap-1 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Lihat Detail <span>→</span>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.accent} flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <DialogTitle className="font-display text-2xl text-white">{item.title}</DialogTitle>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{item.fullDesc}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
