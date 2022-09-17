import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { deleteDoc, doc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { db } from '../../firebase'

import { IUser } from '../../shared/interfaces'

interface CardUserProps {
  user: IUser
}
export const CardUser = ({ user }: CardUserProps) => {
  const handleDelete = async () => {
    // console.log('handle delete', user.id)
    const userDocRef = doc(db, 'users', user.id)
    await toast.promise(deleteDoc(userDocRef), {
      loading: 'Eliminando...',
      success: <b>Usuario eliminado!</b>,
      error: <b>No se pudo eliminar.</b>,
    })
  }

  return (
    <div className="flex justify-between rounded-xl bg-blue-500 p-4 text-2xl text-white">
      {user.name}
      <div className="flex gap-4">
        <button className="flex items-center">
          <PencilIcon className="h-6 w-6 text-yellow-500" />
        </button>
        <button className="flex items-center" onClick={handleDelete}>
          <TrashIcon className="h-6 w-6 text-red-500" />
        </button>
      </div>
    </div>
  )
}
