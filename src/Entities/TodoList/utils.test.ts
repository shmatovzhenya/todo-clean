import {
  Options, Todo,
} from './types';

import {
  defaultIdCreator,
  cloneOptions,
  convertTodoMapToSortedArray,
} from './utils';

import { todoListFixture } from './fixtures';

describe('Testing utils methods for TodoList', () => {
  test('Id not be equals', () => {
    const id1 = defaultIdCreator();
    const id2 = defaultIdCreator();

    expect(id1).not.toBe(id2);
  });

  test('Cloned options not equal by link but equal by value', () => {
    const options: Options = {
      mask: new Set(['1', '2', '4']),
      sortType: 'ByAddition',
    };

    const clonedOptions: Options = cloneOptions(options);

    expect(options).not.toBe(clonedOptions);
    expect(options).toStrictEqual(clonedOptions);
  });

  test('Converting Map of Todos to sorted by date array', () => {
    const todoList: Todo[] = convertTodoMapToSortedArray(todoListFixture, {
      mask: new Set(['3', '4', '9', '2']),
      sortType: 'ByAddition',
    });


    expect(todoList.length).toBe(4);
    expect(todoList[0].text).toBe('zxcvb');
    expect(todoList[1].text).toBe('qwerty');
    expect(todoList[2].text).toBe('asdfg');
    expect(todoList[3].text).toBe('123456');
  });

  test('Converting Map of Todos to default random sorted array', () => {
    const todoList: Todo[] = convertTodoMapToSortedArray(todoListFixture, {
      mask: new Set(['5', '4', '3', '9']),
      sortType: 'Default',
    });


    expect(todoList.length).toBe(3);
    expect(todoList[0].text).toBe('qwerty');
    expect(todoList[1].text).toBe('asdfg');
    expect(todoList[2].text).toBe('zxcvb');
  });
});
