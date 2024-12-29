import Image from 'next/image'
import { FC, ReactInstance, useRef } from 'react'
import Certi from './certi.png'
import React from 'react'
import { Download } from 'lucide-react' 
import { exportComponentAsPNG } from 'react-component-export-image';

interface CertificateProps {
    studentName: string
    courseName: string
    description: string
    issueDate: string
    certificateId: string
}

const Certificate: FC<CertificateProps> = ({
    studentName,
    courseName,
    description,
    issueDate,
    certificateId
}) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handleDownload =() =>{
        if (componentRef.current) {
            exportComponentAsPNG(componentRef as React.RefObject<ReactInstance>);
        }
      }
    return (
        <div
        ref={componentRef}
          id="print"
        className="relative w-full text-gray-800 max-w-3xl mx-auto aspect-[4/3] font-serif border">
            <Image
                src={Certi}
                alt="Certificate background"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-32 flex flex-col items-center justify-between p-6 text-center">
                <div className="border-b-2 border-primary w-full pb-2">
                    <h1 className="text-xl font-bold mb-2 text-primary">Certificate of Achievement</h1>
                    <p className="text-sm text-muted-foreground">This certifies that</p>
                </div>

                <div className="my-4">
                    <h2 className="text-3xl font-bold mb-2 text-secondary">{studentName}</h2>
                    <p className="text-md mb-4 text-muted-foreground">has successfully completed the course</p>
                    <h3 className="text-lg font-semibold mb-2 text-primary">{courseName}</h3>
                    <p className="text-md mb-2 max-w-2xl text-muted-foreground">{description}</p>
                </div>

                <div className="border-t-2 border-primary w-full pt-4 flex justify-between items-end">
                    <div className="text-left">
                        <p className="text-sm font-medium text-muted-foreground">
                            Issue Date: <span className="font-semibold">{issueDate}</span>
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                            Certificate ID: <span className="font-semibold">{certificateId}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        {/* <Image
              src={signatureImage}
              alt="Signature"
              width={150}
              height={60}
              className="mb-2"
            /> */}
                        <p className="text-sm font-medium text-muted-foreground">Course Instructor</p>
                    </div>
                </div>
            </div>
            <button onClick={handleDownload} className='fixed bottom-8 right-8 p-4 bg-white rounded-full shadow-lg text-purple-900 hover:scale-110 hover:border hover:text-white hover:bg-purple-900 transition-all duration-75'>
                <Download />
            </button>
        </div>
    )
}

export default Certificate

