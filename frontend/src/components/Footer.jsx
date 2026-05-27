import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/20 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center py-xl px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full gap-gutter">
        <div className="flex flex-col items-center md:items-start">
          <Link
            to="/"
            className="font-display-lg-mobile text-display-lg-mobile text-primary font-bold"
          >
            CulinShare
          </Link>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-2 text-center md:text-left">
            © {new Date().getFullYear()} CulinShare. Crafted for home chefs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all"
          >
            About Us
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all"
          >
            Help Center
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-all"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
