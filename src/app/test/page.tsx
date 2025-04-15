"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";

type DiaryItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [list, setList] = useState<DiaryItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const loadDiary = async () => {
    const res = await api.get<DiaryItem[]>("/diary");
    setList(res.data);
  };

  useEffect(() => {
    loadDiary();
  }, []);

  const saveDiary = async () => {
    if (!title || !content) return;

    if (editId) {
      await api.put("/diary", { id: editId, title, content });
      setEditId(null);
    } else {
      await api.post("/diary", { title, content });
    }

    setTitle("");
    setContent("");
    loadDiary();
  };

  const deleteDiary = async (id: number) => {
    await api.delete("/diary", { data: { id } });
    loadDiary();
  };

  const startEdit = (item: DiaryItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setContent(item.content);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>📘 나만의 일기장</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        style={{ display: "block", width: "300px", marginBottom: "8px" }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        rows={5}
        style={{ display: "block", width: "300px", marginBottom: "8px" }}
      />
      <button onClick={saveDiary}>{editId ? "수정" : "저장"}</button>
      {editId && (
        <button
          onClick={() => {
            setEditId(null);
            setTitle("");
            setContent("");
          }}
          style={{ marginLeft: "8px" }}
        >
          취소
        </button>
      )}

      <hr />

      <ul>
        {list.map((item) => (
          <li key={item.id} style={{ marginBottom: "16px" }}>
            <strong>{item.title}</strong> <br />
            <small>{new Date(item.createdAt).toLocaleString()}</small>
            <p>{item.content}</p>
            <button onClick={() => startEdit(item)}>수정</button>
            <button
              onClick={() => deleteDiary(item.id)}
              style={{ marginLeft: "8px" }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
