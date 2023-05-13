export interface IPost {
  _id: string;
  creator: { _id: string; image: string; username: string; email: string };
  prompt: string;
  tag: string;
}

export function emptyPost(): IPost {
  return {
    _id: "",
    creator: { _id: "", image: "", username: "", email: "" },
    prompt: "",
    tag: "",
  };
}
