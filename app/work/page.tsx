import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectCatalog from "@/components/ProjectCatalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Client work — ${profile.name}`,
  description:
    "Client and contract projects: payroll, e-invoicing, crypto wallets, and commerce platforms. Case studies, NDA-safe.",
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <ProjectCatalog
          kinds={["Client project"]}
          kicker="Work"
          title="Client work"
          intro="Contract and client projects from the last few years, built alongside the day job. Most of it is under NDA, so you won't find names or source here. What I can share is the problem, how I went at it, and what came out the other end."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
