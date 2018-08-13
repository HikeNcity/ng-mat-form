
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MyNavigationComponent } from './my-navigation.component';

describe('MyNavigationComponent', () => {
  let component: MyNavigationComponent;
  let fixture: ComponentFixture<MyNavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [MyNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
