import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-conversao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    MessageModule,
  ],
  templateUrl: './conversao.component.html',
  styleUrls: ['./conversao.component.scss'],
})
export class ConversaoComponent implements OnInit {
  from = '';
  to = '';
  amount: number | null = null;
  result: number | null = null;
  currencies: { code: string; description: string }[] = [];
  error: string | null = null;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getCurrencies().subscribe({
      next: (response) => {
        this.currencies = response.supported_codes.map((code: any) => ({
          code: code[0],
          description: code[1],
        }));
      },
      error: (err) => {
        this.error = 'Erro ao carregar as moedas';
      }
    });
  }

  convert(): void {
    if (this.from && this.to && this.amount) {
      this.exchangeService.convert(this.from, this.to, this.amount).subscribe({
        next: (response) => {
          this.result = response.conversion_result;
          this.exchangeService.saveHistory({
            date: new Date(),
            from: this.from,
            to: this.to,
            amount: this.amount,
            result: this.result
          }).subscribe();
        },
        error: (err) => {
          this.error = 'Erro ao realizar a conversão';
        }
      });
    } else {
      this.error = 'Por favor, preencha todos os campos';
    }
  }
}