import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/client';
import { db } from '../../firebase';
import LockIcon from '@material-ui/icons/Lock';
import DescriptionIcon from '@material-ui/icons/Description';
import CloudIcon from '@material-ui/icons/CloudDone';
import TextEditor from '../../components/TextEditor';
import { Button, Tooltip } from '@material-ui/core';

const Doc = () => {
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!session) return;

    db
      .collection('UserDocs')
      .doc(session?.user.email)
      .collection('docs')
      .doc(id)
      .get()
      .then(data => {
        if (data.data()) {
          setDoc({ ...data.data() })
        } else {
          router.replace('/')
        }
      })
      .catch(err => aler(err))

  }, [id, session]);


  return (
    <div>
      <Head>
        <title>Document - {session?.user.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center p-2">
        <Tooltip title="Home">
          <span onClick={() => router.push('/')} className="cursor-pointer text-5xl text-[#2196f3] grid place-items-center">
            <DescriptionIcon fontSize="inherit" />
          </span>
        </Tooltip>

        <div className="flex-grow px-2">
          <div className='flex items-center space-x-2'>
            <h2 className="font-semibold ml-1 mr-4">
              {doc?.fileName}
            </h2>
            <span className='text-gray-400'>
              <CloudIcon />
            </span>
            <h4 className='text-sm text-gray-400 cursor-default'>
              Saved to cloud
            </h4>
          </div>
          <div className="flex items-center text-sm space-x-2 -ml-1 h-8 text-gray-500">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <div className="hidden md:inline-flex items-center">
          <Button
            style={{ backgroundColor: '#1a73e8', color: 'white' }}
            variant='contained' size='medium'
          >
            <LockIcon fontSize='small' />‎ Share
          </Button>
        </div>
        <Tooltip title="Logout">
          <img src={session?.user.image}
            className="rounded-full h-10 w-10 ml-2 cursor-pointer"
            alt="Profile"
          />
        </Tooltip>
      </header>

      {doc && <TextEditor doc={doc} />}
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session }
  }
}