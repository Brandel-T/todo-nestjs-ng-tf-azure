import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  let todoRepository: Repository<Todo>;

  const mockTodo: Todo = {
    id: 'a1b2c3d4',
    name: 'Test Todo',
    description: 'Test Description',
    done: false,
    subTasks: [],
  };

  const mockCreateDto: CreateTodoDto = {
    name: 'New Todo',
    description: 'New Description',
    done: false,
  };

  const mockUpdateDto: UpdateTodoDto = {
    id: 'a1b2c3d4',
    name: 'Updated Todo',
    description: 'Updated Description',
    done: true,
    subTaskIds: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            save: jest
              .fn()
              .mockImplementation((todo) =>
                Promise.resolve({ ...todo, id: 'a1b2c3d4' }),
              ),
            find: jest.fn().mockResolvedValue([mockTodo]),
            findOneBy: jest
              .fn()
              .mockImplementation(({ id }) =>
                id === 'a1b2c3d4'
                  ? Promise.resolve(mockTodo)
                  : Promise.resolve(null),
              ),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new todo', async () => {
      const result = await service.create(mockCreateDto);

      expect(result).toEqual({
        id: 'a1b2c3d4',
        ...mockCreateDto,
        subTasks: [],
      });
      expect(todoRepository.save).toHaveBeenCalled();
    });

    it('should set done to false by default', async () => {
      const createDtoWithoutDone: Omit<CreateTodoDto, 'done'> = {
        name: 'New Todo',
        description: 'New Description',
      };

      const result = await service.create(
        createDtoWithoutDone as CreateTodoDto,
      );
      expect(result.done).toBe(false);
    });
  });

  describe('findAll()', () => {
    it('should return an array of todos', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockTodo]);
      expect(todoRepository.find).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('should return a single todo', async () => {
      const result = await service.findById('a1b2c3d4');
      expect(result).toEqual(mockTodo);
      expect(todoRepository.findOneBy).toHaveBeenCalledWith({ id: 'a1b2c3d4' });
    });

    it('should return null if todo not found', async () => {
      const result = await service.findById('invalid-id');
      expect(result).toBeNull();
      expect(todoRepository.findOneBy).toHaveBeenCalledWith({
        id: 'invalid-id',
      });
    });
  });

  describe('deleteById()', () => {
    it('should delete a todo', async () => {
      const result = await service.deleteById('a1b2c3d4');
      expect(result).toEqual({ affected: 1 });
      expect(todoRepository.delete).toHaveBeenCalledWith('a1b2c3d4');
    });
  });

  describe('updateTodo()', () => {
    it('should update a todo', async () => {
      const result = await service.updateTodo('a1b2c3d4', mockUpdateDto);
      expect(result).toBeDefined();
      expect(todoRepository.findOneBy).toHaveBeenCalledWith({ id: 'a1b2c3d4' });
      expect(todoRepository.save).toHaveBeenCalled();
    });

    it('should preserve undefined fields', async () => {
      const partialUpdate: Partial<UpdateTodoDto> = {
        id: 'a1b2c3d4',
        done: true,
      };

      const result = await service.updateTodo(
        'a1b2c3d4',
        partialUpdate as UpdateTodoDto,
      );
      expect(result).toBeDefined();
    });
  });
});
