import React from 'react';

import { graphql } from '@gqless/react';
import { Button, useColorMode } from 'theme-ui';

interface Props {}

const CountryMessage: React.FC<Props> = graphql(() => {
  const [colorMode, setColorMode] = useColorMode();

  // const data = query.items ;
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
        {/* <span>{`${data.name} ${data.description}`}</span> */}
      </div>
    </div>
  );
});

export default CountryMessage;
