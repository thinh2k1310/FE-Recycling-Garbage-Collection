import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Page } from "../../../components/common";
import { selectAuth } from "../../auth/services/authSlice";
import PointTable from "../components/ui/table/PointTable";
import { useGetPointHistoryByIdQuery } from "../services/historyApi";

const PointHistory = () => {
  const id = useSelector(selectAuth).data.user.id;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);

  const { data, error, isLoading, refetch } = useGetPointHistoryByIdQuery({
    id,
    page,
  });

  return (
    <Fragment>
      <Page title="Point History">
        <section>
          <Box w="full">
            <Box>
              {error ? (
                <Box w="full" bgColor="white" p="3">
                  <Heading as="h5" color="tomato" mb="3">
                    Something wrong happen!!!
                  </Heading>
                  <Text color="tomato">Please reload.</Text>
                </Box>
              ) : isLoading ? (
                <HStack justifyContent="center">
                  <Spinner
                    thickness="4px"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </HStack>
              ) : data ? (
                <PointTable
                  history={data.history}
                  refresh={refetch}
                  totalPages={data.totalPages}
                  onParamsChange={(params) => setSearchParams(params)}
                />
              ) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default PointHistory;
