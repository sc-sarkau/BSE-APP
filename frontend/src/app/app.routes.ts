import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { SensexList } from './components/sensex-list/sensex-list';
import { AverageGraph } from './components/average-graph/average-graph';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'sensex-list',
        component: SensexList
    },
    {
        path: 'graph',
        component: AverageGraph
    },
];
