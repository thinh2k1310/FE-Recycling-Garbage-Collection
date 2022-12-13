import { Select } from "antd";
import { useGetAllAgentQuery } from "../../services/accountsApi";
import { HStack, Spinner, Text } from "@chakra-ui/react";

export default function AgentSelector({ onSelect, ...rest }) {
  const { data, isLoading } = useGetAllAgentQuery();
  return (
    <div>
      {isLoading ? (
        <HStack justifyContent="center">
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      ) : data ? (
        <Select
          onSelect={(value) => onSelect(value)}
          placeholder="Select agent"
          style={{ width: "100%" }}
          options={data.agents.map((agent) => ({
            label: agent.name,
            value: agent.id,
          }))}
        />
      ) : null}
    </div>
  );
}
