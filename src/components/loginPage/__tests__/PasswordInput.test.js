import { mount } from '@vue/test-utils';
import PasswordInput from '../PasswordInput.vue';

describe('PasswordInput', () => {
  it('renders a label and input', () => {
    const wrapper = mount(PasswordInput);
    expect(wrapper.html()).toContain('label');
    expect(wrapper.html()).toContain('input');
  });
  it('onchange event', () => {
    const wrapper = mount(PasswordInput);
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = 'password';
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
