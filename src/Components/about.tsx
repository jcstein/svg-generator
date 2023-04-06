import { Avatar, Heading, VStack } from "@chakra-ui/react";

export const About = () => {
  return (
    <VStack pb="5">
      <Avatar src="/jcs.jpeg" mx="auto" size="2xl" />
      <Heading pb="3">joshcs.eth</Heading>
    </VStack>
  );
};
