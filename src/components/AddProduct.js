import { Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    console.log(user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const createProduct = (e) => {
        e.preventDefault();

        let token = localStorage.getItem("token");

        fetch(`${process.env.REACT_APP_API_URL}/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(token)}`,
            },
                body: JSON.stringify({
                name: name,
                description: description,
                price: price,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.error === "Product Already exists.") {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Product Creation",
                    text: data.error,
                });
            } else if (data.message === "Product saved successfully!") {
                Swal.fire({
                    icon: "success",
                    title: "Product Added",
                    text: data.message,
                });

                setName("");
                setDescription("");
                setPrice(0);
            } else {
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "error",
                    text: "There is a problem while adding the product.",
                });

                navigate("/products");
            }
        });
    };
    return(
		user.isAdmin === true ?
		<>
			<h1 className="my-5 text-center">Add Course</h1>
			<Form onSubmit={e => createProduct(e)}>
			    <Form.Group>
			        <Form.Label>Name:</Form.Label>
			        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
			    </Form.Group>
			    <Form.Group>
			        <Form.Label>Description:</Form.Label>
			        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
			    </Form.Group>
			    <Form.Group>
			        <Form.Label>Price:</Form.Label>
			        <Form.Control type="number" placeholder="Enter Price" required value={price} onChange={e => {setPrice(e.target.value)}}/>
			    </Form.Group>
			    <Button variant="primary" type="submit" className="my-5">Submit</Button>
			</Form>
		</>
		:
		<Navigate to="/*"/>

	);
}

export default AddProduct;