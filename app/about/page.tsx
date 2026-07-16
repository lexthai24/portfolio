import type { Metadata } from "next";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `About — ${profile.name}`,
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
