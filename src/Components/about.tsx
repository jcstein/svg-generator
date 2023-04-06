import { Heading, VStack, Text, Link } from "@chakra-ui/react";

export const About = () => {
  return (
    <VStack pb="5">
      <Heading pb="3" textAlign={"center"}>🟣 Base64 SVG Tutorial 🟣</Heading>
      <Text>This tutorial will guide you through the process of generating a custom SVG, posting it to Celestia's data availability layer, retrieving it, and displaying it back.</Text>
      <Text>The only pre-requisite for this tutorial is to <Link href="https://docs.celestia.org/nodes/node-tutorial" isExternal>run a Celestia light node</Link> that is funded with testnet tokens. It is also recommended to read about the <Link href="https://docs.celestia.org/developers/rpc-tutorial/" isExternal>RPC API and the Celestia Node CLI guide.</Link></Text>
    </VStack>
  );
};