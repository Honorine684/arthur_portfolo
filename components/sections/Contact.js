import { Mail, Linkedin, Github } from "lucide-react";

const liens = [
  {
    label: "samirarthurlevy@gmail.com",
    href: "samirarthurlevy@gmail.com",
    icone: Mail,
  },
  {
    label: "https://www.linkedin.com/in/arthurlevy20?trk=contact-info",
    href: "https://www.linkedin.com/in/arthurlevy20?trk=contact-info",
    icone: Linkedin,
  },

];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-950">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Contact</h2>
        <p className="text-gray-400 mb-12">
          Un projet SIG, une mission d&apos;urbanisme, une formation ? Parlons-en.
        </p>
        <div className="space-y-4">
          {liens.map(({ label, href, icone: Icone }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 justify-center text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <Icone size={18} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-24 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Arthur Dupont
      </footer>
    </section>
  );
}
