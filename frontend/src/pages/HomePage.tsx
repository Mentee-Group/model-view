import mlImage from '../assets/ml_img.png';

function HomePage() {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-start">

        <div className="md:w-1/2 md:pr-8 mt-16 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-6 font-roboto">Model. Compete. Level Up.</h1>
          <p className="text-lg mb-4">
            A collaborative platform where you can upload real-world datasets and compete to solve predictive modeling challenges.
          </p>
          <p className="text-lg">
            Whether you're just getting started with data science or you're a seasoned pro, Model-View gives you a hands-on, practical way to level up.
          </p>
        </div>

        <div className="md:w-1/2 bg-white p-4">
          <img
            src={mlImage}
            alt="Data science illustration"
            className="w-full h-auto rounded"
          />
        </div>

      </div>
    </div>
  );
}

export default HomePage;