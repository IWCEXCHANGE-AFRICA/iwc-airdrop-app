// TaskFormStyles.js
export const containerStyle = {
  backgroundColor: '#f9f9f9',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
}

export const titleStyle = {
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '30px'
}

export const textFieldStyle = {
  height: '40px',

  '& .MuiInputBase-root': {
    height: '40px',
    borderRadius: '20px'
  }
}

export const textAreaStyle = {
  '& .MuiInputBase-root': {
    height: 'auto',

    borderRadius: '20px'
  }
}

export const selectStyle = {
  height: '40px',
  '& .MuiSelect-select': {
    paddingTop: '8px',
    paddingBottom: '8px',
    borderRadius: '20px'
  }
}

export const buttonStyle = {
  height: '48px',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '20px',
  backgroundColor: 'rgb(86, 55, 15)'
}
