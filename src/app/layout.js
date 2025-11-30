import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {/* <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" className="h-8 w-auto" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a href="/" aria-current="page" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">Home</a>
                    <a href="/profile" aria-current="page" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">profile</a>
                    <a href="/profile/detail" aria-current="page" className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white">detail</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav> */}
        {children}
      </body>
    </html>
  );
}

