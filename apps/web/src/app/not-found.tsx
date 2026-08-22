import { Container, Cta } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-pitch-950">
      <div className="takeover-grid absolute inset-0 -z-10 opacity-60" />

      <Container className="py-32 text-center">
        <p className="eyebrow justify-center text-gold-400">Error 404</p>
        <h1 className="display mx-auto mt-6 max-w-3xl text-5xl text-cream sm:text-6xl lg:text-7xl">
          This one went out of play.
        </h1>
        <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-cream/65">
          The page you were looking for does not exist, or has moved. Everything
          else is still where you left it.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-3">
          <Cta href="/">Back to home</Cta>
          <Cta href="/fixtures-results" variant="outline">
            Fixtures &amp; results
          </Cta>
          <Cta href="/news" variant="outline">
            Newsroom
          </Cta>
        </div>
      </Container>
    </section>
  );
}
