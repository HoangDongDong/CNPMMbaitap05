import { Link } from "react-router-dom";

const ActionCard = ({ title, description, to }) => {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-3 rounded-3xl border border-clay bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-ink/30"
    >
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="text-sm text-dusk/70">{description}</p>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sea">
        Open flow
      </span>
    </Link>
  );
};

export default ActionCard;
