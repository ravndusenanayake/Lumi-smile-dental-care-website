export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">LS</span>
          </div>
          <span className="text-lg font-bold text-white">Lumi Smile</span>
        </div>

        <p className="text-sm">
          &copy; {currentYear} Lumi Smile Dental Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
