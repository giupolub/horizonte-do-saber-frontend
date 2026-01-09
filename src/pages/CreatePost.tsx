import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPostById, updatePost } from "../services/posts";
import { useAuth } from "../contexts/AuthContext";
import type { CreatePostDTO } from "../services/posts";

const CreatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const isEditing = Boolean(id);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function loadPost() {
      if (!isEditing || !id) return;

      setLoading(true);
      try {
        const response = await getPostById(id);
        const data = response.data;

        setTitulo(data.titulo);
        setAutor(data.autor);
        setConteudo(data.conteudo);
      } catch {
        alert("Erro ao carregar postagem.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id, isEditing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const postData: CreatePostDTO = {
      titulo,
      autor,
      conteudo
    };

    setLoading(true);

    try {
      if (isEditing && id) {
        await updatePost(id, postData);
        alert("Postagem atualizada com sucesso!");
      } else {
        await createPost(postData);
        alert("Postagem criada com sucesso!");
      }

      navigate("/");
    } catch {
      alert("Erro ao salvar a postagem.");
    } finally {
      setLoading(false);
    }
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

            <h2 style={styles.title}>
              {isEditing ? "Editar Postagem" : "Nova Postagem"}
            </h2>
          </div>

          {loading && <p>Carregando...</p>}

          {!loading && (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Título</label>
                <input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  maxLength={50}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Autor</label>
                <input
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  required
                  maxLength={50}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Conteúdo</label>
                <textarea
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  required
                  style={styles.textarea}
                />
              </div>

              <div style={styles.actions}>
                <button
                  type="submit"
                  disabled={loading}
                  style={styles.primaryButton}
                >
                  {isEditing ? "Salvar alterações" : "Criar postagem"}
                </button>
              </div>
            </form>
          )}
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
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    marginBottom: "24px"
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px"
  },
  title: {
    margin: 0,
    marginTop: "24px",
    fontSize: "22px",
    color: "#1e3a8a"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151"
  },
  input: {
    padding: "12px 14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db"
  },
  textarea: {
    padding: "12px 14px",
    fontSize: "16px",
    minHeight: "220px",
    resize: "vertical",
    borderRadius: "8px",
    border: "1px solid #d1d5db"
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px"
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500
  }
};

export default CreatePost;