import { Card, Button } from "react-bootstrap";

const ImageCard = ({ item }) => {
  console.log(item);

  return (
    <Card style={{ width: "100%" }} className="my-1">
      <Card.Img variant="top" src={item.url} />
      <Card.Body>
        <Card.Text>{item.name}</Card.Text>

        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
