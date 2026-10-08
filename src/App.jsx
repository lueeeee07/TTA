import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './api/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import NationalTeamsPage from './pages/NationalTeamsPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import GalleryPage from './pages/GalleryPage';
import ClubsPage from './pages/ClubsPage';
import ContactPage from './pages/ContactPage';

import JoinClubModal from './components/JoinClubModal';
import BookMeetingModal from './components/BookMeetingModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const handleOpenJoinModal = () => setIsJoinModalOpen(true);
  const handleCloseJoinModal = () => setIsJoinModalOpen(false);

  const handleOpenBookModal = () => setIsBookModalOpen(true);
  const handleCloseBookModal = () => setIsBookModalOpen(false);

  return (
    <DataProvider>
    <>
      {/* Page Loader — renders on top, fades out automatically */}
      {loading && <PageLoader onComplete={() => setLoading(false)} />}

      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div
          className="min-h-screen bg-[#F6F7F9] text-slate-800 flex flex-col font-sans selection:bg-[#c7ed56] selection:text-[#0F172A]"
          style={{
            opacity: loading ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <Navbar
            onOpenJoinModal={handleOpenJoinModal}
            onOpenBookModal={handleOpenBookModal}
          />

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={<HomePage onOpenJoinModal={handleOpenJoinModal} onOpenBookModal={handleOpenBookModal} />}
              />
              <Route
                path="/about"
                element={<AboutPage onOpenBookModal={handleOpenBookModal} />}
              />
              <Route
                path="/programs"
                element={<ProgramsPage onOpenJoinModal={handleOpenJoinModal} />}
              />
              <Route
                path="/programs/:programId"
                element={<ProgramDetailPage onOpenJoinModal={handleOpenJoinModal} />}
              />
              <Route
                path="/national-teams"
                element={<NationalTeamsPage onOpenJoinModal={handleOpenJoinModal} />}
              />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:articleId" element={<NewsArticlePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route
                path="/clubs"
                element={<ClubsPage onOpenJoinModal={handleOpenJoinModal} />}
              />
              <Route
                path="/contact"
                element={<ContactPage onOpenBookModal={handleOpenBookModal} />}
              />
            </Routes>
          </main>

          <Footer onOpenJoinModal={handleOpenJoinModal} />

          <JoinClubModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} />
          <BookMeetingModal isOpen={isBookModalOpen} onClose={handleCloseBookModal} />
        </div>
      </Router>
    </>
    </DataProvider>
  );
}
