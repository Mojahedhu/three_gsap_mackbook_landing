import Link from "next/link";

const btnCls =
  "border border-gray-400 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-400 hover:font-semibold transition-all duration-300 w-fit";

function LessonPage() {
  return (
    <div className=" p-20 min-h-dvh bg-[#68D2E8]">
      <h2 className="text-3xl font-bold text-center mb-15">Three.js Lesson</h2>
      <p className="mb-5 text-lg font-semibold">
        To start your journey with three.js
      </p>
      <div className="space-y-5 flex flex-col">
        <button className={btnCls}>
          <Link href="/lesson/play" className="cursor-pointer">
            1- Start Lesson - core of Three.js
          </Link>
        </button>
        <button className={btnCls}>
          <Link href="/lesson/fiber-drei" className="cursor-pointer">
            2- Start Lesson - fiber and drei
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LessonPage;
