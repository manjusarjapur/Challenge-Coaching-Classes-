import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterial, FileType } from '../../types';
import {
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  Trash2,
  FileCode,
  Video,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle,
  X,
  Share2,
} from 'lucide-react';
import { AddMaterialModal } from '../modals/ActionModals';

export const StudyMaterialsScreen: React.FC = () => {
  const { materials, deleteMaterial, currentRole, searchQuery, setSearchQuery, showToast } = useApp();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  const fileTypes = ['All', 'pdf', 'video', 'ppt', 'image', 'doc'];
  const classes = ['All', 'Class 12th', 'Class 11th', 'Class 10th'];

  const typeIcons: Record<FileType, React.ReactNode> = {
    pdf: <FileText className="w-5 h-5 text-rose-600" />,
    video: <Video className="w-5 h-5 text-blue-600" />,
    ppt: <FileSpreadsheet className="w-5 h-5 text-amber-600" />,
    image: <ImageIcon className="w-5 h-5 text-purple-600" />,
    doc: <FileCode className="w-5 h-5 text-emerald-600" />,
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || m.fileType === selectedType;
    const matchesClass = selectedClass === 'All' || m.className === selectedClass;
    return matchesSearch && matchesType && matchesClass;
  });

  const handleDownload = (mat: StudyMaterial) => {
    showToast(`Downloading "${mat.title}" (${mat.fileSize})...`);
  };

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" /> Study Notes & Materials
          </h2>
          <p className="text-[11px] text-slate-500">
            {filteredMaterials.length} Documents, Videos & Slides Available
          </p>
        </div>

        {(currentRole === 'super_admin' || currentRole === 'teacher') && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-emerald-500 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Notes</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search notes, subjects, chapters, or teacher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
        />
      </div>

      {/* Format Filter Badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {fileTypes.map((ft) => (
          <button
            key={ft}
            onClick={() => setSelectedType(ft)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition whitespace-nowrap ${
              selectedType === ft
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {ft}
          </button>
        ))}
      </div>

      {/* Class Filter Badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
              selectedClass === cls
                ? 'bg-blue-900 text-amber-300 font-bold'
                : 'bg-slate-200/60 text-slate-700'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Materials Cards List */}
      <div className="space-y-2.5">
        {filteredMaterials.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No study materials match your filter.</p>
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                    {typeIcons[mat.fileType]}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {mat.fileType} • {mat.fileSize}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">
                        {mat.className}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900">
                        {mat.subject}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-xs text-slate-900 mt-1 leading-snug">
                      {mat.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {mat.chapter} • Uploaded by <strong className="text-slate-700">{mat.teacherName}</strong>
                    </p>
                  </div>
                </div>

                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => deleteMaterial(mat.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-medium">
                  {mat.uploadDate} • {mat.downloadCount} Downloads
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewMaterial(mat)}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[11px] flex items-center gap-1 hover:bg-slate-200"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>

                  <button
                    onClick={() => handleDownload(mat)}
                    className="px-3 py-1 bg-emerald-600 text-white font-extrabold rounded-lg text-[11px] flex items-center gap-1 shadow-xs hover:bg-emerald-500"
                  >
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Preview File Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-4 shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                {typeIcons[previewMaterial.fileType]}
                <h3 className="font-extrabold text-sm text-slate-900 truncate max-w-xs">
                  {previewMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Preview Area */}
            <div className="my-4 p-4 bg-slate-100 rounded-2xl border border-slate-200 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-3 text-blue-900 font-extrabold uppercase">
                {previewMaterial.fileType}
              </div>

              <h4 className="font-extrabold text-sm text-slate-900 max-w-sm">
                {previewMaterial.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1">{previewMaterial.description}</p>

              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-left text-[11px] space-y-1 w-full max-w-xs text-slate-600">
                <p><strong>Subject:</strong> {previewMaterial.subject}</p>
                <p><strong>Chapter:</strong> {previewMaterial.chapter}</p>
                <p><strong>Class:</strong> {previewMaterial.className}</p>
                <p><strong>Faculty:</strong> {previewMaterial.teacherName}</p>
                <p><strong>File Size:</strong> {previewMaterial.fileSize}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => showToast('Share link copied to clipboard!')}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>

              <button
                onClick={() => {
                  handleDownload(previewMaterial);
                  setPreviewMaterial(null);
                }}
                className="px-4 py-2 bg-emerald-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" /> Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {isUploadOpen && <AddMaterialModal onClose={() => setIsUploadOpen(false)} />}
    </div>
  );
};
