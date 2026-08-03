import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Test, MCQQuestion } from '../../types';
import {
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Sparkles,
  Trophy,
  BarChart2,
  FileQuestion,
  Plus,
} from 'lucide-react';
import { CreateTestModal } from '../modals/ActionModals';

export const OnlineTestsScreen: React.FC = () => {
  const { tests, activeTest, startTest, submitTest, currentRole, testHistory, setCurrentScreen, setActiveTestAttempt } =
    useApp();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Live Test State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  useEffect(() => {
    if (activeTest) {
      setTimeLeft(activeTest.durationMinutes * 60);
      setSelectedAnswers({});
      setMarkedForReview({});
      setCurrentQIndex(0);
    }
  }, [activeTest]);

  // Timer countdown
  useEffect(() => {
    if (!activeTest || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTest, timeLeft]);

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleMarkReview = (qId: string) => {
    setMarkedForReview((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleFinalSubmit = () => {
    if (!activeTest) return;

    // Calculate score
    let score = 0;
    activeTest.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score += activeTest.totalMarks / activeTest.totalQuestions;
      }
    });

    const percentage = Math.round((score / activeTest.totalMarks) * 100);
    const timeSpent = activeTest.durationMinutes * 60 - timeLeft;

    submitTest({
      testId: activeTest.id,
      testTitle: activeTest.title,
      score: Math.round(score),
      totalMarks: activeTest.totalMarks,
      percentage,
      rank: percentage > 80 ? 1 : percentage > 60 ? 3 : 8,
      totalParticipants: 185,
      timeSpentSeconds: Math.max(timeSpent, 30),
      completedAt: new Date().toISOString().split('T')[0],
      userAnswers: selectedAnswers,
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // IF CURRENTLY TAKING A TEST -> SHOW MCQ PLAYER
  if (activeTest) {
    const q: MCQQuestion = activeTest.questions[currentQIndex];
    const isAnswered = selectedAnswers[q.id] !== undefined;

    return (
      <div className="flex-1 bg-slate-900 text-white flex flex-col justify-between p-3.5 select-none overflow-y-auto">
        {/* Top Timer Bar */}
        <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-xs text-amber-400 truncate max-w-[200px]">
              {activeTest.title}
            </h3>
            <p className="text-[10px] text-slate-400">
              Question {currentQIndex + 1} of {activeTest.questions.length}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/40">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-black text-xs text-amber-300 tracking-wider">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Question Palette Drawer */}
        <div className="my-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {activeTest.questions.map((qItem, idx) => {
            const ans = selectedAnswers[qItem.id] !== undefined;
            const rev = markedForReview[qItem.id];
            const isCurr = idx === currentQIndex;

            let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
            if (isCurr) badgeColor = 'bg-amber-400 text-blue-950 font-black border-amber-300 scale-105';
            else if (rev) badgeColor = 'bg-purple-600 text-white border-purple-400';
            else if (ans) badgeColor = 'bg-emerald-600 text-white border-emerald-400';

            return (
              <button
                key={qItem.id}
                onClick={() => setCurrentQIndex(idx)}
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center border transition shrink-0 ${badgeColor}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Question Box */}
        <div className="bg-slate-800/80 p-4 rounded-3xl border border-slate-700/80 space-y-4 my-auto">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] font-extrabold bg-blue-900 text-blue-200 px-2.5 py-1 rounded-full border border-blue-700">
              MCQ Single Choice (+{activeTest.totalMarks / activeTest.totalQuestions} Marks)
            </span>

            <button
              onClick={() => toggleMarkReview(q.id)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition ${
                markedForReview[q.id]
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
              }`}
            >
              {markedForReview[q.id] ? '★ Marked Review' : '☆ Mark Review'}
            </button>
          </div>

          <h3 className="text-sm font-extrabold text-slate-100 leading-relaxed">
            {currentQIndex + 1}. {q.question}
          </h3>

          {/* MCQ Options */}
          <div className="space-y-2">
            {q.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[q.id] === optIdx;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectOption(q.id, optIdx)}
                  className={`p-3 rounded-2xl border text-xs font-semibold cursor-pointer transition flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-400 text-blue-950 font-black border-amber-300 shadow-lg scale-[1.01]'
                      : 'bg-slate-900/80 text-slate-200 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      isSelected ? 'bg-blue-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                </div>
              );
            })}
          </div>

          {q.hint && (
            <p className="text-[10px] text-amber-400/80 bg-amber-950/40 p-2 rounded-xl border border-amber-900/50">
              💡 Hint: {q.hint}
            </p>
          )}
        </div>

        {/* Question Controls Bottom Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            disabled={currentQIndex === 0}
            onClick={() => setCurrentQIndex((prev) => prev - 1)}
            className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 disabled:opacity-40 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>

          {currentQIndex < activeTest.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1 hover:bg-blue-500"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-blue-950 text-xs font-black rounded-xl shadow-lg flex items-center gap-1 hover:from-amber-300 hover:to-yellow-300"
            >
              Submit Test <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Submit Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-xs w-full p-4 border border-slate-700 text-center space-y-3">
              <Award className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="font-black text-sm text-white">Confirm Test Submission?</h3>
              <p className="text-xs text-slate-400">
                You answered {Object.keys(selectedAnswers).length} out of{' '}
                {activeTest.questions.length} questions.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs"
                >
                  Resume
                </button>
                <button
                  onClick={() => {
                    setShowConfirmSubmit(false);
                    handleFinalSubmit();
                  }}
                  className="flex-1 py-2 bg-amber-400 text-blue-950 font-black rounded-xl text-xs"
                >
                  Final Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DEFAULT VIEW: LIST OF TESTS & PAST HISTORY
  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-rose-600" /> Online Test Portal
          </h2>
          <p className="text-[11px] text-slate-500">
            MCQ Mock Tests, Live Timer & Rank Analysis
          </p>
        </div>

        {(currentRole === 'super_admin' || currentRole === 'teacher') && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-rose-500 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create Test</span>
          </button>
        )}
      </div>

      {/* Active & Upcoming Tests List */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Available MCQ Tests ({tests.length})
        </h3>

        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {test.subject}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {test.className}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{test.title}</h4>
              </div>

              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  test.status === 'Active'
                    ? 'bg-emerald-500 text-white shadow-xs animate-pulse'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {test.status}
              </span>
            </div>

            {/* Test details */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block font-medium">Duration</span>
                <span className="font-bold text-slate-800">{test.durationMinutes} Mins</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Questions</span>
                <span className="font-bold text-slate-800">{test.totalQuestions} MCQs</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Total Marks</span>
                <span className="font-bold text-slate-800">{test.totalMarks} Marks</span>
              </div>
            </div>

            {/* Start Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Due: {test.dueDate}</span>

              <button
                onClick={() => startTest(test)}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-blue-950 font-black rounded-xl text-xs shadow-md hover:from-amber-300 hover:to-yellow-300 flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" /> Start MCQ Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Test Attempts History */}
      <div className="pt-2 space-y-2">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4 text-blue-600" /> Past Test Results History
        </h3>

        {testHistory.map((hist, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveTestAttempt(hist);
              setCurrentScreen('results');
            }}
            className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-blue-300 transition cursor-pointer"
          >
            <div>
              <h4 className="font-extrabold text-xs text-slate-900">{hist.testTitle}</h4>
              <p className="text-[10px] text-slate-400">
                Completed on {hist.completedAt} • Time: {Math.round(hist.timeSpentSeconds / 60)} Mins
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-blue-900 block">
                {hist.score} / {hist.totalMarks} ({hist.percentage}%)
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Rank #{hist.rank}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isCreateOpen && <CreateTestModal onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
};
