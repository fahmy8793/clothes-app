import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClothesComponent } from './add-clothes.component';

describe('AddClothesComponent', () => {
  let component: AddClothesComponent;
  let fixture: ComponentFixture<AddClothesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClothesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
