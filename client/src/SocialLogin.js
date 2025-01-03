import React, { useState } from 'react';
import { Github, Facebook } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
    />
  </svg>
);

const LoginButton = ({ icon, text, bgColor, onClick, loading }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-3 w-full ${bgColor} text-white py-3 rounded-lg hover:opacity-90 transition-opacity`}
    disabled={loading}
  >
    {icon}
    <span className="font-medium">{text}</span>
    {loading && <span className="ml-2 loader"></span>}
  </button>
);

const SocialLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider) => {
    try {
      setLoading(true);
      window.location.href = "https://localhost:4000/auth/google";
      // const response = await fetch(`https://localhost:4000/auth/${provider}`, {
      //   method: 'GET',
      //   credentials: 'include',
      // });

      // if (response.ok) {
      //   const data = await response.json();
      //   window.location.href = data.authUrl || `https://localhost:4000/auth/${provider}/callback`;
      // } else {
      //   console.error(`${provider} login failed:`, response.statusText);
      // }
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Login to Your Account</h1>
        
        <div className="space-y-4">
          <LoginButton
            icon={<GoogleIcon />}
            text="Continue with Google"
            bgColor="bg-red-500"
            onClick={() => handleLogin('google')}
            loading={loading}
          />
          
          <LoginButton
            icon={<Github className="w-6 h-6" />}
            text="Continue with GitHub"
            bgColor="bg-gray-800"
            onClick={() => handleLogin('github')}
            loading={loading}
          />
          
          <LoginButton
            icon={<Facebook className="w-6 h-6" />}
            text="Continue with Facebook"
            bgColor="bg-blue-600"
            onClick={() => handleLogin('facebook')}
            loading={loading}
          />
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to our
          <a href="/" className="text-blue-600 hover:underline ml-1">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
