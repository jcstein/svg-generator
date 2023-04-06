import React, { useState } from "react";
import {
  Input,
  Box,
  Textarea,
  Button,
  useClipboard,
  Flex,
  Heading,
  VStack,
  Code,
  Text,
  Link
} from "@chakra-ui/react";

interface Props {}

const SvgGenerator: React.FC<Props> = () => {
  const [inputText, setInputText] = useState("");
  const [base64Svg, setBase64Svg] = useState("");
  const [displaySvg, setDisplaySvg] = useState("");
  // const [decodedText, setDecodedText] = useState("");
  const { hasCopied, onCopy } = useClipboard(base64Svg);

  const createSvg = (text: string) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#ad11f7" />
        <text x="50" y="50" font-size="12" font-family="sans-serif" text-anchor="middle" dy=".3em" fill="white">${text}</text>
      </svg>
    `;
    const svgBase64 = `data:image/svg+xml;base64,${btoa(svg)}`;
    setBase64Svg(svgBase64);
    return svgBase64;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    createSvg(e.target.value);
  };

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySvg(e.target.value);
  };

  // const handleDecodeClick = () => {
  //   const decodedString = atob(displaySvg.split(',')[1]);
  //   setDecodedText(decodedString);
  // };

  return (
      <Flex direction="column" alignItems="left" w="100%">
        <Heading size="md" pb="3">1. Generate your SVG</Heading>
        <Input
          placeholder="Enter text to generate SVG"
          value={inputText}
          onChange={handleInputChange}
          width="300px"
        />
        {inputText && (
          <Box mt={4}>
            <VStack alignItems={"left"}>
              <img src={base64Svg} alt="Generated SVG" width="300px" />
              <Heading size="md" pb="3">2. Copy the SVG to your clipboard</Heading>
              <Textarea mt={2} value={base64Svg} isReadOnly width="300px" />
              <Button onClick={onCopy} mb="7" width="300px">
                {hasCopied ? "Copied 🎉" : "Copy to Clipboard"}
              </Button>
              <br/>
              <Heading size="md" pb="3">3. Post the data to Celestia as plain text</Heading>
              <Text>First, set your auth token:</Text>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">export CELESTIA_NODE_AUTH_TOKEN=$(celestia light auth admin --p2p.network blockspacerace)</Code>
              <Text>Next, post the SVG:</Text>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia rpc state SubmitPayForBlob GHTmQvXd5Yk= '"[the SVG that you copied above goes here]"' 2000 100000</Code>
              <br/>
              <Heading size="md" pb="3">4. Retrieve the data from Celestia</Heading>
              <Text>Retrieve the shares by namespace and block:</Text>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia rpc share GetSharesByNamespace "$(celestia rpc header GetByHeight [the block height of your transaction] | jq '.result.dah' -r)" GHTmQvXd5Yk=</Code>
              <Text>Display only the data retrieved:</Text>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia rpc share GetSharesByNamespace "$(celestia rpc header GetByHeight [the block height of your transaction] | jq '.result.dah' -r)" GHTmQvXd5Yk= | jq '.result[0].Shares[0]'</Code>
              <Text>Copy only the data retrieved, without quotes, to your clipboard:</Text>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia rpc share GetSharesByNamespace "$(celestia rpc header GetByHeight 185320 | jq '.result.dah' -r)" GHTmQvXd5Yk= | jq '.result[0].Shares[0]' | tr -d '"' | pbcopy</Code>
              <br/>
              <Heading size="md" pb="3">5. Convert to text, parse out metadata</Heading>
              {/* <Box mt={4}>
                <Heading size="md" pb="3">Decode Base64 Text</Heading>
                <Input
                  placeholder="Enter base64 text"
                  value={displaySvg}
                  onChange={handleDisplayChange}
                  width="300px"
                  textAlign={"center"}
                />
                <Button onClick={handleDecodeClick} mb="7">
                  Decode
                </Button>
                {decodedText && (
                  <Box mt={4}>
                    <Textarea
                      value={decodedText}
                      isReadOnly
                      width="300px"
                      placeholder="Decoded text"
                    />
                  </Box>
                )}
              </Box> */}
            <Text>You can use the <Link href="https://base64.guru/converter/decode/text" target="_blank" rel="noopener noreferrer">base64.guru tool</Link>. Copy the text inside of the quotes.</Text>
              <br />
              <Heading size="md" pb="3">6. Display the SVG you retrieved from Celestia</Heading>
              <Input
                placeholder="Enter the base64 SVG"
                value={displaySvg}
                onChange={handleDisplayChange}
                width="300px"
                textAlign={"center"}
              />
              {displaySvg && (
                <Box mt={4}>
                  <img src={displaySvg} alt="Retrieved SVG" width="300px" />
                </Box>
              )}
            </VStack>
          </Box>
        )}
      </Flex>
  );
};

export default SvgGenerator;
