import { ClientId, TodoInstance, TodoStatus, Todo } from './types';

const todoListFixture: Map<ClientId, TodoInstance> = new Map();

todoListFixture.set('3', {
  text: 'qwerty',
  status: 'New',
  orderId: 100,
});

todoListFixture.set('4', {
  text: 'asdfg',
  status: 'Completed',
  orderId: 100,
});

todoListFixture.set('9', {
  text: 'zxcvb',
  status: 'New',
  orderId: 0,
});

todoListFixture.set('2', {
  text: '123456',
  status: 'New',
  orderId: 200,
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

const sortedByDefaultArray: Todo[] = [{
  id: '2',
  text: '123456',
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
  id: '9',
  text: 'zxcvb',
  status: 'New',
}];

export {
  todoListFixture,
  sortedByDateArray,
  sortedByDefaultArray,
};
