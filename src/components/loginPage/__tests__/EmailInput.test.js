import { mount } from '@vue/test-utils';
import EmailInput from '../EmailInput.vue';

describe('EmailInput', () => {
  it('renders a label and input', () => {
    const wrapper = mount(EmailInput);
    expect(wrapper.html()).toContain('label');
    expect(wrapper.html()).toContain('input');
  });
  it('onchange event', () => {
    const wrapper = mount(EmailInput);
    const input = wrapper.find('[data-testid="email-input"]');
    input.element.value = 'email';
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
