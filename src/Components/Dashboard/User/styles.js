import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 16,
    borderRadius: 8
  },
  title: {
    marginBottom: 16
  },
  textField: {
    '& .MuiInputBase-root': {
      height: 36, // Adjust the height of the TextField
      fontSize: '14px', // Optional: Adjust font size
      borderRadius: '20px' // Border radius for the input
    },
    '& .MuiInputLabel-root': {
      fontSize: '12px' // Optional: Adjust label font size
    }
  },
  updateButton: {
    backgroundColor: 'rgb(42, 27, 8)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgb(34, 20, 7)'
    }
  }
})

export default useStyles
