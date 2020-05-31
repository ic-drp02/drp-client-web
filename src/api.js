export async function createPost({ title, summary, content, tags }) {
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      summary,
      content,
      tags,
    }),
  });

  if (res.status !== 200) {
    return {
      success: false,
      status: res.status,
    };
  }

  return {
    success: true,
    data: await res.json(),
  };
}
