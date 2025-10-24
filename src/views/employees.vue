<template>
  <div class="container mt-4">
    <h2 class="mb-3">รายชื่อพนักงาน</h2>
    
    <div class="mb-3">
      <a class="btn btn-primary" href="/add_employee" role="button">Add+</a>
    </div>

    <!-- ตารางแสดงข้อมูลพนักงาน -->
    <table class="table table-bordered table-striped">
      <thead class="table-primary">
        <tr>
          <th>ID</th>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>ชื่อผู้ใช้</th>
          <th>รูปภาพ</th>
          <th>ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.first_name }}</td>
          <td>{{ employee.last_name }}</td>
          <td>{{ employee.username }}</td>
          <td>
            <img 
              v-if="employee.profile_picture" 
              :src="'http://localhost:8081/project_67700420_vue/api_php/uploads/' + employee.profile_picture" 
              width="100"
            />
          </td>
          <td>  
            <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee.id)">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <p>กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "EmployeeList",
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const error = ref(null);

    // ฟังก์ชันดึงข้อมูลจาก API ด้วย GET
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8081/project_67700420_vue/api_php/show_employee.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลได้");

        const result = await response.json();
        if (result.success) {
          employees.value = result.data;
        } else {
          error.value = result.message;
        }

      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchEmployees);

    // ฟังก์ชั่นลบพนักงาน
    const deleteEmployee = async (id) => {
      if (!confirm("คุณต้องการลบพนักงานนี้ใช่หรือไม่?")) return;

      try {
        const response = await fetch("http://localhost:8081/project_67700420_vue/api_php/api_employee.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id })
        });

        const result = await response.json();

        if (result.success) {
          employees.value = employees.value.filter(e => e.id !== id);
          alert(result.message);
        } else {
          alert(result.message);
        }

      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + err.message);
      }
    };

    return {
      employees,
      loading,
      error,
      deleteEmployee
    };
  }
};
</script>
