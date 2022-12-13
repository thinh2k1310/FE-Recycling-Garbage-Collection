import moment from "moment/moment";

export default function pointHistoryMapper(points) {
    const newPointHistory = points.content.map((point) => ({
      id: point.id,
      accountId: point.accountId?.substring(0, 10) + "...." + point.accountId?.substring(54),
      point: point.point,
      garbageHistoryId: point.garbageHistoryId || "___",
      giftHistoryId: point.giftHistoryId || "___",
      type: point.type,
      time: moment(point.time).format("DD/MM/YYYY")
    }));

    return {
      history: newPointHistory || [],
      totalPages: points?.totalPages,
    };
  }
  