import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {DiagramsComponent } from './diagrams.component';

/*
 describe help uns to scope a number of tests and contains different blocks (beforeEach, it,...)
 */
describe('DiagramsComponent', () => {
  let component: DiagramsComponent;
  let fixture: ComponentFixture<DiagramsComponent>;

  /*
Wraps our test function in an asynchronous test zone. The declaration of the app module
 in app.module.ts file is simulated (declared) here
 */
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(DiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    /*
   Testbed define or configure a testing module before each test
    */
    TestBed.configureTestingModule({
      declarations: [ DiagramsComponent ]
    })

      /*
    The object compileComponents() is called to compile the component’s
    resources like the template, styles etc
    */
      .compileComponents();
  }));

  /*  The function beforeEach is running before each test and and
    it helps for the test setup part of of a test
 */
  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  This function is used to declare a number of tests
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
