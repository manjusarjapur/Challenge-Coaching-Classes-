import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/common/MobileFrame';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DrawerNav } from './components/common/DrawerNav';
import { Toast } from './components/common/Toast';

import { SplashScreen } from './components/screens/SplashScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { HomeDashboardScreen } from './components/screens/HomeDashboardScreen';
import { StudentsScreen } from './components/screens/StudentsScreen';
import { TeachersScreen } from './components/screens/TeachersScreen';
import { ParentsScreen } from './components/screens/ParentsScreen';
import { StudyMaterialsScreen } from './components/screens/StudyMaterialsScreen';
import { AssignmentsScreen } from './components/screens/AssignmentsScreen';
import { OnlineTestsScreen } from './components/screens/OnlineTestsScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { AnnouncementsScreen } from './components/screens/AnnouncementsScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { TimetableScreen } from './components/screens/TimetableScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'dashboard':
        return <HomeDashboardScreen />;
      case 'students':
        return <StudentsScreen />;
      case 'teachers':
        return <TeachersScreen />;
      case 'parents':
        return <ParentsScreen />;
      case 'materials':
        return <StudyMaterialsScreen />;
      case 'assignments':
        return <AssignmentsScreen />;
      case 'tests':
        return <OnlineTestsScreen />;
      case 'results':
        return <ResultsScreen />;
      case 'attendance':
        return <AttendanceScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'timetable':
        return <TimetableScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeDashboardScreen />;
    }
  };

  const isFullLanding = currentScreen === 'splash' || currentScreen === 'welcome';

  return (
    <MobileFrame>
      {!isFullLanding && <Header />}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {renderScreen()}
      </main>
      {!isFullLanding && <BottomNav />}
      <DrawerNav />
      <Toast />
    </MobileFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
