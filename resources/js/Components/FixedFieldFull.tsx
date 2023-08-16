export default function FixFieldFull(props:{title:string, value:any , className:string}) 
{
  return (
  <div className="col-span-full text-start">
    <h6 className="text-sm font-bold text-gray-700">{props.title}</h6>
    <p className={"px-2 " + props.className}>{props.value}</p>
    <hr className="border-gray-500"/>
  </div>
  )
}