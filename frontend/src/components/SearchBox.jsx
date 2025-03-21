import { useState } from "react";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const SerachBox = () => {

    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate("./?keyword=")
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex gap-2">
            <Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} className="mr-sm-2 ml-sm-5">
            </Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">Submit</Button>
        </Form>
    )
}

export default SerachBox;