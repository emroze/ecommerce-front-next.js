import { styled } from "styled-components"
import Input from "./Input";
import WhiteBox from "./WhiteBox";
import StarsRating from "./StarsRating";
import TextArea from "./TextArea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { prettyDate } from "@/lib/date";
import { useSession } from "next-auth/react";

const Title = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 5px;
`;

const Subtitle = styled.h3`
    font-size: 1rem;
    margin-top: 5px;
`;
const ColsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
        gap   : 40px;
    }
`;

const ReviewWrapper = styled.div`
    margin-bottom: 10px;
    border-top: 1px solid #ddd ;
    padding: 10px 0;
    h3{
        font-size: 1rem;
        margin: 3px 0px;
        padding: 0;
        color: #555;
        font-weight: normal;
    }
    p{
        font-size:0.7rem;
        margin: 0;
        padding: 0;
        color: #777;
    }
`;

const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* flex-direction: column; */
    time{
        font-size:0.5rem;
        font-weight: bold;
        color: #aaa;
    }

`;

const EmailWrapper = styled.div`
    font-size: 0.6rem;
    font-weight: bold;
    color: #555;
    span{
        color: #333;
    }
`;

export default function ProductReviews({product}){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const { data:session } = useSession();
    function submitReview(){
        const data = {title,description,stars,product:product._id};
        axios.post('/api/reviews',data).then(res => {
            setTitle('');
            setDescription('');
            setStars(0);
            loadReviews();
        })
    }

    function loadReviews(){
        setReviewsLoading(true);
        axios.get('/api/reviews?product='+product._id).then(res=>{
            setReviews(res.data);
            setReviewsLoading(false);
        })
    }

    useEffect(() => {
        loadReviews();
    },[])

    return (
        <div>
            <Title>Reviews</Title>
            <ColsWrapper>
                <div>
                    {!session && (
                        <WhiteBox>
                            <h3>Login to give review</h3>
                        </WhiteBox>
                    )}
                    {session && (
                        <WhiteBox>
                            <Subtitle>Add a review</Subtitle>
                            <div>
                                <StarsRating onChange={setStars}/>
                            </div>
                            <Input 
                                value={title} 
                                onChange={ev=>setTitle(ev.target.value)} 
                                placeholder="Title"/>
                            <TextArea 
                                value={description} 
                                onChange={ev=>setDescription(ev.target.value)}  
                                placeholder='How was your product?'/>
                            <div>
                                <Button onClick={submitReview} primary={1}>Submit</Button>
                            </div>
                        </WhiteBox>
                    )}
                </div>
                <div>
                    <WhiteBox>
                        <Subtitle>All reviews</Subtitle>
                        {reviewsLoading && (
                            <Spinner fullwidth={1}/>
                        )}
                        {reviews.length === 0 && (
                            <p>No Reviews Yet</p>
                        )}
                        {reviews.length>0 && reviews.map( review =>(
                            <ReviewWrapper key={review._id}>
                                <ReviewHeader>
                                    <StarsRating size={'sm'} disabled={1} defaultHowMany={review.stars}/>
                                    <time>{prettyDate(review.createdAt)}</time>
                                </ReviewHeader>
                                <EmailWrapper><span>User:</span> {review.email}*****@****</EmailWrapper>
                                <h3>{review.title}</h3>
                                <p>{review.description}</p>
                            </ReviewWrapper>
                        ))}
                    </WhiteBox>
                </div>
            </ColsWrapper>
        </div>
    )
}