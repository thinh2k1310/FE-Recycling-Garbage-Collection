import {
  Box,
  HStack,
  Badge,
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

const AdminGarbageHistoryTable = (props) => {
  const { history, refresh, totalPages, onParamsChange } = props;
  const [params, setParams] = useState({});
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

  function getLastUpdateTime(createAt, receiveAt, completeAt, cancelAt, status) {
    if (status === "COMPLETE") {
        return completeAt
      } else if (status === "CREATE") {
        return createAt
      } else if (status === "RECEIVE") {
        return receiveAt
      } else if (status === "CANCEL") {
        return cancelAt
      }
  }

  function renderStatus(status) {
    if (status === "COMPLETE") {
        return <Badge colorScheme="green">Complete</Badge>;
      } else if (status === "CREATE") {
        return <Badge colorScheme="purple">Create</Badge>;
      } else if (status === "RECEIVE") {
        return <Badge colorScheme="orange">Received</Badge>;
      } else if (status === "CANCEL") {
        return <Badge colorScheme="red">Cancel</Badge>;
      }
  }

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
            <InputGroup>
            </InputGroup>
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
              <Th>Weight</Th>
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
                  weight,
                  point,
                  staffName,
                  customerName,
                  agentName,
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
                  <Td>{weight}kg</Td>
                  <Td>{point}</Td>
                  <Td>{renderStatus(status)}</Td>
                  <Td>{getLastUpdateTime(createAt, receiveAt, completeAt, cancelAt, status)}</Td>
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

export default AdminGarbageHistoryTable;
