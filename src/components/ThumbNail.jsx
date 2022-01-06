import { Image } from "react-bootstrap";


const ThumbNail = ({ item }) => {
    return (  <Image fluid thumbnail src={item.url}></Image>);
}
 
export default ThumbNail;