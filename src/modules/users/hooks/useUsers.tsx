import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  // onSnapshot,
  // query,
  updateDoc,
} from 'firebase/firestore'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { db } from '../../firebase'
import { IUser } from '../../shared/interfaces'

export const useUsers = () => {
  // const [users, setUsers] = useState<IUser[]>()

  // const q = useMemo(() => query(collection(db, 'users')), [])

  const addUser = useCallback(async (formData: Omit<IUser, 'id'>) => {
    toast.promise(
      addDoc(collection(db, 'users'), {
        ...formData,
      }),
      {
        loading: 'Guardando...',
        success: <b>Usuario guardado!</b>,
        error: <b>No se pudo guardar.</b>,
      },
    )
  }, [])

  const updateUser = useCallback(
    async (userId: string, formData: Partial<IUser>) => {
      const userRef = doc(db, 'users', userId)
      await toast.promise(
        updateDoc(userRef, {
          ...formData,
        }),
        {
          loading: 'Actualizando...',
          success: <b>Usuario actualizado!</b>,
          error: <b>No se pudo actualizar.</b>,
        },
      )
    },
    [],
  )

  const deleteUser = useCallback(async (userId: string) => {
    console.log('handle delete', userId)
    const userDocRef = doc(db, 'users', userId)
    await toast.promise(deleteDoc(userDocRef), {
      loading: 'Eliminando...',
      success: <b>Usuario eliminado!</b>,
      error: <b>No se pudo eliminar.</b>,
    })
  }, [])

  // const deleteUser = async (userId: string) => {
  //   console.log('handle delete', userId)
  //   const userDocRef = doc(db, 'users', userId)
  //   await toast.promise(deleteDoc(userDocRef), {
  //     loading: 'Eliminando...',
  //     success: <b>Usuario eliminado!</b>,
  //     error: <b>No se pudo eliminar.</b>,
  //   })
  // }

  // const onSnap = useCallback(() => {
  //   // const q = query(collection(db, 'users'))
  //   onSnapshot(q, (querySnapshot) => {
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }))
  //     console.log('call function')
  //     // console.log({ data })
  //     setUsers(data as IUser[])
  //   })
  // }, [q])

  // useEffect(() => {
  //   const unsuscribe = onSnap()
  //   return unsuscribe
  // }, [onSnap])

  return {
    // users,
    addUser,
    updateUser,
    deleteUser,
  }
}
