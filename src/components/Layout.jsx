import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ className, children }) {
  return (
    <>
      <div className={className}>
        <div className="rotate_device_warning"></div>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
