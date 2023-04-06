import { VStack, Flex, Link, Avatar } from "@chakra-ui/react";
import { Topbuttons } from "./Components/topbuttons";
import { About } from "./Components/about";
import { Content } from "./Components/content";

function App() {
  return (
    <div>
      <Topbuttons />
      <Flex
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        minHeight="90vh"
      >
        <VStack p="8" width="100%">
          <About />
          <Content />
          <Link href="https://joshcs.lol" pt="8" isExternal>
            <Avatar src="/jcs.png" mx="auto" size="md" />
          </Link>
        </VStack>
      </Flex>
    </div>
  );
}

export default App;
