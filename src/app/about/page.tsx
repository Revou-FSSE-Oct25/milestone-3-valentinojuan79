export const dynamic = 'force-dynamic';
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-20">
      <div className="text-center">
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
          About <span className="text-revou-yellow">Revo</span>Fun
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-slate-400">
          RevoFun is a modern e-commerce platform designed for the bold and the curious. 
          Born as a Milestone 3 project at RevoU, we combine cutting-edge technology 
          with a passion for high-quality retail experiences.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700">
          <h3 className="text-revou-yellow text-3xl font-bold">100%</h3>
          <p className="mt-2 text-slate-300 font-medium">Authentic Products</p>
        </div>
        <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700">
          <h3 className="text-revou-yellow text-3xl font-bold">Global</h3>
          <p className="mt-2 text-slate-300 font-medium">Shipping Ready</p>
        </div>
        <div className="rounded-2xl bg-slate-800/50 p-8 border border-slate-700">
          <h3 className="text-revou-yellow text-3xl font-bold">Secure</h3>
          <p className="mt-2 text-slate-300 font-medium">Payment Systems</p>
        </div>
      </div>
    </div>
  );
}