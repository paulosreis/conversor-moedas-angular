import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/codes`);
  }

  convert(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${this.apiKey}/pair/${from}/${to}/${amount}`
    );
  }

  saveHistory(conversion: any): Observable<void> {
    const history = this.getHistorySync();
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    return of();
  }

  getHistory(): Observable<any[]> {
    const history = this.getHistorySync();
    return of(history);
  }

  deleteHistory(index: number): Observable<void> {
    const history = this.getHistorySync();
    history.splice(index, 1);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    return of();
  }

  private getHistorySync(): any[] {
    return JSON.parse(localStorage.getItem('conversionHistory') || '[]');
  }
}