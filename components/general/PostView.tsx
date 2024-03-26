import Avatar, {
  AvatarFallback,
  AvatarImage,
} from "@/components/general/Avatar";
import { Badge } from "@/components/general/Badge";
import Button from "@/components/general/Button";
//
import {
  IconClockHour1,
  IconHeart,
  IconLink,
  IconShare,
} from "@tabler/icons-react";
//
import type { Post } from "@/db/utils/read-article-markdown";

type PostViewProps = {
  postData: Post;
};
const PostView = ({ postData }: PostViewProps) => {
  return (
    <main className={"w-full px-4 md:px-0"}>
      <div className={"mx-auto max-w-5xl py-6"}>
        <div
          className={
            "mb-6 flex grow flex-col gap-3 border-b border-foreground px-2 pb-4"
          }
        >
          <div className={"flex items-center gap-2"}>
            {postData.tags.map((category, i) => (
              <Badge key={i}>{category}</Badge>
            ))}
            <span className={"flex gap-1 font-light"}>
              <IconClockHour1 stroke={1.5} />
              {postData.length} Read
            </span>
          </div>
          <div className={"flex w-full gap-2"}>
            <div className={"flex grow flex-col gap-4"}>
              <h1 className={"text-3xl font-bold md:text-5xl"}>
                {postData.title}
              </h1>
              <h1 className={"text-xl text-foreground/60 md:text-3xl"}>
                {postData.subtitle}
              </h1>
              <span
                className={
                  "flex items-center gap-2 text-xs font-light md:text-base"
                }
              >
                Written by:
                <Avatar>
                  <AvatarImage
                    src={postData.authorAvatar}
                    alt={postData.author}
                  />
                  <AvatarFallback>{postData.author[0]}</AvatarFallback>
                </Avatar>
                <span className={"font-semibold"}>{postData.author}</span>
              </span>
            </div>
            <div className={"flex flex-col gap-2"}>
              {[IconHeart, IconShare, IconLink].map((Icon, i) => (
                <Button key={i} variant={"icon"}>
                  <Icon />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          className={
            "prose-sm max-w-full dark:prose-invert md:prose-lg prose-img:mx-auto prose-img:rounded-md"
          }
        />
      </div>
    </main>
  );
};

export default PostView;
