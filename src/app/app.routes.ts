import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { ConversaoComponent } from './components/conversao/conversao.component';
import { HistoricoComponent } from './components/historico/historico.component';

export const routes: Routes = [
    { path: '', redirectTo: '/listagem', pathMatch: 'full' },
    { path: 'listagem', component: ListagemComponent },
    { path: 'conversao', component: ConversaoComponent },
    { path: 'historico', component: HistoricoComponent }
];