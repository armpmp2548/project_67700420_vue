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
          <th>รหัสผ่าน</th>
          <th>แก้ไข/ลบ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.employee_id">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.username }}</td>
          <td>{{ employee.password }}</td>
          <td>{{ employee.profile_picture }}</td>
          <td>
            <!-- เพิ่มปุ่มแก้ไข -->
            <button class="btn btn-warning btn-sm" @click="openEditModal(employee)"><i class="fa-solid fa-pen-to-square"></i>แก้ไข</button> |      
            <!-- ปุ่มลบ -->
            <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee.employee_id)"><i class="fa-solid fa-trash"></i>ลบ</button>
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

    <!-- Modal แก้ไขข้อมูลพนักงาน -->
    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">แก้ไขข้อมูลพนักงาน</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateEmployee">
              <div class="mb-3">
                <label class="form-label">ชื่อ</label>
                <input v-model="editEmployee.firstName" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">นามสกุล</label>
                <input v-model="editEmployee.lastName" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">เบอร์โทร</label>
                <input v-model="editEmployee.phone" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">ชื่อผู้ใช้</label>
                <input v-model="editEmployee.username" type="text" class="form-control" required>
              </div>
              <div class="mb-3">
                <label class="form-label">รหัสผ่าน (เว้นว่างหากไม่เปลี่ยน)</label>
                <input v-model="editEmployee.password" type="password" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">บันทึก</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";   // เพิ่ม ✅ import Modal class

export default {
  name: "EmployeeList", // เปลี่ยนชื่อคอมโพเนนต์เป็น EmployeeList
  setup() {
    const employees = ref([]);  // เปลี่ยนจาก customers เป็น employees
    const loading = ref(true);
    const error = ref(null);
    const editEmployee = ref({});   // เพิ่ม ref สำหรับแก้ไขพนักงาน
    let editModal;                  // เพิ่ม

    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8081/project_67700420_vue/api_php/show_employee.php", {  // เปลี่ยน API ให้เหมาะสม
          method: "GET",
          headers: { "Content-Type": "application/json" }
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

    onMounted(() => {
      fetchEmployees();
      const modalEl = document.getElementById("editModal");     // เพิ่ม
      editModal = new Modal(modalEl);   // ใช้ Modal ที่ import มา
    });

    // เปิด Popup Modal แก้ไข
    const openEditModal = (employee) => {
      editEmployee.value = { ...employee };
      editModal.show();
    };

    // ฟังก์ชั่นการแก้ไขข้อมูลพนักงาน
    const updateEmployee = async () => {
      try {
        const response = await fetch("http://localhost:8081/project_67700420_vue/api_php/api_employee.php", {  // เปลี่ยน API ให้เหมาะสม
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editEmployee.value)
        });

        const result = await response.json();

        if (result.success) {
          const index = employees.value.findIndex(e => e.employee_id === editEmployee.value.employee_id);
          if (index !== -1) employees.value[index] = { ...editEmployee.value };

          alert("แก้ไขข้อมูลสำเร็จ");
          editModal.hide();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + err.message);
      }
    };

    // ฟังก์ชั่นการลบข้อมูลพนักงาน
    const deleteEmployee = async (id) => {
      if (!confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?")) return;

      try {
        const response = await fetch("http://localhost:8081/project_67700420_vue/api_php/api_employee.php", {  // เปลี่ยน API ให้เหมาะสม
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employee_id: id })
        });

        const result = await response.json();

        if (result.success) {
          employees.value = employees.value.filter(e => e.employee_id !== id);
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
      deleteEmployee,
      editEmployee,  // เพิ่ม
      openEditModal,  // เพิ่ม
      updateEmployee  // เพิ่ม
    };
  }
};
</script>
