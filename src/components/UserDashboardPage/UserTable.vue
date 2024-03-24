<template>
  <DataTable :value="data" class="w-9" tableStyle="min-width: 50rem">
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
    ></Column>
    <Column header="Role">
      <template #body="slotProps">
        <Dropdown
          v-bind:modelValue="
            roles.find((role) => role.id === slotProps.data.role.id)
          "
          v-model="selectedRole"
          :options="roles"
          optionLabel="name"
          placeholder="select role"
          class="w-full md:w-14rem"
          @change="updateRole(slotProps.data.id)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { useQuery, useMutation } from "@tanstack/vue-query";
import usersFetch from "@/api/users/usersFetch";
import userUpdatePermission from "@/api/users/userUpdatePermission";
export default {
  name: "UserTable",
  setup() {
    const token = localStorage.getItem("token");

    const { data, refetch } = useQuery({
      queryFn: () => usersFetch(token),
    });
    const { mutate } = useMutation({
      mutationFn: (props) =>
        userUpdatePermission({
          token: props.token,
          id: props.id,
          role: props.role,
        }),
      onSuccess: () => {
        refetch();
      },
    });
    const columns = [
      { field: "id", header: "ID" },
      { field: "name", header: "name" },
      { field: "email", header: "Email" },
    ];

    return { data, columns, mutate };
  },
  data() {
    return {
      selectedRole: null,
      roles: [
        { name: "Admin", id: 1 },
        { name: "User", id: 2 },
        { name: "Author", id: 3 },
      ],
    };
  },
  methods: {
    updateRole(id) {
      const token = localStorage.getItem("token");
      this.mutate({ id, token, role: this.selectedRole.id });
    },
  },
};
</script>
