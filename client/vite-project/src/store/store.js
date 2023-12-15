import { writable, get } from 'svelte/store';

function createUserStore() {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    set,
    update,
    refreshFromSession: () => {
      const sessionUser = sessionStorage.getItem('user');
      if (sessionUser) {
        set(JSON.parse(sessionUser));
      }
    }
  };
}

export const user = createUserStore();