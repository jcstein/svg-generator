import { Heading, VStack, Text, Link } from "@chakra-ui/react";

export const About = () => {
  return (
    <VStack pb="5">
      <Heading pb="3" textAlign={"center"}>🟣 based64 🟣</Heading>
      <Heading pb="3" size="lg" textAlign={"center"}>A base64 SVG tutorial</Heading>
      <Text>This tutorial will guide you through the process of generating a custom SVG, posting it to Celestia's data availability layer, retrieving it, and validating the retrieval by displaying it back.</Text>
      <Text>The only pre-requisite for this tutorial is to <Link href="https://docs.celestia.org/developers/node-tutorial" isExternal>run a Celestia light node</Link> that is funded with testnet tokens. It is also recommended to read about the <Link href="https://docs.celestia.org/developers/rpc-tutorial/" isExternal>RPC API and the Celestia Node CLI guide.</Link></Text>
    </VStack>
  );
};