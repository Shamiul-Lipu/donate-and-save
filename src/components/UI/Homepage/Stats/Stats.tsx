const Stats = () => {
  return (
    <div className="bg-gray-800 py-10 flex justify-center items-center">
      <div className="px-6">
        <div className="text-center text-gray-300 px-6 pb-5 lg:px-8">
          <h3 className="text-4xl font-bold">Our Impact</h3>
          <p className="pt-4 max-w-md mx-auto">
            Here are some key statistics about our blood donation website in
            Bangladesh.
          </p>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-gray-600 text-gray-300">
          <div className="stat">
            <div className="stat-title text-gray-300">
              Registered blood donors
            </div>
            <div className="stat-value">25,000+</div>
            <div className="stat-desc text-gray-300">Since our inception</div>
          </div>

          <div className="stat">
            <div className="stat-title text-gray-300">
              A patient in Bangladesh needs blood every
            </div>
            <div className="stat-value">2 minutes</div>
          </div>

          <div className="stat">
            <div className="stat-title text-gray-300">
              Units of blood donated through our website
            </div>
            <div className="stat-value">10,000+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
