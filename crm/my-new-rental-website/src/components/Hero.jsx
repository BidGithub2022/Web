import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = ({
  title = "Your Dream Home Awaits",
  subtitle = "Hassle-free rental experience with cutting-edge technology",
  buttonText = "Explore Properties",
  buttonLink = "/properties",
  backgroundImage = "/images/luxury-home.jpg",
  onButtonClick
}) => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Luxury Home"
          layout="fill"
          objectFit="cover"
          priority
          className="brightness-50" // This darkens the image
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            onClick={onButtonClick}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
