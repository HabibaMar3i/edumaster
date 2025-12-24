import StatCard from "./StatCard";

export default function Hero() {
  return (
    <section className="rounded-b-[80px] overflow-hidden relative flex flex-col md:flex-row items-center px-6 md:px-16 pt-10 ">

      {/* Left Content */}
      <div className="flex-1 text-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-orange-400">Studying</span> Online is now <br />
          much easier
        </h1>

        <p className="mt-6 text-sm md:text-base max-w-md opacity-90">
          TOTC is an interesting platform that will teach you
          in more an interactive way
        </p>

        <div className="mt-8 flex items-center gap-6">
          <button className="px-6 py-3 rounded-full bg-teal-300 text-white">
            Join for free
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-12 h-12 rounded-full text-black bg-white flex items-center justify-center">
              ▶
            </div>
            <span>Watch how it works</span>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative flex-1 mt-10 md:mt-0">
        <img
          src="/heroimage.png"
          alt="student"
          className="w-full max-w-md mx-auto"
        />

        {/* Floating Cards */}
        <div className="absolute top-20 -left-10 hidden md:block">
          <StatCard
            title="250k"
            subtitle="Assisted Student"
          />
        </div>

        <div className="absolute bottom-16 left-0 hidden md:block">
          <StatCard
            title="User Experience Class"
            subtitle="Today at 12.00 PM"
            button="Join Now"
          />
        </div>

        <div className="absolute top-40 right-0 hidden md:block">
          <StatCard
            title="Congratulations"
            subtitle="Your admission completed"
          />
        </div>
      </div>
    </section>
  );
}
