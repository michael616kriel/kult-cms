import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { startCase } from 'lodash';
import { FC } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useModels } from '../../context/models.context';

export const AdminLayout: FC<{
  children?: JSX.Element | JSX.Element[] | null;
  title: string;
  subTitle?: string;
}> = ({ children, title, subTitle }) => {
  const { models } = useModels();
  const { colorMode, toggleColorMode } = useColorMode();
  const navItemColors = useColorModeValue('whiteAlpha.800', 'whiteAlpha.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const contentBg = useColorModeValue('white', 'gray.800');
  const subTitleColor = useColorModeValue('gray.500', 'whiteAlpha.800');
  const dimensions = {
    navHeight: '65px',
    sidebarWidth: '250px',
  };

  const topSidebarLinks = [
    ...models.map((model) => ({
      title: startCase(model.name || ''),
      url: `/content/${model.name}`,
    })),
  ];

  const bottomSidebarLinks = [
    {
      title: 'Collections',
      url: '/collections',
      icon: AiOutlineSetting,
      action: null,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: AiOutlineSetting,
      action: () => {},
    },
  ];

  return (
    <Flex justify='center' align='center' w='100%' h='100vh' direction='column'>
      <Flex
        direction='row'
        w='full'
        h={dimensions.navHeight}
        maxH={dimensions.navHeight}
      >
        <Flex
          direction='row'
          justify='center'
          align='center'
          w={dimensions.sidebarWidth}
          maxW={dimensions.sidebarWidth}
          textAlign='center'
          bg='blue.500'
          overflow='hidden'
          color='white'
        >
          <Heading size='sm'>Kult CMS</Heading>
        </Flex>
        <Flex
          w={`calc(100% - ${dimensions.sidebarWidth})`}
          direction='row'
          px={3}
          bg={contentBg}
          borderBottom='1px solid'
          borderColor={borderColor}
          zIndex={99}
        >
          <Flex w='full' justify='center' direction='column'>
            <Text fontWeight='bold'>{title}</Text>
            {subTitle && (
              <Text fontSize='sm' color={subTitleColor}>
                {subTitle}
              </Text>
            )}
          </Flex>
          <Flex direction='row' justify='flex-end' align='center'>
            <IconButton
              icon={colorMode !== 'light' ? <BsMoon /> : <BsSun />}
              onClick={toggleColorMode}
              aria-label=''
              variant='ghost'
            />
            <Flex direction='row' align='center' ml={3}>
              <Avatar size='sm' name='michael kriel' mr={1} />
              <Text fontSize='sm'>michael@offerzen.com</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w='100%' direction='row' h={`calc(100% - ${dimensions.navHeight})`}>
        <Flex
          w={dimensions.sidebarWidth}
          zIndex={9}
          justify='center'
          direction='column'
          bg='gray.900'
          color={navItemColors}
          h='100vh'
          py={1}
        >
          <Flex w='100%' flexDirection='column' h='full'>
            <Flex px={3} w='100%' py={3}>
              <Link to='/'>
                <Text fontSize='sm'>Dashboard</Text>
              </Link>
            </Flex>
            <Text px={3} fontWeight='bold' fontSize='xs' mb={1}>
              Collections
            </Text>
            {topSidebarLinks.map((link, index) => (
              <Flex px={4} w='100%' py={1} key={index}>
                <Link to={link.url}>
                  <Text fontSize='sm'>{link.title}</Text>
                </Link>
              </Flex>
            ))}
            <Text px={3} fontWeight='bold' mt={3} fontSize='xs' mb={1}>
              Settings
            </Text>
            {bottomSidebarLinks.map((link, index) => (
              <Flex px={4} w='100%' py={1} key={index}>
                <Link to={link.url}>
                  <Text fontSize='sm'>{link.title}</Text>
                </Link>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex w={`calc(100% - ${dimensions.sidebarWidth})`} direction='column'>
          <Flex flexDirection='column' w='100%' h='100%' bg={contentBg}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
