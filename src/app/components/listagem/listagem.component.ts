import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    MessageModule,
    CardModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  currencies: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getCurrencies().subscribe({
      next: (response) => {
        this.currencies = response.supported_codes.map((code: any) => ({
          code: code[0],
          description: code[1],
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar as moedas';
        this.loading = false;
      }
    });
  }
}