"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { IPost } from "@interfaces/IPost";
import { usePathname, useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = pathName.split("/")[2];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (id) fetchPosts();
  }, [id]);

  const handleEdit = (post: IPost) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: IPost) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p: IPost) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name={`${name}'s`}
      desc={`Welcome to ${name}'s perzonalized profile page. Here you can see all the prompts created by ${name}.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
