export const Navbar = ({ children }) => {
  return (
    <header className="h-14 px-4 py-2 border-b">
      <div className="h-full flex flex-row items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export const NavbarLogo = () => {
  return (
    <img
      alt="Liveheats logo"
      className="h-8"
      src="/logo.svg"
    />
  );
};
