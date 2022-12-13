export default function agentMapper(agents) {
  const newAgents = agents.data?.map((agent) => ({
    name: agent.name,
    id: agent.id,
  }));

  return {
    agents: newAgents || [],
  };
}
