import { Link } from "react-router-dom";

const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <div className="min-h-screen bg-sand">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-glow/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-sea/20 blur-3xl" />

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
          <div className="lg:w-2/5">
            <Link to="/" className="text-sm font-semibold tracking-[0.25em]">
              RESET LAB
            </Link>
            <h1 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Make recovery feel effortless.
            </h1>
            <p className="mt-4 max-w-md text-base text-dusk/80">
              A calm, focused flow for password recovery with clear steps and
              instant feedback.
            </p>
          </div>

          <div className="lg:w-3/5">
            <div className="float-up rounded-[28px] border border-clay bg-white/85 p-8 shadow-bloom backdrop-blur">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sea">
                  Access Recovery
                </p>
                <h2 className="text-3xl font-semibold text-ink md:text-4xl">
                  {title}
                </h2>
                <p className="text-sm text-dusk/70 text-balance">{subtitle}</p>
              </div>

              <div className="mt-8 space-y-6">{children}</div>

              {footer ? <div className="mt-8">{footer}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
