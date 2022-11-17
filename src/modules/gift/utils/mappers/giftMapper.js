
export default function giftMapper(gifts) {
  const newGifts = gifts.content.map((gift) => ({
    id: gift.id,
    name: gift.name,
    brand: gift.brand,
    status: gift.status,
    placeId: gift.placeId,
    placeName: gift.placeName,
    agentName: gift.agentName,
    agentId: gift.agentId,
    contributor: gift.contributor,
    redemptionPoint: gift.redemptionPoint,
    type: gift.type,
    imageUrl: gift.imageUrl,
    street: gift.street,
    district: gift.district,
    provinceOrCity: gift.provinceOrCity,
  }));

  return {
    gifts: newGifts || [],
    totalPages: gifts.data?.totalPages,
  };
}
