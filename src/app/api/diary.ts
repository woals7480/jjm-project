let diaryList = [];

export default function handler(req, res) {
  console.log(req, res);
  if (req.method === "GET") {
    return res.status(200).json(diaryList);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    const newDiary = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    diaryList.push(newDiary);
    return res.status(201).json(newDiary);
  }

  if (req.method === "PUT") {
    const { id, title, content } = req.body;
    const idx = diaryList.findIndex((d) => d.id === id);
    if (idx !== -1) {
      diaryList[idx] = { ...diaryList[idx], title, content };
      return res.status(200).json(diaryList[idx]);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    diaryList = diaryList.filter((d) => d.id !== id);
    return res.status(200).json({ message: "Deleted" });
  }

  return res.status(405).end(); // Method Not Allowed
}
