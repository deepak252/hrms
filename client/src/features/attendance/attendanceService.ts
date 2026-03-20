import { ATTENDANCE_API } from '@/config/apiUrls';
import { getRequest, postRequest } from '@/services/api';
import type { MarkAttendancePayload } from '@/shared.types';

export default class AttendanceService {
  static getEmployeeAttendanceHistory = async (employeeId: number) => {
    return await getRequest(`${ATTENDANCE_API}/employee/${employeeId}`);
  };

  static markAttendance = async (data: MarkAttendancePayload) => {
    return await postRequest(ATTENDANCE_API, { data });
  };
}
