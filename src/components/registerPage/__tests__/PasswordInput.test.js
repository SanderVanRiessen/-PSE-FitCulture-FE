import { mount } from "@vue/test-utils";
import PasswordInput from "../PasswordInput.vue";

describe("PasswordInput", () => {
  it("renders a label and input", () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    expect(wrapper.html()).toContain("label");
    expect(wrapper.html()).toContain("input");
  });
  it("onchange event", () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "password";
    input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });
  it("show error if password is less than 8 characters", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "pass";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Password is not valid");
  });
  it("show error if password doesn't have special chracter", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "Password1";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Password is not valid");
  });
  it("show error if password doesn't have numberic chracter", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "Password!";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Password is not valid");
  });
  it("show error if password doesn't have uppercase chracter", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "password1!";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Password is not valid");
  });
  it("show error if password doesn't have uppercase chracter", async () => {
    const wrapper = mount(PasswordInput, {
      props: {
        modelValue: "",
      },
    });
    const input = wrapper.find('[data-testid="password-input"]');
    input.element.value = "PASSWORD1!";
    input.trigger("input");
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain("Password is not valid");
  });
});
