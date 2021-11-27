import React from 'react'
import './styles.scss'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export default function CommentPictures(props) {
  const { commentPictures } = props

  const imgSrcList = []
  commentPictures &&
    commentPictures.forEach((commentPicture) => {
      // console.log(commentPicture.hinh_anh)
      commentPicture.hinh_anh !== [] &&
        commentPicture.hinh_anh.forEach((picture) => {
          // console.log(`http://localhost:8000${picture.url}`)
          const imgSrc = `http://localhost:8000${picture.url}`
          imgSrcList.push(imgSrc)
        })
    })

  return (
    <div className='comment-pictures'>
      <hr />
      <h1>Ảnh đánh giá</h1>
      {/* <hr /> */}
      <div className='pictures-content'>
        {imgSrcList.length === 0 ? (
          <p>Hãy là người đầu tiên gửi ảnh đánh giá</p>
        ) : (
          imgSrcList.map((imgSrc) => (
            <a href={imgSrc} target='_blank' rel='noreferrer'>
              <img src={imgSrc} alt='' />
            </a>
          ))
        )}
      </div>
    </div>
  )
}
