import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/MU.jpg";

const Login = () => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Pure Original Photo - No Effects */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      
      {/* Right Side Compact Glass Card */}
      <div className="flex-1 flex items-center justify-center p-6 ml-auto max-w-sm w-full relative z-10">
        <div className="w-full bg-black/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-float">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-r from-purple-500/95 to-pink-500/95 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
              <span className="text-2xl font-black text-white drop-shadow-2xl">MU</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
              Mewar University
            </h1>
            <p className="text-white/95 text-base font-semibold drop-shadow-xl">Select Login Type</p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              to="/login/facultylogin"
              className="group w-full flex items-center gap-3 p-5 bg-white/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 hover:bg-white/30 hover:border-white/60 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:bg-white/70 transition-all duration-300 border border-white/50">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 drop-shadow-2xl">Faculty Login</h3>
                <p className="text-white/95 text-xs font-semibold drop-shadow-xl">Teachers & Staff</p>
              </div>
              <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-all duration-300 drop-shadow-2xl ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="relative text-center">
              <div className="w-full h-px bg-white/40" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3">
                <span className="px-3 py-2 bg-white/40 backdrop-blur-sm rounded-full text-white/90 text-xs font-bold uppercase tracking-wider drop-shadow-lg">or</span>
              </div>
            </div>

            <Link
              to="/login/studentlogin"
              className="group w-full flex items-center gap-3 p-5 bg-white/20 backdrop-blur-2xl rounded-2xl border-2 border-white/40 hover:bg-white/30 hover:border-white/60 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:bg-white/70 transition-all duration-300 border border-white/50">
                <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1 drop-shadow-2xl">Student Login</h3>
                <p className="text-white/95 text-xs font-semibold drop-shadow-xl">Students</p>
              </div>
              <svg className="w-5 h-5 text-white group-hover:translate-x-1 transition-all duration-300 drop-shadow-2xl ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-white/40 text-center">
            <p className="text-white/80 text-xs font-bold tracking-wide drop-shadow-xl">
              © 2026 Mewar University
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;