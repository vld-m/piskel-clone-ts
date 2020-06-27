// interfaces
import { Cell } from '../components/interfaces';

// constants
import { EVENTS } from '../components/constants';

type Events = {
  [EVENTS.FRAME_CHANGE]: [Cell[], number];
  [EVENTS.TOOL_CHANGE]: string;
};

class EventEmitter<T> {
  private listeners: { [K in keyof T]?: (payload: T[K]) => void } = {};

  emit<L extends keyof T>(eventName: L, payload: T[L]): boolean {
    const listener = this.listeners[eventName];

    if (listener !== undefined) {
      listener(payload);

      return true;
    }

    return false;
  }

  on<M extends keyof T>(eventName: M, listener: (payload: T[M]) => void): EventEmitter<T> {
    this.listeners = { ...this.listeners, [eventName]: listener };

    return this;
  }
}

export default new EventEmitter<Events>();
