import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectCatalog from "@/components/ProjectCatalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Personal projects — ${profile.name}`,
  description:
    "Personal builds and open-source work: a futures-trading platform, a football data portal, an AI exam-prep app, and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <ProjectCatalog
          kinds={["Personal project", "Open source"]}
          kicker="Projects"
          title="Personal projects"
          intro="Things I build for myself, mostly to see how far I can take an idea before it falls over. The source is all mine, and a few of them are live."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
