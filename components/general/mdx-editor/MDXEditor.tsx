"use client";
//
import { type ComponentType, useRef } from "react";
//
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  IconKey,
  imagePlugin,
  InsertImage,
  InsertTable,
  linkDialogPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor as MDXEditorProvider,
  MDXEditorMethods,
  type MDXEditorProps as PrimitiveMDXEditorProps,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./style.css";
//
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconCarouselHorizontal,
  IconCheck,
  IconChevronDown,
  IconCode,
  IconCodeDots,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconCopyPlus,
  IconDots,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconFile3d,
  IconItalic,
  IconLayersDifference,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignRight,
  IconLink,
  IconLinkOff,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconMarkdown,
  IconPhoto,
  IconPlus,
  IconPuzzle,
  IconRowInsertBottom,
  IconRowInsertTop,
  IconSandbox,
  IconSettings,
  IconTablePlus,
  IconTextGrammar,
  IconUnderline,
  IconWindowMaximize,
  IconX,
} from "@tabler/icons-react";
//
import { postImage } from "@/db/actions/image/post-image";
import { createArticle } from "@/db/actions/article/create-article";
//
import Button from "@/components/general/Button";
import {
  Credenza,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/general/credeza/Credenza";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/general/form/Form";
import { TagInput } from "@/components/general/tag/TagInput";
import { Input } from "@/components/general/Input";
import { Textarea } from "@/components/general/Textarea";
//
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//
import { getThumbnailFromMarkdown } from "@/db/utils/get-thumbnail-from-markdown";
import { getDescriptionFromMarkdown } from "@/db/utils/get-description-from-markdown";
import "@/augmentation";

const saveArticleSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  tags: z.array(z.string()),
  length: z.string(),
  author: z.string(),
});
type FormFields = z.infer<typeof saveArticleSchema>;
type MDXEditorProps = {
  defaultValues?: Partial<FormFields>;
} & PrimitiveMDXEditorProps;
const MDXEditor = ({ markdown, defaultValues, ...props }: MDXEditorProps) => {
  const editorHandle = useRef<MDXEditorMethods | null>(null);
  const form = useForm<FormFields>({
    resolver: zodResolver(saveArticleSchema),
    defaultValues: {
      author: "Shkolla",
      ...(defaultValues ?? {}),
    },
  });
  const handleFormSubmit = async (values: FormFields) => {
    const frontmatter =
      Object.entries(values).reduce((accumulator: string, [key, value]) => {
        const parsed = key === "tags" ? `[ ${value} ]` : value;
        return accumulator + `${key}: ${parsed}\n`;
      }, "") +
      "date: " +
      new Date().format("-").date +
      "\n";
    const content = editorHandle.current?.getMarkdown() ?? "";
    const markdown = "---\n" + frontmatter + "---\n" + content;
    const thumbnail = getThumbnailFromMarkdown(markdown) ?? "-";
    const description = await getDescriptionFromMarkdown(markdown);
    await createArticle({ content: markdown, thumbnail, description });
  };
  return (
    <section className={"size-full"}>
      <Credenza>
        <MDXEditorProvider
          ref={editorHandle}
          markdown={markdown}
          iconComponentFor={(name) => {
            const Icon = ICONS[name];
            return <Icon />;
          }}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={"dark:dark-theme dark:dark-editor"}
          contentEditableClassName={
            "prose prose-lg max-w-none mx-auto [&_span]:whitespace-wrap [&_span]break-words"
          }
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <BlockTypeSelect />
                  <DiffSourceToggleWrapper>
                    <></>
                  </DiffSourceToggleWrapper>
                </>
              ),
            }),
            headingsPlugin(),
            diffSourcePlugin(),
            linkDialogPlugin(),
            tablePlugin(),
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            imagePlugin({
              imageUploadHandler: async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                return await postImage(formData);
              },
            }),
          ]}
          {...props}
        />
        <CredenzaTrigger asChild>
          <Button className={"fixed bottom-5 right-5"} variant={"secondary"}>
            <IconDownload />
            Ruaj artikullin
          </Button>
        </CredenzaTrigger>
        <CredenzaContent className={"p-5"}>
          <h2 className={"text-3xl font-bold"}>Posto Artikullin</h2>
          <hr className={"h-[1px] w-full bg-foreground"} />
          <Form {...form}>
            <form
              className={"flex flex-col items-end gap-2"}
              onSubmit={form.handleSubmit(handleFormSubmit)}
            >
              <FormField
                control={form.control}
                name={"title"}
                render={({ field }) => {
                  return (
                    <FormItem className={"w-full"}>
                      <FormLabel htmlFor={"title"}>Titulli</FormLabel>
                      <FormControl>
                        <Textarea
                          id={"title"}
                          {...field}
                          className={"w-full bg-background"}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={"subtitle"}
                render={({ field }) => {
                  return (
                    <FormItem className={"w-full"}>
                      <FormLabel htmlFor={"subtitle"}>Nëntitulli</FormLabel>
                      <FormControl>
                        <Textarea
                          id={"subtitle"}
                          {...field}
                          className={"w-full bg-background"}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field: { value, ...field } }) => (
                  <FormItem className={"flex w-full flex-col items-start"}>
                    <FormLabel className={"mt-1 text-left"}>Autori</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={"w-full bg-background"}
                        defaultValue={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem className={"flex w-full flex-col items-start"}>
                    <FormLabel className={"mt-1 text-left"}>
                      Kategoritë
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        tags={
                          value.map((tag) => ({ text: tag, id: tag })) ?? []
                        }
                        onTagAdd={(newTag) =>
                          onChange([...(value ?? []), newTag])
                        }
                        onBlur={onBlur}
                        placeholder={"Shto nje temë"}
                        className={"px-0"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={"length"}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem className={"w-full"}>
                      <FormLabel htmlFor={"title"}>
                        Sa kohë do ky artikull për t&apos;u lexuar?
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={"title"}
                          {...field}
                          className={"w-full bg-background"}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <Button variant={"secondary"} className={"mt-3"}>
                Ruaj Artikullin
              </Button>
            </form>
          </Form>
        </CredenzaContent>
      </Credenza>
    </section>
  );
};

export default MDXEditor;

const ICONS: Record<IconKey, ComponentType<any>> = {
  admonition: IconFile3d,
  add_column: IconPlus,
  add_photo: IconPhoto,
  add_row: IconRowInsertBottom,
  arrow_drop_down: IconChevronDown,
  check: IconCheck,
  check_small: IconCheck,
  close: IconX,
  code: IconCode,
  content_copy: IconCopyPlus,
  delete_big: IconX,
  delete_small: IconX,
  sandpack: IconSandbox,
  difference: IconLayersDifference,
  edit: IconEdit,
  extension: IconPuzzle,
  format_align_center: IconLayoutAlignCenter,
  format_align_left: IconLayoutAlignLeft,
  format_align_right: IconLayoutAlignRight,
  format_bold: IconBold,
  format_italic: IconItalic,
  format_list_bulleted: IconList,
  format_list_checked: IconListCheck,
  format_list_numbered: IconListNumbers,
  format_underlined: IconUnderline,
  frame_source: IconCodeDots,
  frontmatter: IconCode,
  horizontal_rule: IconCarouselHorizontal,
  insert_col_left: IconColumnInsertLeft,
  insert_col_right: IconColumnInsertRight,
  insert_row_above: IconRowInsertTop,
  insert_row_below: IconRowInsertBottom,
  link: IconLink,
  link_off: IconLinkOff,
  markdown: IconMarkdown,
  more_horiz: IconDots,
  more_vert: IconDotsVertical,
  open_in_new: IconWindowMaximize,
  redo: IconArrowForwardUp,
  rich_text: IconTextGrammar,
  settings: IconSettings,
  table: IconTablePlus,
  undo: IconArrowBackUp,
};
