const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      
      <div className="flex flex-col items-center">

        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#4F46E5] border-r-[#F59E0B] animate-spin"
          />
        </div>

        <div className="mt-5 text-center">
          <div className="font-heading text-sm font-bold tracking-[0.3em] text-[#111111]">
            LOADING
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loader;