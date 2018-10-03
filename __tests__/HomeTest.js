// __tests__/Intro-test.js
import React from 'react';
import HomeScreen from '../app/screens/Home/HomeScreen';

import renderer from 'react-test-renderer';

test('HomeScreen renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});