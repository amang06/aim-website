import React from "react";

// Rich text content structure for Lexical editor
interface RichTextNode {
  type: string;
  children?: RichTextNode[];
  tag?: string;
  listType?: string;
  format?: number;
  text?: string;
  url?: string;
  version?: number;
  direction?: string;
  indent?: number;
  value?: number;
  checked?: boolean;
  style?: string;
  [key: string]: any;
}

interface RichTextContent {
  root: {
    type: string;
    children: RichTextNode[];
    direction?: string;
    format?: number | string;
    indent?: number;
    version?: number;
  };
}

interface RichTextRendererProps {
  content: RichTextContent | null | undefined;
  className?: string;
}

// Helper function to check if text has formatting
function hasFormat(format: number, formatType: number): boolean {
  return (format & formatType) !== 0;
}

// Format constants (from Lexical)
const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 8;
const FORMAT_UNDERLINE = 4;
const FORMAT_CODE = 16;

// Helper function to render text with formatting
function renderFormattedText(node: RichTextNode): React.ReactNode {
  if (!node.text) return null;

  let text: React.ReactNode = node.text;
  const format = node.format || 0;

  // Apply formatting based on format flags (only if format is a number)
  if (typeof format === "number") {
    if (hasFormat(format, FORMAT_BOLD)) {
      text = <strong key="bold">{text}</strong>;
    }
    if (hasFormat(format, FORMAT_ITALIC)) {
      text = <em key="italic">{text}</em>;
    }
    if (hasFormat(format, FORMAT_UNDERLINE)) {
      text = <u key="underline">{text}</u>;
    }
    if (hasFormat(format, FORMAT_STRIKETHROUGH)) {
      text = <del key="strikethrough">{text}</del>;
    }
    if (hasFormat(format, FORMAT_CODE)) {
      text = (
        <code
          key="code"
          className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
        >
          {text}
        </code>
      );
    }
  }

  return text;
}

// Main renderer function
function renderNode(node: RichTextNode, index: number): React.ReactNode {
  const key = `node-${index}`;

  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className="mb-4 leading-relaxed">
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </p>
      );

    case "heading":
      const HeadingTag = `h${node.tag}` as keyof React.JSX.IntrinsicElements;
      const headingClasses = {
        h1: "text-3xl font-bold mb-6 mt-8 text-gray-900",
        h2: "text-2xl font-bold mb-4 mt-8 text-gray-900",
        h3: "text-xl font-semibold mb-3 mt-6 text-gray-900",
        h4: "text-lg font-semibold mb-3 mt-4 text-gray-900",
        h5: "text-base font-semibold mb-2 mt-4 text-gray-900",
        h6: "text-sm font-semibold mb-2 mt-4 text-gray-900",
      };
      return (
        <HeadingTag
          key={key}
          className={
            headingClasses[node.tag as keyof typeof headingClasses] ||
            headingClasses.h3
          }
        >
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </HeadingTag>
      );

    case "list":
      const ListTag = node.listType === "number" ? "ol" : "ul";
      const listClasses =
        node.listType === "number"
          ? "mb-4 ml-6 list-decimal space-y-2"
          : "mb-4 ml-6 list-disc space-y-2";
      return (
        <ListTag key={key} className={listClasses}>
          {node.children?.map((child, childIndex) => (
            <li key={childIndex} className="leading-relaxed">
              {renderNode(child, childIndex)}
            </li>
          ))}
        </ListTag>
      );

    case "listitem":
      return (
        <div key={key}>
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </div>
      );

    case "quote":
      return (
        <blockquote
          key={key}
          className="border-l-4 border-primary-500 pl-4 py-2 my-4 bg-gray-50 italic text-gray-700"
        >
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </blockquote>
      );

    case "link":
      return (
        <a
          key={key}
          href={node.url}
          className="text-primary-600 hover:text-primary-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </a>
      );

    case "text":
      return <span key={key}>{renderFormattedText(node)}</span>;

    case "linebreak":
      return <br key={key} />;

    case "code":
      return (
        <pre
          key={key}
          className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"
        >
          <code className="text-sm font-mono">
            {node.children?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </code>
        </pre>
      );

    case "codehighlight":
      return (
        <code
          key={key}
          className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
        >
          {node.children?.map((child, childIndex) =>
            renderNode(child, childIndex)
          )}
        </code>
      );

    case "upload":
      // Handle uploaded images or files
      if (node.value && typeof node.value === "object" && node.value !== null) {
        const value = node.value as any;
        if (value.url) {
          return (
            <div key={key} className="my-4">
              <img
                src={value.url}
                alt={value.alt || ""}
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
              {value.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {value.caption}
                </p>
              )}
            </div>
          );
        }
      }
      return null;

    case "relationship":
      // Handle relationship fields (like embedded content)
      if (node.value && typeof node.value === "object") {
        const value = node.value as any;
        return (
          <div
            key={key}
            className="my-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <p className="text-sm text-gray-600">
              Related content: {value.title || value.name || "Related item"}
            </p>
          </div>
        );
      }
      return null;

    default:
      // For unknown node types, try to render children if they exist
      if (node.children && node.children.length > 0) {
        return (
          <div key={key} className="my-2">
            {node.children.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </div>
        );
      }
      return null;
  }
}

export default function RichTextRenderer({
  content,
  className = "",
}: RichTextRendererProps) {
  if (!content || !content.root || !content.root.children) {
    return <div></div>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
