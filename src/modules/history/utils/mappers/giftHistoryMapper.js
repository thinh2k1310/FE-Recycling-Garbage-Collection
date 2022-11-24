import moment from "moment/moment";

export default function giftHistoryMapper(gifts) {
    const newGiftHistory = gifts.content.map((gift) => ({
      id: gift.id,
      giftName: gift.giftName,
      giftId: gift.giftId,
      point: gift.point,
      staffName: gift.staffName || "___",
      agentName: gift.agentName || "___",
      customerName: gift.customerName,
      status: gift.status,
      createAt: moment(gift.createAt).format("DD/MM/YYYY"),
      receiveAt: moment(gift.receiveAt).format("DD/MM/YYYY"),
      completeAt: gift.completeAt? moment(gift.completeAt).format("DD/MM/YYYY") : "___",
      cancelAt: moment(gift.cancelAt).format("DD/MM/YYYY"),
    }));

    return {
      history: newGiftHistory || [],
      totalPages: gifts.data?.totalPages,
    };
  }
  