import { api } from "./api";

export interface PostDTO {
  _id: string;
  titulo: string;
  conteudo: string;
  autor: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePostDTO = Omit<PostDTO,"_id" | "createdAt" | "updatedAt">;

export function getPosts() {
  return api.get<PostDTO[]>("/posts");
}

export function getPostById(id: string) {
  return api.get<PostDTO>(`/posts/${id}`);
}

export function createPost(data: CreatePostDTO) {
  return api.post("/posts", data);
}

export function updatePost(id: string, data: CreatePostDTO) {
  return api.put(`/posts/${id}`, data);
}

export function deletePost(id: string) {
  return api.delete(`/posts/${id}`);
}