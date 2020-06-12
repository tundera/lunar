import React from 'react';
import { Flex, Container } from 'theme-ui';

const ThemeLayout: React.FC = ({ children }) => (
  <Flex>
    <Container>{children}</Container>
  </Flex>
);

export default ThemeLayout;
