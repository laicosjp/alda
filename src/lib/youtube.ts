export const generateYoutubeThumbnailUrl = (
  youtubeId: string,
  quality: 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | 'default' = 'maxresdefault'
): string => {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}
