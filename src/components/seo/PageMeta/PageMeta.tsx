import { Helmet } from "react-helmet-async";

type OgType = "website" | "article";

type PageMetaProps = {
  title: string;
  description: string;
  ogType?: OgType;
  imageUrl?: string;
  imageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
};

const DEFAULT_IMAGE_URL = "/share.png";
const DEFAULT_IMAGE_ALT = "VIN Decoder";

export function PageMeta({
  title,
  description,
  ogType = "website",
  imageUrl = DEFAULT_IMAGE_URL,
  imageAlt = DEFAULT_IMAGE_ALT,
  twitterCard = "summary",
}: PageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
