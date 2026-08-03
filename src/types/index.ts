export type UserRole = 'super_admin' | 'teacher' | 'student' | 'parent';

export type FileType = 'pdf' | 'image' | 'video' | 'ppt' | 'doc';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  className?: string;
  batchName?: string;
  rollNo?: string;
  childName?: string;
  childClass?: string;
  department?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  batch: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  attendancePct: number;
  avgScorePct: number;
  avatar: string;
  feeStatus: 'Paid' | 'Pending' | 'Partial';
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  assignedClasses: string[];
  phone: string;
  email: string;
  qualification: string;
  experience: string;
  totalNotesUploaded: number;
  avatar: string;
}

export interface Parent {
  id: string;
  name: string;
  phone: string;
  email: string;
  occupation: string;
  childId: string;
  childName: string;
  childClass: string;
  avatar: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  className: string;
  subject: string;
  chapter: string;
  teacherName: string;
  uploadDate: string;
  fileType: FileType;
  fileSize: string;
  downloadCount: number;
  description: string;
  fileUrl?: string;
}

export interface Assignment {
  id: string;
  title: string;
  className: string;
  subject: string;
  teacherName: string;
  dueDate: string;
  totalMarks: number;
  description: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  score?: number;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
  hint?: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  className: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  passingMarks: number;
  dueDate: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  questions: MCQQuestion[];
}

export interface TestAttempt {
  testId: string;
  testTitle: string;
  score: number;
  totalMarks: number;
  percentage: number;
  rank: number;
  totalParticipants: number;
  timeSpentSeconds: number;
  completedAt: string;
  userAnswers: { [questionId: string]: number };
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Late' | 'Holiday';
  remarks?: string;
}

export interface StudentAttendanceMap {
  studentId: string;
  studentName: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Urgent' | 'Exam' | 'General' | 'Event';
  description: string;
  date: string;
  author: string;
  targetAudience: string;
  isImportant?: boolean;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  className: string;
  batch: string;
  teacherName: string;
  room: string;
}
