import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProfile, getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);
  return (
    <>
      <Nav name={profile.name} email={profile.email} />
      <main>
        <Hero profile={profile} />
        <FeaturedWork projects={projects} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
