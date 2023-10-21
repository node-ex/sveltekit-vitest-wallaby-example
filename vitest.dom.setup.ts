import '@testing-library/jest-dom/vitest';
import { SveltekitMocks } from '$lib/client/vitest/sveltekit-test-helpers';

SveltekitMocks.doMockAppEnvironment();
SveltekitMocks.doMockAppNavigation();
SveltekitMocks.doMockAppStores();
