import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { ListagemComponent } from './app/components/listagem/listagem.component';
import { ConversaoComponent } from './app/components/conversao/conversao.component';
import { HistoricoComponent } from './app/components/historico/historico.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: '', redirectTo: '/listagem', pathMatch: 'full' },
  { path: 'listagem', component: ListagemComponent },
  { path: 'conversao', component: ConversaoComponent },
  { path: 'historico', component: HistoricoComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));