import {
  Box,
  HStack,
  InputGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Paginator } from "../../../../../components/ui";


const PointTable = (props) => {
  const { history, refetch, totalPages, onParamsChange } = props;
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  function renderType(type) {
    if (type === "PAY") {
      return <Badge colorScheme="red">Pay</Badge>;
    } else if (type === "USE") {
      return <Badge colorScheme="purple">Use</Badge>;
    } else if (type === "CLAIM") {
      return <Badge colorScheme="green">Claim</Badge>;
    } 
  }
  function renderItem(point, index) {
    return (
      <Tr
        height="50"
        key={point.id}
        fontSize="sm"
        _hover={{ bgColor: "gray.100" }}
      >
        <Td>{index + 1}</Td>
        <Td fontWeight="bold">{point.accountId}</Td>
        <Td>{point.point}</Td>
        <Td>{renderType(point.type)}</Td>
        <Td>{point.time}</Td>
        <Td>{point.garbageHistoryId === "___" ? point.garbageHistoryId :  point.garbageHistoryId.substring(0, 10) + "..."}</Td>
        <Td>{point.giftHistoryId === "___" ? point.giftHistoryId :  point.giftHistoryId.substring(0, 10) + "..."}</Td>
      </Tr>
    );
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
          <Box fontSize="2xl">
          Point History
          </Box>
        </HStack>
      </HStack>
      <TableContainer bgColor="white" p="3">
        <Table variant="simple">
          <Thead borderBottom="1px" borderColor="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Account Id</Th>
              <Th>Point</Th>
              <Th>Type</Th>
              <Th>Time</Th>
              <Th>Garbage History Id</Th>
              <Th>Gift History Id</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((point, index) => {
              return renderItem(point, index);
            })}
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

export default PointTable;
