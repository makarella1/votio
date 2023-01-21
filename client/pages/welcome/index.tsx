import { Button } from "@shared/ui";

export const WelcomePage = () => {
  return (
    <section className="mx-auto flex flex-col gap-10 text-center">
      <h1 className="animate-gradient bg-gradient-to-r from-rose-700 via-primary to-secondary bg-clip-text text-center text-7xl font-black text-transparent">
        Votio
      </h1>

      <div className="flex items-center gap-10">
        <Button variant="primary" href="/create-poll">
          Create a Poll
        </Button>
        <Button variant="secondary" href="/join-poll">
          Join an Existing Poll
        </Button>
      </div>
    </section>
  );
};
