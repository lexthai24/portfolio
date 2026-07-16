import type { Metadata } from "next";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProfile,
  getCareer,
  getEducation,
  getLanguages,
  getSkills,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return { title: `About — ${profile.name}`, description: profile.summary };
}

export default async function AboutPage() {
  const [profile, career, education, languages, skills] = await Promise.all([
    getProfile(),
    getCareer(),
    getEducation(),
    getLanguages(),
    getSkills(),
  ]);
  return (
    <>
      <Nav name={profile.name} email={profile.email} />
      <main className="pt-24">
        <About career={career} education={education} languages={languages} />
        <Skills skills={skills} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
