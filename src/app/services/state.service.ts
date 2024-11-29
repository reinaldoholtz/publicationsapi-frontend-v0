import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StateService {
  private state: { pageIndex: number; pageSize: number; query: string } = {
    pageIndex: 0,
    pageSize: 10,
    query: '',
  };

  setState(newState: { pageIndex: number; pageSize: number; query: string }): void {
    this.state = newState;
  }

  getState(): { pageIndex: number; pageSize: number; query: string } {
    return this.state;
  }
}