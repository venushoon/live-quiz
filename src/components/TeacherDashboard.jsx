import React, { useState } from 'react';

export default function TeacherDashboard() {
  // 세션 및 옵션 상태 관리
  const [sessionCode] = useState('840219');
  const [isSurvivalMode, setIsSurvivalMode] = useState(false);
  const [showDeviceQuestion, setShowDeviceQuestion] = useState(false);
  const [pacingMode, setPacingMode] = useState('step'); // 'step' (골든벨) or 'all' (자율)

  // 실시간 진행 상태 (가상의 데이터)
  const [participants] = useState(24);
  const [survivors] = useState(24);
  const [submitted] = useState(18);
  const [currentQ, setCurrentQ] = useState(1);

  // 문제 목록 (가상의 데이터)
  const questions = [
    { id: 1, type: '객관식', text: '다음 중 독도의 옛 이름이 아닌 것은?', status: 'playing' },
    { id: 2, type: 'O/X', text: '독도에는 우리 주민이 살고 있다.', status: 'waiting' },
    { id: 3, type: '주관식', text: '신라 지증왕 때 우산국을 정벌한 장군의 이름은?', status: 'waiting' },
  ];

  const openPresentation = () => {
    window.open('/host/present/session123', '_blank', 'width=1280,height=720');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* 상단 헤더 영역 */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-black text-indigo-900 tracking-tight">실시간 퀴즈 대시보드</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">송남초 6학년 독도의 날 골든벨</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-100 flex items-center gap-3">
            <span className="text-sm text-indigo-600 font-bold">입장 코드</span>
            <span className="text-2xl font-black text-indigo-900 tracking-widest">{sessionCode}</span>
          </div>
          <button
            onClick={openPresentation}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-3 px-5 rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            새 창으로 프로젝터 띄우기
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-screen-2xl mx-auto w-full">
        
        {/* 좌측 패널: 설정 및 실시간 현황 (3/12 비율) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* 게임 설정 카드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold border-b border-slate-100 pb-3 mb-4 text-slate-800">진행 옵션</h2>
            
            <div className="space-y-5">
              {/* 진행 모드 선택 */}
              <div>
                <label className="text-sm font-semibold text-slate-600 block mb-2">진행 방식</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setPacingMode('step')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${pacingMode === 'step' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    교사 주도 (골든벨)
                  </button>
                  <button 
                    onClick={() => setPacingMode('all')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${pacingMode === 'all' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    학생 자율 (개별)
                  </button>
                </div>
              </div>

              {/* 스위치 토글 옵션들 */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-700 block">서바이벌 모드</span>
                  <span className="text-xs text-slate-400">오답 시 즉시 관전 전환</span>
                </div>
                <button 
                  onClick={() => setIsSurvivalMode(!isSurvivalMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${isSurvivalMode ? 'bg-red-500' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isSurvivalMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-slate-700 block">학생 기기에 문제 표시</span>
                  <span className="text-xs text-slate-400">OFF 시 보기 버튼만 표시</span>
                </div>
                <button 
                  onClick={() => setShowDeviceQuestion(!showDeviceQuestion)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${showDeviceQuestion ? 'bg-indigo-500' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${showDeviceQuestion ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* 실시간 현황 카드 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
            <h2 className="text-lg font-bold border-b border-slate-100 pb-3 mb-4 text-slate-800">실시간 현황</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-end p-4 bg-slate-50 rounded-xl">
                <span className="text-sm font-bold text-slate-500">접속자 수</span>
                <span className="text-3xl font-black text-slate-800">{participants}<span className="text-base font-medium text-slate-500 ml-1">명</span></span>
              </div>
              {isSurvivalMode && (
                <div className="flex justify-between items-end p-4 bg-red-50 rounded-xl">
                  <span className="text-sm font-bold text-red-400">생존자 수</span>
                  <span className="text-3xl font-black text-red-600">{survivors}<span className="text-base font-medium text-red-400 ml-1">명</span></span>
                </div>
              )}
              <div className="flex justify-between items-end p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="text-sm font-bold text-green-600">현재 문항 제출</span>
                <span className="text-3xl font-black text-green-700">{submitted}<span className="text-base font-medium text-green-600 mx-1">/</span>{isSurvivalMode ? survivors : participants}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 중앙 패널: 문항 목록 (5/12 비율) */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-lg font-bold text-slate-800">출제된 문항 (총 {questions.length}제)</h2>
            <button className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors">
              + 새 문항 추가
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {questions.map((q, idx) => (
              <div 
                key={q.id} 
                className={`p-4 border rounded-xl flex items-start gap-4 transition-all ${q.status === 'playing' ? 'bg-indigo-50 border-indigo-300 ring-1 ring-indigo-300' : 'bg-white border-slate-200 hover:border-slate-300'}`}
              >
                <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${q.status === 'playing' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${q.type === '객관식' ? 'bg-blue-100 text-blue-700' : q.type === 'O/X' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {q.type}
                    </span>
                    {q.status === 'playing' && <span className="text-xs font-bold text-indigo-600 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span> 진행 중</span>}
                  </div>
                  <p className={`font-bold leading-snug ${q.status === 'playing' ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {q.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측 패널: 진행 컨트롤러 (4/12 비율) */}
        <div className="lg:col-span-4 bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 flex flex-col text-white">
          <h2 className="text-lg font-bold border-b border-slate-600 pb-3 mb-6 text-slate-100">방송 컨트롤러</h2>
          
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="text-center mb-4">
              <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">Now Playing</span>
              <div className="text-5xl font-black text-white mt-2">Q{currentQ}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-5 rounded-xl text-lg transition-colors shadow-inner">
                ◀ 이전
              </button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-5 rounded-xl text-lg transition-colors shadow-lg shadow-blue-500/30">
                다음 ▶
              </button>
            </div>

            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-5 rounded-xl text-xl mt-2 transition-colors shadow-lg shadow-amber-500/20">
              정답 공개하기
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-600 grid grid-cols-2 gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors">
              ▶ 시작
            </button>
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition-colors">
              ◼ 종료
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
