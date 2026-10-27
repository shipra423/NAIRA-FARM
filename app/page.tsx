
import Header from "../components/Header";

const honeyImage =
  "https://therawkitchenuk.com/cdn/shop/files/1235199.png?v=1767044964&width=1200";

const moringaImage =
  "https://www.pipagro.com/cdn/shop/files/E76E9555-3FDC-47EB-B9C9-75E7C2DC6FE6.png?v=1776944465";
 const farmImage =
  "https://media.istockphoto.com/id/2194911890/photo/back-lit-silhouette-of-male-farmer-standing-in-cultivated-soybean-field-in-summer-sunset.jpg?s=612x612&w=0&k=20&c=zgL3Yhxx4chRBdI0szfckOKWO4I8NU8gqrYQKYNze8k=";
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfbf7] text-[#244b35]">
      {/* Announcement bar */}
      <div className="bg-[#193726] px-4 py-3 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        <span className="mr-2">✳</span>
        GOODNESS FROM NATURE, MADE PART OF YOUR EVERYDAY
        <span className="ml-2">✳</span>
      </div>

      <Header />

      {/* Hero */}
      <section
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-20 lg:gap-16 lg:px-12"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9e3d0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#52784b] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#71965b]" />
            A little closer to nature
          </div>

          <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Nature has a
            <span className="mt-2 block font-serif italic font-normal text-[#71965b]">
              beautiful way
            </span>
            of nourishing us.
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#687268] sm:text-lg">
            Meet Naira Agro — inspired by the richness of the farm, with raw
            wildflower honey and moringa powder for your everyday kitchen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-3 rounded-full bg-[#244b35] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-green-950/10 transition duration-300 hover:-translate-y-1 hover:bg-[#193726]"
            >
              Explore Our Products
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-[#cbd7c4] px-7 py-4 text-sm font-semibold transition duration-300 hover:bg-[#edf2e7]"
            >
              Our Story
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-[#e5e8dd] pt-6">
            <div className="flex items-center gap-2 text-sm text-[#526453]">
              <span className="text-lg">🌿</span>
              Nature-inspired
            </div>
            <div className="flex items-center gap-2 text-sm text-[#526453]">
              <span className="text-lg">🍯</span>
              Honey & Moringa
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#e5ead8] blur-2xl" />
          <div className="absolute -bottom-6 -left-5 h-36 w-36 rounded-full bg-[#f3dfb7] blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] rounded-bl-[7rem] border-[7px] border-white shadow-2xl shadow-[#244b35]/15">
            <img
              src={farmImage}
              alt="Lush green farm fields in natural sunlight"
              fetchPriority="high"
              className="h-[400px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#10291d]/65 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-7 text-white sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
                The Naira way
              </p>
              <p className="mt-2 max-w-xs font-serif text-3xl italic sm:text-4xl">
                Rooted in nature. Made for your home.
              </p>
            </div>
          </div>

          <div className="absolute -right-2 top-8 max-w-[175px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:-right-8 sm:max-w-[190px]">
            <span className="text-2xl">🌱</span>
            <p className="mt-2 text-sm font-bold">From farm inspiration</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Discover our honey and moringa collection.
            </p>
          </div>
        </div>
      </section>

      {/* Brand values strip */}
      <section className="border-y border-[#e6e8dc] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 py-7 sm:grid-cols-3 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf2e7] text-xl">
              🌾
            </span>
            <div>
              <p className="font-semibold">Inspired by the farm</p>
              <p className="mt-1 text-xs text-gray-500">
                Nature-led products
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:border-x sm:border-[#e6e8dc] sm:px-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8edda] text-xl">
              🍯
            </span>
            <div>
              <p className="font-semibold">Everyday goodness</p>
              <p className="mt-1 text-xs text-gray-500">
                Honey for your table
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 sm:justify-end">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e1eee1] text-xl">
              🍃
            </span>
            <div>
              <p className="font-semibold">Simple ingredients</p>
              <p className="mt-1 text-xs text-gray-500">
                Explore moringa powder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / story */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28 lg:gap-20 lg:px-12"
      >
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] rounded-tr-[6rem] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1100&q=85"
              alt="Green fields and open countryside"
              loading="lazy"
              className="h-[340px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[440px]"
            />
          </div>

          <div className="absolute -bottom-5 right-3 rounded-2xl border border-[#e9e6d9] bg-white px-5 py-4 shadow-lg sm:-right-5">
            <p className="font-serif text-2xl italic text-[#71965b]">
              Nature, always.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              The heart of Naira Agro
            </p>
          </div>
        </div>

        <div className="pt-5 md:pt-0">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#71965b]">
            A story inspired by nature
          </p>

          <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
            Good things begin
            <span className="block font-serif italic font-normal text-[#71965b]">
              with the earth.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-[#687268]">
            At Naira Agro, our story starts with an appreciation for the
            natural world and the ingredients it offers. We bring together
            two favourites — raw wildflower honey and moringa powder — in a
            collection inspired by the farm and everyday living.
          </p>

          <p className="mt-4 leading-8 text-[#687268]">
            We believe choosing what goes into your kitchen should feel
            thoughtful, simple and connected to nature.
          </p>

          <a
            href="/about"
            className="group mt-7 inline-flex items-center gap-3 border-b border-[#71965b] pb-2 text-sm font-bold transition hover:text-[#71965b]"
          >
            Discover our story
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="bg-[#f0f3e9] px-5 py-20 sm:px-8 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#71965b]">
                Carefully selected for your kitchen
              </p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                The nature collection
              </h2>
            </div>

            <p className="max-w-md leading-7 text-[#687268]">
              Two natural favourites, each with its own character. Find the
              one that belongs in your everyday routine.
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2">
            {/* Honey card */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-[#e7e8dd] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#244b35]/10">
              <div className="relative overflow-hidden">
                <img
                  src={honeyImage}
                  alt="Golden honey in a glass jar"
                  loading="lazy"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[370px]"
                />

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#244b35] shadow-sm">
                  GOLDEN GOODNESS
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a793d]">
                      From the hive
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Raw Wildflower Honey
                    </h3>
                  </div>
                  <span className="text-3xl">🍯</span>
                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  Golden honey with a naturally rich character, ready to
                  become part of your favourite everyday moments.
                </p>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#244b35] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#193726]"
                >
                  Enquire About Honey <span>→</span>
                </a>
              </div>
            </article>

            {/* Moringa card */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-[#e7e8dd] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#244b35]/10">
              <div className="relative overflow-hidden">
                <img
                  src={moringaImage}
                  alt="Green botanical ingredients for moringa powder"
                  loading="lazy"
                  className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[370px]"
                />

                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#244b35] shadow-sm">
                  GREEN & NATURAL
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#71965b]">
                      From the leaf
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">
                      Moringa Powder
                    </h3>
                  </div>
                  <span className="text-3xl">🌿</span>
                </div>

                <p className="mt-4 leading-7 text-gray-600">
                  A versatile green ingredient for smoothies, drinks and
                  everyday recipes.
                </p>

                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#244b35] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#193726]"
                >
                  Enquire About Moringa <span>→</span>
                </a>
              </div>
            </article>
          </div>

          <p className="mt-7 text-center text-xs leading-6 text-[#687268]">
            Product photographs are illustrative. Actual packaging and
            appearance may vary.
          </p>
        </div>
      </section>

      {/* Farm journey */}
      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#193726]">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-7 text-white sm:p-12 lg:p-16">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b9d1a7]">
                Behind every ingredient
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Closer to nature,
                <span className="mt-2 block font-serif italic font-normal text-[#c6d9b5]">
                  closer to home.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-white/75">
                Explore the inspiration behind Naira Agro, from green
                landscapes to the natural ingredients that find a place in
                your kitchen.
              </p>

              <a
                href="/about"
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f0f3e9] px-6 py-3.5 text-sm font-bold text-[#244b35] transition hover:bg-white"
              >
                Meet Naira Agro <span>→</span>
              </a>
            </div>

            <div className="relative min-h-[300px] overflow-hidden sm:min-h-[400px]">
              <img
                src={farmImage}
                alt="Open green agricultural fields"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#193726]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[#e8eddf] px-5 py-20 text-center sm:px-8 md:py-24"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-12 h-72 w-72 rounded-full bg-[#d2dfc4] blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="text-4xl">🌱</span>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#71965b]">
            Let's talk naturally
          </p>

          <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Something good
            <span className="block font-serif italic font-normal text-[#71965b]">
              starts with a hello.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-[#687268]">
            Curious about our honey or moringa powder? Visit our contact page
            to send an enquiry and learn more about our collection.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-[#244b35] px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#193726]"
            >
              Get in Touch <span>→</span>
            </a>

            <a
              href="/products"
              className="inline-flex items-center rounded-full border border-[#b9c8ae] px-7 py-4 text-sm font-semibold transition hover:bg-white"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#142b1e] px-5 pb-7 pt-12 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-9 border-b border-white/15 pb-9 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <a href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dce8cf] text-xl text-[#244b35]">
                ✳
              </span>
              <span className="font-serif text-3xl">Naira Agro</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
              Inspired by the farm. Bringing the natural character of honey
              and moringa to your everyday kitchen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Explore</h3>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65">
              <a href="/" className="transition hover:text-white">Home</a>
              <a href="/about" className="transition hover:text-white">Our Story</a>
              <a href="/products" className="transition hover:text-white">Products</a>
              <a href="/contact" className="transition hover:text-white">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Our Collection</h3>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Raw Wildflower Honey
              <br />
              Moringa Powder
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c6d9b5] transition hover:text-white"
            >
              Ask us a question <span>→</span>
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Naira Agro. All rights reserved.</p>
          <p>Rooted in nature. Inspired by the farm.</p>
        </div>
      </footer>
    </main>
  );
}
