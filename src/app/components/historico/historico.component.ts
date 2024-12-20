import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ProgressSpinnerModule,
    MessageModule,
    CardModule,
  ],
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {
  historico: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getHistory().subscribe({
      next: (response) => {
        this.historico = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar o histórico';
        this.loading = false;
      }
    });
  }
}