import Header from "./Header";
import Copyright from "./Copyright";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const Layout: React.FunctionComponent = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <Copyright />
  </div>
);

export default Layout;
