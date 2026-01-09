import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/");
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Horizonte do Saber</h1>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Login do Professor</h2>

          <p style={styles.subtitle}>
            Acesso exclusivo para docentes
          </p>

          <button
            onClick={handleLogin}
            style={styles.primaryButton}
          >
            Entrar como professor
          </button>
        </div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "Inter, Arial, sans-serif"
  },
  header: {
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "20px 40px"
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600
  },
  container: {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "80px 20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  title: {
    marginTop: 0,
    marginBottom: "8px",
    fontSize: "22px",
    color: "#1e3a8a"
  },
  subtitle: {
    marginBottom: "24px",
    fontSize: "14px",
    color: "#6b7280"
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500
  }
};

export default Login;