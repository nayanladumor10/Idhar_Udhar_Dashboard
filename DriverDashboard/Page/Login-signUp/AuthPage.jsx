import { Link } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        {/* Logo/Header*/}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            <span className="text-green-600">Idhar</span>
            <span className="text-gray-800">Udhar</span>
          </h1>
          <p className="text-gray-500">Your friendly expense manager</p>
        </div>
        
        {/* Welcome message */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back!</h2>
          <p className="text-gray-500">
            We're so excited to see you again. Let's manage your expenses together.
          </p>
        </div>
        
        {/* Auth buttons*/}
        <div className="flex flex-col space-y-4">
          <Link 
            to="/auth/login"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors 
                      flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Continue to Login
          </Link>
          
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <Link 
            to="/auth/signup"
            className="border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 hover:bg-green-50 
                      py-3 px-4 rounded-lg text-center font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
            Create New Account
          </Link>
        </div>
        
        {/* Footer note */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>By continuing, you agree to our <span className="text-green-600 hover:underline cursor-pointer">Terms</span> and <span className="text-green-600 hover:underline cursor-pointer">Privacy Policy</span>.</p>
        </div>
      </div>
      
      {/* Additional elements */}
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>Trusted by thousands to manage their expenses</p>
        <div className="flex justify-center space-x-4 mt-2">
          <span className="text-gray-300">•</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-300">•</span>
        </div>
      </div>
    </div>
  );
}