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
    title: `Client work — ${profile.name}`,
    description:
      "Client and contract projects: payroll, e-invoicing, crypto wallets, and commerce platforms. Case studies, NDA-safe.",
  };
}

export default async function WorkPage() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <>
      <Nav name={profile.name} email={profile.email} />
      <main className="pt-24">
        <ProjectCatalog
          projects={projects}
          kinds={["Client project"]}
          kicker="Work"
          title="Client work"
          intro="Contract and client projects from the last few years, built alongside the day job. Most of it is under NDA, so you won't find names or source here. What I can share is the problem, how I went at it, and what came out the other end."
        />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
