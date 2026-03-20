import { DEPARTMENT_API } from '@/config/apiUrls';
import { getRequest } from '@/services/api';

export default class DepartmentService {
  static getDepartments = async () => {
    return await getRequest(DEPARTMENT_API);
  };
}
