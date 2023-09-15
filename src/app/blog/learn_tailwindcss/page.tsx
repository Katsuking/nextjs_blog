"use client"

function Learn_tailwindcss() {

  return (
    <div className="py-10">

      <div className="flex justify-center p-5 text-[25px]">
        <h1>Tailwind CSS playground</h1>
      </div>

      {/* fixed */}
      <div className="fixed w-10 h-10 bg-red-600 top-10">fixed</div>

      {/* justify-center */}
      <p className="px-2">flex justify-center space-x-10</p>
      <div className="flex justify-center space-x-10">
        <div className="h-16 w-16 rounded-full bg-blue-500"></div>
        <div className="h-16 w-16 rounded-full bg-blue-500"></div>
        <div className="h-16 w-16 rounded-full bg-blue-500"></div>
      </div>

      {/* justify-end */}
      <p className="px-2">flex justify-end</p>
      <div className="flex justify-end ">
        <div className="h-16 w-16 rounded-full bg-blue-500"></div>
      </div>

      {/* grid */}
      <p className="px-2">grid grid-cols-5 gap-2</p>
      <div className="grid grid-cols-5 gap-2">
        <div className="h-16 bg-violet-500"></div>
        <div className="h-16 bg-violet-500"></div>
        <div className="h-16 bg-violet-500"></div>
        <div className="h-16 bg-violet-500"></div>
        <div className="h-16 bg-violet-500"></div>
      </div>
      {/* end */}

      <h2>change device size with F12</h2>
      <div className="md:block hidden">
        <p>I will appear for device resultion greater than 768px</p>
      </div>
      <div className="max-md:block hidden">
        <p>I will appear for device resultion smaller than 768px</p>
      </div>

    {/* button */}
      <button className="my-2 text-white rounded-lg bg-green-400 px-4 hover:bg-green-500 focus:outline-none focus:ring focus:ring-offset-green-300 active:bg-green-900">
        Click me!
      </button>

      <ul>
      <li className=" bg-white p-2 first:bg-yellow-200">Item 1</li>
      <li className=" bg-white p-2 first:bg-yellow-200 odd:bg-green-300 even:bg-blue-300">Item 2 even</li>
      <li className=" bg-white p-2 first:bg-yellow-200 odd:bg-green-300 even:bg-blue-300">Item 3 odd</li>
      <li className=" bg-white p-2 first:bg-yellow-200 odd:bg-green-300 even:bg-blue-300">Item 4 even</li>
      <li className=" bg-white p-2 first:bg-yellow-200 odd:bg-green-300 even:bg-blue-300">Item 5 odd</li>
      </ul>

      {/* @layer components {
        .card {
          @apply m-10 rounded-lg bg-white px-6 py-8 shadow-xl ring-1 ring-slate-900/5
        }
      } */}

      <div className="card">
        <h3 className="text-base font-medium tracking-tight text-slate-900">This is text element for dark theme</h3>
        <p className="mt-2 text-sm text-slate-500"> text text text text</p>

        <button id="toggleDark" className="bg-blue-300 px-4 py-2 text-blue-950 rounded-lg mt-8 ">
          Click me!
        </button>
      </div>

      {/* colors: {
        chestnut: "#973F29"
      }, */}

      <h4>chestnut is the custom color defined in tailwind.config.ts</h4>
      <p className="text-[24px] text-chestnut bg-[#5d6d80] p-[16px]">Chestnut color</p>

    </div>
  );
}

export default Learn_tailwindcss;