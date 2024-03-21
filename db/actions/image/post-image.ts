"use server";

const postImage = async (data: FormData) => {
  const image = data.get("image") as File;
};
