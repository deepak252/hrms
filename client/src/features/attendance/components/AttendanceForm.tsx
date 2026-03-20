import { useFormik } from 'formik';
import ModalWrapper from '@/components/ModalWrapper';
import TextInput from '@/components/TextInput';
import SelectInput from '@/components/SelectInput';
import type { AttendanceFormValues } from '@/shared.types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  markAttendance,
  openAttendanceForm,
  resetAttendanceForm
} from '../attendanceSlice';
import { validateAttendanceForm } from '../attendanceUtil';

type Props = {
  loading: boolean;
  employeeId?: number;
  onSubmit: (values: AttendanceFormValues) => void;
  onClose: () => void;
};

const AttendanceForm: React.FC<Props> = ({
  loading = false,
  employeeId = 0,
  onClose,
  onSubmit
}) => {
  const formik = useFormik<AttendanceFormValues>({
    initialValues: {
      employeeId: employeeId,
      date: '',
      status: 'Present'
    },

    validate: validateAttendanceForm,

    onSubmit: (values) => {
      onSubmit?.(values);
    }
  });

  const statusOptions = [
    { label: 'Present', value: 'Present' },
    { label: 'Absent', value: 'Absent' }
  ];

  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      closeOnEsc
      closeOnOutsideClick
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-30"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg md:w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextInput
            label="Employee ID"
            name="employeeId"
            type="number"
            value={String(formik.values.employeeId)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.employeeId}
            touched={formik.touched.employeeId}
            readOnly
          />

          <TextInput
            label="Date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.date}
            touched={formik.touched.date}
          />

          <SelectInput
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={statusOptions}
            error={formik.errors.status}
            touched={formik.touched.status}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {loading ? 'Saving...' : 'Mark'}
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

const AttendanceFormWrapper = ({ employeeId }: { employeeId?: number }) => {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();
  const attendanceForm = useAppSelector(
    (state) => state.attendance.attedanceForm
  );

  const handleSubmit = (values: any) => {
    dispatch(markAttendance(values));
  };

  const handleClose = () => {
    dispatch(resetAttendanceForm());
  };

  const handleMarkAttendance = () => {
    dispatch(openAttendanceForm());
  };

  return (
    <>
      <div className="flex items-center gap-6">
        <button
          className="bg-blue-600 text-sm text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={handleMarkAttendance}
        >
          + Mark Attendance
        </button>
      </div>
      {attendanceForm.isOpen && (
        <AttendanceForm
          employeeId={employeeId}
          loading={attendanceForm.isLoading || false}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );

  // return (
  //   attendanceForm.isOpen && (
  //     <MarkAttendanceForm
  //       loading={attendanceForm.isLoading}
  //       onClose={handleClose}
  //       onSubmit={handleSubmit}
  //     />
  //   )
  // );
};

export default AttendanceFormWrapper;
