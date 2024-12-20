import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private apiKey = 'd9a26e1a2502b072d8f4789e';
  private apiUrl = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/codes`);
  }

  convert(from: string, to: string, amount: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${this.apiKey}/pair/${from}/${to}/${amount}`
    );
  }

  saveHistory(conversion: any): void {
    const history = this.getHistory();
    history.push(conversion);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }

  getHistory(): any[] {
    return JSON.parse(localStorage.getItem('conversionHistory') || '[]');
  }

  deleteHistory(index: number): void {
    const history = this.getHistory();
    history.splice(index, 1);
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }
}
