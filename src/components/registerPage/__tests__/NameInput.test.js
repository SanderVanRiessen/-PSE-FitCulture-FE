import { mount } from '@vue/test-utils';
import NameInput from '../NameInput.vue';

describe('NameInput', () => {
  it('renders a label and input', () => {
    const wrapper = mount(NameInput, {
      props: {
        modelValue: '',
      },
    });
    expect(wrapper.html()).toContain('label');
    expect(wrapper.html()).toContain('input');
  });
  it('onchange event', () => {
    const wrapper = mount(NameInput, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('[data-testid="name-input"]');
    input.element.value = 'name';
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
