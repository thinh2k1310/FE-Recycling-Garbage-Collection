import { Select } from "antd";

const options = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Agent",
    value: "AGENT",
  },
  {
    label: "Staff",
    value: "STAFF",
  },
  {
    label: "Customer",
    value: "CUSTOMER",
  },
];

export default function AccountRoleSelector({ onSelect, ...rest }) {
  return (
    <Select
      onSelect={(value) => onSelect(value)}
      placeholder="Select account role"
      style={{ width: "100%" }}
      options={options}
      {...rest}
    />
  );
}
