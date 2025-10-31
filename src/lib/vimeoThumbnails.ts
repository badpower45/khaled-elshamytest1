export async function getVimeoThumbnail(videoUrl: string): Promise<string | null> {
  try {
    const videoIdMatch = videoUrl.match(/vimeo\.com\/video\/(\d+)/);
    if (!videoIdMatch) return null;
    
    const videoId = videoIdMatch[1];
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const thumbnailUrl = data.thumbnail_url;
    
    if (thumbnailUrl) {
      return thumbnailUrl.replace('_200x150', '_640x360');
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching Vimeo thumbnail:', error);
    return null;
  }
}

export async function addVimeoThumbnailsToPortfolio(portfolio: any[]): Promise<any[]> {
  const updatedPortfolio = await Promise.all(
    portfolio.map(async (item) => {
      if (item.videoUrl && !item.image) {
        const thumbnail = await getVimeoThumbnail(item.videoUrl);
        if (thumbnail) {
          return { ...item, image: thumbnail };
        }
      }
      return item;
    })
  );
  
  return updatedPortfolio;
}
