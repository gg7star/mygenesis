import firebase from '@react-native-firebase/app'
import storage from '@react-native-firebase/storage'
import '@react-native-firebase/database'

export const FireBaseStorage = storage()

export const createStorageReferenceToFile = () => {
  const date = new Date()
  const fileName = "cv-" + date.getTime()
  return FireBaseStorage.ref(fileName)
}

export const uploadFileToFireBase = (localFilePath) => {
  const storageRef = createStorageReferenceToFile()
  return storageRef.putFile(localFilePath)
}
