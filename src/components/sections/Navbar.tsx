import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Beranda", href: "#beranda" },
  { name: "Profil", href: "#profil" },
  { name: "Pemerintahan", href: "#pemerintahan" },
  { name: "Potensi", href: "#potensi" },
  { name: "Wisata", href: "#wisata" },
  { name: "Berita", href: "#berita" },
  { name: "Galeri", href: "#galeri" },
  { name: "Kontak", href: "#kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.substring(1));
      
      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="#beranda" 
          onClick={(e) => handleLinkClick(e, "#beranda")}
          className="flex items-center gap-3 group"
          data-testid="link-logo"
        >
          <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center text-primary font-display font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            NS
          </div>
          <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? "text-white" : "text-white drop-shadow-md"}`}>
            Nagari Silongo
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-primary/20 backdrop-blur-md rounded-full px-2 py-1 border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === link.href.substring(1)
                  ? "bg-primary-foreground text-primary"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              data-testid={`link-nav-${link.name.toLowerCase()}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-primary shadow-lg border-t border-white/10"
          >
            <div className="flex flex-col py-4 px-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`p-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "bg-primary-foreground text-primary"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}