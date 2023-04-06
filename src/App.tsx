// @ts-ignore

import { VStack, Flex, Link, Avatar, Text } from "@chakra-ui/react";
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
        <VStack p="3" mb="3" width="100%" maxWidth="1000px">
          <About />
          <Content />
          <Link href="https://celestia.org" pt="8" isExternal>
            <Avatar src="/celestia.svg" mx="auto" size="md" />
          </Link>
          <Text>
             This website is{" "}
             <Link href="https://github.com/jcstein/svg-generator" isExternal>
                open-source
             </Link> and <Link href="https://plausible.io/based64.xyz/" isExternal>analytics</Link> are GDPR compliant
          </Text>
        </VStack>
      </Flex>
    </div>
  );
}

export default App;
