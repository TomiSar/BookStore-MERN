import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { API_BOOKS_BASE_URL } from '../../constants';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import axios from 'axios';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateBook = () => {
    const newBook = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios
      .post(API_BOOKS_BASE_URL, newBook)
      .then(() => {
        navigate('/');
        enqueueSnackbar('Book Created Successfully', { variant: 'success' });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create New Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            type='text'
            title={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            type='text'
            title={author}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            className='border-2 border-gray-500 px-4 py-2 w-full'
            type='number'
            title={publishYear}
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button
          className='p-2 bg-sky-300 m-8 rounded-xl'
          onClick={handleCreateBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
