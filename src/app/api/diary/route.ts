export type DiaryItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

let diaryList: DiaryItem[] = []; // 서버 재시작하면 초기화됨

export async function GET() {
  return Response.json(diaryList);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newDiary: DiaryItem = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };
  diaryList.push(newDiary);
  return Response.json(newDiary, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, content } = await req.json();
  const index = diaryList.findIndex((d) => d.id === id);
  if (index === -1) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  diaryList[index] = { ...diaryList[index], title, content };
  return Response.json(diaryList[index]);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  diaryList = diaryList.filter((d) => d.id !== id);
  return Response.json({ message: "Deleted" });
}
