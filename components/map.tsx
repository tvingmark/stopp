// import Here from './here'
import MapLibre from './maplibre'
export default function Map({
    children,
    home 
}: {
 children: React.ReactNode
 home?: boolean   
}) {
  return (
    <div className="relative w-full h-52">
        <MapLibre />
    </div>
  )
}
