import { Table } from 'react-bootstrap';
import { DiaryEntry } from '../utils/types';
import React from 'react';

const DiaryEntries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  const getDiaries = () => {
    if (!diaries?.length) {
      return <div>There is no flight diaries</div>;
    }

    return (
      <Table borderless size='sm' className='diary-entries w-auto'>
        <tbody>
          {diaries.map((d) => (
            <React.Fragment key={d.id}>
              <tr>
                <td colSpan={2}>
                  <h6 className='fw-bold'>{d.date}</h6>
                </td>
              </tr>
              <tr>
                <td>Visibility:</td>
                <td className='text-capitalize'>{d.visibility}</td>
              </tr>
              <tr>
                <td>Weather:</td>
                <td className='text-capitalize'>{d.weather}</td>
              </tr>
              <tr className='comment-row'>
                <td>Comment:</td>
                <td>{d.comment}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <h2>Diary entries</h2>
      {getDiaries()}
    </>
  );
};

export default DiaryEntries;
