import gql from 'graphql-tag';

export const show = (obj, args, { cache }) => {
  const MainMenu = {
    __typename: 'MainMenu',
    isOpen: true
  };
  cache.writeData({ data: { MainMenu } });
  return { MainMenu, ...MainMenu };
};

export const hide = (obj, args, { cache }) => {
  const MainMenu = {
    __typename: 'MainMenu',
    isOpen: false
  };
  cache.writeData({ data: { MainMenu } });
  return { MainMenu, ...MainMenu };
};

export const toggle = (obj, args, { cache }) => {
  const data = cache.readQuery({
    query: gql`
      query MainMenu {
        MainMenu @client {
          isOpen
        }
      }
    `
  });
  const MainMenu = {
    __typename: 'MainMenu',
    isOpen: !data.MainMenu.isOpen
  };
  cache.writeData({ data: { MainMenu } });
  return { MainMenu, ...MainMenu };
};
