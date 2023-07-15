import Head from "next/head"
import Link from "next/link"
import {useEffect} from "react"
import { useForm } from "react-hook-form"
import {supabase} from "@/managers/supabase";
import {useRouter} from "next/router";
export default function Login() {
  const { register, handleSubmit, formState: { errors }, reset,watch } = useForm()

  const router = useRouter()

  const onSubmit = async data => {
    const { email, password } = data
    if (email.trim() && password.trim()) {
      const { data, error } = await supabase
        .from("doctors")
        .select()
        .eq("email", email.trim())
        .maybeSingle()
      if (!data) {
        alert("A user with this email doesn't exist!")
      } else {
        if (data["password"] === password.trim()) {
          localStorage.setItem("current_doctor", JSON.stringify(data));
          await router.push("/dashboard")
        } else {
          alert("Password entered is not correct!")
        }
      }

    }
  }

  return (
    <>
     <Head>
       <title>ResonanceM | Login to your account</title>
     </Head>
      <main>

        <div className="w-full mt-40 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-12 mb-3" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>

            <h3 className="mt-3 text-2xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome back to Resonance</h3>

            <p className="mt-1 px-3 text-center text-sm text-gray-500 dark:text-gray-400">Use your doctor or technician account to access dashboard</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("email", { required: true })} type="email" placeholder="Email Address" aria-label="Email Address"/>
              </div>

              <div className="w-full mt-4">
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  {...register("password", { required: true })} type="password" placeholder="Password" aria-label="Password"/>
              </div>

              <div className="flex items-center justify-between mt-4">
                <input
                  type="submit"
                  className="mx-auto text-center px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  value="Sign In"
                />
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

            <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Request one.</a>
          </div>
        </div>
      </main>
    </>
  )
}
