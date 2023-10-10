// @ts-ignore
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

interface ClipboardButtonProps {
  text: string;
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({ text }) => {
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <Button size="sm" onClick={onCopy} ml={2}>
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  );
};

const SvgGenerator: React.FC<Props> = () => {
  const [inputText, setInputText] = useState("");
  const [base64Svg, setBase64Svg] = useState("");
  const [displaySvg, setDisplaySvg] = useState("");
  const [decodedText, setDecodedText] = useState("");
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

  const handleDisplayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDisplaySvg(e.target.value);
  };

  const handleDecodeBase64 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const decoded = atob(e.target.value);
  
      const cleanedDecoded = decoded.trim().replace(/^"|"$/g, '');
      
      setDecodedText(cleanedDecoded);
    } catch (error) {
      setDecodedText("Error decoding base64 input");
    }
  };
  
  return (
      <Flex direction="column" alignItems="left" w="100%">
        <Heading size="md" pb="3">1. Start typing to generate your SVG 🎨</Heading>
        <Input
          placeholder="Enter text to appear on your SVG"
          value={inputText}
          onChange={handleInputChange}
          width="300px"
        />
        {inputText && (
          <Box mt={4}>
            <VStack alignItems={"left"}>
              <img src={base64Svg} alt="Generated SVG" width="300px" />
              <Heading size="md" pb="3">2. Copy the SVG to your clipboard 📋</Heading>
              <Textarea mt={2} value={base64Svg} isReadOnly maxWidth="1000px" minWidth="300px" height="125px"/>
              <Button onClick={onCopy} mb="7" width="300px">
                {hasCopied ? "Copied 🎉" : "Copy to Clipboard"}
              </Button>
              <br/>
              <Heading size="md" pb="3">3. Save the SVG as a variable in your terminal 💾</Heading>
              <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">export SVG="your SVG from step 2"</Code>
              <br/>
              <Heading size="md" pb="3">4. Post the data to Celestia as plain text 🚀</Heading>
              <Text>First, set your auth token:</Text>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">export AUTH_TOKEN=$(celestia light auth admin --p2p.network mocha)</Code>
                <ClipboardButton text='export AUTH_TOKEN=$(celestia light auth admin --p2p.network mocha)' />
              </Flex>
              <Text>Next, post the SVG and save the output:</Text>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">export OUTPUT=$(celestia blob submit 0x42690c204d39600fddd3 "$SVG" --token $AUTH_TOKEN)</Code>
                <ClipboardButton text={`export OUTPUT=$(celestia blob submit 0x42690c204d39600fddd3 "$SVG" --token $AUTH_TOKEN)`} />
              </Flex>
              <br />
              <Heading size="md" pb="3">5. Set the block height to retrieve your data 🧊</Heading>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">export HEIGHT=$(echo "$OUTPUT" | jq '.result.height') && echo "Height: $HEIGHT"</Code>
                <ClipboardButton text={`export HEIGHT=$(echo "$OUTPUT" | jq '.result.height') && echo "Height: $HEIGHT"`} />
              </Flex>
              <br />
              <Heading size="md" pb="3">6. Retrieve the data from Celestia ✨</Heading>
              <Text>Retrieve the shares by namespace and block height:</Text>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN</Code>
                <ClipboardButton text={`celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN`} />
              </Flex>
              <Text>Display only the data retrieved:</Text>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN | jq '.result[0].data'</Code>
                <ClipboardButton text={`celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN | jq '.result[0].data'`} />
              </Flex>
              <Text>Copy only the data retrieved, without quotes, to your clipboard:</Text>
              <Flex>
                <Code p={2} fontSize="sm" borderRadius="md" whiteSpace="pre-wrap">celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN | jq -r '.result[0].data' | pbcopy</Code>
                <ClipboardButton text={`celestia blob get-all $HEIGHT 0x42690c204d39600fddd3 --token $AUTH_TOKEN | jq -r '.result[0].data' | pbcopy`} />
              </Flex>
              <br/>
              <Heading size="md" pb="3">7. Display the SVG you retrieved from Celestia</Heading>
              <Textarea
                placeholder="Enter the parsed base64 SVG"
                value={displaySvg}
                onChange={handleDisplayChange}
                maxWidth="1000px"
                minWidth="300px"
                textAlign="left"
                resize="vertical"
              />
              {displaySvg && (
                <Box mt={4}>
                  <img src={displaySvg} alt="Error displaying SVG, please check your input" width="300px" />
                  <Text mb="3">Do you want to see that it really worked? Paste the SVG into your browser's search bar 🧙‍♂️</Text>
                  <Text>Did you have fun with this tutorial? Share a screenshot of your SVG on your favorite social media platform ✍️</Text>
                  <br/>
                  <Heading size="md" pb="3">8. Build your next project at <Link href="https://docs.celestia.org" isExternal>docs.celestia.org</Link></Heading>
                </Box>
              )}
            </VStack>
          </Box>
        )}
      </Flex>
  );
};

export default SvgGenerator;
