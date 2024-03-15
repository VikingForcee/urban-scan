import { Fragment} from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.URBAN_SCAN_API_KEY
  })

  return (
    <Fragment>
      <div classname='container'>
        <h1 className='text-center'>Urban Scan</h1>
        <div style={{ width:"100%",height:"90vh"}}>

        </div>
      </div>
    </Fragment>
  )
}1

export default App
