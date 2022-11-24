import {
  Badge,
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { Lock, Pencil, Search } from "../../../../../components/icons";
import { Paginator } from "../../../../../components/ui";
import { usePrompt } from "../../../../../hooks";

const GiftTable = (props) => {
  const { gifts, refresh, totalPages, onParamsChange } = props;
  const prompt = usePrompt();
  const toast = useToast();
  const [params, setParams] = useState({});

  // const _onRemove = (email, customerId) => {
  //   prompt({
  //     title: 'Xóa tài khoản!',
  //     description: `Bạn có chắc chắn muốn xóa tài khoản <strong>${email}</strong>?`,
  //     callback: () => {
  //       setDeleteAble(customerId);
  //     },
  //   });
  // };
  function renderStatus(status) {
    if (status === "AVAILABLE") {
      return <Badge colorScheme="green">Available</Badge>;
    } else if (status === "REGISTER") {
      return <Badge colorScheme="purple">Register</Badge>;
    } else if (status === "RECEIVED") {
      return <Badge colorScheme="red">Received</Badge>;
    }
  }

  function renderItem(gift, index) {
    if (gift.status === "AVAILABLE") {
      return (
        <Tr height="50" key={gift.id} fontSize="sm" _hover={{ bgColor: "gray.100" }}>
          <Td>{index + 1}</Td>
          <Td fontWeight="bold">{gift.name}</Td>
          <Td>{gift.brand}</Td>
          <Td>{gift.redemptionPoint}</Td>
          <Td>{renderStatus(gift.status)}</Td>
          <Td fontWeight="bold">{gift.agentName}</Td>
          <Td fontWeight="bold">{gift.placeName}</Td>
          <Td>{gift.type}</Td>
          <Td>
            <img src={gift.imageUrl} width="50" height="50" alt="new" />
          </Td>
        </Tr>
      );
    } else {
      return (
        <Tr
          key={gift.id}
          fontSize="sm"
          _hover={{ bgColor: "gray.100" }}
          style={{ background: "#e2e8f0", color: "#87818f" }}
        >
          <Td>{index + 1}</Td>
          <Td fontWeight="bold">{gift.name}</Td>
          <Td>{gift.brand}</Td>
          <Td>{gift.redemptionPoint}</Td>
          <Td>{renderStatus(gift.status)}</Td>
          <Td fontWeight="bold">{gift.agentName}</Td>
          <Td fontWeight="bold">{gift.placeName}</Td>
          <Td>{gift.type}</Td>
          <Td>
            <img src={gift.imageUrl} width="50" height="50" alt="new" />
          </Td>
        </Tr>
      );
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
            <InputGroup>
              <Input
                focusBorderColor="inherit"
                rounded="none"
                placeholder="Tìm kiếm"
                w="sm"
                onChange={(e) => _onChangeParams({ search: e.target.value })}
              />
              <InputRightElement children={<Search width="20" height="20" />} />
            </InputGroup>
          </Box>
        </HStack>
        <Box>
          <Select
            rounded="none"
            defaultValue="active"
            onChange={(e) => _onChangeParams({ criteria: e.target.value })}
          >
            <option value="none">All</option>
            <option value="available">Available</option>
            <option value="register">Register</option>
            <option value="received">Received</option>
          </Select>
        </Box>
      </HStack>
      <TableContainer bgColor="white" p="3">
        <Table variant="simple">
          <Thead borderBottom="1px" borderColor="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Gift name</Th>
              <Th>Brand</Th>
              <Th>Point</Th>
              <Th>Status</Th>
              <Th>Agent</Th>
              <Th>Place</Th>
              <Th>Type</Th>
              <Th>Image</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {gifts.map((gift, index) => {
              return renderItem(gift, index);
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

export default GiftTable;
