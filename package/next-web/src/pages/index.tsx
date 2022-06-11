import React from 'react';
import type { NextPage } from 'next';
import { Button } from '@common/components';

const Home: NextPage = () => (
  <div>
    <h1>Hello monorepo 🎉</h1>
    <Button label="Button from common/components" />
  </div>
);

export default Home;
