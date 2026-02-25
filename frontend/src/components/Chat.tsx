import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import { Conversation, ConversationContent } from './ai-elements/conversation';
import ChatInput from './Input';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "http://localhost:8000/chat" }),
  });

  const handleSubmit = (message: { text: string; files?: File[] }) => {
    sendMessage({ text: message.text });
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-semibold">AI Chat</h1>
      </div>

      <Conversation className="max-w-2xl mx-auto">
        <ConversationContent>
          {messages.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                {message.parts.map((part, i) =>
                  part.type === "text" ? (
                    <MessageResponse key={`${message.id}-${i}`}>
                      {part.text}
                    </MessageResponse>
                  ) : null
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <ChatInput onSubmit={handleSubmit} status={status} />
    </div>
  );
}
