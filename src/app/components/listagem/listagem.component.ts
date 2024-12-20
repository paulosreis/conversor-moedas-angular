import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  currencies: { code: string; description: string }[] = [];
  loading: boolean = true;
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
        this.error = 'Erro ao carregar a lista de moedas. Tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao buscar moedas:', err);
      },
    });
  }
}
