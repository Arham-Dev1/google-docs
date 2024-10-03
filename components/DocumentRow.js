import React from 'react';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Tooltip } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { db } from '../firebase';

const DocumentRow = ({ id, fileName, date }) => {
  const router = useRouter();
  const [session] = useSession();

  const handleDelete = () => {

    db.collection('UserDocs').doc(session?.user.email).collection('docs').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  return (
    <div className='flex max-w-3xl mx-auto'>
      <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center w-full rounded-lg p-2 hover:bg-gray-100 text-gray-700 cursor-pointer text-sm">
        <div className="text-[#2196f3]">
          <DescriptionIcon />
        </div>
        <p className="flex-grow ml-5 w-10 mr-10 truncate font-semibold">{fileName}</p>
        <p className="text-sm mr-6">{date?.toDate().toLocaleDateString()}</p>
      </div>
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default DocumentRow;