const ADMIN = 0;
const STUDENT = 1;
const SUBJECT_TEACHER = 2;
const HOMEROOM_TEACHER = 3;

export const Role = {
  ADMIN, STUDENT, SUBJECT_TEACHER, HOMEROOM_TEACHER
}

const ADMIN_DASHBOARD = '/admin-dashboard';
const STUDENT_DASHBOARD = '/personal-transcript';
const HOMEROOM_TEACHER_DASHBOARD = '/academic-transcript';
const SUBJECT_TEACHER_DASHBOARD = '/subject-transcript';

export const DASHBOARD = {
  ADMIN_DASHBOARD,
  STUDENT_DASHBOARD,
  HOMEROOM_TEACHER_DASHBOARD,
  SUBJECT_TEACHER_DASHBOARD
}
