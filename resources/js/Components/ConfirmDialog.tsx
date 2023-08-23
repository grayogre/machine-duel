import { forwardRef, useEffect, ReactEventHandler } from 'react'

export type DialogProps = {
  title:string,
  message:string,
  onClose?: ReactEventHandler<HTMLDialogElement> | undefined
}

const ConfirmDialog = forwardRef<HTMLDialogElement,DialogProps>((props, ref) => {

  let dialog:HTMLDialogElement|null = null; 

  useEffect(() => {
    dialog = document.getElementById('confirmDialog') as HTMLDialogElement
    dialog.returnValue = 'default'
  },[])

  return (
    <dialog id="confirmDialog" ref={ref} className="w-80 h-40 border-gray-800 rounded" onClose={props.onClose} >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-start">
          <span className="block">{props.title}</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="block p-4">{props.message}</span>
        </div>
        <form className="flex justify-around">
          <button onClick={() => dialog!.close('yes')}>
            はい
          </button>
          <button onClick={() => dialog!.close('no')}>
            いいえ
          </button>
        </form>
      </div>
    </dialog>
  )
})

export default ConfirmDialog
