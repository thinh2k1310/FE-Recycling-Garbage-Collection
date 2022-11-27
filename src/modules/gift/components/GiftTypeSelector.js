import { Select } from "antd";

const options = [
  {
    label: "Electronic",
    value: "Electronic",
  },
  {
    label: "Housewares",
    value: "Housewares",
  },
  {
    label: "Cosmetic",
    value: "Cosmetic",
  },
  {
    label: "Food",
    value: "Food",
  },
  {
    label: "Beverage",
    value: "Beverage",
  },
  {
    label: "Voucher",
    value: "Voucher",
  },
  {
    label: "Fashion",
    value: "Fashion",
  },
];

export default function GiftTypeSelector({ ...rest }) {
  return (
    <Select
      placeholder="Select gift type"
      style={{ width: "100%" }}
      options={options}
      {...rest}
    />
  );
}
