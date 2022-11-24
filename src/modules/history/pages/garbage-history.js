import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Page } from "../../../components/common";
import { selectAuth } from "../../auth/services/authSlice";
import AdminGarbageHistoryTable from "../components/ui/table/AdminGarbageHistoryTable";
import AgentGarbageHistoryTable from "../components/ui/table/AgentGarbageHistoryTable";
import { useGetGarbageHistoryByIdQuery } from "../services/historyApi";
import { roles } from "../../../constant";

const GarbageHistory = () => {
  const id = useSelector(selectAuth).data.user.id;
  const role = useSelector(selectAuth).data.user.role;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const status = searchParams.get("status") || "";

  const { data, error, isLoading, refetch } = useGetGarbageHistoryByIdQuery({
    id,
    page,
  });

  function getLayoutByRole(role) {
    if (role === roles.AGENT) {
      return (<AgentGarbageHistoryTable
        history={data.history}
        refresh={refetch}
        totalPages={data.totalPages}
        onParamsChange={(params) => setSearchParams(params)}/>);
    } else if (role === roles.ADMIN) {
      return (<AdminGarbageHistoryTable
        history={data.history}
        refresh={refetch}
        totalPages={data.totalPages}
        onParamsChange={(params) => setSearchParams(params)}/>);
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      <Page title="Garbage History">
        <section>
          <Box w="full">
            <Heading as="h2" fontSize="2xl" my="4">
              Garbage History
            </Heading>
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
              ) : data ? 
              ( getLayoutByRole(role)) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default GarbageHistory;
