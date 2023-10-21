import { describe, it, expect } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import Component from './+page.svelte';

describe(Component.name, () => {
  it('should render the component', () => {
    const renderResult = render(Component);
    expect(renderResult.component).toBeTruthy();
    cleanup();
  });
});
