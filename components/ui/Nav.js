"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const liens = [
  { label: "Parcours", href: "#parcours" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [ouvert, setOuvert] = useState(false);
  const [defileé, setDefileé] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefileé(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        defileé ? "bg-gray-950/90 backdrop-blur border-b border-gray-800" : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold font-mono text-sm">
          arthur<span className="text-emerald-400">.sig</span>
        </span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {liens.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setOuvert(!ouvert)}
          aria-label="Menu"
        >
          {ouvert ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {ouvert && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 px-6 pb-4">
          <ul className="space-y-3">
            {liens.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-gray-300 hover:text-white block py-1"
                  onClick={() => setOuvert(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
