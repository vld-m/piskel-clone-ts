// types
import { Cell } from '../components/types';

// constants
import { EVENTS } from '../components/constants';

type Events = {
  [EVENTS.FRAME_CHANGE]: Cell[];
  [EVENTS.TOOL_CHANGE]: string;
};
type Listener<T, K extends keyof T> = (payload: T[K]) => Promise<void>;
type Listeners<T> = { [K in keyof T]?: Listener<T, K> };

class EventEmitter<T> {
  private listeners: Listeners<T> = {};

  emit<L extends keyof T>(event: L, payload: T[L]) {
    const listener = this.listeners[event];

    if (listener === undefined) {
      return false;
    }

    listener(payload).catch(console.error);

    return true;
  }

  on<M extends keyof T>(event: M, listener: Listener<T, M>) {
    this.listeners = { ...this.listeners, [event]: listener };

    return this;
  }
}

export const emitter = new EventEmitter<Events>();
