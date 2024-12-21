import React, { useState, useEffect } from 'react'
import FeedbackItem from '@/components/ProductDetailPage/FeedbackItem'


const FeedbackBox = ({ feedbackList }) => {

    return (
        <div className="feedback-box row">
            {
                feedbackList && feedbackList.map((feedback, index) => {
                    return (
                        <FeedbackItem
                            key={index}
                            customer={feedback.customer}
                            rate={feedback.rate}
                            colour={feedback.colour}
                            size={feedback.size}
                            content={feedback.content}
                            createdAt={feedback.created_at}
                        />
                    )
                })
            }
        </div>
    )
}

export default FeedbackBox