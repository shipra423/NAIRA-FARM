
import Link from "next/link";
import Header from "../../components/Header";

const values = [
  {
    number: "01",
    title: "Nature First",
    description:
      "We focus on products inspired by nature and thoughtful choices for everyday living.",
    icon: "🌱",
  },
  {
    number: "02",
    title: "Farm Inspired",
    description:
      "Our story begins with farming, care for ingredients and a connection to the natural world.",
    icon: "🌾",
  },
  {
    number: "03",
    title: "Quality Matters",
    description:
      "We believe in clear product information, careful handling and a customer-first approach.",
    icon: "🍯",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfbf7] text-[#244b35]">
      <div className="bg-[#244b35] px-4 py-3 text-center text-sm text-white">
        🌿 Rooted in nature, made for everyday living
      </div>

      <Header />

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
            The Naira Agro Story
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Closer to nature.
            <span className="mt-2 block font-serif italic text-[#71965b]">
              Better by choice.
            </span>
          </h1>

          <p className="mt-6 leading-8 text-gray-600">
            Naira Agro is inspired by the goodness of the natural world. Our
            collection brings together raw wildflower honey and moringa powder
            for people who appreciate simple ingredients and thoughtful
            everyday choices.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            We want to build a brand that celebrates farming, respects nature
            and helps customers discover our products with confidence.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-full bg-[#244b35] px-7 py-4 font-semibold text-white transition hover:bg-green-800"
          >
            Explore Our Products →
          </Link>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85"
            alt="Green fields and open farmland"
           className="h-87.5 w-full object-cover md:h-125"
          />

          <div className="absolute -bottom-5 left-5 rounded-2xl bg-white p-5 shadow-lg md:left-8">
            <p className="text-sm text-gray-500">Our inspiration</p>
            <p className="mt-1 text-xl font-bold">The goodness of nature</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
            What We Believe
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Simple products. Thoughtful choices.
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            We believe good products should come with clear information and a
            genuine connection to their ingredients. From honey to moringa,
            our aim is to make discovering nature-inspired products simple and
            welcoming.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
              Our Values
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              What guides us
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="rounded-3xl border border-green-900/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{value.icon}</span>
                  <span className="text-sm font-bold text-[#71965b]">
                    {value.number}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold">{value.title}</h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf2e7] px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#71965b]">
              From Our Collection
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Honey and moringa, inspired by nature
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Our collection features two nature-inspired favourites: raw
              wildflower honey and moringa powder. Explore their product
              details and contact us if you would like to know more.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex rounded-full border border-[#244b35] px-6 py-3 font-semibold transition hover:bg-white"
            >
              View Collection →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80"
                alt="Honey in a jar"
                className="h-64 w-full object-cover"
              />
              <p className="p-4 font-bold">Wildflower Honey</p>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80"
                alt="Green botanical ingredients"
                className="h-64 w-full object-cover"
              />
              <p className="p-4 font-bold">Moringa Powder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#244b35] px-6 py-16 text-center text-white md:py-20">
        <p className="font-semibold uppercase tracking-[0.2em] text-green-200">
          Get to Know Us
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Let nature inspire your everyday.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/80">
          Have questions about Naira Agro or our products? We would love to
          hear from you.
        </p>

        <Link
          href="/#contact"
          className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-semibold text-[#244b35] transition hover:bg-green-50"
        >
          Get in Touch →
        </Link>
      </section>

      <footer className="bg-[#193726] px-6 py-7 text-center text-sm text-white/70">
        © 2026 Naira Agro. All rights reserved.
      </footer>
    </main>
  );
}
