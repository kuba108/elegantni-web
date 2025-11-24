import mixitImg from "@/assets/images/reviews/mixit.png";
import prodamAutoImg from "@/assets/images/reviews/prodamauto.png";

const projects = [
  {
    id: "mixit",
    name: "Mixit.cz",
    category: "ecommerce",
    featured: true,
    url: "https://www.mixit.cz",
    image_url: mixitImg.src,
    description:
      "Kompletní vývoj e-commerce platformy se zaměřením na škálovatelnost, personalizaci a napojení na interní logistiku."
  },
  {
    id: "prodamauto",
    name: "prodamauto.cz",
    category: "inzert_web",
    featured: true,
    url: "https://www.prodamauto.cz",
    image_url: prodamAutoImg.src,
    description:
      "Moderní inzertní web pro prodej a nákup ojetých vozidel s pokročilými filtry a uživatelským přístupem."
  },
];

export default projects;
