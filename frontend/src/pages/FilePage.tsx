import React from 'react'
import FileUpload from '../components/Files/FileUpload'
import AllFiles from '../components/Files/AllFiles'

import "./pages.css"

export default function FilePage() {
  return (
    <div className='pageContainer'>
      <div className="uploadContainer">
        <FileUpload />
      </div>
      <div className="alltemsContainer">
        <AllFiles />
      </div>
    </div>
  )
}
