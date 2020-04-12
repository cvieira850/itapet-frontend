import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/Sigin';
import Feed from '../pages/Feed';

import { items } from '../components/Header/navigation';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path={items.feed.route}
        component={Feed}
        navItem={items.feed.name}
        isPrivate
        exact
      />

    </Switch>
  );
}
