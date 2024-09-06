'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Image from 'next/image'

export default function Component() {
	const [image, setImage] = useState<File | null>(null)
	const [caption, setCaption] = useState('')
	const [preview, setPreview] = useState<string | null>(null)

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles && acceptedFiles.length > 0) {
			setImage(acceptedFiles[0])
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!image) {
			alert('Please select an image')
			return
		}
		// Here you would typically send the image and caption to your API
		console.log('Submitting:', { image, caption })
		// Reset form after submission
		setImage(null)
		setCaption('')
		setPreview(null)
	}

	return (
		<Card className="w-full max-w-md mx-auto p-6 mt-10">
			<h1 className="text-2xl font-bold mb-4">Upload to Instagram</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? 'border-primary' : 'border-gray-300'
						}`}
				>
					<input {...getInputProps()} />
					{preview ? (
						<div className="relative h-48 w-full">
							<Image src={preview} alt="Preview" fill style={{ objectFit: 'contain' }} />
						</div>
					) : (
						<p>{isDragActive ? 'Drop the image here' : 'Drag and drop an image here, or click to select'}</p>
					)}
				</div>
				<div>
					<Label htmlFor="caption">Caption</Label>
					<Input
						id="caption"
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						placeholder="Enter a caption for your image"
					/>
				</div>
				<Button type="submit" className="w-full">Submit</Button>
			</form>
		</Card>
	)
}