import { vi } from 'vitest';
import type * as environment from '$app/environment';
import type * as navigation from '$app/navigation';
import type * as stores from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';
import { readable } from 'svelte/store';

export class SveltekitMocks {
  /**
   * Mock SvelteKit runtime module $app/environment
   */
  static doMockAppEnvironment(overrides?: Partial<typeof environment>): void {
    vi.doMock('$app/environment', (): typeof environment => ({
      browser: false,
      dev: true,
      building: false,
      version: 'any',
      ...overrides,
    }));
  }

  /**
   * Mock SvelteKit runtime module $app/navigation
   */
  static doMockAppNavigation(overrides?: Partial<typeof navigation>): void {
    vi.doMock('$app/navigation', (): typeof navigation => ({
      onNavigate: () => () => {},
      afterNavigate: () => {},
      beforeNavigate: () => {},
      disableScrollHandling: () => {},
      goto: () => Promise.resolve(),
      invalidate: () => Promise.resolve(),
      invalidateAll: () => Promise.resolve(),
      preloadData: () => Promise.resolve(),
      preloadCode: () => Promise.resolve(),
      ...overrides,
    }));
  }

  /**
   * Mock SvelteKit runtime module $app/stores
   */
  static doMockAppStores(overrides?: {
    navigation?: Partial<Navigation> | null;
    page?: Partial<Page>;
  }): void {
    vi.doMock('$app/stores', (): typeof stores => {
      const getStores: typeof stores.getStores = () => {
        const navigationOverrides =
          (overrides?.navigation as Navigation | null | undefined) ?? null;
        const navigating = readable<Navigation | null>(navigationOverrides);

        const page = readable<Page>({
          url: new URL('http://localhost'),
          params: {},
          status: 200,
          error: null,
          form: undefined,
          ...overrides?.page,
          route: {
            id: null,
            ...overrides?.page?.route,
          },
          data: {
            authUser: null,
            ...overrides?.page?.data,
          },
        });

        const updated = {
          subscribe: readable(false).subscribe,
          check: async () => false,
        };

        return { navigating, page, updated };
      };

      const page: typeof stores.page = {
        subscribe(fn) {
          return getStores().page.subscribe(fn);
        },
      };

      const navigating: typeof stores.navigating = {
        subscribe(fn) {
          return getStores().navigating.subscribe(fn);
        },
      };

      const updated: typeof stores.updated = {
        subscribe(fn) {
          return getStores().updated.subscribe(fn);
        },
        check: async () => false,
      };

      return {
        getStores,
        navigating,
        page,
        updated,
      };
    });
  }
}
