import GoogleIcon from '@mui/icons-material/Google'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { deepOrange, grey } from '@mui/material/colors'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const LoginPage = () => {
  const signInWithGoogle = () => {
    console.log('Login button clicked')
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        // ...
        console.log(token)
        console.log(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(credential)
      })
  }
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        backgroundColor: grey[300],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          display: 'flex',
          gap: '1rem',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MenuBookIcon sx={{ fontSize: 100, color: deepOrange[500] }} />
        <Button
          variant="contained"
          endIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
        >
          Iniciar sesión con google
        </Button>
      </Box>
    </Box>
  )
}

export default LoginPage
