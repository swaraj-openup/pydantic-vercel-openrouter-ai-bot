import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockFilename,
  CodeBlockActions,
  CodeBlockCopyButton,
} from '@/components/ai-elements/code-block';
import type { BundledLanguage } from 'shiki';

interface MessageRendererProps {
  content: string;
}

export function MessageRenderer({ content }: MessageRendererProps) {
  const parts = parseMessageContent(content);

  return (
    <div className="space-y-3">
      {parts.map((part, idx) => {
        if (part.type === 'code') {
          return (
            <CodeBlock
              key={idx}
              code={part.code}
              language={part.language as BundledLanguage}
              showLineNumbers={part.code.split('\n').length > 5}
            >
              <CodeBlockHeader>
                <CodeBlockTitle>
                  <CodeBlockFilename>{part.language}</CodeBlockFilename>
                </CodeBlockTitle>
                <CodeBlockActions>
                  <CodeBlockCopyButton />
                </CodeBlockActions>
              </CodeBlockHeader>
            </CodeBlock>
          );
        }

        return (
          <div key={idx} className="prose prose-sm dark:prose-invert max-w-none">
            {part.content.split('\n').map((line, lineIdx) => {
              if (!line.trim()) {
                return <br key={lineIdx} />;
              }

              // Handle bold text
              const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((segment, i) => {
                if (segment.startsWith('**') && segment.endsWith('**')) {
                  return (
                    <strong key={i}>{segment.slice(2, -2)}</strong>
                  );
                }
                return segment;
              });

              return (
                <p key={lineIdx} className="mb-2 last:mb-0">
                  {formattedLine}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface TextPart {
  type: 'text';
  content: string;
}

interface CodePart {
  type: 'code';
  language: string;
  code: string;
}

type ContentPart = TextPart | CodePart;

function parseMessageContent(content: string): ContentPart[] {
  const parts: ContentPart[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // Add code block
    const language = match[1] || 'text';
    const code = match[2].trim();
    parts.push({ type: 'code', language, code });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // If no parts were added, add the whole content as text
  if (parts.length === 0) {
    parts.push({ type: 'text', content });
  }

  return parts;
}
