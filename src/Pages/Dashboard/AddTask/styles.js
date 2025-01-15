import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  container: {
    padding: '',
    maxWidth: '600px',
    margin: 'auto'
  },
  title: {
    marginBottom: '',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '1.5rem'
  },
  formField: {
    marginBottom: '16px',
    height: '30'
  },
  button: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293'
    }
  }
})

export default useStyles
