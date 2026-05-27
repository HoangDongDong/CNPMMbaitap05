import Footer from "../components/Footer";
import Header from "../components/Header";
import TopProductsSection from "../components/TopProductsSection";

const categories = [
  {
    title: "Mon chinh",
    description: "Mon an day du chat cho bua toi",
  },
  {
    title: "Mon phu",
    description: "Mon kem nhe de can bang bua an",
  },
  {
    title: "Trang mieng",
    description: "Ket thuc bua an ngot ngao",
  },
  {
    title: "Do uong",
    description: "Cong thuc nuoc uong tu nhien",
  },
  {
    title: "An vat",
    description: "Nhanh gon, hap dan",
  },
];

const featuredRecipes = [
  {
    title: "Ga nuong thao moc",
    tag: "Mon chinh",
    time: "45 phut",
    difficulty: "Trung binh",
    rating: "4.8",
  },
  {
    title: "Bun bo tai nha",
    tag: "Mon chinh",
    time: "60 phut",
    difficulty: "Kho",
    rating: "4.9",
  },
  {
    title: "Salad ca hoi",
    tag: "Mon phu",
    time: "20 phut",
    difficulty: "De",
    rating: "4.7",
  },
];

const latestRecipes = [
  {
    title: "Chao yen mach",
    description: "Cong thuc bieu tuong cho bua sang nhanh gon.",
    time: "15 phut",
    calories: "320 kcal",
  },
  {
    title: "Sup bi do",
    description: "Am bung, giau chat xo va vitamin A.",
    time: "30 phut",
    calories: "280 kcal",
  },
  {
    title: "Sinh to xanh",
    description: "Xay la cai, tao va chuoi cho nang luong sach.",
    time: "10 phut",
    calories: "190 kcal",
  },
];

const learningSteps = [
  {
    title: "Tuan 1",
    subtitle: "Bep lanh manh co ban",
    points: [
      "Nam bo nguyen tac dinh duong co ban",
      "Sap xep bua an theo lich ca nhan",
      "Tao danh sach mua sam toi uu",
      "Can bang nhom chat theo khau phan",
    ],
  },
  {
    title: "Tuan 2",
    subtitle: "Thuc don theo muc tieu",
    points: [
      "Thiet lap ngan sach an uong thuc te",
      "Goi y mon an theo muc tieu suc khoe",
      "Dinh luong calo va macro de hieu",
      "Luu cong thuc va danh gia cong dong",
    ],
  },
  {
    title: "Tuan 3",
    subtitle: "Tang toc voi AI",
    points: [
      "Tao thuc don 7 ngay chi trong 1 phut",
      "Chatbot dinh duong tra loi tuc thi",
      "Tu dong goi y link nguyen lieu",
      "Theo doi tien do an uong thong minh",
    ],
  },
];

const checklist = [
  "Lap thuc don theo ngan sach moi ngay",
  "Cong thuc duoc cong dong cham diem thuc te",
  "Goi y mon an theo muc tieu dinh duong",
  "Toi uu thoi gian nau cho nguoi ban ron",
  "Luu va chia se cong thuc yeu thich",
  "Ket noi chuyen gia dinh duong uy tin",
];

