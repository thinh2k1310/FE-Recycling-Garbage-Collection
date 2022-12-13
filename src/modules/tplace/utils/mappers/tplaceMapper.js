export default function tplaceMapper(tplaces) {
  const newTPlaces = tplaces.content.map((tplace) => ({
    id: tplace.id,
    name: tplace.name,
    rate: tplace.rate,
    agentName: tplace.agentName,
    agentId: tplace.agentId,
    agentPhoneNumber: tplace.agentPhoneNumber,
    bannerUrl: tplace.bannerUrl,
    totalWeight: tplace.totalWeight,
    rank: tplace.rank,
    street: tplace.street,
    district: tplace.district,
    provinceOrCity: tplace.provinceOrCity,
  }));

  return {
    tplaces: newTPlaces || [],
    totalPages: tplaces?.totalPages,
  };
}
