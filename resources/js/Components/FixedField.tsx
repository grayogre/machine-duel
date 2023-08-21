export default function FixField(props:{title:string, value:any, className:string}) 
{
  return (
  <div className="col-auto">
    <h6 className="text-sm font-bold text-gray-700 mb-2">{props.title}</h6>
    <p className={"px-2 " + props.className}>{props.value}</p>
    <hr className="border-gray-500"/>
  </div>
  )
}
