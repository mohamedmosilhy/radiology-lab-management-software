import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {genders} from "@/utils/dummyData";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectSex({ currentValue, handleGenderSelection }) {

  return (
    <Listbox value={currentValue} onChange={handleGenderSelection}>
      {({ open }) => (
        <>
          <Listbox.Label className="text-gray-700 dark:text-gray-200">Sex</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-gray-200 dark:bg-gray-800 dark:ring-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{currentValue.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:text-gray-200 dark:bg-gray-800 dark:ring-gray-200">
                {genders.map((gender) => (
                  <Listbox.Option
                    key={gender.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900' , 'dark:text-white',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={gender }
                  >
                    {({ currentValue, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(currentValue ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {gender.name}
                          </span>
                        </div>

                        {currentValue ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600' ,
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}