import {
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
            <option value="none">None</option>
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
            {gifts.map(
              (
                {
                  id,
                  name,
                  brand,
                  status,
                  placeId,
                  placeName,
                  agentName,
                  agentId,
                  contributor,
                  redemptionPoint,
                  type,
                  imageUrl,
                  street,
                  district,
                  provinceOrCity,
                },
                index
              ) => (
                <Tr key={id} fontSize="sm" _hover={{ bgColor: "gray.100" }}>
                  <Td>{index + 1}</Td>
                  <Td fontWeight="bold">{name}</Td>
                  <Td>{brand}</Td>
                  <Td>{redemptionPoint}</Td>
                  <Td>{status}</Td>
                  <Td fontWeight="bold">{agentName}</Td>
                  <Td fontWeight="bold">{placeName}</Td>
                  <Td>{type}</Td>
                  <Td>
                    <img
                      src={imageUrl}
                      width="50"
                      height="50"
                      alt="new"
                    />
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

export default GiftTable;
