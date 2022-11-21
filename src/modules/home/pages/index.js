import { Box, HStack, Spinner, Heading, Text, Select } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../../components/common";
import { selectAuth } from "../../auth/services/authSlice";
import HomeAdmin from "../components/ui/HomeAdmin";
import HomeAgent from "../components/ui/HomeAgent";
import { roles } from "../../../constant";

const Home = () => {
  const { data } = useSelector(selectAuth);

  function getRole(role) {
    if (role === roles.AGENT) {
      return (<HomeAgent/>);
    } else if (role === roles.ADMIN) {
      return (<HomeAdmin/>);
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      <Page title="Dashboard">
        <section>
          <Box>
            <Heading as="h2" fontSize="2xl" my="4">
              Dashboard
            </Heading>
            {getRole(data.user.role)}
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Home;
