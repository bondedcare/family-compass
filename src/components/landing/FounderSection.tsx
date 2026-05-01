import founderPortrait from "@/assets/founder-portrait.jpg";

export const FounderSection = () => {
  return (
    <section id="founder" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-6">
              Meet the Help
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              A Personal Touch Behind Every Task
            </h2>
          </div>

          {/* Founder content */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border">
            <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-10 md:gap-12 items-start">
              {/* Portrait */}
              <div className="mx-auto md:mx-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/15 rounded-2xl transform rotate-3" />
                  <img
                    src={founderPortrait}
                    alt="Pauline Bond, founder of Bonded Care"
                    className="relative w-64 md:w-full max-w-[320px] aspect-[3/4] object-cover rounded-2xl shadow-md"
                  />
                </div>
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                  Hello! This is Pauline Bond...
                </h3>

                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Bonded Care was created because families — especially those
                    caring for aging loved ones — need someone they can truly
                    count on. Someone who shows up when promised, handles tasks
                    with discretion and a smile, and treats their home and loved
                    ones with genuine respect.
                  </p>

                  <p>
                    Asking for help can be hard, and feeling comfortable with
                    the person you're trusting matters. That's why every task —
                    big or small — is approached with the same care and
                    follow-through you'd want for your own family.
                  </p>

                  <p className="text-foreground font-medium italic font-display text-xl">
                    "When you work with Bonded Care, you're not just getting a
                    service. You're getting a reliable partner who genuinely
                    cares about making your life a little easier."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
