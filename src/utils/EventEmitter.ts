interface EventListener {
  <T>(payload: T): void;
}

class EventEmitter {
  private listeners: { [eventName: string]: EventListener } = {};

  emit<T>(eventName: string, payload: T): boolean {
    const listener = this.listeners[eventName];

    if (listener !== undefined) {
      listener(payload);

      return true;
    }

    return false;
  }

  on(eventName: string, listener: EventListener): EventEmitter {
    this.listeners = { ...this.listeners, [eventName]: listener };

    return this;
  }
}

export default new EventEmitter();
