export type GiphyResponse = {
  data: GiphyResponseData;
  pagination: Pagination;
  meta: Meta;
};

export type GiphyResponseData = ReadonlyArray<Daum>;

export type Daum = {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user?: User;
  analytics_response_payload: string;
  analytics: Analytics;
};

export type Images = {
  original: Original;
  downsized: Downsized;
  downsized_large: DownsizedLarge;
  downsized_medium: DownsizedMedium;
  downsized_small: DownsizedSmall;
  downsized_still: DownsizedStill;
  fixed_height: FixedHeight;
  fixed_height_downsampled: FixedHeightDownsampled;
  fixed_height_small: FixedHeightSmall;
  fixed_height_small_still: FixedHeightSmallStill;
  fixed_height_still: FixedHeightStill;
  fixed_width: FixedWidth;
  fixed_width_downsampled: FixedWidthDownsampled;
  fixed_width_small: FixedWidthSmall;
  fixed_width_small_still: FixedWidthSmallStill;
  fixed_width_still: FixedWidthStill;
  looping: Looping;
  original_still: OriginalStill;
  original_mp4: OriginalMp4;
  preview: Preview;
  preview_gif: PreviewGif;
  preview_webp: PreviewWebp;
  '480w_still': N480wStill;
  hd?: Hd;
};

export type Original = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
};

export type Downsized = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type DownsizedLarge = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type DownsizedMedium = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type DownsizedSmall = {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
};

export type DownsizedStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type FixedHeight = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type FixedHeightDownsampled = {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
};

export type FixedHeightSmall = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type FixedHeightSmallStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type FixedHeightStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type FixedWidth = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type FixedWidthDownsampled = {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
};

export type FixedWidthSmall = {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
};

export type FixedWidthSmallStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type FixedWidthStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type Looping = {
  mp4_size: string;
  mp4: string;
};

export type OriginalStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type OriginalMp4 = {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
};

export type Preview = {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
};

export type PreviewGif = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type PreviewWebp = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type N480wStill = {
  height: string;
  width: string;
  size: string;
  url: string;
};

export type Hd = {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
};

export type User = {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
};

export type Analytics = {
  onload: Onload;
  onclick: Onclick;
  onsent: Onsent;
};

export type Onload = {
  url: string;
};

export type Onclick = {
  url: string;
};

export type Onsent = {
  url: string;
};

export type Pagination = {
  total_count: number;
  count: number;
  offset: number;
};

export type Meta = {
  status: number;
  msg: string;
  response_id: string;
};
