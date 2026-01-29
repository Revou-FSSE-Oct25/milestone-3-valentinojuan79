export default function footer() {
  return (
    <footer className="mt-20 border-t bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-lg font-bold text-blue-600">REVOSHOP</span>
            <p className="text-sm text-slate-500">Project Milestone 3 - RevoU</p>
          </div>
          <div className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} RevoShop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}