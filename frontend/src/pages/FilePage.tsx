import React from 'react'
import FileUpload from '../components/FileUpload'
import AllFiles from '../components/AllFiles/AllFiles'

import "./file-page.css"

export default function FilePage() {
  return (
    <div className='pageContainer'>
      <div className="fileUploadContainer">
        <FileUpload />
      </div>
      <div className="allFilesContainer">
        <AllFiles />
      </div>
    </div>
  )
}
