import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import CommentPictures from '../CommentPictures/CommentPictures'
import './styles.scss'

export default function Comment(props) {
  const {
    schoolId,
    handleSetIsEditRate,
    handleSetRatedStarAmount,
    handleSetCommentRated,
    handleSetIdRated,
  } = props

  const [schoolRateCommentList, setSchoolRateCommentList] = useState()
  console.log('Comment ~ schoolRateCommentList', schoolRateCommentList)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/truong/${schoolId}/danhgia`)
        setSchoolRateCommentList(result.data)
      } catch (error) {
        console.log('Error', error)
      }
    }
    fetchData()
  }, [])

  const colorList = [
    '#5d5b6a',
    '#d47edd',
    '#856c8b',
    '#82cf7a',
    '#d5744e',
    '#f67280',
    '#6a8caf',
    '#e572a9',
    '#c1867b',
    '#516091',
  ]

  const getRandomColor = () => {
    const randNumber = Math.floor(Math.random() * colorList.length)
    return colorList[randNumber]
  }

  const tokenLocal = localStorage.getItem('token')
  const tokenDecoded = jwtDecode(tokenLocal)

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/danhgia/${id}`, {
        headers: { Authorization: tokenLocal },
      })
      console.log('deleted')

      const deletedCommentIndex = schoolRateCommentList.findIndex(
        (comment, index) => comment.id_danh_gia === id,
      )
      const newCommentList = [...schoolRateCommentList]
      newCommentList.splice(deletedCommentIndex, 1)
      setSchoolRateCommentList(newCommentList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='comment'>
        <div className='comment--title'>
          <hr />
          <h1>ĐÁNH GIÁ</h1>
          <hr />
        </div>
        <div className='comment--container-list'>
          {schoolRateCommentList && schoolRateCommentList.length === 0 ? (
            <p>Hãy là người đầu tiên đánh giá</p>
          ) : (
            schoolRateCommentList &&
            schoolRateCommentList.map((comment, index) => {
              let dateComment = new Date(comment.created_at)
              let formattedDate = `${dateComment.getDate()}/${
                dateComment.getMonth() + 1
              }/${dateComment.getFullYear()}`
              return (
                <div className='comment--container'>
                  <div className='comment--avatar'>
                    <h1 style={{ backgroundColor: getRandomColor() }}>{comment.ten.slice(0, 1)}</h1>
                  </div>
                  <div className='comment--content'>
                    <div className='header--comment'>
                      <div className='name-and-date'>
                        <p>{`${comment.ten} ${comment.ho ? comment.ho : ''}`}</p>
                        <p>{formattedDate}</p>
                      </div>
                      {comment.sao === 1 && <FontAwesomeIcon className='star-icon' icon={faStar} />}
                      {comment.sao === 2 && (
                        <>
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                        </>
                      )}
                      {comment.sao === 3 && (
                        <>
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                        </>
                      )}
                      {comment.sao === 4 && (
                        <>
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                        </>
                      )}
                      {comment.sao === 5 && (
                        <>
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                          <FontAwesomeIcon className='star-icon' icon={faStar} />
                        </>
                      )}
                    </div>
                    <div className='main--comment'>
                      <p>{comment.danh_gia}</p>
                    </div>
                  </div>
                  {tokenDecoded.username === comment.username && (
                    <div className='comment--controls'>
                      <button
                        onClick={() => {
                          handleSetIsEditRate(true)
                          handleSetRatedStarAmount(comment.sao)
                          handleSetCommentRated(comment.danh_gia)
                          handleSetIdRated(comment.id_danh_gia)
                        }}
                      >
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id_danh_gia)}>Xóa</button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
        <CommentPictures commentPictures={schoolRateCommentList} />
      </div>
    </>
  )
}
