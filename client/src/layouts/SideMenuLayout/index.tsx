import {
  ButtonGroup,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import SearchInput from '../../components/Form/SearchInput';
import { debounce } from 'lodash';
import { FC, useCallback, useState } from 'react';
import {startCase} from 'lodash'

export type MenuItemType = {
  id: number;
  name: string;
  link?: string;
};

export const SideMenuLayout: FC<{
  children?: JSX.Element | JSX.Element[];
  selectedItem: MenuItemType | null;
  items: MenuItemType[];
  itemActions?: { icon: JSX.Element; action: (item: MenuItemType) => void }[];
  action?: JSX.Element | JSX.Element[];
  onSelect: (item: MenuItemType) => void;
}> = ({ children, items, selectedItem, onSelect, action, itemActions }) => {
  const [keyword, setKeyword] = useState<string>('');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const onSearch = debounce(
    useCallback(
      (keyword) => {
        setKeyword(keyword.toLowerCase());
      },
      [setKeyword]
    ),
    500
  );

  return (
    <Flex w='100%' h='100%'>
      <Flex
        w='250px'
        direction='column'
        h='100%'
        overflowY='scroll'
        borderRight='1px solid'
        borderRightColor={borderColor}
        zIndex={10}
      >
        <Flex p={3}>
          <SearchInput onChange={onSearch} />
        </Flex>
        {items
          .filter((item) => {
            if (keyword.length > 0) {
              return item.name?.toLowerCase().includes(keyword);
            } else {
              return true;
            }
          })
          .map((item, index) => (
            <Flex
              key={index}
              direction='row'
              px={3}
              py={1}
              borderRight='4px solid'
              borderColor={borderColor}
              borderRightColor={
                selectedItem?.id === item.id ? 'blue.500' : 'transparent'
              }
              onClick={() => onSelect(item)}
              align='center'
            >
              <Flex w='full'>
                <Text
                  fontSize='sm'
                  fontWeight={selectedItem?.id === item.id ? 'bold' : 'normal'}
                >
                  {startCase(item.name)}
                </Text>
              </Flex>
              <Flex>
                <ButtonGroup>
                  {itemActions?.map((itemAction, index) => (
                    <IconButton
                      size='xs'
                      key={index}
                      icon={itemAction.icon}
                      aria-label='item action'
                      onClick={() => itemAction.action(item)}
                      variant='ghost'
                    />
                  ))}
                </ButtonGroup>
              </Flex>
            </Flex>
          ))}
        {action && action}
      </Flex>
      <Flex
        w='calc(100% - 250px)'
        direction='column'
        maxH='100%'
        overflowY='scroll'
        p={6}
      >
        {children}
      </Flex>
    </Flex>
  );
};
