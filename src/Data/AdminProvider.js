import client from "../HHTP/client";

export default class AdminProvider {

    static async getMe() {
        return await client.get(`/api/getMe`);
    }

    // teacher
    static async createTeacher(body) {
        return await client.post("/admin/teacher/add", body);
    }
    static async getAllTeacher(page = 0, size = 10) {
        return await client.get(`/admin/get/all/teacher?pageNum=${page}&pageSize=${size}`);
    }
    static async deleteTeacher(id) {
        return await client.delete(`/admin/delete/user/${id}`);
    }
    static async updateTeacher(id, body) {
        return await client.put(`/admin/update/user/${id}`, body);
    }


    // group
    static async createGroup(body) {
        return await client.post("/admin/create/group", body);
    }
    static async getAllGroup(page = 0, size = 10) {
        return await client.get(`/admin/get/groups?pageNum=${page}&pageSize=${size}`);
    }
    static async deleteGroup(id) {
        return await client.delete(`/admin/delete/group/${id}`);
    }
    static async updateGroup(id) {
        return await client.post(`/admin/update/group/${id}`);
    }


    // student
    static async createStudent(body) {
        return await client.post("/admin/student/add", body);
    }
    static async getAllStudent(page = 0, size = 10) {
        return await client.get(`/admin/get/all/student?pageNum=${page}&pageSize=${size}`);
    }
    static async deleteStudent(id) {
        return await client.delete(`/admin/delete/user/${id}`);
    }
    static async updateStudent(id) {
        return await client.post(`/admin/update/user/${id}`);
    }


    // course
    static async createCourse(body) {
        return await client.post("/admin/create/course", body);
    }
    static async getAllCourse() {
        return await client.get(`/admin/get/courses`);
    }
    static async deleteCourse(id) {
        return await client.delete(`/admin/delete/course/${id}`);
    }
    static async updateCourse(id, body) {
        return await client.put(`/admin/update/course/${id}`, body);
    }


}
