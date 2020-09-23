import { ClientId, TodoInstance, TodoStatus, Todo } from './types';

const todoListFixture: Map<ClientId, TodoInstance> = new Map();

todoListFixture.set('3', {
  text: 'qwerty',
  status: 'New',
  pubDate: new Date(2020, 3, 25, 16, 23),
});

todoListFixture.set('4', {
  text: 'asdfg',
  status: 'Completed',
  pubDate: new Date(2020, 3, 25, 16, 23),
});

todoListFixture.set('9', {
  text: 'zxcvb',
  status: 'New',
  pubDate: new Date(2020, 1, 2, 2, 2),
});

todoListFixture.set('2', {
  text: '123456',
  status: 'New',
  pubDate: new Date(2020, 4, 4, 2, 2),
});

const sortedByDateArray: Todo[] = [{
  id: '9',
  text: 'zxcvb',
  status: 'New',
}, {
  id: '3',
  text: 'qwerty',
  status: 'New',
}, {
  id: '4',
  text: 'asdfg',
  status: 'Completed',
}, {
  id: '2',
  text: '123456',
  status: 'New',
}];

export {
  todoListFixture,
  sortedByDateArray,
};
