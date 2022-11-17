import moment from "moment/moment";


export default function garbageHistoryMapper(histories) {
    const newHistoryList = histories.content.map((history) => ({
      id: history.id,
      weight: history.weight,
      point: history.point,
      staffName: history.staffName,
      customerName: history.customerName,
      status: history.status,
      createAt: moment(history.createAt).format("DD/MM/YYYY"),
      receiveAt: moment(history.receiveAt).format("DD/MM/YYYY"),
      completeAt: moment(history.completeAt).format("DD/MM/YYYY"),
      cancelAt: moment(history.cancelAt).format("DD/MM/YYYY"),
    }));
    console.log(newHistoryList)

    return {
      history: newHistoryList || [],
      totalPages: histories.data?.totalPages,
    };
  }
  