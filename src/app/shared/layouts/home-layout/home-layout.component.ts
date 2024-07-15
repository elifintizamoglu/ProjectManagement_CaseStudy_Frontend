import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent, NavItem, NavTitle } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent { 
  
  navTitle: NavTitle = { text: 'Project Management', routerLink: '' };

  navItems: NavItem[] = [
    { label: 'Projects', link: '' },
  ];
}
