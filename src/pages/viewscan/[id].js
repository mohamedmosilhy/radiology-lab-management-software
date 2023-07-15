import Sidebar from "@/componenets/Sidebar";
import SelectStatus from "@/componenets/Status";
import Status from "@/componenets/Status";
import {supabase} from "@/managers/supabase";
import {calculateAge} from "@/utils/calcAge";
import {useState} from "react";

export const getServerSideProps = async ({ params }) => {
  const { id: scanID } = params

  const { data, error } = await supabase
    .from("scans")
    .select("*, doctors ( name ), subjects ( * )")
    .eq("id", scanID)
    .maybeSingle()
  return {
    props: {
      scanData: data
    }
  }
}

export default function ViewScan({ scanData }) {
  const [isCompleted, setIsCompleted] = useState(scanData["completed"])

  return (
    <div className="flex">
      <Sidebar/>
      <div className="ml-72 mr-8 container mx-auto my-8">
        <section className="mt-5 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Scan Page</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing all the information about scan with id <u>{scanData["id"]}</u> { isCompleted ? "t": "f" }
          </p>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
              <div>
                <label className="text-gray-700 dark:text-gray-200">Subject Name</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{scanData["subjects"]["name"]}</p>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">Date</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">{scanData["date"]}</p>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">Sex</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{scanData["subjects"]["sex"]}</p>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">Date of birth</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{scanData["subjects"]["birth_date"]}</p>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">Age</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{calculateAge(scanData["subjects"]["birth_date"])}</p>
              </div>

              <div>
                <label className="text-gray-700 dark:text-gray-200">Assigned Doctor</label>
                <p
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{scanData["doctors"]["name"]}</p>
              </div>
              
              <div>
              <SelectStatus isCompleted={isCompleted} setStatus={setIsCompleted} scanId={scanData["id"]} className="text-gray-700 dark:text-gray-200" htmlFor="Status">Status</SelectStatus>
              </div>

              <div className="col-start-1 row-end-5 mb-10">
                <label className="text-gray-700 dark:text-gray-200">Conclusion</label>
                <p
                  className="block h-full w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 ">{scanData["conclusion"]}</p>
              </div>
            </div>
            <h2 className="mt-5 text-lg font-semibold text-gray-700 capitalize dark:text-white">Images</h2>

            <div className="grid grid-cols-2 gap-2 m-10">
              {scanData["images"].map((url) => {
                return (
                  <div key={url}>
                    <img alt="Image" className="h-full w-full max-w-full rounded-lg" src={`https://ctrmxfuwfmabaytdoykh.supabase.co/storage/v1/object/public/images/${url}`}/>
                  </div>
                )
              })}
            </div>

            {/*<div className="flex justify-end mt-6">*/}
            {/*  <button*/}
            {/*    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-900 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Print*/}
            {/*  </button>*/}
            {/*</div>*/}
          </form>
        </section>
      </div>
    </div>
  )
}

