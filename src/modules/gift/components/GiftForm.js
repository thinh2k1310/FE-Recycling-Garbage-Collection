import { Form, Input, InputNumber, Button } from "antd";
import GiftTypeSelector from "./GiftTypeSelector";
import UploadImage from "./UploadImage";

export default function GiftForm({
  loading,
  gift,
  onSubmit,
  form,
  onClose,
  ...rest
}) {
  return (
    <Form
      initialValues={{ ...gift }}
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      {...rest}
    >
      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Redemption Point" }}
        name="redemptionPoint"
        label="Redemption Point"
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Please enter redemption point"
        />
      </Form.Item>
      <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item
          label="Name Gift"
          messageVariables={{ name: "Name" }}
          rules={[{ required: true, whitespace: true }]}
          name="name"
          style={{
            width: "50%",
          }}
        >
          <Input placeholder="Please enter gift name" />
        </Form.Item>
        <Form.Item
          label="Gift Type"
          rules={[{ required: true, whitespace: true }]}
          name="type"
          messageVariables={{ name: "Redemption Point" }}
          style={{
            width: "50%",
          }}
        >
          <GiftTypeSelector />
        </Form.Item>
      </div>

      {!gift?.id && (
        <Form.Item
          label="Contributor"
          messageVariables={{ name: "Contributor" }}
          rules={[{ required: true, whitespace: true }]}
          name="contributor"
        >
          <Input placeholder="Please enter contributor" />
        </Form.Item>
      )}
      <Form.Item
        label="Gift Brand"
        rules={[{ required: true, whitespace: true }]}
        name="brand"
        messageVariables={{ name: "Gift Brand" }}
      >
        <Input placeholder="Please enter gift name" />
      </Form.Item>
      <Form.Item
        label="Gift Description"
        rules={[{ whitespace: true }]}
        name="description"
        messageVariables={{ name: "Gift Description" }}
      >
        <Input.TextArea placeholder="Please enter description" />
      </Form.Item>
      <Form.Item label="Image" name="imageUrl" valuePropName="src">
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
