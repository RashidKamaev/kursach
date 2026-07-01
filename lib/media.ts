export const mediaBySection: Record<string, string[]> = {
  masters: [
    "/images/master.png",
    "/images/master-colorist.jpg",
    "/images/master-cosmetologist.jpg",
    "/images/master-browist.jpg",
    "/images/master-makeup.jpg",
    "/images/master-massage.jpg",
  ],
  salons: [
    "/images/salon.png",
    "/images/salon-2.jpg",
    "/images/salon-3.jpg",
    "/images/salon-4.jpg",
    "/images/salon-5.jpg",
    "/images/salon-6.jpg",
  ],
  categories: [
    "/images/service-hands.png",
    "/images/service-hair.jpg",
    "/images/service-brows.webp",
    "/images/service-cosmetology.jpg",
    "/images/service-massage.jpg",
    "/images/service-makeup.jpg",
  ],
  promotions: Array(6).fill("/images/promotion-discount.jpg"),
  articles: [
    "/images/article.png",
    "/images/article-coloring.jpg",
    "/images/article.png",
    "/images/article.png",
    "/images/article.png",
    "/images/article.png",
  ],
};

export function getMedia(slug: string, index: number) {
  const list = mediaBySection[slug] ?? ["/images/service-hands.png"];
  return list[index % list.length];
}
