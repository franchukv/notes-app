import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Button } from '@/shared/ui';
import { useTitles } from '@/shared/lib';

export const NotFoundPage = () => {
  useTitles({ documentTitle: 'Page not found', headerTitle: '' });

  return (
    <div className="py-5 h-full">
      <div className="custom-container h-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full flex flex-col justify-center items-center text-center gap-4"
        >
          <h1 className="text-preset-1 text-7xl sm:text-9xl">404</h1>

          <h2 className="text-preset-2 sm:text-preset-1">Page not found</h2>

          <p className="text-preset-4 sm:text-preset-3 font-normal leading-[150%]">
            The page you are looking for does not exist or may have been moved.
            <br />
            Try returning to the main page or checking the URL.
          </p>

          <Button
            as={Link}
            to="/notes"
            variant="primary"
            className="mt-4 text-preset-3!"
          >
            Go to the main page
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
