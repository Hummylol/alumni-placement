import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <main>
      <div className="container p-4 bg-gray-100">
      <Head>
        <title>Student Dashboard</title>
        <meta name="description" content="Student Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="nav">
        <img src="/jce-logo.png" alt="JCE Logo" className="logo" />
      </header>

      <section className="welcome">
        <h3 className="welcome-title">
          Welcome, <span id="student-name">Alumni</span> 👋
        </h3>
        <p>Explore your student dashboard with useful features.</p>
      </section>

      <section className="features">
        <div className="feature-box">
          <h4 className="feature-title">📖 Alumni Details</h4>
          <p>Check your grades, attendance, and subjects.</p>
          <Link href="/alumni">
            <span className="feature-link">View Details</span>
          </Link>
        </div>

        <div className="feature-box">
          <h4 className="feature-title">📢 Notices & Announcements</h4>
          <p>Stay updated with the latest college news.</p>
          <Link href="/notices">
            <span className="feature-link">Read Notices</span>
          </Link>
        </div>

        <div className="feature-box">
          <h4 className="feature-title">📚 Placement Details</h4>
          <p>Access your placement details and modify.</p>
          <Link href="/placement">
            <span className="feature-link">Details</span>
          </Link>
        </div>

        <div className="feature-box">
          <h4 className="feature-title">☎️ Contact Support</h4>
          <p>Need help? Contact college administration.</p>
          <Link href="/support">
            <span className="feature-link">Get Support</span>
          </Link>
        </div>
      </section>

      <div className="logincontainer text-center mt-6">
        <div className="login">
          <Link href="/login">
            <span className="login-link">Login</span>
          </Link>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Home;
