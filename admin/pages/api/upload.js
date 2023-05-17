// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//multiparty library for parsing multiple form data
import multiparty from 'multiparty'
import {PutObjectCommand, S3Client } from '@aws-sdk/client-s3' //for image upload
import fs from 'fs'
import mime from 'mime-types'

const bucketName = 'nextjsstore'

export default async function handler(req, res) {
  const form = new multiparty.Form()
  const {fields, files} = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
        if(err) reject(err); 
        resolve({fields, files})
    })
  })
  //console.log('length', files.file)

    const client = new S3Client({
        region: 'eu-west-3',
        credentials:{
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    })

    const links = [];
    for(const file of files.file){
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        //console.log({ext, file})

        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path)
        }))

        const link  = `https://${bucketName}.s3.amazonaws.com/${newFilename}`
        links.push(link)
    }

   return res.json({links})
}

//telling NextJs to not parse our request automatically to json
//request will be parse manually
export const config ={
    api: {bodyParser: false}
}