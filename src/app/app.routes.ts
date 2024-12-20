import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListagemComponent } from './components/listagem/listagem.component';
import { ConversaoComponent } from './components/conversao/conversao.component';
import { HistoricoComponent } from './components/historico/historico.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'listagem', component: ListagemComponent },
    { path: 'conversao', component: ConversaoComponent },
    { path: 'historico', component: HistoricoComponent }
];