import { Form, Input, Button } from "antd";
import UploadImage from "./UploadImage";

export default function PlaceForm({
  loading,
  tplace,
  onSubmit,
  form,
  onClose,
  ...rest
}) {
  return (
    <Form
      initialValues={{ ...tplace }}
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      {...rest}
    >
      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Name" }}
        name="name"
        label="Name"
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Please enter name"
        />
      </Form.Item>

      {!tplace?.id && (
        <Form.Item
          label="Agent Id"
          messageVariables={{ name: "AgentId" }}
          rules={[{ required: true, whitespace: true }]}
          name="agentId"
        >
          <Input placeholder="Please enter agent id" />
        </Form.Item>
      )}

      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Street" }}
        name="street"
        label="Street"
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Please enter street"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "District" }}
        name="district"
        label="District"
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Please enter district"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Province/City" }}
        name="provinceOrCity"
        label="Province/City"
      >
        <Input
          style={{ width: "100%" }}
          placeholder="Please enter province/city"
        />
      </Form.Item>
      <Form.Item label="Image" name="bannerUrl" valuePropName="src">
        <UploadImage placeholder="Please enter description" />
      </Form.Item>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
}
