import React from "react";
import { IPost } from "@interfaces/IPost";
import PromptCard from "./PromptCard";

type Props = {
  name: string;
  desc: string;
  data: IPost[];
  handleEdit: (value: IPost) => void;
  handleDelete: (value: IPost) => void;
};

const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
