import { mount } from '@vue/test-utils';
import TopicList from '../TopicList.vue'; // Adjust the path if necessary
import { createStore } from 'vuex';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import DataView from 'primevue/dataview';
import axios from 'axios';
import flushPromises from 'flush-promises';

jest.mock('axios');

const mockTopics = [
  { id: 1, name: 'Topic 1', description: 'Description 1', createdAt: '2023-06-15T12:34:56Z', postCount: 5, username: 'user1' },
];

const store = createStore({
  getters: {
    isAdmin: () => true, // Mock as admin user
  },
});

describe('TopicList', () => {
  let wrapper;

  beforeEach(() => {
    axios.delete.mockResolvedValue({}); // Mock axios delete response

    wrapper = mount(TopicList, {
      propsData: {
        topics: mockTopics,
      },
      global: {
        plugins: [store, PrimeVue],
        components: {
          Button,
          Dropdown,
          DataView,
        },
        mocks: {
          $toast: {
            add: jest.fn(),
          },
        },
      },
    });
  });

  it('renders correctly with given props', () => {
    expect(wrapper.findComponent(DataView).exists()).toBe(true);
    expect(wrapper.findComponent(Dropdown).exists()).toBe(true);
  });

  it('emits event when delete button is clicked by an admin', async () => {
    // Locate the delete button for the topic with ID 1
    const deleteButton = wrapper.findAllComponents(Button).filter(button => button.text() === 'Delete Topic').at(0);

    // Ensure the delete button is found
    expect(deleteButton.exists()).toBe(true);

    // Trigger the click event on the delete button
    await deleteButton.trigger('click');

    // Wait for all promises to resolve
    await flushPromises();

    // Check if the event has been emitted with the correct ID
    expect(wrapper.emitted('topic-deleted')).toBeTruthy();
    expect(wrapper.emitted('topic-deleted')[0]).toEqual([1]);
  });
});
