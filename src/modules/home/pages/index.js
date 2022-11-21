import { Box, HStack, Spinner, Heading, Text, Select } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Page } from "../../../components/common";
import Chart from "react-apexcharts";
import {
  useGetStatisticCollectQuery,
  useGetStatisticRedeemQuery,
  useGetStatisticAccountQuery,
} from "../services/statisticApi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectAuth } from "../../auth/services/authSlice";

const Home = () => {
  const id = useSelector(selectAuth).data.user.id;

  const [criteriaGift, setCriteriaGift] = useState("day");
  const [criteriaGarbage, setCriteriaGarbage] = useState("day");

  const {
    data: dataCollect,
    error: errorCollect,
    isLoading: isLoadingCollect,
    refetch: refetchCollect,
  } = useGetStatisticCollectQuery({
    id,
    criteriaGarbage,
  });

  const { data: dataArea } = useGetStatisticCollectQuery({
    id,
    criteriaGarbage: "Day",
  });

  const {
    data: dataRedeem,
    error: errorRedeem,
    isLoading: isLoadingRedeem,
    refetch: refetchRedeem,
  } = useGetStatisticRedeemQuery({
    id,
    criteriaGift,
  });

  const {
    data: dataAccount,
    error: errorAccount,
    isLoading: isLoadingAccount,
  } = useGetStatisticAccountQuery({
    id,
  });

  useEffect(() => {
    refetchCollect();
  }, [criteriaGarbage]);

  useEffect(() => {
    refetchRedeem();
  }, [criteriaGift]);

  return (
    <Fragment>
      <Page title="Dashboard">
        <section>
          <Box>
            <Heading as="h2" fontSize="2xl" my="4">
              Dashboard
            </Heading>
            <Box>
              {errorCollect && errorRedeem && errorAccount ? (
                <Box w="full" bgColor="white" p="3">
                  <Heading as="h5" color="tomato" mb="3">
                    Something wrong happen!!!
                  </Heading>
                  <Text color="tomato">Please reload.</Text>
                </Box>
              ) : isLoadingCollect && isLoadingRedeem && isLoadingAccount ? (
                <HStack justifyContent="center">
                  <Spinner
                    thickness="4px"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </HStack>
              ) : (
                <Box gap="16px">
                  <Box display="flex" width="min-content" gap="16px">
                    {dataAccount ? (
                      <Box
                        alignContent="center"
                        width="min-content"
                        height="min-content"
                        bgColor="white"
                        padding="32px"
                      >
                        <Chart
                          type="pie"
                          width="436"
                          series={dataAccount.map((statistic) => {
                            return statistic.amount;
                          })}
                          options={{
                            chart: {
                              width: 436,
                              type: "pie",
                            },
                            labels: dataAccount.map((statistic) => {
                              return statistic.role;
                            }),
                            title: {
                              text: "Ratio of user group in our system",
                              align: "center",
                              floating: false,
                              style: {
                                fontSize: "14px",
                                fontWeight: "bold",
                                fontFamily: undefined,
                                color: "#263238",
                              },
                            },
                          }}
                        />
                      </Box>
                    ) : null}

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
                          height="320"
                          width="500"
                          series={[
                            {
                              name: "Total weight",
                              data: dataRedeem.statistics.map(
                                (statistic, index) => {
                                  return statistic.giftCount;
                                }
                              ),
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
                              text:
                                "Total gift redeemed last 7 " +
                                criteriaGift +
                                "s.",
                              align: "center",
                              offsetY: 300,
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
                  <Box display="flex" marginTop="16px">
                    {dataCollect ? (
                      <Box width="min-content" gap="16px" bgColor="white">
                        <Select
                          rounded="none"
                          defaultValue="active"
                          onChange={(e) => setCriteriaGarbage(e.target.value)}
                        >
                          <option value="day">Day</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </Select>
                        <Chart
                          type="bar"
                          height="320"
                          width="500"
                          series={[
                            {
                              name: "Total weight",
                              data: dataCollect.statistics.map((statistic) => {
                                return statistic.totalWeight;
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
                              colors: ["#6BC1E3"],
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
                              text:
                                "Total weight last 7 " + criteriaGarbage + "s.",
                              align: "center",
                              offsetY: 300,
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
                              categories: dataCollect.statistics.map(
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
                                  return val + "kg";
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
                    {dataArea ? (
                      <Box
                        borderRadius="8px"
                        width="min-content"
                        bgColor="white"
                        marginStart="32px"
                        padding="32px"
                      >
                        <Chart
                          type="area"
                          width="436"
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
                              height: 350,
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
                              categories: dataArea.statistics.map(
                                (statistic) => {
                                  return statistic.date;
                                }
                              ),
                            },
                          }}
                        />
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Home;
