"use client"

import { useState } from "react";

const infos = [
  {
    id: 1,
    title: "Global Climate Summit 2026",
    category: "Environment",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  },
  {
    id: 2,
    title: "Global Climate Summit 2026",
    category: "Technology",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  },
  {
    id: 3,
    title: "Global Climate Summit 2026",
    category: "Sports",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  },
  {
    id: 4,
    title: "Global Climate Summit 2026",
    category: "Political",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  },
  {
    id: 5,
    title: "Global Climate Summit 2026",
    category: "Finance",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  },
  {
    id: 6,
    title: "Global Climate Summit 2026",
    category: "Entertainments",
    time: "2 hours ago",
    description: "World leaders gather to discuss urgent climate action strategies."
  }
  
]


export default function Home() {

  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <main className="min-h-screen bg-gray-950 text-white px-8 py-10">
      <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Global Trends Now</h1>
            <p className="text-gray-400 text-lg">
                  Discover the hottest events happening around the world in real time.
            </p>
      </header>


            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {infos.map((event) => (
                  <div
                      key={event.id}
                      className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
                      onClick={()=>{
                        setSelectedEvent(event)
                      }}>
                    
                          <span className="text-sm text-blue-400">{event.category}</span>
                          <h2 className="text-2xl find-semibold mt-2 mb-3">{event.title}</h2>
                          <p className="text-gray-400 mb-4">{event.description}</p>
                          <p className="text-sm text-gray-500">{event.time}</p>
                </div>
                ))}
            </section>

            {selectedEvent && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                <div className="bg-gray-900 p-8 rounded-2xl max-w-xl w-full relative">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
                  >
                      ✕
                  </button>
                  <span className="text-blue-400">{selectedEvent.category}</span>
                  <h2 className="text-3xl font-bold mt-2 mb-4">{selectedEvent.title}</h2>
                  <p className="text-gray-300 mb-4">{selectedEvent.details}</p>
                  <p className="text-sm text-gray-500">Updated: {selectedEvent.time}</p>
                </div>
              </div>
            )}
    </main>
  );
}




















// export default function Home() {
//   const [selectedEvent, setSelectedEvent] = useState(null);

//   return (
//     <main className="min-h-screen bg-gray-950 text-white px-8 py-10">
//       <header className="mb-12">
//         <h1 className="text-5xl font-bold mb-4">Global Trends Now</h1>
//         <p className="text-gray-400 text-lg">
//           Discover the hottest events happening around the world in real time.
//         </p>
//       </header>

//       <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <div
//             key={event.id}
//             onClick={() => setSelectedEvent(event)}
//             className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition cursor-pointer"
//           >
//             <span className="text-sm text-blue-400">{event.category}</span>

//             <h2 className="text-2xl font-semibold mt-2 mb-3">
//               {event.title}
//             </h2>

//             <p className="text-gray-400 mb-4">{event.description}</p>

//             <p className="text-sm text-gray-500">{event.time}</p>
//           </div>
//         ))}
//       </section>

//       {selectedEvent && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-gray-900 p-8 rounded-2xl max-w-xl w-full relative">
//             <button
//               onClick={() => setSelectedEvent(null)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//             >
//               ✕
//             </button>

//             <span className="text-blue-400">{selectedEvent.category}</span>

//             <h2 className="text-3xl font-bold mt-2 mb-4">
//               {selectedEvent.title}
//             </h2>

//             <p className="text-gray-300 mb-4">
//               {selectedEvent.details}
//             </p>

//             <p className="text-sm text-gray-500">
//               Updated: {selectedEvent.time}
//             </p>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }