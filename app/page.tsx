import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AmbientFlow from "@/components/AmbientFlow";
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
      <AmbientFlow />
      <Nav name={profile.name} />
      <main>
        <div data-flow-theme="hero">
          <Hero profile={profile} />
        </div>
        <div data-flow-theme="work">
          <FeaturedWork projects={projects} />
        </div>
        <div data-flow-theme="scalptra">
          <ScalptraSpotlight />
        </div>
        <div data-flow-theme="contact">
          <Contact profile={profile} />
        </div>
      </main>
      <Footer profile={profile} />
    </>
  );
}
