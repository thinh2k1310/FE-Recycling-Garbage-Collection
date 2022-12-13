import { Form, Input, InputNumber, Button, Col, Row } from "antd";
import AccountRoleSelector from "./AccountRoleSelector";
import UploadImage from "../../../gift/components/UploadImage";
import React, { useEffect, useState } from "react";
import AgentSelector from "./AgentSelector";

export default function AccountForm({
  loading,
  account,
  onSubmit,
  form,
  onClose,
  ...rest
}) {
  const [role, setRole] = useState("");
  const [agentId, setAgentId] = useState("");

  return (
    <Form
      initialValues={{ ...account }}
      layout="vertical"
      form={form}
      onFinish={onSubmit}
      {...rest}
    >
      {account?.id ? null : (
        <Form.Item
          label="Role"
          rules={[{ required: true, whitespace: true }]}
          name="role"
          messageVariables={{ name: "Role" }}
          style={{
            width: "50%",
          }}
        >
          <AccountRoleSelector onSelect={(role) => setRole(role)} />
        </Form.Item>
      )}

      {/* {role === "STAFF" ? (
        <Form.Item
          label="Agent"
          messageVariables={{ name: "Agent" }}
          rules={[{ required: true, whitespace: false }]}
          name="agentId"
          style={{
            width: "100%",
          }}
        >
          <AgentSelector onSelect={(agentId) => setAgentId(agentId)}/>
        </Form.Item>
      ) : null} */}
      {role === "STAFF" ? (
        <Form.Item
          label="Agent Id"
          messageVariables={{ name: "Agent Id" }}
          rules={[{ required: true, whitespace: false }]}
          name="agentId"
          style={{
            width: "100%",
          }}
        >
          <Input
            style={{ width: "100%" }}
            placeholder="Please enter agent id"
          />
        </Form.Item>
      ) : null}
      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Username" }}
        name="username"
        label="Username"
      >
        {account?.id ? (
          <Input style={{ width: "100%" }} readOnly="true" />
        ) : (
          <Input
            style={{ width: "100%" }}
            placeholder="Please enter username"
          />
        )}
      </Form.Item>
      <Form.Item
        rules={[{ required: true }]}
        messageVariables={{ name: "Email" }}
        name="email"
        label="Email"
      >
        {account?.id ? (
          <Input style={{ width: "100%" }} readOnly="true" />
        ) : (
          <Input style={{ width: "100%" }} placeholder="Please enter email" />
        )}
      </Form.Item>
      {account?.id ? null : (
        <Form.Item
          rules={[{ required: true }]}
          messageVariables={{ name: "Password" }}
          name="password"
          label="Password"
        >
          <Input.Password
            style={{ width: "100%" }}
            placeholder="Please enter password"
          />
        </Form.Item>
      )}

      <Form.Item
        label="Name"
        messageVariables={{ name: "Name" }}
        rules={[{ required: true, whitespace: true }]}
        name="name"
      >
        <Input placeholder="Please enter phone number" />
      </Form.Item>
      <Form.Item
        label="Phone number"
        messageVariables={{ name: "Phone number" }}
        rules={[{ required: true, whitespace: false }]}
        name="phoneNumber"
      >
        <Input placeholder="Please enter phone number" />
      </Form.Item>
      <Form.Item
        label="Identiy Card Number"
        messageVariables={{ name: "Identiy card number" }}
        rules={[{ required: true, whitespace: false }]}
        name="identityCardNumber"
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Please enter identiyy card number" />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        messageVariables={{ name: "Date of birth" }}
        rules={[{ required: true, whitespace: true }]}
        name="dateOfBirth"
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Please enter date of birth" />
      </Form.Item>
      <Form.Item
        label="Street"
        messageVariables={{ name: "Street" }}
        rules={[{ required: true, whitespace: true }]}
        name="street"
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Please enter street" />
      </Form.Item>
      <Form.Item
        label="District"
        messageVariables={{ name: "District" }}
        rules={[{ required: true, whitespace: true }]}
        name="district"
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Please enter district" />
      </Form.Item>
      <Form.Item
        label="Province/City"
        messageVariables={{ name: "Province/City" }}
        rules={[{ required: true, whitespace: true }]}
        name="provinceOrCity"
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Please enter province/city" />
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
