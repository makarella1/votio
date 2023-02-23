import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { copyToClipboard } from "@shared/lib/copy-to-clipboard";
import { showToast } from "@shared/lib/notifications/toasts";
import { Button } from "@shared/ui/button";
import { ColorizedText } from "@shared/ui/colorized-text";
import { Poll } from "@votio/shared";

interface PollInfoProps {
  poll: Poll;
}

export const PollInfo = ({ poll }: PollInfoProps) => (
  <div>
    <h2 className="mb-4 text-2xl font-black">{poll.topic}</h2>
    <div className="mx-auto w-5/6 sm:w-1/2">
      <Button
        className="mx-auto w-full py-2"
        onClick={async () => {
          await copyToClipboard(poll.id);
          showToast({ type: "success", message: "Copied" });
        }}
      >
        <ColorizedText text={poll.id} />
        <ClipboardDocumentIcon className="ml-10 h-10 w-10 text-primary" />
      </Button>
    </div>
  </div>
);
