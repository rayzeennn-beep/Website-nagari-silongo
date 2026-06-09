import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const FALLBACK = {
  alamat: "Kantor Wali Nagari Silongo\nKecamatan Lubuk Tarok\nKabupaten Sijunjung\nSumatera Barat 27554",
  whatsapp: "+6285300000000",
  email: "nagarisilongo@sijunjung.go.id",
  jam: "Senin – Jumat, 08.00 – 16.00 WIB",
  maps_url: "",
};

export function Kontak() {
  const kontak = useContent("kontak", FALLBACK);

  const waHref = kontak.whatsapp
    ? `https://wa.me/${kontak.whatsapp.replace(/[^0-9]/g, "")}`
    : "#";

  return (
    <section id="kontak" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="mb-2 inline-flex items-center gap-2 justify-center w-full">
            <span className="w-8 h-[2px] bg-primary-foreground"></span>
            <span className="text-primary font-semibold tracking-wider text-sm uppercase">Layanan Informasi</span>
            <span className="w-8 h-[2px] bg-primary-foreground"></span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Hubungi Kami
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border p-6 rounded-2xl flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Alamat Kantor</h3>
                <p className="text-muted-foreground whitespace-pre-line">{kontak.alamat}</p>
              </div>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border p-6 rounded-2xl flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow hover:border-primary/30 group block"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  Telepon / WhatsApp
                </h3>
                <p className="text-muted-foreground">{kontak.whatsapp}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </a>

            <a
              href={`mailto:${kontak.email}`}
              className="bg-card border border-border p-6 rounded-2xl flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow hover:border-primary/30 group block"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">Email Resmi</h3>
                <p className="text-muted-foreground">{kontak.email}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </a>

            <div className="bg-card border border-border p-6 rounded-2xl flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-1">Jam Pelayanan</h3>
                <p className="text-muted-foreground">{kontak.jam}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] lg:h-full rounded-2xl overflow-hidden border border-border shadow-md bg-muted relative"
          >
            {kontak.maps_url ? (
              <iframe
                src={kontak.maps_url}
                title="Peta Lokasi Nagari Silongo"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 bg-emerald-50/50 flex flex-col items-center justify-center text-center p-6">
                <MapPin className="w-12 h-12 text-primary/40 mb-4" />
                <p className="text-muted-foreground font-medium text-lg">Peta Lokasi Nagari Silongo</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Tambahkan Google Maps Embed URL melalui panel admin untuk menampilkan peta.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
        aria-label="Hubungi via WhatsApp"
        data-testid="button-whatsapp-floating"
      >
        <span className="absolute inset-0 rounded-full bg-primary-foreground animate-ping opacity-75"></span>
        <Phone className="w-6 h-6 text-primary relative z-10" />
      </a>
    </section>
  );
}
