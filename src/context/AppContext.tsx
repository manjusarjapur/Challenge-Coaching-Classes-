import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  UserProfile,
  Student,
  Teacher,
  Parent,
  StudyMaterial,
  Assignment,
  Test,
  TestAttempt,
  AttendanceRecord,
  Announcement,
  TimetableSlot,
} from '../types';
import {
  mockUserProfiles,
  initialStudents,
  initialTeachers,
  initialParents,
  initialMaterials,
  initialAssignments,
  initialTests,
  sampleTestHistory,
  initialAttendanceRecords,
  initialAnnouncements,
  initialTimetable,
} from '../data/mockData';

export type ScreenType =
  | 'splash'
  | 'welcome'
  | 'dashboard'
  | 'students'
  | 'teachers'
  | 'parents'
  | 'materials'
  | 'assignments'
  | 'tests'
  | 'results'
  | 'attendance'
  | 'announcements'
  | 'reports'
  | 'timetable'
  | 'profile'
  | 'settings';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Data State
  students: Student[];
  teachers: Teacher[];
  parents: Parent[];
  materials: StudyMaterial[];
  assignments: Assignment[];
  tests: Test[];
  testHistory: TestAttempt[];
  attendanceRecords: AttendanceRecord[];
  announcements: Announcement[];
  timetable: TimetableSlot[];

  // Test Taking State
  activeTest: Test | null;
  startTest: (test: Test) => void;
  submitTest: (testAttempt: TestAttempt) => void;
  activeTestAttempt: TestAttempt | null;
  setActiveTestAttempt: (attempt: TestAttempt | null) => void;

  // Actions
  addStudent: (student: Omit<Student, 'id'>) => void;
  editStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  
  addTeacher: (teacher: Omit<Teacher, 'id' | 'totalNotesUploaded'>) => void;
  deleteTeacher: (id: string) => void;
  
  addParent: (parent: Omit<Parent, 'id'>) => void;
  
  addMaterial: (material: Omit<StudyMaterial, 'id' | 'downloadCount'>) => void;
  deleteMaterial: (id: string) => void;
  
  addAssignment: (asg: Omit<Assignment, 'id' | 'status'>) => void;
  addTest: (test: Omit<Test, 'id' | 'status'>) => void;
  
  addAnnouncement: (anc: Omit<Announcement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;

  markAttendance: (date: string, status: 'Present' | 'Absent' | 'Late', remarks?: string) => void;
  
  // Notification Toast State
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialMaterials);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [tests, setTests] = useState<Test[]>(initialTests);
  const [testHistory, setTestHistory] = useState<TestAttempt[]>(sampleTestHistory);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [timetable] = useState<TimetableSlot[]>(initialTimetable);

  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [activeTestAttempt, setActiveTestAttempt] = useState<TestAttempt | null>(null);

  const currentUser = mockUserProfiles[currentRole];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    showToast(`Switched portal to ${role.replace('_', ' ').toUpperCase()}`);
  };

  const startTest = (test: Test) => {
    setActiveTest(test);
    setCurrentScreen('tests');
  };

  const submitTest = (attempt: TestAttempt) => {
    setTestHistory((prev) => [attempt, ...prev]);
    setActiveTestAttempt(attempt);
    setActiveTest(null);
    setCurrentScreen('results');
    showToast(`Test Submitted! You scored ${attempt.score}/${attempt.totalMarks}`);
  };

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `student_${Date.now()}`,
    };
    setStudents((prev) => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} added successfully!`);
  };

  const editStudent = (updatedStudent: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    showToast(`Student ${updatedStudent.name} details updated.`);
  };

  const deleteStudent = (id: string) => {
    const s = students.find((x) => x.id === id);
    setStudents((prev) => prev.filter((x) => x.id !== id));
    if (s) showToast(`Student ${s.name} removed.`);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'totalNotesUploaded'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `teacher_${Date.now()}`,
      totalNotesUploaded: 0,
    };
    setTeachers((prev) => [newTeacher, ...prev]);
    showToast(`Teacher ${newTeacher.name} registered.`);
  };

  const deleteTeacher = (id: string) => {
    const t = teachers.find((x) => x.id === id);
    setTeachers((prev) => prev.filter((x) => x.id !== id));
    if (t) showToast(`Teacher ${t.name} removed.`);
  };

  const addParent = (parentData: Omit<Parent, 'id'>) => {
    const newParent: Parent = {
      ...parentData,
      id: `parent_${Date.now()}`,
    };
    setParents((prev) => [newParent, ...prev]);
    showToast(`Parent ${newParent.name} added.`);
  };

  const addMaterial = (materialData: Omit<StudyMaterial, 'id' | 'downloadCount'>) => {
    const newMat: StudyMaterial = {
      ...materialData,
      id: `mat_${Date.now()}`,
      downloadCount: 0,
    };
    setMaterials((prev) => [newMat, ...prev]);
    showToast(`Study material "${newMat.title}" uploaded.`);
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    showToast('Study material deleted.');
  };

  const addAssignment = (asgData: Omit<Assignment, 'id' | 'status'>) => {
    const newAsg: Assignment = {
      ...asgData,
      id: `asg_${Date.now()}`,
      status: 'Pending',
    };
    setAssignments((prev) => [newAsg, ...prev]);
    showToast(`Assignment "${newAsg.title}" assigned.`);
  };

  const addTest = (testData: Omit<Test, 'id' | 'status'>) => {
    const newTest: Test = {
      ...testData,
      id: `test_${Date.now()}`,
      status: 'Active',
    };
    setTests((prev) => [newTest, ...prev]);
    showToast(`Test "${newTest.title}" published!`);
  };

  const addAnnouncement = (ancData: Omit<Announcement, 'id' | 'date'>) => {
    const newAnc: Announcement = {
      ...ancData,
      id: `anc_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    showToast('Announcement posted to portal.');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast('Announcement deleted.');
  };

  const markAttendance = (date: string, status: 'Present' | 'Absent' | 'Late', remarks?: string) => {
    setAttendanceRecords((prev) => {
      const existing = prev.find((r) => r.date === date);
      if (existing) {
        return prev.map((r) => (r.date === date ? { ...r, status, remarks } : r));
      }
      return [{ date, status, remarks }, ...prev];
    });
    showToast(`Attendance marked as ${status} for ${date}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        currentUser,
        currentScreen,
        setCurrentScreen,
        isMobileFrame,
        setIsMobileFrame,
        isDrawerOpen,
        setIsDrawerOpen,
        searchQuery,
        setSearchQuery,
        students,
        teachers,
        parents,
        materials,
        assignments,
        tests,
        testHistory,
        attendanceRecords,
        announcements,
        timetable,
        activeTest,
        startTest,
        submitTest,
        activeTestAttempt,
        setActiveTestAttempt,
        addStudent,
        editStudent,
        deleteStudent,
        addTeacher,
        deleteTeacher,
        addParent,
        addMaterial,
        deleteMaterial,
        addAssignment,
        addTest,
        addAnnouncement,
        deleteAnnouncement,
        markAttendance,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
