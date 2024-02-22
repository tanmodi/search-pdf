'use client'
import { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'

export default function PdfUpload() {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a PDF file')
    }
  }

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        alert('File uploaded successfully')
      } else {
        alert('Something went wrong')
      }
    } else {
      alert('No file selected')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">PDF Upload</h1>
      <div className="max-w-md p-4 bg-white shadow-lg rounded-lg">
        <Input type="file" accept="application/pdf" onChange={handleFileChange} className="border border-gray-300 p-2 rounded-md mb-2" />
        <Button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Upload</Button>
      </div>
    </div>
  )
}
