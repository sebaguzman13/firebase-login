export interface Event {
  eventName: string;
  fn: Function;
}

export enum ObservableEvents {
  AddPet = "addPet",
}
// TODO review typification
// Array of Maps [string]: Function[]
class ObservableNavigatorService {
  private listenersByEvent: any[] = [];

  constructor() {
      this.listenersByEvent = [];
      this.addEvent(ObservableEvents.AddPet);
  }

  private addEvent(eventName: string) {
      if (!this.existEvent(eventName)) {
          //@ts-ignore
          this.listenersByEvent[eventName] = [];
      }
  }

  addListener(eventName: string, fn: (data: any) => void) {
      if (this.existEvent(eventName)) {
          //@ts-ignore
          this.listenersByEvent[eventName].push(fn);
      }
  }

  addListeners(events: Event[]) {
      events.forEach(({ eventName, fn }) => {
          this.addListener(eventName, fn as (data: any) => void);
      });
  }

  removeListeners(events: Event[]) {
      events.forEach(({ eventName, fn }) => {
          this.removeListener(eventName, fn as (data: any) => void);
      });
  }

  existEvent(eventName: string) {
      //@ts-ignore
      return this.listenersByEvent[eventName];
  }

  removeListener(eventName: string, fn: (data: any) => void) {
      if (this.existEvent(eventName)) {
          //@ts-ignore
          const listenerList = this.listenersByEvent[eventName];
          const index = listenerList.indexOf(fn);
          if (index !== -1) {
              listenerList.splice(index, 1);
          }
      }
  }

  notifyListeners(eventName: string, eventParams: any) {
      if (this.existEvent(eventName)) {
          //@ts-ignore
          this.listenersByEvent[eventName].forEach((listener) =>
              listener(eventParams)
          );
      }
  }
}

export default new ObservableNavigatorService();