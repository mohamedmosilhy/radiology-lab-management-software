import SelectSex from "@/componenets/Selectsex"
import { useForm } from "react-hook-form"
import {useEffect} from "react";
import {supabase} from "@/managers/supabase";

export default function UpdateSubject({ subject, handleClose }) {
  const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm()

  useEffect(() => {
    setValue("name", subject["name"])
    setValue("email", subject["email"])
    setValue("birth_date", subject["birth_date"])
    setValue("address", subject["address"])
  }, [])

  const onSubmit = async data => {
    const { error } = await supabase
      .from('subjects')
      .update(data)
      .eq('id', subject["id"])
      handleClose()
  }

  return (
    <div className="fixed top-0 w-full h-full backdrop-blur-sm">
      <div className="relative flex justify-center">
        <div
          className="fixed inset-0 z-10 overflow-y-auto "
          aria-labelledby="modal-title" role="dialog" aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

            <div
              className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
              <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                Edit Subject Data
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                The changes you will make will be
                reflected in all scan data accordingly.
              </p>

              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>

                <label className="block mt-3 mb-2 ml-1 text-sm text-gray-700 dark:text-gray-200" htmlFor="name">Full Name</label>
                <input {...register("name")} type="text" name="name" id="name" placeholder="Enter a name" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>

                <label className="block mt-3 mb-2 ml-1 text-sm text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
                <input {...register("email")} type="email" name="email" id="email" placeholder="Enter a valid email" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>

                <label className="block mt-3 mb-2 ml-1 text-sm text-gray-700 dark:text-gray-200" htmlFor="birth_date">Birth Date</label>
                <input {...register("birth_date")} type="date" name="birth_date" id="birth_date"  className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>

                <label className="block mt-3 mb-2 ml-1 text-sm text-gray-700 dark:text-gray-200" htmlFor="address">Address</label>
                <input {...register("address")} type="text" name="address" id="address" placeholder="Enter an address" className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button type="button"
                          onClick={handleClose}
                          className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize
              transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2
              dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none
              focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                    Cancel
                  </button>

                  <input type="submit"
                          className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    value="Confirm"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}