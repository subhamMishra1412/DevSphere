function ProgressBar({ value }) {
  return (
    <div className="mt-3">

      <div className="mb-2 flex justify-between text-sm">

        <span className="text-slate-500">
          Progress
        </span>

        <span className="font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

export default ProgressBar;