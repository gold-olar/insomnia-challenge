export const formatImageUrl = (imageUrl: string) => {
  if (imageUrl) {
    return imageUrl.includes("ipfs:")
      ? `https://ipfs.io/ipfs/${imageUrl.split("ipfs://")[1]}`
      : imageUrl;
  }
};
