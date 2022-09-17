import { Dialog, Transition } from '@headlessui/react'
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'
import { Fragment, useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { AuthContext } from '../../auth/context'
import { db } from '../../firebase'
import { IUser } from '../../shared/interfaces'
import { CardUser } from '../components'

// const options = [
//   { name: 'Obrero', value: 1 },
//   { name: 'Ingeniero', value: 2 },
// ]

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([])

  const { user } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  // const [selected, setSelected] = useState(options[0])

  const { register, handleSubmit, reset } = useForm<IUser>({
    defaultValues: {
      name: '',
      cellphone: '',
      type: '1',
    },
  })

  const openModal = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  const onSubmit: SubmitHandler<IUser> = async (formData) => {
    console.log({ formData })

    if (formData.name.trim().length === 0)
      return toast.error('Complete el nombre')

    // closeModal()
    // reset()
    // await addDoc(collection(db, 'users'), {
    //   ...formData,
    // })
    await toast.promise(
      addDoc(collection(db, 'users'), {
        ...formData,
      }),
      {
        loading: 'Guardando...',
        success: <b>Usuario guardado!</b>,
        error: <b>No se pudo guardar.</b>,
      },
    )
    reset()
  }

  useEffect(() => {
    // const querySnapshot = await getDocs(collection(db, 'users'))
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`)
    // })
    const q = query(collection(db, 'users'))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      console.log({ data })
      setUsers(data as IUser[])
    })
    return unsuscribe
  }, [])
  return (
    <div>
      {/* All users */}
      Bienvenid@, {user?.name}
      <br />
      {user?.email}
      <br />
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <ul className="flex flex-col gap-4">
        {users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </ul>
      <button
        className="absolute bottom-4 right-4 rounded-full bg-orange-500 p-4"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 fill-white"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Nuevo usuario
                  </Dialog.Title>
                  <form
                    className="mt-4 flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p> */}
                    <input
                      {...register('name')}
                      type="text"
                      className="flex w-full rounded-lg border border-blue-300 p-4 outline-blue-700 invalid:outline-red-500"
                      placeholder="Nombre"
                      required
                    />
                    <input
                      {...register('cellphone')}
                      type="text"
                      className="flex w-full rounded-lg border border-blue-300 p-4 outline-blue-700 invalid:outline-red-500"
                      placeholder="Teléfono"
                      maxLength={9}
                      // required
                    />
                    <div className="m-2 flex justify-around">
                      <label htmlFor="radio1" className="flex gap-2 ">
                        <input
                          {...register('type')}
                          id="radio1"
                          type="radio"
                          value={1}
                          className="w-4"
                          // className="float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                        />
                        Obrero
                      </label>

                      <label htmlFor="radio2" className="flex gap-2">
                        <input
                          {...register('type')}
                          id="radio2"
                          type="radio"
                          value={2}
                          className="w-4"
                        />
                        Ingeniero
                      </label>
                    </div>

                    {/* <div className="w-full">
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selected.name}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {options.map((person, personIdx) => (
                                <Listbox.Option
                                  key={personIdx}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? 'bg-amber-100 text-amber-900'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={person}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {person.name}
                                      </span>
                                      {selected ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          />
                                        </svg>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div> */}
                    <div className="mt-2 flex justify-end gap-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        // onClick={closeModal}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