const HomePage = () => {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <Header />

      <header className="relative w-full py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden">
        <div className="max-w-max-width mx-auto grid md:grid-cols-2 gap-lg items-center relative z-10">
          <div className="space-y-md">
            <span className="inline-block px-4 py-1 bg-tertiary-container/10 text-tertiary rounded-full font-label-md text-label-md">
              Goi y hom nay
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
              Khoi nguon cam hung <br />
              <span className="text-primary">gian bep Viet</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Chia se cong thuc va lap thuc don thong minh cho gia dinh.
            </p>
            <div className="mt-base flex flex-wrap gap-3">
              {checklist.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-outline-variant/40 px-4 py-2 text-xs font-semibold text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-xl">
              <img
                alt="Cooking background"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              />
            </div>
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl -z-0"></div>
      </header>

      <section className="py-xl px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full">
        <div className="flex justify-between items-end mb-lg">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Noi dung chinh
            </p>
            <h2 className="mt-3 font-headline-md text-headline-md text-on-surface font-bold">
              Chuong trinh 3 tuan thuc hanh
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Tu nen tang dinh duong den lap thuc don tu dong bang AI.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {learningSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-on-surface-variant/70">
                {step.title}
              </p>
              <h3 className="mt-3 font-display text-xl text-on-surface">
                {step.subtitle}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
                {step.points.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="categories"
        className="py-xl px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant/70">
              Danh muc
            </p>
            <h2 className="mt-3 font-headline-md text-headline-md text-on-surface font-bold">
              Kham pha theo danh muc
            </h2>
          </div>
          <a className="text-sm font-semibold text-primary" href="#recipes">
            Xem tat ca danh muc
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-soft"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-on-surface-variant/70">
                {category.title}
              </p>
              <p className="mt-3 text-sm text-on-surface-variant">
                {category.description}
              </p>
              <button className="mt-6 rounded-full border border-outline-variant px-4 py-2 text-xs font-semibold text-secondary">
                Kham pha
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="recipes"
        className="py-xl bg-surface-container-low overflow-hidden w-full"
      >
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant/70">
                Noi bat
              </p>
              <h2 className="mt-3 font-headline-md text-headline-md text-on-surface font-bold">
                Cong thuc noi bat
              </h2>
            </div>
            <a
              className="text-sm font-semibold text-primary"
              href="#categories"
            >
              Xem tat ca cong thuc
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.title}
                className="group rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-recipe-hover"
              >
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>{recipe.tag}</span>
                  <span>{recipe.rating} ★</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-on-surface">
                  {recipe.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-on-surface-variant">
                    {recipe.time}
                  </span>
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-on-surface-variant">
                    {recipe.difficulty}
                  </span>
                </div>
                <button className="mt-6 rounded-2xl bg-primary px-4 py-2 text-xs font-semibold text-on-primary transition hover:-translate-y-0.5 hover:bg-primary/90">
                  Xem cong thuc
                </button>
              </div>
            ))}
          </div>

          <TopProductsSection />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant/70">
                Cong thuc moi nhat
              </p>
              <div className="mt-6 space-y-4">
                {latestRecipes.map((recipe) => (
                  <div
                    key={recipe.title}
                    className="flex flex-col gap-2 rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-on-surface">
                        {recipe.title}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {recipe.description}
                      </p>
                    </div>
                    <div className="text-xs text-on-surface-variant">
                      <span className="mr-3">{recipe.time}</span>
                      <span>{recipe.calories}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-highest p-8 text-on-surface shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant">
                Diem nhan cong dong
              </p>
              <h3 className="mt-4 font-display text-2xl">
                500+ danh gia moi moi thang
              </h3>
              <p className="mt-3 text-sm text-on-surface-variant">
                Danh gia thuc te tu nguoi nau giup ban chon cong thuc phu hop.
              </p>
              <div className="mt-6 space-y-3 text-xs text-on-surface-variant">
                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                  "Mon ga nuong rat de lam, gia vi vua mieng." — Minh An
                </div>
                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                  "Meal plan giup minh tiet kiem hon 25%." — Thanh Ha
                </div>
              </div>
              <button className="mt-6 w-full rounded-2xl bg-primary-container px-4 py-2 text-xs font-semibold text-on-primary-container">
                Tham gia cong dong
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="ai"
        className="py-xl px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto w-full"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant/70">
              Thuc don AI
            </p>
            <h2 className="mt-3 font-headline-md text-headline-md text-on-surface font-bold">
              Tao thuc don thong minh theo ngan sach
            </h2>
            <p className="mt-4 text-sm text-on-surface-variant">
              Nhap ngan sach, muc tieu va so nguoi. AI se goi y thuc don 7 ngay
              kem luong calo va chi phi du kien.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Giam can", "Tang co", "An lanh manh", "Tiet kiem"].map(
                (goal) => (
                  <span
                    key={goal}
                    className="rounded-full border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-xs font-semibold text-secondary"
                  >
                    {goal}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-on-surface-variant/70">
              Thiet lap nhanh
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                <p className="text-xs text-on-surface-variant">
                  Ngan sach / ngay
                </p>
                <p className="mt-2 font-semibold">80.000 VND</p>
              </div>
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                <p className="text-xs text-on-surface-variant">Khau phan</p>
                <p className="mt-2 font-semibold">2 nguoi</p>
              </div>
              <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-4">
                <p className="text-xs text-on-surface-variant">So ngay</p>
                <p className="mt-2 font-semibold">7 ngay</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:-translate-y-0.5 hover:bg-primary/90">
              Tao thuc don AI
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
