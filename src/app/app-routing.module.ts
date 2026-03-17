import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './components/chef_de_gare/voyage/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { BateauComponent } from './components/admin/bateau/bateau.component';
import { VoyageComponent } from './components/chef_de_gare/voyage/voyage.component';
import { TarificationComponent } from './components/admin/tarification/tarification.component';
import { TypesComponent } from './components/admin/types/types.component';
import { PlacesComponent } from './components/admin/places/places.component';
import { ProfilUserComponent } from './components/admin/profil-user/profil-user.component';
import { PointerVoyageComponent } from './components/chef_de_gare/pointer-voyage/pointer-voyage.component';
import { TrackBilletComponent } from './components/chef_de_gare/track-billet/track-billet.component';
import { DeblocagePlaceComponent } from './components/chef_de_gare/deblocage-place/deblocage-place.component';
import { OpsBilletComponent } from './components/chef_de_gare/ops-billet/ops-billet.component';
import { FaitsMarquantsComponent } from './components/chef_de_gare/faits-marquants/faits-marquants.component';

import { PaiementComponent } from './components/fret/paiement/paiement.component';
import { ReclamationComponent } from './components/dec/reclamation/reclamation.component';
import { CampagneComponent } from './components/dec/campagne/campagne.component';
import { EditBilletComponent } from './components/billets/edit-billet/edit-billet.component';
import { PrintBilletComponent } from './components/billets/edit-billet/print-billet/print-billet.component';
import { CheckBilletComponent } from './components/billets/check-billet/check-billet.component';
import { CrudFretComponent } from './components/fret/crud-fret/crud-fret.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoleGuardGuard } from './guards/role-guard.guard';
import { CrudComponent } from './components/clients/crud/crud.component';
import { EmbarkComponent } from './components/billets/embark/embark.component';
import { ManifesteComponent } from './components/etats/passagers/manifeste.component';
import { ManifPassagersComponent } from './components/etats-carabane/manif-passagers/manif-passagers.component';
import { ManifFretComponent } from './components/etats-carabane/manif-fret/manif-fret.component';
import { ManifFretTousComponent } from './components/etats/manif-fret-tous/manif-fret-tous.component';
import { FacturationComponent } from './components/clients/facturation/facturation.component';
import { ReglementsComponent } from './components/clients/reglements/reglements.component';
import { SituComponent } from './components/clients/situ/situ.component';
import { MagasinageComponent } from './components/fret/magasinage/magasinage.component';
import { MonProfilComponent } from './components/admin/mon-profil/mon-profil.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent, canActivate: [AuthGuard],
                children: [
                    {path: 'tableau-de-bord', component: ChartsDemoComponent, canActivate: [AuthGuard]},
                    
                    {path: 'editions-systeme/types', component: TypesComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_param'] }},
                    {path: 'editions-systeme/bateau', component: BateauComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_param'] }},
                    {path: 'editions-systeme/tarifs', component: TarificationComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_param'] }},
                    {path: 'editions-systeme/places', component: PlacesComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_param'] }},
                    {path: 'editions-systeme/profils-users', component: ProfilUserComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_param'] }},

                    {path: 'clients-en-compte/gestion', component: CrudComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_clt_compte'] }},
                    {path: 'clients-en-compte/facturation', component: FacturationComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_facture'] }},
                    {path: 'clients-en-compte/reglements', component: ReglementsComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_reglement'] }},
                    {path: 'clients-en-compte/situation', component: SituComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_clt_compte'] }},

                    {path: 'chef-de-gare/pointage-voyage', component: PointerVoyageComponent, canActivate: [RoleGuardGuard]},
                    {path: 'chef-de-gare/tracking-billet', component: TrackBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['rechercher'] }},
                    {path: 'chef-de-gare/deblocage-places', component: DeblocagePlaceComponent, canActivate: [RoleGuardGuard], data: { permissions: ['bloq_places'] }},
                    {path: 'chef-de-gare/operations-billet', component: OpsBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['rechercher', 'cancel_billet'] }},
                    {path: 'chef-de-gare/voyage', component: VoyageComponent, canActivate: [RoleGuardGuard], data: { permissions: ['add_voyage'] }},
                    {path: 'chef-de-gare/planning-voyage', component: AppCalendarComponent, canActivate: [RoleGuardGuard], data: { permissions: ['plan_voyage'] }},
                    {path: 'chef-de-gare/faits-marquants', component: FaitsMarquantsComponent, canActivate: [RoleGuardGuard], data: { permissions: ['add_voyage'] }},
                    
                    {path: 'billetterie/edition-billet', component: EditBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_billet'] }},
                    {path: 'billetterie/edition-billet/print-billet', component: PrintBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_billet'] }},
                    {path: 'billetterie/operations-billet', component: OpsBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['edit_billet'] }},
                    {path: 'billetterie/check-billet', component: CheckBilletComponent, canActivate: [RoleGuardGuard], data: { permissions: ['add_check_billet'] }},
                    {path: 'billetterie/embarquement-passager', component: EmbarkComponent, canActivate: [RoleGuardGuard], data: { permissions: ['add_embarqment'] }},
                    
                    {path: 'fret/operations-fret', component: CrudFretComponent, canActivate: [RoleGuardGuard], data: { permissions: ['add_fret'] }},
                    {path: 'fret/paiement', component: PaiementComponent, canActivate: [RoleGuardGuard], data: { permissions: ['paye_fret'] }},
                    {path: 'fret/magasinage', component: MagasinageComponent, canActivate: [RoleGuardGuard], data: { permissions: ['check_fret'] }},
                    
                    {path: 'dec/reclamations', component: ReclamationComponent, canActivate: [RoleGuardGuard], data: { permissions: ['reclamation'] }},
                    {path: 'dec/campagnes', component: CampagneComponent, canActivate: [RoleGuardGuard], data: { permissions: ['campagne'] }},
                    
                    {path: 'etats/passagers', component: ManifesteComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},
                    {path: 'etats/fret', component: ManifFretTousComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},
                    {path: 'etats/voyage', component: CampagneComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},
                    {path: 'etats/comptabilite', component: CampagneComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},

                    {path: 'etats-carabane/passagers', component: ManifPassagersComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},
                    {path: 'etats-carabane/fret', component: ManifFretComponent, canActivate: [RoleGuardGuard], data: { permissions: ['view_etat'] }},

                    {path: 'editions-systeme/mon-profil', component: MonProfilComponent},

                    // {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    // {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    // {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    // {path: 'uikit/input', component: InputDemoComponent},
                    // {path: 'uikit/button', component: ButtonDemoComponent},
                    // {path: 'uikit/table', component: TableDemoComponent},
                    // {path: 'uikit/list', component: ListDemoComponent},
                    // {path: 'uikit/tree', component: TreeDemoComponent},
                    // {path: 'uikit/panel', component: PanelsDemoComponent},
                    // {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    // {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    // {path: 'uikit/media', component: MediaDemoComponent},
                    // {path: 'uikit/message', component: MessagesDemoComponent},
                    // {path: 'uikit/misc', component: MiscDemoComponent},
                    // {path: 'uikit/charts', component: ChartsDemoComponent},
                    // {path: 'uikit/file', component: FileDemoComponent},
                    // {path: 'utilities/icons', component: IconsComponent},
                    // {path: 'pages/crud', component: AppCrudComponent},
                    // {path: 'pages/calendar', component: AppCalendarComponent},
                    // {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    // {path: 'pages/invoice', component: AppInvoiceComponent},
                    // {path: 'pages/help', component: AppHelpComponent},
                    // {path: 'pages/empty', component: EmptyDemoComponent},
                    // {path: 'documentation', component: DocumentationComponent},
                    // {path: 'blocks', component: BlocksComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'se-connecter', component: AppLoginComponent, canActivate: [LoginGuard]},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
