import axios from "@/lib/api";
import { getCurrentLang } from "@/lib/Lang";
import AboutHero from "@/components/AboutPage/AboutHero";
import AboutStats from "@/components/AboutPage/AboutStats";
import AboutSections from "@/components/AboutPage/AboutSections"; // <--- ՆՈՐԸ
import AboutInfoCards from "@/components/AboutPage/AboutInfoCards";
import AboutTeam from "@/components/AboutPage/AboutTeam";
import AboutTestimonials from "@/components/AboutPage/AboutTestimonials";

export const metadata = {
  title: "Մեր մասին",
};

export default async function AboutPage() {
  const lang = await getCurrentLang();
  const res = (await axios.get(`about?lang=${lang}`)).data;
  const about = Array.isArray(res) ? res[0] : res;

  if (!about) return null;

  return (
    <main className="wrapper">
      <AboutHero data={about.hero} />
      <AboutSections sections={about.sections} /> 
      
      <AboutInfoCards cards={about.infoCards} />
      <AboutTeam team={about.team} />
      <AboutStats stats={about.stats} />
      <AboutTestimonials testimonials={about.testimonials} />
    </main>
  );
}