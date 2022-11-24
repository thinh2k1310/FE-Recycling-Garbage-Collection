import moment from "moment/moment";


export default function garbageHistoryMapper(histories) {
    const newHistoryList = histories.content.map((history) => ({
      id: history.id,
      weight: history.weight,
      point: history.point,
      staffName: history.staffName || '___',
      customerName: history.customerName,
      agentName: history.agentName || '___',
      status: history.status,
      createAt: moment(history.createAt).format("DD/MM/YYYY") || '__',
      receiveAt: moment(history.receiveAt).format("DD/MM/YYYY") || '__',
      completeAt: moment(history.completeAt).format("DD/MM/YYYY") || '__',
      cancelAt: moment(history.cancelAt).format("DD/MM/YYYY") || '__',
    }));
    console.log(newHistoryList)

    return {
      history: newHistoryList || [],
      totalPages: histories.data?.totalPages,
    };
  }
  