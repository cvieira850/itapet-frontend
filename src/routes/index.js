import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import { useSelector} from 'react-redux';

import SignIn from '../pages/Sigin';
import SignUp from '../pages/Signup';
import Feed from '../pages/Feed';
import PostForm from '../pages/PostForm';
import { items } from '../components/Header/navigation';

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);
  return (
    <Switch>
      <Route path="/" exact component={!signed? SignIn:Feed} />
      <Route path="/signup" exact component={SignUp} />
      <Route
        path={items.feed.route}
        component={Feed}
        navItem={items.feed.name}
        isPrivate
        exact
      />
      <Route
        path={`${items.feed.route}/new`}
        component={PostForm}
        navItem={items.feed.name}
        isPrivate
      />
      <Route
        path={`${items.feed.route}/:id/edit`}
        component={PostForm}
        navItem={items.feed.name}
        isPrivate
      />
    </Switch>
  );
}
