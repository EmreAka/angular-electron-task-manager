import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuPerformanceComponent } from './cpu-performance.component';

describe('CpuPerformanceComponent', () => {
  let component: CpuPerformanceComponent;
  let fixture: ComponentFixture<CpuPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
