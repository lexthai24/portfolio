import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ProjectCatalog from "@/components/ProjectCatalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProfile, getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    title: `Personal projects — ${profile.name}`,
    description:
      "Personal builds and open-source work: a futures-trading platform, a football data portal, an AI exam-prep app, and more.",
  };
}

export default async function ProjectsPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <>
      <Nav name={profile.name} email={profile.email} />
      <main className="pt-24">
        <ProjectCatalog
          projects={projects}
          kinds={["Personal project", "Open source"]}
          kicker="Projects"
          title="Personal projects"
          intro="Things I build for myself, mostly to see how far I can take an idea before it falls over. The source is all mine, and a few of them are live."
        />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
