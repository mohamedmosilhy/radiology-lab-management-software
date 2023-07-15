import Link from "next/link"
import Head from "next/head"
import { useState } from "react"
import Sidebar from "@/componenets/Sidebar"
import { supabase } from "@/managers/supabase"
import { useRouter } from "next/router"
import {exporter} from "@/utils/dataManager";
import {calculateAge} from "@/utils/calcAge";

export const getServerSideProps = async ({ query }) => {

  let scansData;
  let statusIndex = 0
  const requiredScanStatus = query.completed


  if (requiredScanStatus && (requiredScanStatus === "true" || requiredScanStatus === "false")) {
     const isCompleted =  requiredScanStatus === "true"

    statusIndex = isCompleted ? 1 : 2

    const { data, error } = await supabase
      .from("scans")
      .select("*, doctors ( name ), subjects ( * )")
      .eq("completed", isCompleted)
      .order('created_at')
    scansData = data
  } else {
    const { data, error } = await supabase
      .from("scans")
      .select("*, doctors ( name ), subjects ( * )")
      .order('created_at')
    scansData = data
  }

  return {
    props: {
      scansData: scansData ?? [],
      statusIndex,
    }
  }
}

const numScansPerPage = 5

export default function Scanlist({ scansData, statusIndex }) {

  console.log(scansData)

  const router = useRouter()
  const [pageIndex, setPageIndex] = useState(0)
  const numOfPages = Math.ceil(scansData.length / numScansPerPage)
  const currentStatusStyle = "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
  const normalStatusStyle = "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"

  const currentPageScans = scansData.slice(pageIndex * numScansPerPage, (pageIndex + 1) * numScansPerPage)

  return (
    <>
      <Head>
        <title>ResonanceM | Scans List</title>
      </Head>
      <div className="flex">
        <Sidebar currentLinkId={1} />
        <section className="ml-72 mr-8 container mx-auto my-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Scans List</h2>

                <span
                  className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{`${scansData.length} Scans`}</span>
              </div>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">A list of all the scans history in your radiology lab</p>
            </div>

            <div className="flex items-center mt-4 gap-x-3">
              <button
                onClick={() => exporter("scans")}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_3098_154395)">
                    <path
                      d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                      stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_3098_154395">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span>Export Data</span>
              </button>

              <Link
                href="/newscan"
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>

                <span>Add New Scan</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div
              className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <Link
                href="/scanlist"
                onClick={() => setPageIndex(0)}
                className={statusIndex === 0 ? currentStatusStyle : normalStatusStyle}>
                View all
              </Link>

              <Link
                href="/scanlist?completed=true"
                onClick={() => setPageIndex(0)}
                className={statusIndex === 1 ? currentStatusStyle : normalStatusStyle}>
                Completed
              </Link>

              <Link
                href="/scanlist?completed=false"
                onClick={() => setPageIndex(0)}
                className={statusIndex === 2 ? currentStatusStyle : normalStatusStyle}>
                In Progress
              </Link>
            </div>

            <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
            </span>

              <input type="text" placeholder="Search"
                     className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Subject
                      </th>

                      <th scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Scan Status
                      </th>

                      <th scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Scan Type
                      </th>

                      <th scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Assigned Doctor
                      </th>

                      <th scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Scan Date
                      </th>

                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    { currentPageScans.map(scan => {
                      const scanDateString = new Date(scan["date"]).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                      const scanStatus = {
                        asString: Boolean(scan["completed"]) === true ? "Completed" : "In Progress",
                        style: Boolean(scan["completed"]) === true
                          ? "inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
                          : "inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-100 rounded-full dark:text-gray-400 gap-x-2 dark:bg-gray-800"
                      }
                      return (
                        <tr key={scan["id"]}
                            className="cursor-pointer"
                          onClick={ () => router.push(`/viewscan/${scan["id"]}`)}
                        >
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">{scan["subjects"]["name"]}</h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{calculateAge(scan["subjects"]["birth_date"])} Years | {scan["subjects"]["sex"]}</p>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                            <div
                              className={scanStatus.style}>
                              {scanStatus.asString}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700 dark:text-gray-200">{scan["type"]}</h4>
                              <p className="text-gray-500 dark:text-gray-400">{scan["part"]}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700 dark:text-gray-200">{`Dr. ${scan["doctors"]["name"]}`}</h4>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <p className="text-gray-500 dark:text-gray-300">{scanDateString}</p>
                          </td>
                        </tr>
                      )
                    }) }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Page <span className="font-medium text-gray-700 dark:text-gray-100">{pageIndex + 1} of {numOfPages}</span>
            </div>

            <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
              <button
                onClick={() => {
                  if (pageIndex > 0) {
                    setPageIndex(pageIndex - 1)
                    console.log(pageIndex)
                  }
                }}
                 className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                </svg>

                <span>
                    previous
                </span>
              </button>

              <button
                onClick={() => {
                  if (pageIndex < numOfPages - 1) {
                    setPageIndex(pageIndex + 1)
                    console.log(pageIndex)
                  }
                }}
                 className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                    Next
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


