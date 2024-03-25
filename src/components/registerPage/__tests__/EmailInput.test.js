import { mount } from '@vue/test-utils';
import EmailInput from '../EmailInput.vue';

describe('EmailInput', () => {
  it('renders a label and input', () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: '',
      },
    });
    expect(wrapper.html()).toContain('label');
    expect(wrapper.html()).toContain('input');
  });
  it('onchange event', () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('[data-testid="email-input"]');
    input.element.value = 'email';
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });
  it('show error if email is not valid', async () => {
    const wrapper = mount(EmailInput, {
      props: {
        modelValue: '',
      },
    });
    const input = wrapper.find('[data-testid="email-input"]');
    input.element.value = 'email';
    input.trigger('input');
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('Email is not valid');
  });
});
