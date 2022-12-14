import {
  Badge,
  Box,
  HStack,
  IconButton,
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
  Button,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Lock, Pencil, Search } from '../../../../../components/icons';
import { Paginator } from '../../../../../components/ui';
import { usePrompt } from '../../../../../hooks';
import { Modal, notification } from "antd";
import { selectAuth } from "../../../../../modules/auth/services/authSlice";
import axios from "axios";
import AccountForm from '../AccountForm';
import { useSelector } from 'react-redux';


const AccountTable = (props) => {
  const { accounts, refetch, totalPages, onParamsChange } = props;
  const prompt = usePrompt();
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [params, setParams] = useState({});
  const accessToken = useSelector(selectAuth).data.accessToken;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitAccount = async ({ imageUrl, ...rest }) => {
    const url = selectedItem?.id
      ? `${process.env.REACT_APP_BASE_API_URL}/gift/update/${selectedItem?.id}`
      : `${process.env.REACT_APP_BASE_API_URL}/create-account`;

    const response = await axios({
      method: selectedItem?.id ? "PUT" : "POST",
      url,
      data: {
        ...rest,
        avatar: imageUrl,
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
        ? "Updated Account Successfully!"
        : "Created Account Successfully!",
    });
    setSelectedItem(undefined);
  };

  function renderRole(role) {
    if (role === "ADMIN") {
      return <Badge colorScheme="red">Admin</Badge>;
    } else if (role === "AGENT") {
      return <Badge colorScheme="purple">Agent</Badge>;
    } else if (role === "STAFF") {
      return <Badge colorScheme="yellow">Staff</Badge>;
    } else if (role === "CUSTOMER") {
      return <Badge colorScheme="green">Customer</Badge>;
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
        h='14'
        px='4'
        py='10'
        bgColor='white'
        borderBottom='1px'
        borderColor='gray.100'
      >
        <HStack flex='1'>
          <Box>
            <InputGroup>
              <Input
                focusBorderColor='inherit'
                rounded='none'
                placeholder='Tìm kiếm'
                w='sm'
                onChange={(e) => _onChangeParams({ search: e.target.value })}
              />
              <InputRightElement children={<Search width='20' height='20' />} />
            </InputGroup>
          </Box>
        </HStack>
        <Box>
          <Select
            rounded='none'
            defaultValue='active'
            onChange={(e) => _onChangeParams({ role: e.target.value })}
          >
            <option value='none'>All</option>
            <option value='admin'>Admin</option>
            <option value='agent'>Agent</option>
            <option value='staff'>Staff</option>
            <option value='customer'>Customer</option>
          </Select>
        </Box>
        <Button onClick={() => setSelectedItem({})}>Create Account</Button>
      </HStack>
      <TableContainer bgColor='white' p='3'>
        <Table variant='simple'>
          <Thead borderBottom='1px' borderColor='gray.100'>
            <Tr>
              <Th>#</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Create At</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map(
              ( account, index) => (
                <Tr
                  key={account.id}
                  fontSize='sm'
                  _hover={{
                    bgColor: 'gray.100',
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td fontWeight='bold'>
                    {account.username}
                  </Td>
                  <Td>{account.email}</Td>
                  <Td>{renderRole(account.role)}</Td>
                  <Td>{account.createdAt}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        onClick={() => setSelectedItem({ ...account })}
                        aria-label='Edit user'
                        colorScheme='yellow'
                        icon={<Pencil width='20' height='20' />}
                        size='sm'
                        borderRadius='none'
                      />
                    </HStack>
                  </Td>
                </Tr>
              ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent='flex-end' py='4'>
        <Paginator
          totalPages={totalPages}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      </HStack>
      <Modal
        open={!!selectedItem}
        title={selectedItem?.id ? "Update Account" : "Create Account"}
        closable
        maskClosable
        onCancel={() => setSelectedItem(undefined)}
        centered
        destroyOnClose
        footer={false}
      >
        <AccountForm
          key={selectedItem?.id}
          account={selectedItem}
          onSubmit={onSubmitAccount}
          loading={isLoading}
        />
      </Modal>
    </Box>
  );
};

export default AccountTable;
