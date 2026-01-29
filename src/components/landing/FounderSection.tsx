import founderPortrait from "@/assets/founder-portrait.jpg";
export const FounderSection = () => {
  return <section id="founder" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 bg-primary/10 text-primary rounded-full text-base font-medium mb-6">Meet the Help!</span>
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
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3" />
                  <img src={founderPortrait} alt="Founder of Bonded Care" className="relative w-64 md:w-full max-w-[320px] aspect-[3/4] object-cover rounded-2xl shadow-md" />
                </div>
              </div>

              {/* Introduction */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">Hello! I'm Pauline Bond...</h3>
                  
                </div>

                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>For over 25 years, I've built a solid career around one thing: making sure nothing falls through the cracks. Whether coordinating complex schedules, managing logistics, or simply ensuring every detail is handled with care, I've always believed that reliability and attention to detail make all the difference.</p>

                  <p>I started Bonded Care because I saw how much families—especially those caring for aging loved ones like myself, needed someone they could truly count on. Someone who would show up when promised, handle tasks with discretion and a smile, and treat their home and their loved ones with genuine respect.</p>

                  <p>
                    I understand how hard it can be to ask for help, and how important it 
                    is to feel comfortable with the person you're trusting. That's why I 
                    approach every task—big or small—with the same care and follow-through 
                    I'd want for my own family.
                  </p>

                  <p className="text-foreground font-medium">
                    When you work with Bonded Care, you're not just getting a service. 
                    You're getting a reliable partner who genuinely cares about making 
                    your life a little easier.
                  </p>
                </div>

                {/* Trust indicators */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};