import { useState, useEffect, memo, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Modal from './Modal'

type Props ={
  title: string,
  message: string,
  viewFlag: boolean,
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setResult: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalPortal = ({children}:{children:ReactNode}) => {
  return createPortal(children, document.body)
}

const ConfirmModal = memo((props: Props) => {

  const {title, message, viewFlag, setViewFlag, setResult} = props

  useEffect(() => {
    // 背景画面固定用関数
    const registerBackgroundFixed = () => {
      const body = document.body;
      const scrollWidth = window.innerWidth - body.clientWidth;
      body.style.marginRight = `${scrollWidth}px`;
      body.style.overflowY = 'hidden';
    };
    // 背景画面固定解除用関数
    const unRegisterBackgroundFixed = () => {
      const body = document.body;
      body.style.overflowY = '';
      body.style.marginRight = '';
    };
    if (viewFlag) registerBackgroundFixed();

    return () => {
      unRegisterBackgroundFixed();
    };
  }, [viewFlag]);

  const close = (value:boolean) => {
    setResult(value)
    setViewFlag(false)
  }

  return (
    <ModalPortal>
    <div className={'fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50 transition-all z-40 ' + 
      (viewFlag ? ' top-0 left-0 h-screen w-screen ' : ' top-1/2 left-1/2 h-0 w-0 ')
    } > 
      <div className="w-80 h-40 flex flex-col justify-between bg-white border border-gray-800 rounded-xl ">
      <div className="flex justify-start p-2">
          <span className="block">{title}</span>
        </div>
        <div className="flex justify-center items-center">
          <span className="block p-4">{message}</span>
        </div>
        <div className="flex justify-around py-2">
          <button className="inline-flex items-center w-20 justify-center py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-900" onClick={() => close(true)}>
            はい
          </button>
          <button className="inline-flex items-center w-20 justify-center py-2 bg-blue-800 border border-transparent rounded-md font-semibold text-xs text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-900"
            onClick={() => close(false)}
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  )
})

export default ConfirmModal