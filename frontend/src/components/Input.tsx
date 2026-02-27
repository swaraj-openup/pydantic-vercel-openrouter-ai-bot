"use client";

import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputButton,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionAddAttachments,
  PromptInputMessage,
} from "@/components/ai-elements/prompt-input";

import type { FileUIPart } from "ai";

import { SpeechInput } from "@/components/ai-elements/speech-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: { text: string; files?: FileUIPart[] }) => void;
  status: "submitted" | "streaming" | "ready" | "error";
}

const DEFAULT_SUGGESTIONS = [
  "Explain like I’m five: gravity",
  "How to write clean React code",
  "Tips for learning TypeScript fast",
];

export default function ChatInput({ onSubmit, status }: ChatInputProps) {
  const [suggestions] = useState(DEFAULT_SUGGESTIONS);
  const [voiceText, setVoiceText] = useState("");

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const text = (message.text || "").trim();
      const files = message.files?.filter((f): f is FileUIPart => !!f);
      if (!text && !files?.length) return;
      onSubmit({ text, files });
    },
    [onSubmit]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      onSubmit({ text: suggestion });
    },
    [onSubmit]
  );

  const handleTranscriptionChange = useCallback(
    (transcript: string) => {
      setVoiceText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    },
    []
  );

  return (
    <>
      <Suggestions className="px-4 max-w-3xl mx-auto mb-4">
        {suggestions.map((s) => (
          <Suggestion
            key={s}
            suggestion={s}
            onClick={() => handleSuggestionClick(s)}
          />
        ))}
      </Suggestions>

      <div className="border-t p-4">
        <PromptInput
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputTextarea
              value={voiceText}
              onChange={(e) => setVoiceText(e.currentTarget.value)}
              placeholder="Type or speak your message..."
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>

              <SpeechInput
                onTranscriptionChange={handleTranscriptionChange}
              />

              <PromptInputButton variant="ghost" className="ml-10">
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add a tool
                </Button>
              </PromptInputButton>
            </PromptInputTools>

            <PromptInputSubmit
              disabled={status !== "ready"}
              status={status}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}