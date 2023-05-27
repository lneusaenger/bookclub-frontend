import { Card } from "antd";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ReviewCard(props){
    return(
        <Card className = "review-card"
            title={props.name}
            extra={<><div><b>Rating</b>: {props.rating} out of 5</div><div><b>Date Finished</b>: {formatDistanceToNow(new Date(props.finished), {addSuffix: true})}</div></>}
            style={{
                width: 600,
            }}
            >
            <p className="review">{props.review}</p>
        </Card>
    );
};