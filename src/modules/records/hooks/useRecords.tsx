import {
  addDoc,
  collection,
  // collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  // getDocs,
  // query,
  Timestamp,
  updateDoc,
  // where,
} from 'firebase/firestore'
import { useCallback } from 'react'
import toast from 'react-hot-toast'

import { db } from '../../firebase'
import { IRecord } from '../../shared/interfaces'

export const useRecords = (userId?: string) => {
  // const q = useMemo(() => query(collection(db, 'history')), [])

  // const addCities = async () => {
  //   // import { collection, addDoc } from 'firebase/firestore'

  //   const citiesRef = collection(db, 'cities')

  //   await Promise.all([
  //     addDoc(collection(citiesRef, 'SF', 'landmarks'), {
  //       name: 'Golden Gate Bridge',
  //       type: 'bridge',
  //     }),
  //     addDoc(collection(citiesRef, 'SF', 'landmarks'), {
  //       name: 'Legion of Honor',
  //       type: 'museum',
  //     }),
  //     addDoc(collection(citiesRef, 'LA', 'landmarks'), {
  //       name: 'Griffith Park',
  //       type: 'park',
  //     }),
  //     addDoc(collection(citiesRef, 'LA', 'landmarks'), {
  //       name: 'The Getty',
  //       type: 'museum',
  //     }),
  //     addDoc(collection(citiesRef, 'DC', 'landmarks'), {
  //       name: 'Lincoln Memorial',
  //       type: 'memorial',
  //     }),
  //     addDoc(collection(citiesRef, 'DC', 'landmarks'), {
  //       name: 'National Air and Space Museum',
  //       type: 'museum',
  //     }),
  //     addDoc(collection(citiesRef, 'TOK', 'landmarks'), {
  //       name: 'Ueno Park',
  //       type: 'park',
  //     }),
  //     addDoc(collection(citiesRef, 'TOK', 'landmarks'), {
  //       name: 'National Museum of Nature and Science',
  //       type: 'museum',
  //     }),
  //     addDoc(collection(citiesRef, 'BJ', 'landmarks'), {
  //       name: 'Jingshan Park',
  //       type: 'park',
  //     }),
  //     addDoc(collection(citiesRef, 'BJ', 'landmarks'), {
  //       name: 'Beijing Ancient Observatory',
  //       type: 'museum',
  //     }),
  //   ])
  // }

  // const getLands = async () => {
  //   // import { collectionGroup, query, where, getDocs } from 'firebase/firestore'

  //   const museums = query(
  //     collectionGroup(db, 'landmarks'),
  //     where('type', '==', 'museum'),
  //   )
  //   const querySnapshot = await getDocs(museums)
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data())
  //   })
  // }

  const getUserRecord = useCallback(
    async (userHistoryId: string) => {
      const docRef = doc(db, `history/${userId}/records`, userHistoryId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('Document data:', docSnap.data())
        return {
          id: userHistoryId,
          ...data,
        } as IRecord
      } else {
        toast.error('No existe')
        return undefined
      }
    },
    [userId],
  )

  // const addUserHistory = useCallback(async (formData: Omit<IRecord, 'id'>) => {
  //   toast.promise(
  //     addDoc(collection(db, 'history'), {
  //       ...formData,
  //       date: Timestamp.fromDate(new Date(formData.date as string)),
  //     }),
  //     {
  //       loading: 'Guardando...',
  //       success: <b>Registro guardado!</b>,
  //       error: <b>No se pudo guardar.</b>,
  //     },
  //   )
  // }, [])

  const addRecord = useCallback(
    async (formData: Omit<IRecord, 'id'>) => {
      if (formData.detail.trim().length === 0)
        return toast.error('Complete el detalle')
      try {
        return toast.promise(
          addDoc(collection(db, `history/${userId}/records`), {
            ...formData,
            date: Timestamp.fromDate(new Date(formData.date as string)),
          }),
          {
            loading: 'Guardando...',
            success: <b>Registro guardado!</b>,
            error: <b>No se pudo guardar.</b>,
          },
        )
      } catch (error) {
        return toast.error('Algo salió mal')
      }
    },
    [userId],
  )

  const updateRecord = useCallback(
    (recordId: string, formData: Partial<IRecord>) => {
      const recordRef = doc(db, `history/${userId}/records/${recordId}`)
      try {
        return toast.promise(
          updateDoc(recordRef, {
            ...formData,
            date: Timestamp.fromDate(new Date(formData.date as string)),
          }),
          {
            loading: 'Actualizando...',
            success: <b>Registro actualizado!</b>,
            error: <b>No se pudo actualizar.</b>,
          },
        )
      } catch (error) {
        return toast.error('Algo salió mal')
      }
    },
    [userId],
  )

  const deleteRecord = useCallback(
    async (recordId: string) => {
      console.log('handle delete', recordId)
      const recordDocRef = doc(db, `history/${userId}/records/${recordId}`)
      try {
        return toast.promise(deleteDoc(recordDocRef), {
          loading: 'Eliminando...',
          success: <b>Registro eliminado!</b>,
          error: <b>No se pudo eliminar.</b>,
        })
      } catch (error) {
        return toast.error('Algo salió mal')
      }
    },
    [userId],
  )

  return {
    getUserRecord,
    addRecord,
    updateRecord,
    deleteRecord,
  }
}
