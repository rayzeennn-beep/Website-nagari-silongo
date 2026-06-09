import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const highlights = [
  { icon: MapPin, label: "Kecamatan", value: "Lubuk Tarok" },
  { icon: MapPin, label: "Kabupaten", value: "Sijunjung" },
  { icon: Calendar, label: "Provinsi", value: "Sumatera Barat" },
  { icon: Users, label: "Penduduk", value: "839 Jiwa" },
];

export function Profil() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="profil" className="py-16 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* IMAGE AREA — real photo with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=85&w=900&auto=format&fit=crop"
                alt="Sawah terasering Sumatera Barat"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2b1a]/80 via-transparent to-transparent" />

              {/* Badge inside image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[#0d2b1a]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Nagari Silongo</p>
                      <p className="text-white/60 text-xs">Kab. Sijunjung, Sumatra Barat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating secondary image */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 md:-right-10 w-40 md:w-52 h-32 md:h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-background"
            >
              <img
                src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=400&auto=format&fit=crop"
                alt="Alam Nagari Silongo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative blobs */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-4 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pb-8 lg:pb-0"
          >
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="w-8 h-[2px] bg-yellow-500" />
              <span className="text-yellow-600 font-bold tracking-wider text-xs uppercase">Profil Kami</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mengenal Nagari<br />
              <span className="text-primary">Silongo</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              Nagari Silongo merupakan salah satu nagari yang terletak di Kecamatan Lubuk Tarok,
              Kabupaten Sijunjung, Provinsi Sumatera Barat. Nagari ini dikenal dengan kearifan
              lokalnya yang masih terjaga kuat serta potensi alam yang melimpah.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Masyarakat Nagari Silongo hidup rukun dengan memegang teguh falsafah Minangkabau
              <em> "Adat Basandi Syarak, Syarak Basandi Kitabullah"</em>. Pemerintahan Nagari
              terus berupaya memajukan kesejahteraan masyarakat melalui berbagai program
              pembangunan dan pemberdayaan ekonomi.
            </p>

            {/* Highlight grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="group flex items-center gap-3 border border-border rounded-xl p-3.5 bg-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <h.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{h.label}</p>
                    <p className="font-semibold text-foreground text-sm">{h.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary text-white hover:bg-primary/90 px-8 rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200"
                  size="lg"
                  data-testid="button-profil-selengkapnya"
                >
                  Baca Profil Lengkap
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-background border-border p-0 overflow-hidden">
                <div className="h-52 relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop"
                    alt="Nagari Silongo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6">
                    <DialogTitle className="font-display text-2xl md:text-3xl text-white">
                      Profil Nagari Silongo
                    </DialogTitle>
                  </div>
                </div>
                <div className="p-6 max-h-[55vh] overflow-y-auto prose prose-emerald prose-sm md:prose-base">
                  <p>
                    Nagari Silongo adalah sebuah kesatuan masyarakat hukum adat di Kabupaten Sijunjung
                    yang memiliki batas wilayah tertentu. Nagari ini berwenang untuk mengatur dan mengurus
                    kepentingan masyarakat setempat berdasarkan asal usul dan adat istiadat yang diakui
                    dalam sistem Pemerintahan Negara Kesatuan Republik Indonesia.
                  </p>
                  <h3>Visi</h3>
                  <p>
                    Terwujudnya Nagari Silongo yang Mandiri, Sejahtera, dan Berbudaya Berlandaskan
                    Adat Basandi Syarak, Syarak Basandi Kitabullah.
                  </p>
                  <h3>Misi</h3>
                  <ul>
                    <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan kesehatan.</li>
                    <li>Mengoptimalkan potensi pertanian dan perekonomian nagari.</li>
                    <li>Melestarikan nilai-nilai adat dan budaya Minangkabau.</li>
                    <li>Mewujudkan tata kelola pemerintahan nagari yang transparan dan akuntabel.</li>
                    <li>Meningkatkan infrastruktur dan akses layanan dasar masyarakat.</li>
                  </ul>
                  <h3>Sejarah Singkat</h3>
                  <p>
                    Sejarah Nagari Silongo tidak lepas dari sejarah perkembangan adat di Kabupaten
                    Sijunjung. Masyarakatnya memegang teguh tradisi gotong royong dan musyawarah mufakat
                    di Balai Adat. Nagari ini terdiri dari 3 jorong yaitu Jorong Silongo, Jorong Kampung
                    Tengah, dan Jorong Sei Aro, masing-masing dengan karakteristik dan potensi uniknya.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
