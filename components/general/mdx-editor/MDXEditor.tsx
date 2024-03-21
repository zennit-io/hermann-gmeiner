"use client";
//
import {
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
  type MDXEditorProps,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./style.css";
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
import { ComponentType } from "react";
import { postImageFs } from "@/db/actions/image/post-image-fs";

const MDXEditor = ({ markdown, ...props }: MDXEditorProps) => {
  return (
    <MDXEditorProvider
      markdown={markdown}
      iconComponentFor={(name) => {
        const Icon = ICONS[name];
        return <Icon />;
      }}
      className="dark:dark-theme dark:dark-editor"
      contentEditableClassName={"prose"}
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
              <DiffSourceToggleWrapper>
                <></>
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
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
            return await postImageFs(formData);
          },
        }),
      ]}
      {...props}
    />
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
