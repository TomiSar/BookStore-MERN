import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Title</th>
          <th className='border border-slate-600 rounded-md max-hd:hidden'>
            Author
          </th>
          <th className='border border-slate-600 rounded-md max-hd:hidden'>
            Publish Year
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr className='h8' key={book._id}>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {book.title}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-hd:hidden'>
              {book.author}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-hd:hidden'>
              {book.publishYear}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-hd:hidden'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-600' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-blue-600' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
