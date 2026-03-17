import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AppMainComponent } from './app.main.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `
    <ul class="layout-menu">
      <li app-menuitem *ngFor="let item of filteredModel; let i = index;" [item]="item" [index]="i" [root]="true"></li>
    </ul>
  `,
})
export class AppMenuComponent implements OnInit {
  public model: any[];
  public token: any;
  public filteredModel: any[] = [];

  constructor(public appMain: AppMainComponent, private readonly authService: AuthService, public app: AppComponent) {}

  ngOnInit() {
    this.authService.token$.subscribe((response) => {
      console.log('Token reçu:', response); // Log du token
      if (response) {
        this.token = response;
        const decodedToken = this.authService.getUserFromToken(response); // Décodage du token
        console.log('Token décodé:', decodedToken);
  
          this.filteredModel = this.filterMenuByRole(this.appMain.user); // Passer l'objet décodé

      }
    });
  }

  filterMenuByRole(user: any): any[] {
    // if (!token || !token.user) {
    //   console.warn('Aucun utilisateur trouvé dans le token.');
    //   return [];
    // }

    // const user = token.user;
    console.log('Utilisateur trouvé:', user);

        this.model = [
            {label: 'Tableau de bord', icon: 'pi pi-fw pi-home', routerLink: ['tableau-de-bord']},
            {label: 'Admin', icon: 'pi pi-fw pi-prime',
                items: [
                    {label: 'Types', icon: 'pi pi-fw pi-book', routerLink: ['editions-systeme/types']},
                    {label: 'Bateau', icon: 'pi pi-arrow-right-arrow-left', routerLink: ['editions-systeme/bateau']},
                    {label: 'Tarification', icon: 'pi pi-fw pi-bookmark', routerLink: ['editions-systeme/tarifs']},
                    {label: 'Places', icon: 'pi pi-fw pi-mobile', routerLink: ['editions-systeme/places']},
                    {label: 'Profils & Utilisateurs', icon: 'pi pi-fw pi-key', routerLink: ['editions-systeme/profils-users']},
                ]
            },
            {label:'Chef de gare', icon:'pi pi-user',
                items:[
                    {label: 'Gestion des voyages', icon: 'pi pi-fw pi-sync', routerLink: ['chef-de-gare/voyage']},
                    {label: 'Planning des voyages', icon: 'pi pi-fw pi-calendar', routerLink: ['chef-de-gare/planning-voyage']},
                    // {label: 'Suivi état billet', icon: 'pi pi-fw pi-file', routerLink: ['chef-de-gare/tracking-billet']},
                    {label: 'Déblocage de place', icon: 'pi pi-fw pi-unlock', routerLink: ['chef-de-gare/deblocage-places']},
                    {label: 'Opérations sur billet', icon: 'pi pi-fw pi-tablet', routerLink: ['chef-de-gare/operations-billet']},
                    {label: 'Faits marquants', icon: 'pi pi-fw pi-image', routerLink: ['chef-de-gare/faits-marquants']},
                ]
            },
            {label: 'Billet', icon: 'pi pi-tag',
                items: [
                    {label: 'Edition', icon: 'pi pi-fw pi-ticket', routerLink: ['billetterie/edition-billet']},
                    //{label: 'Opérations sur billet', icon: 'pi pi-fw pi-tablet', routerLink: ['billet/operations-billet']},
                    {label: 'Check-Billet', icon: 'pi pi-fw pi-qrcode', routerLink: ['billetterie/check-billet']},
                    {label: 'Embarquer', icon: 'pi pi-fw pi-upload', routerLink: ['billetterie/embarquement-passager']}
                ]
            },
            {label: 'Frêt', icon: 'pi pi-fw pi-box',
                items: [
                    {label: 'Opérations Frêt', icon: 'pi pi-fw pi-pencil', routerLink: ['fret/operations-fret']},
                    {label: 'Paiement', icon: 'pi pi-fw pi-money-bill', routerLink: ['fret/paiement']},
                    {label: 'Check-Frêt', icon: 'pi pi-fw pi-cart-plus', routerLink: ['fret/magasinage']}
                ]
            },
            {label: 'Clients en compte', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Gestion des clients', icon: 'pi pi-fw pi-sliders-v', routerLink: ['clients-en-compte/gestion'],
                    },
                    {
                        label: 'Facturation', icon: 'pi pi-fw pi-file-export', routerLink: ['clients-en-compte/facturation'],
                    },
                    {
                        label: 'Réglements', icon: 'pi pi-fw pi-credit-card', routerLink: ['clients-en-compte/reglements'],
                    },
                    {
                        label: 'Situation Client', icon: 'pi pi-fw pi-desktop', routerLink: ['clients-en-compte/situation']
                    },
                    
                ]
            },
            {label: 'DEC', icon: 'pi pi-fw pi-download',
                // items: [
                //     {
                //         label: 'Réclamations', icon: 'pi pi-exclamation-triangle', routerLink: ['dec/reclamations']
                //     },
                //     {
                //         label: 'Campagnes', icon: 'pi pi-comments', routerLink: ['dec/campagnes']
                //     }
                // ]
            },
            {label: 'Etats', icon: 'pi pi-file-pdf',
                items: [
                    {label: 'Passagers', icon: 'pi pi-users', routerLink: ['etats/passagers']},
                    {label: 'Frêt', icon: 'pi pi pi-fw pi-box', routerLink: ['etats/fret']},
                    // {label: 'Voyage', icon: 'pi pi-fw pi-chart-bar', routerLink: ['etats/voyage']},
                    // {label: 'Comptabilité', icon: 'pi pi-fw pi-align-left', routerLink: ['etats/comptabilite']},
                ]
                
            },
            {label: 'Carabane', icon: 'pi pi-file-pdf',
                items: [
                    {label: 'Passagers', icon: 'pi pi-users', routerLink: ['etats-carabane/passagers']},
                    {label: 'Frêt', icon: 'pi pi pi-fw pi-box', routerLink: ['etats-carabane/fret']}
                ]
                
            }
            /**
            {
                label: 'Statistiques', icon: 'pi pi-fw pi-chart-line',
                        items: [
                            {label: 'Nationalité', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Type de produits', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Evolution PAX/FRET', icon: 'pi pi-fw pi-align-left'},
                            {label: 'CA PAX/FRET', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Performances agents', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Objectifs', icon: 'pi pi-fw pi-align-left'},
                            {label: 'PAX selon âge et type de place', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Taux de remplissage', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Activités PAX/Véhicules', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Traversées', icon: 'pi pi-fw pi-align-left'},
                            {label: 'Réclamations', icon: 'pi pi-fw pi-align-left'},
                        ]
                
            }*/

        ];

        return this.model.map(menuItem => {
            console.log('Vérification du menu:', menuItem.label);
        
            if (menuItem.label === 'Admin') {
                console.info(user);

                if (!user.profil || user.profil.edit_param === undefined) {
                    console.warn('Le profil ou la permission `edit_param` est manquant.');
                    return false; // Cacher entièrement le menu Admin
                }

                console.log('Permission `edit_param`:', user.profil.edit_param);

                if (user.profil.edit_param === false) {
                    return false; // L'utilisateur n'a pas le droit → on cache le menu
                }

                return menuItem; // L'utilisateur a le droit → on affiche le menu
            }

                        
        
            if (menuItem.label === 'Chef de gare') {
                console.info(user);
                if (!user.profil || user.profil.add_voyage === undefined || user.profil.rechercher === undefined
                    || user.profil.bloq_places === undefined || user.profil.plan_voyage === undefined) 
                    {
                    console.warn('Le profil ou la permission `voyage` est manquant.');
                    user.profil.add_voyage = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.rechercher = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.bloq_places = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.plan_voyage = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
                console.log('Permission `addVoyage`:', user.profil.add_voyage);
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Gestion des voyages' || user.profil.add_voyage,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Planning des voyages' || user.profil.plan_voyage,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Déblocage de place' || user.profil.bloq_places,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Opérations sur billet' || user.profil.rechercher,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Faits marquants' || user.profil.add_voyage,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'Billet') {
                console.info(user);
                if (!user.profil || user.profil.edit_billet === undefined || user.profil.add_check_billet === undefined
                    || user.profil.add_embarqment === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.edit_billet = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.add_check_billet = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.add_embarqment = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Edition' || user.profil.edit_billet,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Check-Billet' || user.profil.add_check_billet,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Embarquer' || user.profil.add_embarqment,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'Frêt') {
                console.info(user);
                if (!user.profil || user.profil.add_fret === undefined || user.profil.paye_fret === undefined
                    || user.profil.check_fret === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.add_fret = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.paye_fret = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.check_fret = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Opérations Frêt' || user.profil.add_fret,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Paiement' || user.profil.paye_fret,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Check-Frêt' || user.profil.check_fret,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'Clients en compte') {
                console.info(user);
                if (!user.profil || user.profil.edit_clt_compte === undefined || user.profil.edit_facture === undefined
                    || user.profil.edit_reglement === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.edit_clt_compte = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.edit_facture = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.edit_reglement = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Gestion des clients' || user.profil.edit_clt_compte,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Facturation' || user.profil.edit_facture,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Réglements' || user.profil.edit_reglement,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Situation Client' || user.profil.edit_clt_compte,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'DEC') {
                console.info(user);
                if (!user.profil || user.profil.campagne === undefined || user.profil.reclamation === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.campagne = false; // Empêcher l'affichage de "Gestion des voyages"
                    user.profil.reclamation = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Réclamations' || user.profil.reclamation,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Campagnes' || user.profil.campagne,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'Etats') {
                console.info(user);
                if (!user.profil || user.profil.view_etat === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.view_etat = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Passagers' || user.profil.view_etat,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Frêt' || user.profil.view_etat,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Voyage' || user.profil.view_etat,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Comptabilité' || user.profil.view_etat,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }

            if (menuItem.label === 'Carabane') {
                console.info(user);
                if (!user.profil || user.profil.view_etat === undefined) 
                    {
                    console.warn('Le profil ou la permission `billetterie` est manquant.');
                    user.profil.view_etat = false; // Empêcher l'affichage de "Gestion des voyages"
                    }
        
                // Filtrer les sous-menus : cacher "Gestion des voyages" si l'utilisateur n'a pas la permission
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Passagers' || user.profil.view_etat,
                );
                menuItem.items = menuItem.items?.filter(item => 
                    item.label !== 'Frêt' || user.profil.view_etat,
                );
        
                return menuItem; // Retourner l'objet avec les sous-menus filtrés
            }
        
            return menuItem;
        }).filter(menuItem => menuItem.items?.length || menuItem.routerLink);        
        
  }
}
