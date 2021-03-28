import Here from './here'
export default function Map({
    children,
    home 
}: {
 children: React.ReactNode
 home?: boolean   
}) {
  return (
    <div className="relative w-full h-2/3">
        <Here />
    </div>
  )
}
