import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Todos App!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Located in Beautiful Downtown Foo City, Todos App.</p>
        <address className="public__addr">
          Todos App
          <br />
          555 Foo Drive
          <br />
          Rabat City, MAR 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Bouamar</p>
      </main>
      <footer>
        <Link to="/login">User Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
