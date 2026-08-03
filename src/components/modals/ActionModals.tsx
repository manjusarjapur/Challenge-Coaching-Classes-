import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileType } from '../../types';
import { X, UserPlus, FilePlus, Award, Bell, Plus, Save } from 'lucide-react';

interface ModalProps {
  onClose: () => void;
}

export const AddStudentModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addStudent } = useApp();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState(`CCC-${Math.floor(1000 + Math.random() * 9000)}`);
  const [className, setClassName] = useState('Class 12th');
  const [batch, setBatch] = useState('Batch A (JEE Target)');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addStudent({
      name,
      rollNo,
      className,
      batch,
      email: email || `${name.toLowerCase().replace(' ', '')}@student.com`,
      phone: phone || '+91 98765 00000',
      parentName: parentName || 'Guardian',
      parentPhone: parentPhone || '+91 98765 11111',
      attendancePct: 95,
      avgScorePct: 85,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      feeStatus: 'Paid',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-600" /> Add New Student
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Student Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Verma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Class</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option>Class 12th</option>
                <option>Class 11th</option>
                <option>Class 10th</option>
                <option>Class 9th</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Roll No</label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Batch Assignment</label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Parent Name</label>
              <input
                type="text"
                placeholder="Parent's Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Parent Phone</label>
              <input
                type="tel"
                placeholder="+91 Phone"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold hover:bg-blue-800"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RegisterTeacherModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addTeacher } = useApp();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Physics');
  const [subject, setSubject] = useState('Physics');
  const [assignedClass, setAssignedClass] = useState('Class 12th (Batch A)');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [qualification, setQualification] = useState('M.Sc / M.Tech');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addTeacher({
      name,
      department,
      subject,
      assignedClasses: [assignedClass],
      phone: phone || '+91 98765 43210',
      email: email || `${name.toLowerCase().replace(' ', '.')}@challengecoaching.com`,
      qualification,
      experience: '5+ Years',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-amber-500" /> Register Faculty Teacher
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Teacher Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Prof. Sameer Roy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setSubject(e.target.value);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option>Physics</option>
                <option>Mathematics</option>
                <option>Chemistry</option>
                <option>Biology</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assigned Class</label>
              <input
                type="text"
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Qualifications</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 text-blue-950 font-extrabold hover:bg-amber-400"
            >
              Register Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddMaterialModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addMaterial, currentUser } = useApp();
  const [title, setTitle] = useState('');
  const [className, setClassName] = useState('Class 12th');
  const [subject, setSubject] = useState('Physics');
  const [chapter, setChapter] = useState('Chapter 1');
  const [fileType, setFileType] = useState<FileType>('pdf');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addMaterial({
      title,
      className,
      subject,
      chapter,
      teacherName: currentUser.name || 'Faculty Lead',
      uploadDate: new Date().toISOString().split('T')[0],
      fileType,
      fileSize: `${(Math.random() * 10 + 1).toFixed(1)} MB`,
      description: description || 'Complete chapter study notes and formula breakdown.',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <FilePlus className="w-4 h-4 text-emerald-600" /> Upload Study Material
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Title / Document Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Electromagnetic Induction Summary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Class</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
              >
                <option>Class 12th</option>
                <option>Class 11th</option>
                <option>Class 10th</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Format</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as FileType)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white uppercase font-bold"
              >
                <option value="pdf">PDF Document</option>
                <option value="video">Video Lecture</option>
                <option value="ppt">PPT Slide Deck</option>
                <option value="image">Image Diagram</option>
                <option value="doc">DOCX File</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Chapter Name</label>
              <input
                type="text"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief summary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
            >
              Publish Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CreateTestModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addTest } = useApp();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [totalMarks, setTotalMarks] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTest({
      title,
      subject,
      className: 'Class 12th',
      durationMinutes,
      totalMarks,
      totalQuestions: 5,
      passingMarks: Math.floor(totalMarks * 0.4),
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      questions: [
        {
          id: `q_${Date.now()}_1`,
          question: 'What is the unit of Electric Flux?',
          options: ['N m² C⁻¹', 'N C⁻¹', 'Volt / meter', 'Tesla'],
          correctAnswer: 0,
          explanation: 'Electric flux Φ = E·A, unit is (N/C)·m² = N m² C⁻¹.',
        },
        {
          id: `q_${Date.now()}_2`,
          question: 'In a series LCR circuit at resonance, the impedance is equal to:',
          options: ['Resistance R', 'Inductive Reactance X_L', 'Capacitive Reactance X_C', 'Zero'],
          correctAnswer: 0,
          explanation: 'At resonance, X_L = X_C, so Z = sqrt(R² + (X_L - X_C)²) = R.',
        },
      ],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-rose-600" /> Create Online MCQ Test
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Test Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Weekly Physics Mock Test #04"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Total Marks</label>
            <input
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500"
            >
              Publish MCQ Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AddAnnouncementModal: React.FC<ModalProps> = ({ onClose }) => {
  const { addAnnouncement, currentUser } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Urgent' | 'Exam' | 'General' | 'Event'>('General');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addAnnouncement({
      title,
      category,
      description,
      author: currentUser.name || 'Administration',
      targetAudience: 'All Batches & Parents',
      isImportant: category === 'Urgent' || category === 'Exam',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-600" /> Post New Notice
          </h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Notice Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Class Schedule Change for Holiday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold"
            >
              <option value="Urgent">🚨 Urgent Notice</option>
              <option value="Exam">📝 Exam Schedule</option>
              <option value="General">📢 General Announcement</option>
              <option value="Event">🎉 Event / Holiday</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Details & Message</label>
            <textarea
              rows={3}
              required
              placeholder="Write notice body..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500"
            >
              Post Notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
