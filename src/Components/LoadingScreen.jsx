import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-100"></div>
    </div>
  );
};

export default LoadingScreen;
