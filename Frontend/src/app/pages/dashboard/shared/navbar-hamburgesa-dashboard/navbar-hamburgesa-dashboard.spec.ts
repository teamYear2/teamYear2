import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHamburgesaDashboard } from './navbar-hamburgesa-dashboard';

describe('NavbarHamburgesaDashboard', () => {
  let component: NavbarHamburgesaDashboard;
  let fixture: ComponentFixture<NavbarHamburgesaDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarHamburgesaDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarHamburgesaDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
