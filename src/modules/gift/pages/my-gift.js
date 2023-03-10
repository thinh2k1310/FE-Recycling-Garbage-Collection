import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Page } from "../../../components/common";
import { selectAuth } from "../../auth/services/authSlice";
import GiftTable from "../components/ui/table/GiftTable";
import { useGetGiftOwnerByIdQuery } from "../services/giftApi";

const MyGift = () => {
  const id = useSelector(selectAuth).data.user.id;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const criteria = searchParams.get("criteria") || "None";


  const { data, error, isLoading, refetch } = useGetGiftOwnerByIdQuery({
    id,
    criteria,
    page,
  });

  console.log(data)
  return (
    <Fragment>
      <Page title="My Gift">
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
                <GiftTable
                  gifts={data.gifts}
                  refresh={refetch}
                  totalPages={data.totalPages}
                  onParamsChange={(params) => setSearchParams(params)}
                  refetch={refetch}
                />
              ) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default MyGift;
