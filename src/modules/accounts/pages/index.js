import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { AccountTable } from '../components/ui/table';
import { useGetAccountsQuery } from '../services/accountsApi';

const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role') || 'none';
  const { data, error, isLoading, refetch } = useGetAccountsQuery({
    search,
    role,
    page,
  });

  return (
    <Fragment>
      <Page title='User List'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              User List
            </Heading>
            <Box>
              {error ? (
                <Box w='full' bgColor='white' p='3'>
                  <Heading as='h5' color='tomato' mb='3'>
                    Something wrong happen!!!
                  </Heading>
                  <Text color='tomato'>Please reload.</Text>
                </Box>
              ) : isLoading ? (
                <HStack justifyContent='center'>
                  <Spinner
                    thickness='4px'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </HStack>
              ) : data ? (
                <AccountTable
                  accounts={data.accounts}
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

export default Account;
