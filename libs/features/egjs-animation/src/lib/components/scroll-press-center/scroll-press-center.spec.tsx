import { render } from '@testing-library/react';

import ScrollPressCenter from './scroll-press-center';

describe('ScrollPressCenter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ScrollPressCenter />
    );
    expect(baseElement).toBeTruthy();
  });
});
