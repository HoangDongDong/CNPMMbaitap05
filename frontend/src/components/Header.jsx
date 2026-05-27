import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const linkClass = (path) =>
    isActive(path)
      ? "font-label-md text-label-md text-primary font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full"
      : "font-label-md text-label-md text-secondary hover:text-primary transition-colors";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 max-w-max-width mx-auto w-full">
        <div className="flex items-center gap-gutter">
          <Link
            to="/"
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary select-none hover:opacity-90"
          >
            CulinShare
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className={linkClass("/")}>
              Trang chu
            </Link>
            <Link to="/login" className={linkClass("/login")}>
              Dang nhap
            </Link>
            <Link
              to="/forgot-password"
              className={linkClass("/forgot-password")}
            >
              Quen mat khau
            </Link>
            <Link to="/reset-password" className={linkClass("/reset-password")}>
              Dat lai mat khau
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-label-md text-on-surface font-bold">
                  {user.fullName || user.username || "Nguoi dung"}
                </p>
                <p className="text-xs text-on-surface-variant">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-sm hover:bg-primary/90"
              >
                Dang xuat
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-sm hover:bg-primary/90"
            >
              Dang nhap
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden material-symbols-outlined text-secondary hover:text-primary transition-all active:scale-95 p-2 rounded-full hover:bg-surface-container-low select-none"
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/10 bg-surface-container-lowest px-margin-mobile py-4 flex flex-col gap-4 shadow-inner">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-outline-variant/5 text-label-md ${
              isActive("/") ? "text-primary font-bold" : "text-secondary"
            }`}
          >
            Trang chu
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-outline-variant/5 text-label-md ${
              isActive("/login") ? "text-primary font-bold" : "text-secondary"
            }`}
          >
            Dang nhap
          </Link>
          <Link
            to="/forgot-password"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-outline-variant/5 text-label-md ${
              isActive("/forgot-password")
                ? "text-primary font-bold"
                : "text-secondary"
            }`}
          >
            Quen mat khau
          </Link>
          <Link
            to="/reset-password"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-2 border-b border-outline-variant/5 text-label-md ${
              isActive("/reset-password")
                ? "text-primary font-bold"
                : "text-secondary"
            }`}
          >
            Dat lai mat khau
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
