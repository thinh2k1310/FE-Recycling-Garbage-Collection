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
  Button,
} from "@chakra-ui/react";
import { Modal, Image, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Paginator } from "../../../../../components/ui";
import axios from "axios";
import { selectAuth } from "../../../../../modules/auth/services/authSlice";
import { useSelector } from "react-redux";
import PlaceForm from "../../PlaceForm";

const PlaceTable = (props) => {
  const { tplaces, refetch, totalPages, onParamsChange } = props;
  const [params, setParams] = useState({});
  const [selectedItem, setSelectedItem] = useState(undefined);
  const accessToken = useSelector(selectAuth).data.accessToken;
  const [isLoading, setIsLoading] = useState(false);

  function renderItem(tplace, index) {
    return (
      <Tr
        height="50"
        key={tplace.id}
        fontSize="sm"
        _hover={{ bgColor: "gray.100" }}
      >
        <Td>{index + 1}</Td>
        <Td fontWeight="bold">{tplace.name}</Td>
        <Td>
          <Image
            src={tplace.bannerUrl}
            height="50px"
            width="100%"
            style={{ objectFit: "cover" }}
            alt="new"
            preview={false}
          />
        </Td>
        <Td>{tplace.agentName}</Td>
        <Td>{tplace.rank}</Td>
        <Td>{tplace.totalWeight} kg</Td>
        <Td>
          <Button onClick={() => setSelectedItem({ ...tplace })}>Edit</Button>
        </Td>
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

  const onSubmitTPlace = async ({ bannerUrl, ...rest }) => {
    const url = selectedItem?.id
      ? `${process.env.REACT_APP_BASE_API_URL}/tplace/update/${selectedItem?.id}`
      : `${process.env.REACT_APP_BASE_API_URL}/tplace/add`;

    const response = await axios({
      method: selectedItem?.id ? "POST" : "POST",
      url,
      data: {
        ...rest,
        banner: bannerUrl,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
        ["Content-Type"]:
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });

    refetch?.();
    notification.success({
      message: selectedItem?.id
        ? "Updated Trading Place Successfully!"
        : "Created Trading Place Successfully!",
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
            <InputGroup></InputGroup>
          </Box>
        </HStack>
        <Button onClick={() => setSelectedItem({})}>Create</Button>
      </HStack>
      <TableContainer bgColor="white" p="3">
        <Table variant="simple">
          <Thead borderBottom="1px" borderColor="gray.100">
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Banner</Th>
              <Th>Agent</Th>
              <Th>Rank</Th>
              <Th>Total Weight</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tplaces.map((tplace, index) => {
              return renderItem(tplace, index);
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
        title={selectedItem?.id ? "Update Trading Place" : "Create Trading Place"}
        closable
        maskClosable
        onCancel={() => setSelectedItem(undefined)}
        centered
        destroyOnClose
        footer={false}
      >
        <PlaceForm
          key={selectedItem?.id}
          tplace={selectedItem}
          onSubmit={onSubmitTPlace}
          loading={isLoading}
        />
      </Modal>
    </Box>
  );
};

export default PlaceTable;
