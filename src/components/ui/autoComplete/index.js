import React from "react";
import { Flex } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Icon, InputGroup, InputRightElement } from "@chakra-ui/react";

export default function AutoCompleteComponent(){
  const options = ["apple", "appoint", "zap", "cap", "japan"];

  return (
    <Flex mt={5}>
      <AutoComplete rollNavigation>
        {({ isOpen }) => (
          <>
            <InputGroup>
              <AutoCompleteInput  placeholder="Search..." />
              <InputRightElement>
                <Icon as={isOpen ? ChevronRightIcon : ChevronDownIcon} />
              </InputRightElement>
            </InputGroup>
            <AutoCompleteList>
              {options.map((option, oid) => (
                <AutoCompleteItem
                  key={`optio-${oid}`}
                  value={option}
                  textTransform="capitalize"
                  align="center"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </>
        )}
      </AutoComplete>
    </Flex>
  );
};
