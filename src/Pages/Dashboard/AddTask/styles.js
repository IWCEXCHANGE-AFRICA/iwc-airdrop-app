import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    maxWidth: 600,
    margin: 'auto'
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    fontWeight: 600
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3), // Increased spacing between input fields
    marginBottom: theme.spacing(2)
  },
  input: {
    '& .MuiInputBase-root': {
      fontSize: '0.875rem', // Reduced font size to reduce height
      padding: '10px 12px' // Reduced padding to minimize height
    },
    '& .MuiFormControl-root': {
      height: 'auto' // Ensures input height doesn't exceed desired size
    }
  },
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5)
  }
}))

export default useStyles
