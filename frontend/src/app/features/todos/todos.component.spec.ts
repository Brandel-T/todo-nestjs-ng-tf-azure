import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomComponentComponent } from './todo-item/todo-item.component';
import { TodoService } from './services/todo.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MockService } from 'ng-mocks';


describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodosComponent,
        MatTabsModule,
        CustomComponentComponent,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        RouterModule,
      ],
      providers: [
        TodoService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: ActivatedRoute, useValue: MockService(ActivatedRoute) }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
