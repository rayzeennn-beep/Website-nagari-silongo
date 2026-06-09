import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Profil } from "@/components/sections/Profil";
import { Pemerintahan } from "@/components/sections/Pemerintahan";
import { Potensi } from "@/components/sections/Potensi";
import { Wisata } from "@/components/sections/Wisata";
import { Berita } from "@/components/sections/Berita";
import { Galeri } from "@/components/sections/Galeri";
import { Kontak } from "@/components/sections/Kontak";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Profil />
        <Pemerintahan />
        <Potensi />
        <Wisata />
        <Berita />
        <Galeri />
        <Kontak />
      </main>
      <Footer />
    </div>
  );
}