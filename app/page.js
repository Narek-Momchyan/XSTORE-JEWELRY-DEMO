import { getCurrentLang } from "@/lib/Lang";
export const dynamic = "force-dynamic";
import axios from "@/lib/api";

import HomeSlider from "@/components/homeSlider";
import Types from "@/components/HomePage/types";
import InfoSection from "@/components/HomePage/info";
import InfoSlider from "@/components/HomePage/infoSlider";
import Times from "@/components/HomePage/times"; 
import CategorySlider from "@/components/HomePage/CategorySlider";

export default async function Page() { 
  let lang = "en";
  let resSlider = [];
  let resTypes = [];
  let resInfoSlider = [];
  let resCategories = [];
  let resTimes = [];
  let resInfoSection = [];
  let headingRes = null;

  try {
    lang = await getCurrentLang();

    const [sliderData, typesData, infoSliderData, categoriesData, timesData, infoSectionData, headingData] = await Promise.all([
      axios.get(`homeslider?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`types?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`product?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`bestCategories?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`timerSection?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`infoSection?lang=${lang}`).catch(() => ({ data: [] })),
      axios.get(`headingProduct?lang=${lang}`).catch(() => ({ data: [] }))
    ]);

    resSlider = sliderData.data || [];
    resTypes = typesData.data || [];
    resInfoSlider = infoSliderData.data || [];
    resCategories = categoriesData.data || [];
    resTimes = timesData.data || [];
    resInfoSection = infoSectionData.data || [];
    headingRes = headingData.data?.[0] || null;
  } catch (error) {
    console.error("Page data fetch error:", error);
  }

  return (
    <main className="wrapper">
      <HomeSlider homeslider={resSlider} />
      <Types typesData={resTypes} lang={lang} />
      <InfoSection infosections={resInfoSection}  />
      <InfoSlider infoData={resInfoSlider} headings={headingRes}/>
      <Times timerData={resTimes?.[0] || null} /> 
      <CategorySlider categoryData={resCategories?.[0] || null} />
    </main>
  );
}