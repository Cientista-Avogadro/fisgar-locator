import { Place } from '@material-ui/icons';
import { useState } from 'react';
import { FormUser } from '../Form';
import { Maps } from '../Maps';

export const App = () => {
  const [selectPos, setSelectPos] = useState();
  // @ts-ignore
    return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div style={{ width: '50vw', height: '100vh' }}>
        <Maps
          style={{ width: '100%', height: '100vh' }}
        />
      </div>
      <div style={{ width: '50vw', height: '100vh' }}>
        <FormUser />
      </div>
    </div>
  );
};
