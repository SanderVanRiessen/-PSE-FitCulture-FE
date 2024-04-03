<template>
  <DataTable
    v-if="userData"
    :value="userData"
    class="w-9"
    table-style="min-width: 50rem">
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="email" header="Email"></Column>
    <Column header="Role">
      <template #body="slotProps">
        <Dropdown
          v-model="selectedRole"
          :model-value="
            roles.find((role) => role.id === slotProps.data.role.id)
          "
          :options="roles"
          option-label="name"
          placeholder="select role"
          class="w-full md:w-14rem"
          @change="updateRole(slotProps.data.id)" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { useQuery, useMutation } from '@tanstack/vue-query';
import usersFetch from '@/api/users/usersFetch';
import userUpdatePermission from '@/api/users/userUpdatePermission';
export default {
  name: 'UserTable',
  setup() {
    const token = localStorage.getItem('token');

    const {
      data: userData,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['users'],
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
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'name' },
      { field: 'email', header: 'Email' },
    ];

    return { userData, isLoading, columns, mutate };
  },
  data() {
    return {
      selectedRole: null,
      roles: [
        { name: 'Admin', id: 1 },
        { name: 'User', id: 2 },
        { name: 'Author', id: 3 },
      ],
    };
  },
  methods: {
    updateRole(id) {
      const token = localStorage.getItem('token');
      this.mutate({ id, token, role: this.selectedRole.id });
    },
  },
};
</script>
