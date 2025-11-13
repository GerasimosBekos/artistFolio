import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's scroll restoration
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    // DO NOTHING on route change - let Header.js handle the scrolling
    // This prevents conflict with Header's smooth scroll
  }, [pathname]);

  return null;
}