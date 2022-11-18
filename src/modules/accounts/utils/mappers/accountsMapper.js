import moment from "moment/moment";
export default function accountsMapper(accounts) {
  const newCustomers = accounts.data?.content.map((account) => ({
    id: account.id,
    username: account.username,
    email: account.email,
    role: account.role,
    createdAt: moment(account.createdAt).format("DD/MM/YYYY"),
    avatar: account.avatar,
    updatedAt: account.updatedAt,
  }));

  return {
    accounts: newCustomers || [],
    totalPages: accounts.data?.totalPages,
  };
}
