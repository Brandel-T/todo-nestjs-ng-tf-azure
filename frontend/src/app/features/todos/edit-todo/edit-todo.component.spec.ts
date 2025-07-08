import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoComponent } from './edit-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../services/todo.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { MockService } from 'ng-mocks';
import { of } from 'rxjs';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditTodoComponent,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        FormsModule,
      ],
      providers: [
        TodoService,
        provideHttpClientTesting(),
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: ActivatedRoute,
          useValue: {
            ...MockService(ActivatedRoute),
            params: of({ id: '1' }),
          },
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
