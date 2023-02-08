import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { copyToClipboard } from "@shared/lib/copy-to-clipboard";
import { showToast } from "@shared/lib/notifications/toasts";
import { Button } from "@shared/ui/button";
import { ColorizedText } from "@shared/ui/colorized-text";
import { Poll } from "shared";

interface PollInfoProps {
  poll: Poll;
}

export const PollInfo = ({ poll }: PollInfoProps) => (
  <>
    <div className="mb-6">
      <h2 className="text-2xl font-black">{poll.topic}</h2>
    </div>
    <div>
      <Button
        className="mx-auto w-1/2 py-2"
        onClick={async () => {
          await copyToClipboard(poll.id);
          showToast({ type: "success", message: "Copied" });
        }}
      >
        <ColorizedText text={poll.id} />
        <ClipboardDocumentIcon className="ml-10 h-10 w-10 text-primary" />
      </Button>
    </div>
  </>
);