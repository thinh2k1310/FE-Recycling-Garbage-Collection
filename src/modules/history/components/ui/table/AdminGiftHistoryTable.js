import {
  Badge,
  Box,
  HStack,
  InputGroup,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Paginator } from "../../../../../components/ui";

const AdminGiftHistoryTable = (props) => {
  const { history, refresh, totalPages, onParamsChange } = props;
  const [params, setParams] = useState({});

  function renderStatus(status) {
    if ({ status } === "CREATE") {
      return <Badge colorScheme="purple">status</Badge>;
    } else if (status === "RECEIVE") {
      return <Badge colorScheme="orange">{status}</Badge>;
    } else if (status === "COMPLETE") {
      return <Badge colorScheme="green">{status}</Badge>;
    } else if (status === "CREATE") {
      return <Badge colorScheme="red">{status}</Badge>;
    }
  }

  function getLastUpdateTime(
    createAt,
    receiveAt,
    completeAt,
    cancelAt,
    status
  ) {
    if (status === "COMPLETE") {
      return completeAt;
    } else if (status === "CREATE") {
      return createAt;
    } else if (status === "RECEIVE") {
      return receiveAt;
    } else if (status === "CANCEL") {
      return cancelAt;
    }
  }

  const _onChangeParams = (value) => {
    setParams({
      ...params,
      ...value,
    });
    console.log({
      ...params,
      ...value,
    });
  };

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange(params);
    }
  }, [params]);

  return (
    <Box>
      <HStack
        h="14"
        px="4"
        py="10"
        bgColor="white"
        borderBottom="1px"
        borderColor="gray.100"
      >
        <HStack flex="1">
          <Box>
            <InputGroup></InputGroup>
          </Box>
        </HStack>
        <Box>
          <Select
            rounded="none"
            defaultValue="active"
            onChange={(e) => _onChangeParams({ status: e.target.value })}
          >
            <option value="None">All</option>
            <option value="Create">Create</option>
            <option value="Receive">Receive</option>
            <option value="Complete">Complete</option>
            <option value="Cancel">Cancel</option>
          </Select>
        </Box>
      </HStack>
      <TableContainer bgColor="white" p="3">
        <Table variant="simple">
          <Thead borderBottom="1px" borderColor="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Customer</Th>
              <Th>Staff</Th>
              <Th>Agent</Th>
              <Th>Gift name</Th>
              <Th>Point</Th>
              <Th>Status</Th>
              <Th>Last update</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map(
              (
                {
                  id,
                  giftName,
                  giftId,
                  staffName,
                  customerName,
                  agentName,
                  point,
                  status,
                  createAt,
                  receiveAt,
                  completeAt,
                  cancelAt,
                },
                index
              ) => (
                <Tr
                  key={id}
                  fontSize="sm"
                  _hover={{
                    bgColor: "gray.100",
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td fontWeight="bold">{customerName}</Td>
                  <Td fontWeight="bold">{staffName}</Td>
                  <Td fontWeight="bold">{agentName}</Td>
                  <Td fontWeight="bold">{giftName}</Td>
                  <Td>{point}</Td>
                  <Td>{renderStatus(status)}</Td>
                  <Td>
                    {getLastUpdateTime(
                      createAt,
                      receiveAt,
                      completeAt,
                      cancelAt,
                      status
                    )}
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent="flex-end" py="4">
        <Paginator
          totalPages={totalPages}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      </HStack>
    </Box>
  );
};

export default AdminGiftHistoryTable;
