import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<string>();

  sendMessage(message: string): void {
    this.subject.next(message);
  }

  clearMessage(): void {
    this.subject.next('');
  }

  getMessage(): Observable<string> {
    return this.subject.asObservable();
  }
}
