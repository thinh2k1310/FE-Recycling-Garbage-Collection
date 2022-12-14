import Chart from "react-apexcharts";
import {
  Box,
  Image,
  Select,
} from "@chakra-ui/react";
import {
  useGetStatisticCollectQuery,
  useGetStatisticRedeemQuery,
  useGetStatisticOrderQuery,
} from "../../services/statisticApi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectAuth } from "../../../auth/services/authSlice";
import { useGetCustomerOwnerByIdQuery } from "../../../agent/services/agentApi";
import CustomerTable from "./CustomerTable";

const HomeAgent = (props) => {
  const id = useSelector(selectAuth).data.user.id;
  const [criteriaGift, setCriteriaGift] = useState("day");
  const [page, setPage] = useState(1);

  const { data: dataArea } = useGetStatisticCollectQuery({
    id,
    criteriaGarbage: "Day",
  });

  const {
    data: dataRedeem,
    refetch: refetchRedeem,
  } = useGetStatisticRedeemQuery({
    id,
    criteriaGift,
  });

  const {
    data: dataOrder,
  } = useGetStatisticOrderQuery({
    id,
  });

  const {
    data: dataCustomers,
  } = useGetCustomerOwnerByIdQuery({
    id,
    page,
  });

  useEffect(() => {
    refetchRedeem();
  }, [criteriaGift]);

  return (
    <Box>
      <Box display="flex">
        <Box>
          {dataArea ? (
            <Box
              borderRadius="8px"
              width="min-content"
              bgColor="white"
              padding="16px"
            >
              <Chart
                height="232"
                type="area"
                width="332"
                series={[
                  {
                    name: "Total weight",
                    data: dataArea.statistics.map((statistic) => {
                      return statistic.totalWeight;
                    }),
                  },
                ]}
                options={{
                  grid: {
                    xaxis: {
                      lines: {
                        show: false,
                      },
                    },
                    yaxis: {
                      lines: {
                        show: false,
                      },
                    },
                  },
                  chart: {
                    type: "area",
                    zoom: {
                      enabled: false,
                    },
                    toolbar: {
                      show: false,
                    },
                  },
                  stroke: {
                    width: 2,
                    curve: "smooth",
                  },
                  colors: [
                    "#2E93fA",
                    "#66DA26",
                    "#546E7A",
                    "#E91E63",
                    "#FF9800",
                  ],
                  title: {
                    text: "Statictis collect last 7 work days",
                    align: "left",
                    floating: false,
                    style: {
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: undefined,
                      color: "#263238",
                    },
                  },
                  subtitle: {
                    text: dataArea.total + "kg",
                    align: "left",
                    floating: false,
                    style: {
                      fontSize: "12px",
                      fontWeight: "thin",
                      fontFamily: undefined,
                      color: "#58C0F0",
                    },
                  },
                  yaxis: {
                    min: 0,
                    show: false,
                    labels: {
                      show: true,
                      formatter: function (val) {
                        return val + "kg";
                      },
                    },
                  },
                  xaxis: {
                    categories: dataArea.statistics.map((statistic) => {
                      return statistic.date;
                    }),
                  },
                }}
              />
            </Box>
          ) : null}

          <Box display="flex">
            {dataCustomers ? (
              <Box>
                <Box
                  marginTop="16px"
                  bgColor="white"
                  maxWidth="200px"
                  display="flex"
                  borderRadius="8px"
                >
                  <Box
                    flexGrow="2"
                    marginTop="12px"
                    marginBottom="12px"
                    marginLeft="16px"
                  >
                    <p color="grey">Customer</p>
                    <p fontSize="28px">
                      <b>{dataCustomers.totalCustomer}</b>
                    </p>
                  </Box>
                  <Image
                    src="/list.svg"
                    width="42"
                    height="42"
                    borderRadius="8px"
                    padding="2px"
                    marginStart="52px"
                    marginEnd="8px"
                    marginTop="16px"
                  />
                </Box>
              </Box>
            ) : null}
            {dataOrder ? (
              <Box marginStart="16px">
                <Box
                  marginTop="16px"
                  bgColor="white"
                  maxWidth="200px"
                  display="flex"
                  borderRadius="8px"
                >
                  <Box
                    flexGrow="2"
                    marginTop="12px"
                    marginBottom="12px"
                    marginLeft="16px"
                  >
                    <p color="grey">Order</p>
                    <p fontSize="28px">
                      <b>
                        {dataOrder.totalGarbageOrder + dataOrder.totalGiftOrder}
                      </b>
                    </p>
                  </Box>
                  <Image
                    src="/order.svg"
                    width="42"
                    height="42"
                    borderRadius="8px"
                    padding="2px"
                    marginStart="52px"
                    marginEnd="8px"
                    marginTop="16px"
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box>
          {dataRedeem ? (
            <Box
              marginStart="16px"
              width="min-content"
              gap="16px"
              bgColor="white"
            >
              <Select
                rounded="none"
                defaultValue="active"
                onChange={(e) => setCriteriaGift(e.target.value)}
              >
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </Select>
              <Chart
                type="bar"
                height="312"
                width="500"
                series={[
                  {
                    name: "Total weight",
                    data: dataRedeem.statistics.map((statistic, index) => {
                      return statistic.giftCount;
                    }),
                  },
                ]}
                options={{
                  chart: {
                    id: "basic-bar",
                    toolbar: {
                      show: false,
                    },
                  },
                  fill: {
                    colors: ["#3EA83D"],
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 5,
                      dataLabels: {
                        position: "center", // top, center, bottom
                      },
                      columnWidth: 50,
                    },
                  },
                  title: {
                    text: "Total gift redeemed last 7 " + criteriaGift + "s.",
                    align: "center",
                    offsetY: 292,
                    floating: false,
                    style: {
                      fontSize: "14px",
                      fontWeight: "bold",
                      fontFamily: undefined,
                      color: "#263238",
                    },
                  },
                  xaxis: {
                    position: "top",
                    categories: dataRedeem.statistics.map(
                      (statistic, index) => {
                        return statistic.date;
                      }
                    ),
                  },
                  yaxis: {
                    axisBorder: {
                      show: false,
                    },
                    axisTicks: {
                      show: false,
                    },
                    labels: {
                      show: true,
                      formatter: function (val) {
                        return val;
                      },
                    },
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                      return val;
                    },
                    offsetY: -20,
                    style: {
                      fontSize: "12px",
                      colors: ["#304758"],
                    },
                  },
                }}
              />
            </Box>
          ) : null}
        </Box>
      </Box >
      {dataCustomers ? (
        <CustomerTable customers={dataCustomers.customers} />
      ) : null}
    </Box>
  );
};

export default HomeAgent;
