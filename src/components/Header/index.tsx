import Logo from '../Logo';
import './styles.scss';

import React, { memo } from 'react';

const Header = (): JSX.Element => {
  return (
    <header className="headerWrap">
      <Logo />
      <h1>Drone Delivery Route</h1>
    </header>
  );
};

export default memo(Header);
