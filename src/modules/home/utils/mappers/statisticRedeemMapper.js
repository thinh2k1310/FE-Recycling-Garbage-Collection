import moment from "moment/moment";

export default function statisticRedeemMapper(statistics) {
  let newStatictis = statistics.map((statistic) => {
    let date = "";
    if (statistic.criteria === "Day") {
      date = moment(statistic.date).format("DD/MM");
    } else if (statistic.criteria === "Month") {
      date = moment(statistic.date).format("MM/YYYY");
    } else if (statistic.criteria === "Year") {
      date = moment(statistic.date).format("YYYY");
    }
    return { giftCount: statistic.giftCount, date: date };
  });
  const length = newStatictis.length
  if (newStatictis.length < 7) {
    for (var i = 0; i < 7 -length  ; i++) {
      newStatictis.push({ giftCount: 0, date: "" });
    }
  }
  newStatictis = newStatictis.reverse();
  return {
    statistics: newStatictis || [],
  };
}
