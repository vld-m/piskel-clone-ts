// constants
import { EVENTS } from '../components/constants';

// interfaces
import { CanvasListeners } from '../components/interfaces';

type Events = {
  [EVENTS.TOOL_CHANGE]: CanvasListeners;
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
