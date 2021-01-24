// types
import { Cell } from '../components/types';

// constants
import { Events } from '../components/constants';

type EmitterEvents = {
  [Events.FrameChange]: Cell[];
  [Events.ToolChange]: string;
};
type Listener<T, K extends keyof T> = (payload: T[K]) => void;
type Listeners<T> = { [K in keyof T]?: Listener<T, K> };

class EventEmitter<T> {
  private listeners: Listeners<T> = {};

  emit<L extends keyof T>(event: L, payload: T[L]) {
    const listener = this.listeners[event];

    if (listener === undefined) {
      return false;
    }

    listener(payload);

    return true;
  }

  on<M extends keyof T>(event: M, listener: Listener<T, M>) {
    this.listeners = { ...this.listeners, [event]: listener };

    return this;
  }
}

export const emitter = new EventEmitter<EmitterEvents>();
