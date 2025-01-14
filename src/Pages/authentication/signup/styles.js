const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    maxWidth: 400,
    width: '100%',
    padding: 2,
    backgroundColor: '#fff',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 2
  },
  logo: isMobile => ({
    display: 'block',
    margin: '0 auto',
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    borderRadius: '50%'
  }),
  heading: {
    textAlign: 'center',
    marginBottom: 2
  },
  subHeading: {
    textAlign: 'center',
    marginBottom: 4,
    color: 'textSecondary'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  formControl: {
    borderRadius: '100px'
  },
  button: {
    py: 1.5,
    mb: 2,
    height: 40,
    textTransform: 'none',
    fontSize: '1rem',
    borderRadius: '100px',
    background: '#D0A106',
    '&:hover': {
      background: '#b78c07'
    }
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 2
  }
}

export default styles
