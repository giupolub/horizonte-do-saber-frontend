import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../services/posts";
import type { PostDTO } from "../services/posts";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta postagem?"
    );
    if (!confirmDelete) return;

    try {
      await deletePost(id);
      loadPosts();
    } catch {
      alert("Erro ao excluir postagem.");
    }
  }

  const filteredPosts = posts.filter((post) => {
    const term = search.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(term) ||
      post.autor.toLowerCase().includes(term) ||
      post.conteudo.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return <p style={styles.loading}>Carregando...</p>;
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Horizonte do Saber</h1>

        <div style={styles.topButtonsContainer}>
          {!isAuthenticated && (
            <button
              onClick={() => navigate("/login")}
              style={styles.primaryButton}
            >
              Login professor
            </button>
          )}

          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/nova-postagem")}
                style={styles.primaryButton}
              >
                Nova postagem
              </button>

              <button
                onClick={logout}
                style={styles.secondaryButton}
              >
                Sair
              </button>
            </>
          )}
        </div>
      </header>

      <main style={styles.container}>
        <input
          type="text"
          placeholder="Buscar por título, autor ou conteúdo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {filteredPosts.length === 0 && (
          <p style={styles.empty}>Nenhuma postagem encontrada.</p>
        )}

        <ul style={styles.list}>
          {filteredPosts.map((post) => (
            <li key={post._id} style={styles.card}>
              <h2
                style={styles.title}
                onClick={() => navigate(`/posts/${post._id}`)}
              >
                {post.titulo}
              </h2>

              <span style={styles.author}>{post.autor}</span>

              <p style={styles.description}>
                {post.conteudo.length > 100
                  ? post.conteudo.substring(0, 100) + "..."
                  : post.conteudo}
              </p>

              {isAuthenticated && (
                <div style={styles.actions}>
                  <button
                    style={styles.linkButton}
                    onClick={() =>
                      navigate(`/editar-postagem/${post._id}`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    style={styles.dangerButton}
                    onClick={() => handleDelete(post._id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
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
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600
  },
  topButtonsContainer: {
    display: "flex",
    gap: "12px"
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px 20px"
  },
  search: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "24px",
    boxSizing: "border-box"
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },
  title: {
    margin: "0 0 6px 0",
    cursor: "pointer",
    color: "#1e3a8a",
    fontSize: "20px"
  },
  author: {
    fontSize: "14px",
    color: "#6b7280"
  },
  description: {
    marginTop: "12px",
    color: "#374151",
    lineHeight: 1.5
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "16px"
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    padding: 0
  },
  dangerButton: {
    background: "none",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    padding: 0
  },
  empty: {
    textAlign: "center",
    color: "#6b7280"
  },
  loading: {
    padding: 40,
    textAlign: "center"
  }
};

export default Home;