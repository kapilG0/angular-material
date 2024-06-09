import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogShareDialogComponent } from './blog-share-dialog.component';

describe('BlogShareDialogComponent', () => {
  let component: BlogShareDialogComponent;
  let fixture: ComponentFixture<BlogShareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogShareDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
