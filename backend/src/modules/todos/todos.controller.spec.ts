import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { NotFoundException } from '@nestjs/common';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodo: Todo = {
    id: 'a1b2c3d4',
    name: 'Test Todo',
    description: 'Test Description',
    done: false,
    subTasks: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn().mockImplementation((dto: CreateTodoDto) =>
              Promise.resolve({
                id: 'a1b2c3d4',
                ...dto,
                done: false,
                subTasks: [],
              } as Todo),
            ),
            findAll: jest.fn().mockResolvedValue([mockTodo]),
            findById: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve(id === 'a1b2c3d4' ? mockTodo : null),
              ),
            deleteById: jest.fn().mockResolvedValue({ affected: 1 }),
            updateTodo: jest
              .fn()
              .mockImplementation((id: string, dto: UpdateTodoDto) => {
                if (id !== 'a1b2c3d4') {
                  throw new NotFoundException();
                }
                return Promise.resolve({ ...mockTodo, ...dto });
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new todo', async () => {
      const createDto: CreateTodoDto = {
        name: 'New Todo',
        description: 'New Description',
        done: false,
      };

      const result = await controller.create(createDto);

      expect(result).toEqual({
        id: 'a1b2c3d4',
        ...createDto,
        subTasks: [],
      });
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of todos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockTodo]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getTodobyId()', () => {
    it('should return a single todo', async () => {
      const result = await controller.getTodobyId('a1b2c3d4');
      expect(result).toEqual(mockTodo);
      expect(service.findById).toHaveBeenCalledWith('a1b2c3d4');
    });

    it('should return null if todo not found', async () => {
      const result = await controller.getTodobyId('invalid-id');
      expect(result).toBeNull();
      expect(service.findById).toHaveBeenCalledWith('invalid-id');
    });
  });

  describe('deleteTodoById()', () => {
    it('should delete a todo', async () => {
      const result = await controller.deleteTodoById('a1b2c3d4');
      expect(result).toEqual({ affected: 1 });
      expect(service.deleteById).toHaveBeenCalledWith('a1b2c3d4');
    });
  });

  describe('updateTodoById()', () => {
    it('should update a todo', async () => {
      const updateDto: UpdateTodoDto = {
        id: 'a1b2c3d4',
        name: 'Updated Name',
        done: true,
      };

      const result = await controller.updateTodoById('a1b2c3d4', updateDto);
      expect(result).toEqual({
        ...mockTodo,
        ...updateDto,
      });
      expect(service.updateTodo).toHaveBeenCalledWith('a1b2c3d4', updateDto);
    });
  });
});
