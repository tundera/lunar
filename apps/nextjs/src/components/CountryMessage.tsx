import React from 'react';
import { graphql } from '@gqless/react';
import { Button, useColorMode } from 'theme-ui';

import { query } from '../graphql';

interface Props {}

const CountryMessage: React.FC<Props> = graphql(() => {
  const [colorMode, setColorMode] = useColorMode();

  const data = query;
  return (
    <div>
      <div>
        <Button
          onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </div>

      <div>
        <span>{`${data.name} ${data.emoji}`}</span>
      </div>
    </div>
  );
});

export default CountryMessage;
