import Link from "./Link";
const linkStyle = {
  marginRight: 15
};
const headerStyle = {
  marginBottom: 15
};
const Header = () => (
  <div style={headerStyle}>
    <Link href="/" style={linkStyle}>
      Home
    </Link>
    <Link href="/about" style={linkStyle}>
      About
    </Link>
  </div>
);

export default Header;
