import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({pages, page, keyword="", isAdmin=false}) => {

    const rootPath = isAdmin ? "/admin/productlist" : ""

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map(x => (
                        <Pagination.Item key={x + 1} active={x+1 === page} as={Link} to={`${rootPath}/?keyword=${keyword}&page=${x+1}`}>{x+1}</Pagination.Item>
                ))}
            </Pagination>
        )
    )
}

export default Paginate;