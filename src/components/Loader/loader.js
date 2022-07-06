import React from 'react'
import './loader.css'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
export default function loader() {
  return (
    <Container>
      <Grid container style ={{height: window.innerHeight - 50}} alignItems={'center'} justifyContent={'center'}>
      <div class="loader">Loading...</div>
      </Grid>
      </Container>
    
  )
}
