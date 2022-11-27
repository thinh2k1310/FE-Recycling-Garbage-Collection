import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const CustomerTable = (props) => {
  const { customers } = props;

  return (
    <Box marginTop="16px" width="880px">
      <HStack h="10" px="4" bgColor="white">
        <HStack flex="1">
          <div>Newest Registered Customer</div>
        </HStack>
      </HStack>
      <TableContainer bgColor="white" p="2">
        <Table variant="simple">
          <Thead borderBottom="1px" borderColor="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>PhoneNumber</Th>
              <Th>Exchanged</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {customers.map(
              (
                { id, name, username, email, avatar, phoneNumber, exchange },
                index
              ) => (
                <Tr key={id} fontSize="sm" _hover={{ bgColor: "gray.100" }}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <img src={avatar} width="40" height="40" alt="new" />
                  </Td>
                  <Td fontWeight="bold">{name}</Td>
                  <Td>{phoneNumber}</Td>
                  <Td>{exchange}kg</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent="flex-end" py="4"></HStack>
    </Box>
  );
};

export default CustomerTable;
