import { Container } from '@shared/ui/container';
import { Button } from '@shared/ui/button';

export const WelcomePage = () => (
  <Container>
    <section className="h-screen flex flex-col items-center p-72 text-center mx-auto gap-10">
      <h1 className="animate-gradient text-center text-7xl bg-clip-text text-transparent font-black bg-gradient-to-r from-primary via-accent to-secondary">
        Votio
      </h1>

      <div className="flex items-center gap-10 mb-48">
        <Button variant="primary" href="/create-poll">
          Create a Poll
        </Button>
        <Button variant="secondary" href="/join-poll">
          Join an Existing Poll
        </Button>
      </div>

      <button>
        <p className="text-3xl font-bold mb-14">Where Am I ?</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 mx-auto animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
    </section>
    {/* <p className="text-2xl font-semibold">
      Having a hard time weighing up the pros and cons of making a decision
      with your friends or colleagues?
    </p>
    <p className="text-5xl font-bold">
      Let <span className="text-secondary">Votio</span> do all the
      heavy-lifting for you!
    </p> */}
  </Container>
);
