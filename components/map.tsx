// import Here from './here'
import MapLibre from './maplibre'
import Remote from './remote'
export default function Map({
    children,
    home 
}: {
 children: React.ReactNode
 home?: boolean   
}) {
  return (
  <>
    <div className="relative w-full h-52">
        <MapLibre 
          home={{
            lat: 64.1448,
            lng: -21.9204,
            zoom: 14
          }}
        />
    </div>
    <Remote />
  </>
  )
}
