import { useRef, useState, useEffect } from 'react';
import Head from 'next/head'
import Login from "../components/Login";
import Header from "../components/Header";
import DocumentRow from "../components/DocumentRow";
import { Button, IconButton } from '@material-ui/core';
import { MoreVert, FolderOpen } from '@material-ui/icons';
import Image from 'next/image'
import { getSession, useSession } from "next-auth/client"
import Modal from '@material-ui/core/Modal';
import { db } from '../firebase';
import firebase from 'firebase';

export default function Home() {
  // To check user is currently logged in or not - gives true of false
  const [session] = useSession();
  if (!session) return <Login />

  const [showModal, setShowModal] = useState(false);
  const [docs, setDocs] = useState([]);
  const docNameFieldRef = useRef(null);

  const docsRef = db
    .collection('UserDocs')
    .doc(session?.user.email)
    .collection('docs');

  useEffect(() => {
    const unsub = docsRef
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => setDocs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))))

    return unsub
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = docNameFieldRef.current.value;

    if (inputValue) {

      docsRef.add({
        fileName: inputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(() => {
          e.target.reset();
          setShowModal(false);
        })
        .catch(err => alert(err))

    }
  }

  const ModalComponent = () => (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="grid place-items-center px-2"
    >
      <div className="flex justify-center flex-col w-full h-3/6 sm:w-3/6 sm:h-48 bg-gray-100 rounded-xl outline-none px-4">
        <p className="mb-4 font-bold">Create document</p>
        <form onSubmit={handleSubmit}>
          <input ref={docNameFieldRef} type="text" placeholder="Enter name of Document" className="rounded-md p-2 mb-3 w-full outline-none" />
          <div className="flex space-x-3 justify-center">
            <Button color='primary' variant="contained" className='w-full' type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Google Docs - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ModalComponent />
      <section className='bg-[#F8F9FA]'>
        <div className='max-w-3xl mx-auto px-6'>
          <div className="flex items-center justify-between py-4">
            <h2 className='text-gray-700 text-lg font-semibold'>Start a new document</h2>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
          <div>
            <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-400'>
              <Image src='https://links.papareact.com/pju' layout='fill' onClick={() => setShowModal(true)} />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>


      <section className='my-4'>
        <div className="max-w-3xl mx-auto px-6">
          <div className='flex items-center justify-between pb-5 text-gray-700 text-sm'>
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <IconButton>
              <FolderOpen />
            </IconButton>
          </div>

          {docs?.map(doc => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.fileName}
              date={doc.timestamp}
            />
          ))}


        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  }
}