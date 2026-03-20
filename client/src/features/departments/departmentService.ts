import { EMPLOYEE_API } from '@/config/apiUrls';
import {
  deleteRequest,
  getRequest,
  postRequest
} from '@/services/api';
import type { CreateEmployeePayload } from '@/shared.types';

export default class EmployeeService {
  static getEmployees = async () => {
    return await getRequest(EMPLOYEE_API);
  };

  static createEmployee = async (data: CreateEmployeePayload) => {
    return await postRequest(EMPLOYEE_API, { data });
  };

  static getEmployeeDetails = async (employeeId: string) => {
    return await getRequest(`${EMPLOYEE_API}/${employeeId}`);
  };

  static deleteEmployee = async (employeeId: string) => {
    return await deleteRequest(`${EMPLOYEE_API}/${employeeId}`);
  };
}
