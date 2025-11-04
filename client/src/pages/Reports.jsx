import Header from "../components/Header";
import ReportForm from "../components/ReportForm"

export default function Reports() {
    return (
            <div className="isolate h-screen w-screen bg-[#121212] font-inter">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#0b1b4d] to-[#9089fc] opacity-20 sm:left-[calc(50%-40rem)] sm:w-288.75"
                />
              </div>
        
              <Header />
              <div className="py-20 px-20">
                <ReportForm />
              </div>
            </div>
    )
}