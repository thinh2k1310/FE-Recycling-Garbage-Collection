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
  Button,
} from "@chakra-ui/react";
import { Modal, Image, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Search } from "../../../../../components/icons";
import { Paginator } from "../../../../../components/ui";
import { usePrompt } from "../../../../../hooks";
import axios from "axios";
import GiftForm from "../../GiftForm";
import { selectAuth } from "../../../../../modules/auth/services/authSlice";
import { useSelector } from "react-redux";

const GiftTable = (props) => {
  const { gifts, refetch, totalPages, onParamsChange } = props;
  const prompt = usePrompt();
  const toast = useToast();
  const [params, setParams] = useState({});
  const [selectedItem, setSelectedItem] = useState(undefined);
  const agentId = useSelector(selectAuth).data.user.id;
  const accessToken = useSelector(selectAuth).data.accessToken;
  const [isLoading, setIsLoading] = useState(false);

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
        <Tr
          height="50"
          key={gift.id}
          fontSize="sm"
          _hover={{ bgColor: "gray.100" }}
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
            <Image
              src={gift.imageUrl}
              height="50px"
              width="100%"
              style={{ objectFit: "cover" }}
              alt="new"
              preview={false}
            />
          </Td>
          <Td>
            <Button onClick={() => setSelectedItem({ ...gift })}>Edit</Button>
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
            <Image
              height="50px"
              src={gift.imageUrl}
              width="100%"
              alt="new"
              preview={false}
              style={{ objectFit: "cover" }}
            />
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

  const onSubmitGift = async ({ imageUrl, ...rest }) => {
    const url = selectedItem?.id
      ? `${process.env.REACT_APP_BASE_API_URL}/gift/update/${selectedItem?.id}`
      : `${process.env.REACT_APP_BASE_API_URL}/gift/add`;

    const response = await axios({
      method: selectedItem?.id ? "PUT" : "POST",
      url,
      data: {
        ...rest,
        image: imageUrl,
        placeId: "55be21dd-09f9-4842-8a91-08dcc1932df5",
        agentId,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
        ["Content-Type"]:
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });

    console.log(response);
    refetch?.();
    notification.success({
      message: selectedItem?.id
        ? "Updated Gift Successfully!"
        : "Created Gift Successfully!",
    });
    setSelectedItem(undefined);
  };

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
        <Button onClick={() => setSelectedItem({})}>Create Gift</Button>
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
              <Th>Action</Th>
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
      <Modal
        open={!!selectedItem}
        title={selectedItem?.id ? "Update Gift" : "Create Gift"}
        closable
        maskClosable
        onCancel={() => setSelectedItem(undefined)}
        centered
        destroyOnClose
        footer={false}
      >
        <GiftForm
          key={selectedItem?.id}
          gift={selectedItem}
          onSubmit={onSubmitGift}
          loading={isLoading}
        />
      </Modal>
    </Box>
  );
};

export default GiftTable;
