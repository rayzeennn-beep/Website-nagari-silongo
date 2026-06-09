import { Facebook, Instagram, Twitter, Youtube, ChevronUp } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const FALLBACK = {
  tagline: "Membangun masa depan bersama dengan semangat kebersamaan dan kearifan lokal. Maju nagarinya, sejahtera masyarakatnya.",
  copyright: "© 2024 Pemerintahan Nagari Silongo. All Rights Reserved.",
  facebook: "#",
  instagram: "#",
  youtube: "#",
  twitter: "#",
};

export function Footer() {
  const footer = useContent("footer", FALLBACK);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { href: footer.facebook,  Icon: Facebook },
    { href: footer.instagram, Icon: Instagram },
    { href: footer.youtube,   Icon: Youtube },
    { href: footer.twitter,   Icon: Twitter },
  ].filter(s => s.href && s.href !== "#");

  return (
    <footer className="bg-[#112d1e] text-white/80 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjRoLTR6TTM2IDY0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00ek0xMiAzNHYtNGgtMnY0SDZ2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBIMTB2NEg2djJoNHY0aDJWLTRoNFY0aC00ek0xMiA2NHYtNGgtMnY0SDZ2Mmg0djRoMnYtNGg0di0yaC00eiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==')] [background-size:30px_30px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-white/10 pb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center text-[#112d1e] font-display font-bold text-lg">
                NS
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                Nagari Silongo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">{footer.tagline}</p>
            {socials.length > 0 && (
              <div className="flex gap-4">
                {socials.map(({ href, Icon }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-foreground hover:text-[#112d1e] transition-all text-white">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
            {socials.length === 0 && (
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                  <span key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                    <Icon size={18} />
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm">
              {["beranda","profil","pemerintahan","potensi","wisata"].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:text-primary-foreground transition-colors flex items-center gap-2 capitalize">
                    <span className="w-1 h-1 rounded-full bg-primary-foreground"></span>
                    {id === "beranda" ? "Beranda" : id === "profil" ? "Profil Nagari" : id === "pemerintahan" ? "Pemerintahan" : id === "potensi" ? "Potensi Desa" : "Wisata & Budaya"}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Layanan Publik</h4>
            <ul className="space-y-3 text-sm">
              {["Surat Keterangan Usaha","Surat Pengantar KTP/KK","Surat Keterangan Domisili","Surat Keterangan Tidak Mampu","Pengaduan Masyarakat"].map((s) => (
                <li key={s}><a href="#kontak" className="hover:text-primary-foreground transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Didukung Oleh</h4>
            <div className="flex flex-col gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-white/50 mb-1">Kabupaten</p>
                <p className="font-semibold text-white">Sijunjung</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <p className="text-xs text-white/50 mb-1">Provinsi</p>
                <p className="font-semibold text-white">Sumatera Barat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>{footer.copyright}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            Kembali ke Atas
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-foreground group-hover:text-[#112d1e] transition-colors">
              <ChevronUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
