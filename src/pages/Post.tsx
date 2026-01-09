import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/posts";
import type { PostDTO } from "../services/posts";
import { useAuth } from "../contexts/AuthContext";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState<PostDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const response = await getPostById(id!);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return <p style={styles.loading}>Carregando...</p>;
  }

  if (!post) {
    return <p style={styles.loading}>Post não encontrado.</p>;
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Horizonte do Saber</h1>
      </header>

      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <button
              onClick={() => navigate(-1)}
              style={styles.backButton}
            >
              ← Voltar
            </button>

            {isAuthenticated && (
              <button
                onClick={() =>
                  navigate(`/editar-postagem/${post._id}`)
                }
                style={styles.primaryButton}
              >
                Editar postagem
              </button>
            )}
          </div>

          <h2 style={styles.title}>{post.titulo}</h2>

          <p style={styles.author}>
            {post.autor}
          </p>

          <div style={styles.content}>
            {post.conteudo}
          </div>
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
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px"
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500
  },
  title: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "26px",
    color: "#1e3a8a"
  },
  author: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "24px"
  },
  content: {
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#374151",
    whiteSpace: "pre-line"
  },
  loading: {
    padding: 40,
    textAlign: "center"
  }
};

export default Post;