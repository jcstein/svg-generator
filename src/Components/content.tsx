import { Button, VStack } from "@chakra-ui/react";
import {
  FaGlobe,
} from "react-icons/fa";
import SvgGenerator from "./SvgGenerator";

export const Content = () => {
  return (
    <VStack spacing={4} direction="column" align="center" width="90%">
      <SvgGenerator />
      <br />
      <Button
        colorScheme="pink"
        size="lg"
        rightIcon={<FaGlobe />}
        onClick={() => window.open("https://docs.celestia.org/nodes/celestia-node", "_blank")}
        width="300px"
        _hover={{ transform: "scale(1.1)" }}
        rounded="full"
      >
        Install Celestia Node
      </Button>
      <Button
        colorScheme="pink"
        size="lg"
        rightIcon={<FaGlobe />}
        onClick={() => window.open("https://node-rpc-docs.celestia.org", "_blank")}
        width="300px"
        _hover={{ transform: "scale(1.1)" }}
        rounded="full"
      >
        RPC API
      </Button>
      <Button
        colorScheme="pink"
        size="lg"
        rightIcon={<FaGlobe />}
        onClick={() => window.open("https://docs.celestia.org/developers/node-tutorial/", "_blank")}
        width="300px"
        _hover={{ transform: "scale(1.1)" }}
        rounded="full"
      >
        RPC API Tutorial
      </Button>
    </VStack>
  );
};