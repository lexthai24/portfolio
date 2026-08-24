import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScalptraSpotlight from "@/components/ScalptraSpotlight";
import FeaturedWork from "@/components/FeaturedWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProfile, getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <>
      <Nav name={profile.name} />
      <main>
        <Hero profile={profile} />
        <ScalptraSpotlight />
        <FeaturedWork
          projects={projects.filter(
            (project) => project.title !== "AI-Assisted Crypto Futures Trading Platform"
          )}
        />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
