import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaListAlt } from "react-icons/fa";

const linkBase =
  "flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 group relative overflow-hidden whitespace-nowrap";

export default function NavBar() {
  const { pathname } = useLocation();

  const navItem = (to, label, Icon, colorClasses) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={`${linkBase} ${colorClasses} ${
          active
            ? "relative bg-gradient-to-r from-cyan-600/40 via-cyan-400/30 to-cyan-600/40 text-white white-glow ring-2 ring-cyan-300 shadow-[0_0_12px_rgba(255,255,255,0.7),0_0_26px_#0891b2] scale-[1.05]"
            : "text-white/80 hover:text-white white-glow hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        }`}
      >
        <Icon className="text-base sm:text-lg drop-shadow-[0_0_6px_currentColor] group-hover:scale-110 transition-transform" />
        <span className="text-sm tracking-wide sm:text-base">{label}</span>
        {active && (
          <span className="absolute -inset-[2px] rounded-[inherit] pointer-events-none bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
        )}
        <span className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:opacity-100" />
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-cyan-500/30 bg-[#050510]/90 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex flex-row items-center justify-between gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_6px_#f0f]">
              💰
            </div>
            <span className="text-xl font-black sm:text-2xl neon-text whitespace-nowrap">
              Smart Expense Tracker
            </span>
          </Link>
          <ul className="nav-links flex-row items-center justify-center md:justify-end min-h-[60px] w-full md:w-auto">
            {[
              [
                "/",
                "Home",
                FaHome,
                "bg-cyan-500/15 border border-cyan-400/40 hover:bg-cyan-500/25",
              ],
              [
                "/add",
                "Add",
                FaPlus,
                "bg-green-500/15 border border-green-400/40 hover:bg-green-500/25",
              ],
              [
                "/expenses",
                "Expenses",
                FaListAlt,
                "bg-orange-500/15 border border-orange-400/40 hover:bg-orange-500/25",
              ],
            ].map(([to, label, Icon, color], idx, arr) => (
              <li
                key={to}
                className={`list-none ${idx < arr.length - 1 ? "mr-12" : ""}`}
              >
                {navItem(to, label, Icon, color)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
